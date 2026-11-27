(() => {
  'use strict';

  const T = window.Theatron;
  const LATEST_KEY = (T && T.STORAGE_KEYS && T.STORAGE_KEYS.LATEST) || 'theatron_latest_booking';
  const BOOKINGS_KEY = (T && T.STORAGE_KEYS && T.STORAGE_KEYS.BOOKINGS) || 'theatron_bookings';
  const MAX_SEATS = 8;

  const TIER_CONFIG = [
    {
      id: 'standard',
      name: 'Standard',
      subtitle: 'Rows A – B',
      rows: ['A', 'B'],
      seatsPerRow: 10,
      aisleAfter: 5,
      surcharge: 0,
      seatClass: 'is-standard',
      sectionClass: 'tier-standard',
    },
    {
      id: 'prime',
      name: 'Prime',
      subtitle: 'Rows C – E',
      rows: ['C', 'D', 'E'],
      seatsPerRow: 12,
      aisleAfter: 6,
      surcharge: 400,
      seatClass: 'is-prime',
      sectionClass: 'tier-prime',
    },
    {
      id: 'vip',
      name: 'VIP Recliner',
      subtitle: 'Rows F – G',
      rows: ['F', 'G'],
      seatsPerRow: 8,
      aisleAfter: 4,
      surcharge: 1000,
      seatClass: 'is-vip',
      sectionClass: 'tier-vip',
    },
  ];

  const state = {
    booking: null,
    basePricePkr: 1800,
    tiers: [],
    seatLookup: new Map(),
    occupiedSeats: new Set(),
    selectedSeats: [],
  };

  /**
   * Formats an amount in PKR with thousands separators.
   * @param {number} amount
   * @returns {string}
   */
  function formatPkr(amount) {
    const safe = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
    return `PKR ${safe.toLocaleString('en-US')}`;
  }

  /**
   * Normalizes upstream showtime pricePerSeat into PKR base ticket pricing.
   * Upstream showtimes may provide USD-denominated values (e.g., 30-54) or PKR values (>= 200).
   * @param {number|string} rawPrice
   * @returns {number}
   */
  function normalizeBasePricePkr(rawPrice) {
    const numeric = Number(rawPrice);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      return 1800;
    }
    if (numeric < 200) {
      return Math.round(numeric * 50);
    }
    return Math.round(numeric);
  }

  /**
   * Deterministic FNV-1a string hash for reproducible pre-booked seat occupancy.
   * @param {string} str
   * @returns {number}
   */
  function hashSeed(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  /**
   * Builds tier definitions with PKR prices and indexes every seat code (e.g. A1..G8).
   */
  function buildSeatCatalog() {
    state.seatLookup.clear();
    state.tiers = TIER_CONFIG.map((tier) => {
      const price = state.basePricePkr + tier.surcharge;
      const rows = tier.rows.map((rowLabel) => {
        const seats = [];
        for (let col = 1; col <= tier.seatsPerRow; col += 1) {
          const code = `${rowLabel}${col}`;
          const seatObj = {
            code,
            row: rowLabel,
            col,
            tierId: tier.id,
            tierName: tier.name,
            price,
            seatClass: tier.seatClass,
          };
          seats.push(seatObj);
          state.seatLookup.set(code, seatObj);
        }
        return {
          rowLabel,
          aisleAfter: tier.aisleAfter,
          seats,
        };
      });

      return {
        ...tier,
        price,
        rows,
      };
    });
  }

  /**
   * Generates deterministic pre-booked (occupied) seats for the active screening.
   * Preserves any valid seats already stored on the draft booking so returning users keep them.
   * @param {object} booking
   */
  function buildOccupiedSeats(booking) {
    state.occupiedSeats.clear();
    const preserved = new Set(
      (Array.isArray(booking.seats) ? booking.seats : [])
        .map((s) => String(s).trim().toUpperCase())
        .filter((code) => state.seatLookup.has(code))
    );

    const seedInput = [
      booking.showtimeId || '',
      booking.movieTitle || '',
      booking.cinema || '',
      booking.hall || '',
      booking.date || '',
      booking.time || '',
    ].join('|');

    let rng = hashSeed(seedInput) || 1337;
    const nextRand = () => {
      rng ^= rng << 13;
      rng ^= rng >>> 17;
      rng ^= rng << 5;
      return (rng >>> 0) % 100;
    };

    const allCodes = Array.from(state.seatLookup.keys());
    for (let i = 0; i < allCodes.length; i += 1) {
      const code = allCodes[i];
      if (preserved.has(code)) continue;
      const roll = nextRand();
      // Create realistic clusters of occupied seats (~22% overall)
      if (roll < 17) {
        state.occupiedSeats.add(code);
        const nextCode = allCodes[i + 1];
        if (nextCode && nextCode[0] === code[0] && !preserved.has(nextCode) && nextRand() < 58) {
          state.occupiedSeats.add(nextCode);
          i += 1;
        }
      }
    }

    // Restore up to MAX_SEATS previously selected valid seats
    state.selectedSeats = Array.from(preserved)
      .filter((code) => !state.occupiedSeats.has(code))
      .slice(0, MAX_SEATS);
  }

  /**
   * Sorts seat codes cleanly by row letter (A-G) then seat number ascending.
   * @param {Array<string>} codes
   * @returns {Array<string>}
   */
  function sortSeatCodes(codes) {
    return [...codes].sort((a, b) => {
      const rowDiff = a.charCodeAt(0) - b.charCodeAt(0);
      if (rowDiff !== 0) return rowDiff;
      return parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10);
    });
  }

  /**
   * Computes current seat subtotal in PKR.
   * @returns {number}
   */
  function calculateSubtotal() {
    return state.selectedSeats.reduce((sum, code) => {
      const seat = state.seatLookup.get(code);
      return sum + (seat ? seat.price : 0);
    }, 0);
  }

  /**
   * Displays or clears an inline notice above the seat map.
   * @param {string} message
   */
  function showFeedback(message) {
    const el = document.getElementById('seat-feedback');
    if (!el) return;
    if (!message) {
      el.textContent = '';
      el.hidden = true;
      return;
    }
    el.textContent = message;
    el.hidden = false;
  }

  /**
   * Populates the top screening summary banner and sidebar mini-header.
   * @param {object} booking
   */
  function renderScreeningBanner(booking) {
    const fallbackPoster =
      booking.posterFallback ||
      (T && typeof T.createPosterPlaceholder === 'function'
        ? T.createPosterPlaceholder(booking.movieTitle)
        : '');

    const posterEl = document.getElementById('summary-poster');
    if (posterEl) {
      posterEl.alt = `${booking.movieTitle} poster`;
      posterEl.src = booking.poster || fallbackPoster;
      posterEl.addEventListener(
        'error',
        () => {
          if (fallbackPoster && posterEl.src !== fallbackPoster) {
            posterEl.src = fallbackPoster;
          }
        },
        { once: true }
      );
    }

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText('summary-movie-title', booking.movieTitle);
    setText('summary-cinema', booking.cinema || 'THEATRON Grand Flagship');
    setText('summary-hall', booking.hall || 'Private Screening Lounge');
    setText('summary-format', booking.format || 'Signature Lounge');
    setText('summary-datetime', [booking.date, booking.time].filter(Boolean).join(' • ') || 'Scheduled Screening');
    setText('summary-base-price', formatPkr(state.basePricePkr));

    const setBadge = (id, value) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (value) {
        el.textContent = value;
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    };

    setBadge('summary-rating', booking.rating);
    setBadge('summary-runtime', booking.runtime);
    setBadge('summary-language', booking.language);

    const screenCaption = document.getElementById('screen-format-caption');
    if (screenCaption && booking.format) {
      screenCaption.textContent = `${String(booking.format).toUpperCase()} • ACOUSTIC SWEET SPOT`;
    }

    setText('sidebar-movie-title', booking.movieTitle);
    setText(
      'sidebar-venue',
      [booking.cinema, booking.hall].filter(Boolean).join(' — ') || 'THEATRON Lounge'
    );
    setText(
      'sidebar-datetime',
      [booking.date, booking.time].filter(Boolean).join(' • ')
    );
  }

  /**
   * Renders all auditorium tiers, row labels, center aisle gap, and interactive seat buttons.
   */
  function renderSeatMap() {
    const container = document.getElementById('seat-map-container');
    if (!container) return;

    container.innerHTML = '';

    state.tiers.forEach((tier) => {
      const section = document.createElement('section');
      section.className = `tier-section ${tier.sectionClass}`;
      section.setAttribute('aria-label', `${tier.name} tier, ${formatPkr(tier.price)} per seat`);

      const header = document.createElement('div');
      header.className = 'tier-header';

      const titleWrap = document.createElement('div');
      titleWrap.className = 'tier-title-wrap';

      const tierName = document.createElement('h3');
      tierName.className = 'tier-name';
      tierName.textContent = tier.name;

      const tierRowsNote = document.createElement('span');
      tierRowsNote.className = 'tier-rows-note';
      tierRowsNote.textContent = tier.subtitle;

      titleWrap.append(tierName, tierRowsNote);

      const pricePill = document.createElement('span');
      pricePill.className = 'tier-price-pill';
      pricePill.textContent = `${formatPkr(tier.price)} / seat`;

      header.append(titleWrap, pricePill);
      section.appendChild(header);

      const rowsWrap = document.createElement('div');
      rowsWrap.className = 'tier-rows';

      tier.rows.forEach((rowObj) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'seat-row';

        const leftLabel = document.createElement('span');
        leftLabel.className = 'row-label';
        leftLabel.textContent = rowObj.rowLabel;

        const rightLabel = document.createElement('span');
        rightLabel.className = 'row-label';
        rightLabel.textContent = rowObj.rowLabel;

        const track = document.createElement('div');
        track.className = 'row-seats-track';

        rowObj.seats.forEach((seat, idx) => {
          if (idx === rowObj.aisleAfter) {
            const aisle = document.createElement('span');
            aisle.className = 'seat-aisle';
            aisle.setAttribute('aria-hidden', 'true');
            track.appendChild(aisle);
          }

          const isOccupied = state.occupiedSeats.has(seat.code);
          const isSelected = state.selectedSeats.includes(seat.code);

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `seat-btn ${seat.seatClass}`;
          if (isOccupied) btn.classList.add('is-occupied');
          if (isSelected) btn.classList.add('is-selected');

          btn.dataset.seatCode = seat.code;
          btn.textContent = String(seat.col);

          if (isOccupied) {
            btn.disabled = true;
            btn.setAttribute('aria-disabled', 'true');
            btn.setAttribute('aria-label', `Seat ${seat.code}, ${seat.tierName}, Occupied`);
          } else {
            btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            btn.setAttribute(
              'aria-label',
              `Seat ${seat.code}, ${seat.tierName}, ${formatPkr(seat.price)}, ${isSelected ? 'Selected' : 'Available'}`
            );
          }

          track.appendChild(btn);
        });

        rowEl.append(leftLabel, track, rightLabel);
        rowsWrap.appendChild(rowEl);
      });

      section.appendChild(rowsWrap);
      container.appendChild(section);
    });
  }

  /**
   * Synchronizes seat button classes/ARIA attributes without rebuilding the entire DOM.
   */
  function syncSeatButtons() {
    const selectedSet = new Set(state.selectedSeats);
    const buttons = document.querySelectorAll('#seat-map-container .seat-btn');
    buttons.forEach((btn) => {
      if (btn.disabled) return;
      const code = btn.dataset.seatCode;
      const isSelected = selectedSet.has(code);
      btn.classList.toggle('is-selected', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      const seat = state.seatLookup.get(code);
      if (seat) {
        btn.setAttribute(
          'aria-label',
          `Seat ${seat.code}, ${seat.tierName}, ${formatPkr(seat.price)}, ${isSelected ? 'Selected' : 'Available'}`
        );
      }
    });
  }

  /**
   * Updates the sticky Order Summary sidebar (seat badges, tier breakdown, ticket count, subtotal, CTA state).
   */
  function renderOrderSummary() {
    const sorted = sortSeatCodes(state.selectedSeats);
    state.selectedSeats = sorted;

    const badgesContainer = document.getElementById('selected-seat-badges');
    const ratioEl = document.getElementById('sidebar-seat-ratio');
    const breakdownEl = document.getElementById('tier-breakdown');
    const countEl = document.getElementById('summary-ticket-count');
    const subtotalEl = document.getElementById('summary-seat-subtotal');
    const checkoutBtn = document.getElementById('btn-proceed-checkout');

    if (ratioEl) {
      ratioEl.textContent = `${sorted.length} / ${MAX_SEATS}`;
    }

    if (badgesContainer) {
      badgesContainer.innerHTML = '';
      if (sorted.length === 0) {
        const hint = document.createElement('p');
        hint.className = 'no-seats-hint';
        hint.textContent = 'No seats selected yet. Click any available seat on the map.';
        badgesContainer.appendChild(hint);
      } else {
        sorted.forEach((code) => {
          const seat = state.seatLookup.get(code);
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'seat-badge-chip';
          chip.dataset.seatCode = code;
          chip.setAttribute(
            'aria-label',
            `Remove seat ${code} (${seat ? seat.tierName : ''})`
          );
          chip.title = seat ? `${seat.tierName} • ${formatPkr(seat.price)} (click to remove)` : 'Click to remove';

          const codeSpan = document.createElement('span');
          codeSpan.textContent = code;

          const removeSpan = document.createElement('span');
          removeSpan.className = 'seat-badge-remove';
          removeSpan.setAttribute('aria-hidden', 'true');
          removeSpan.textContent = '×';

          chip.append(codeSpan, removeSpan);
          badgesContainer.appendChild(chip);
        });
      }
    }

    // Build tier breakdown
    if (breakdownEl) {
      breakdownEl.innerHTML = '';
      if (sorted.length === 0) {
        breakdownEl.hidden = true;
      } else {
        const groups = new Map();
        sorted.forEach((code) => {
          const seat = state.seatLookup.get(code);
          if (!seat) return;
          const existing = groups.get(seat.tierId) || {
            name: seat.tierName,
            unitPrice: seat.price,
            count: 0,
          };
          existing.count += 1;
          groups.set(seat.tierId, existing);
        });

        groups.forEach((entry) => {
          const row = document.createElement('div');
          row.className = 'breakdown-row';

          const label = document.createElement('span');
          label.textContent = `${entry.count} × ${entry.name} (${formatPkr(entry.unitPrice)})`;

          const amount = document.createElement('span');
          amount.className = 'breakdown-amount';
          amount.textContent = formatPkr(entry.count * entry.unitPrice);

          row.append(label, amount);
          breakdownEl.appendChild(row);
        });

        breakdownEl.hidden = false;
      }
    }

    const subtotal = calculateSubtotal();
    if (countEl) countEl.textContent = String(sorted.length);
    if (subtotalEl) subtotalEl.textContent = formatPkr(subtotal);
    if (checkoutBtn) checkoutBtn.disabled = sorted.length === 0;
  }

  /**
   * Toggles a seat between Available and Selected, enforcing the 8-seat cap.
   * @param {string} code
   */
  function toggleSeat(code) {
    if (!code || state.occupiedSeats.has(code) || !state.seatLookup.has(code)) return;

    const existingIndex = state.selectedSeats.indexOf(code);
    if (existingIndex !== -1) {
      state.selectedSeats.splice(existingIndex, 1);
      showFeedback('');
    } else {
      if (state.selectedSeats.length >= MAX_SEATS) {
        showFeedback(`You can select up to ${MAX_SEATS} seats per reservation. Deselect a seat to choose another.`);
        return;
      }
      state.selectedSeats.push(code);
      showFeedback('');
    }

    syncSeatButtons();
    renderOrderSummary();
  }

  /**
   * Persists selected seats and seatSubtotal back to theatron_latest_booking and navigates to checkout.html.
   */
  function proceedToCheckout() {
    if (!state.booking || state.selectedSeats.length === 0) return;

    const sortedSeats = sortSeatCodes(state.selectedSeats);
    const seatSubtotal = calculateSubtotal();

    const updatedBooking = {
      ...state.booking,
      seats: sortedSeats,
      seatSubtotal,
      timestamp: new Date().toISOString(),
    };

    if (T && typeof T.writeStorage === 'function') {
      T.writeStorage(LATEST_KEY, updatedBooking);
    } else {
      try {
        localStorage.setItem(LATEST_KEY, JSON.stringify(updatedBooking));
      } catch {
        // Ignore storage errors
      }
    }

    window.location.href = 'checkout.html';
  }

  /**
   * Binds interactive listeners on the seat map, sidebar badges, and checkout button.
   */
  function bindEvents() {
    const mapContainer = document.getElementById('seat-map-container');
    if (mapContainer) {
      mapContainer.addEventListener('click', (event) => {
        const seatBtn = event.target.closest('.seat-btn');
        if (!seatBtn || seatBtn.disabled) return;
        toggleSeat(seatBtn.dataset.seatCode);
      });
    }

    const badgesContainer = document.getElementById('selected-seat-badges');
    if (badgesContainer) {
      badgesContainer.addEventListener('click', (event) => {
        const chip = event.target.closest('.seat-badge-chip');
        if (!chip) return;
        toggleSeat(chip.dataset.seatCode);
      });
    }

    const checkoutBtn = document.getElementById('btn-proceed-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', proceedToCheckout);
    }
  }

  /**
   * Initializes the Seat Selection page from localStorage draft state.
   */
  function initSeatSelection() {
    const storedBookings = T && typeof T.readStorage === 'function' ? T.readStorage(BOOKINGS_KEY) : null;
    const bookings = Array.isArray(storedBookings) ? storedBookings : [];

    let latestBooking = null;
    if (T && typeof T.readStorage === 'function') {
      latestBooking = T.readStorage(LATEST_KEY);
    } else {
      try {
        const raw = localStorage.getItem(LATEST_KEY);
        latestBooking = raw ? JSON.parse(raw) : null;
      } catch {
        latestBooking = null;
      }
    }

    if (T && typeof T.updateNavbarState === 'function') {
      T.updateNavbarState(bookings, latestBooking && latestBooking.patron);
    }

    const emptyStateEl = document.getElementById('empty-booking-state');
    const workspaceEl = document.getElementById('seat-workspace');

    const hasValidBooking =
      latestBooking &&
      typeof latestBooking === 'object' &&
      typeof latestBooking.movieTitle === 'string' &&
      latestBooking.movieTitle.trim().length > 0;

    if (!hasValidBooking) {
      if (emptyStateEl) emptyStateEl.hidden = false;
      if (workspaceEl) workspaceEl.hidden = true;
      return;
    }

    state.booking = latestBooking;
    state.basePricePkr = normalizeBasePricePkr(latestBooking.pricePerSeat);

    buildSeatCatalog();
    buildOccupiedSeats(latestBooking);

    if (emptyStateEl) emptyStateEl.hidden = true;
    if (workspaceEl) workspaceEl.hidden = false;

    renderScreeningBanner(latestBooking);
    renderSeatMap();
    renderOrderSummary();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', initSeatSelection);
})();
