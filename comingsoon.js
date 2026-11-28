/* ==========================================================================
   THEATRON CINEMA LOUNGES — Coming Soon Interactive Controller
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // Curated Upcoming Premieres Dataset
  // ------------------------------------------------------------------------
  const PREMIERES = [
    {
      id: 'dynasty-of-glass',
      detailId: 'dynasty-glass',
      title: 'DYNASTY OF GLASS',
      genre: 'Drama',
      meta: 'English • 2h 35m • R',
      synopsis:
        'An architectural dynasty fractures over succession rights when their flagship Manhattan tower unveils an unprecedented private vault.',
      director: 'Eleanor Sterling',
      cast: 'Sebastian Cross, Genevieve Hart, Miles Sterling',
      releaseDate: 'Fri, Dec 18, 2026',
      remainingSeconds: 28 * 86400 + 14 * 3600 + 42,
      reminderActive: true,
      formatSpec: 'IMAX Dual-Laser 1.90:1 • Dolby Atmos',
      screeningNotes:
        'Opening night gala features a live architectural foreword and vintage Krug Brut reception in the Fifth Avenue Mezzanine Salon.',
      posterImage: 'posters/dynasty-glass.jpg',
    },
    {
      id: 'mirage-of-kings',
      detailId: 'mirage-kings',
      title: 'MIRAGE OF KINGS',
      genre: 'Action',
      meta: 'Arabic • 2h 11m • PG-13',
      synopsis:
        'An antiquities investigator races across ancient caravan routes to protect an astrolabe capable of unlocking a sunken Nabataean treasury.',
      director: 'Tariq Al-Jamil',
      cast: 'Zayd Haddad, Layla Mansour, Omar Farooq',
      releaseDate: 'Fri, Jan 15, 2027',
      remainingSeconds: 52 * 86400 + 14 * 3600 + 19,
      reminderActive: false,
      formatSpec: '70mm Large Format • 128-Channel Atmos',
      screeningNotes:
        'Shot on 65mm large-format stock across Petra and Wadi Rum; paired with food and drink selections for VIP Gold members.',
      posterImage: 'posters/mirage-kings.jpg',
    },
    {
      id: 'nocturne-in-vienna',
      detailId: 'nocturne-obsidian',
      title: 'NOCTURNE IN VIENNA',
      genre: 'Thriller',
      meta: 'German • 2h 18m • R',
      synopsis:
        'During a snowbound winter festival at the Musikverein, a celebrated conductor discovers a hidden cipher woven into an unperformed Mahler manuscript.',
      director: 'Lukas Von Berg',
      cast: 'Clara Lindholm, Anton Weber, Sofia Moretti',
      releaseDate: 'Fri, Feb 12, 2027',
      remainingSeconds: 78 * 86400 + 19 * 3600 + 55,
      reminderActive: true,
      formatSpec: '4K Dual-Laser • Custom Acoustic Suite Profile',
      screeningNotes:
        'Mastered specifically for THEATRON’s 0.28s RT60 maroon velvet auditoriums to preserve whispered string harmonics and hall resonance.',
      posterImage: 'posters/nocturne-obsidian.jpg',
    },
    {
      id: 'the-obsidian-meridian',
      detailId: 'ninth-monolith',
      title: 'THE OBSIDIAN MERIDIAN',
      genre: 'Sci-Fi',
      meta: 'English • 2h 44m • PG-13',
      synopsis:
        'Aboard an orbital observatory stationed above the solar terminator, an astrophysicist intercepts a recurring geometric signal predating human civilization.',
      director: 'Julian Mercer',
      cast: 'Elena Vance, Idris Thorne, Kenji Sato',
      releaseDate: 'Fri, Mar 19, 2027',
      remainingSeconds: 113 * 86400 + 20 * 3600 + 8,
      reminderActive: false,
      formatSpec: 'IMAX Dual-Laser 1.43:1 • Sub-Bass Tactile Array',
      screeningNotes:
        'Includes 42 minutes of expanded 1.43:1 orbital sequences calibrated at 22 foot-lamberts for pure obsidian-black space contrast.',
      posterImage: 'posters/ninth-monolith.jpg',
    },
  ];

  // ------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------
  let activeFilter = 'All Premieres';
  let searchQuery = '';

  // ------------------------------------------------------------------------
  // Utilities & Toast
  // ------------------------------------------------------------------------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatCountdownParts(totalSeconds) {
    const safe = Math.max(0, totalSeconds);
    const days = Math.floor(safe / 86400);
    const hours = Math.floor((safe % 86400) / 3600);
    const secs = safe % 60;
    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  }

  function showToast(title, detail) {
    const region = document.getElementById('toastRegion');
    if (!region) return;

    const toast = document.createElement('div');
    toast.className =
      'toast-item pointer-events-auto flex items-start gap-3 rounded-2xl border border-[#D4AF6A]/45 bg-[#181516]/95 px-4 py-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.6)] backdrop-blur-md';

    toast.innerHTML = `
      <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#8A2B3B] bg-[#3D141B] text-[#D4AF6A]">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[#F5F2EB]">${escapeHtml(title)}</p>
        ${detail ? `<p class="mt-0.5 text-xs text-[#9E9895]">${escapeHtml(detail)}</p>` : ''}
      </div>
    `;

    region.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 3400);
  }

  // ------------------------------------------------------------------------
  // 1. Navigation & Mobile Drawer
  // ------------------------------------------------------------------------
  function initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileNavDrawer');
    const iconOpen = document.getElementById('mobileMenuIconOpen');
    const iconClose = document.getElementById('mobileMenuIconClose');

    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = drawer.classList.toggle('hidden');
        mobileBtn.setAttribute('aria-expanded', String(!isHidden));
        iconOpen.classList.toggle('hidden', !isHidden);
        iconClose.classList.toggle('hidden', isHidden);
      });
    }

    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', () => {
        if (drawer && !drawer.classList.contains('hidden')) {
          drawer.classList.add('hidden');
          mobileBtn?.setAttribute('aria-expanded', 'false');
          iconOpen?.classList.remove('hidden');
          iconClose?.classList.add('hidden');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Live Reminder Counter & Filter Controls
  // ------------------------------------------------------------------------
  function updateReminderCounter() {
    const count = PREMIERES.filter((p) => p.reminderActive).length;
    const label = document.getElementById('reminderCountLabel');
    const pill = document.getElementById('reminderStatusPill');

    if (label) {
      label.textContent = `${count} Active Reminder(s)`;
    }
    if (pill) {
      pill.classList.toggle('status-pill-active', activeFilter === 'Active Reminders Only');
    }
  }

  function syncFilterPillsUi() {
    document.querySelectorAll('#genreFilterPills .filter-pill').forEach((btn) => {
      const isMatch = btn.getAttribute('data-filter') === activeFilter;
      btn.classList.toggle('filter-pill-active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });
    updateReminderCounter();
  }

  function getFilteredPremieres() {
    return PREMIERES.filter((film) => {
      if (activeFilter === 'Drama' && film.genre !== 'Drama') return false;
      if (activeFilter === 'Action' && film.genre !== 'Action') return false;
      if (activeFilter === 'Sci-Fi / Thriller' && film.genre !== 'Sci-Fi' && film.genre !== 'Thriller') {
        return false;
      }
      if (activeFilter === 'Active Reminders Only' && !film.reminderActive) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const haystack = `${film.title} ${film.director} ${film.cast} ${film.genre}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  // ------------------------------------------------------------------------
  // 3. Render Horizontal Premiere Cards Stack
  // ------------------------------------------------------------------------
  function renderPremieres() {
    const stack = document.getElementById('premieresStack');
    if (!stack) return;

    const list = getFilteredPremieres();

    if (list.length === 0) {
      stack.innerHTML = `
        <div class="luxury-card p-10 text-center">
          <p class="eyebrow">EARLY TICKET ALERTS</p>
          <h2 class="mt-2 font-serif text-xl uppercase tracking-[0.14em] text-[#F5F2EB]">
            NO PREMIERES MATCH YOUR FILTER
          </h2>
          <p class="mt-2 text-sm text-[#9E9895]">
            Clear your search query or switch back to All Premieres to inspect the complete 2026–2027 gala calendar.
          </p>
          <button
            id="clearFiltersBtn"
            type="button"
            class="mt-5 inline-flex items-center justify-center rounded-xl bg-[#D4AF6A] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#121011] transition hover:bg-[#e2c282]"
          >
            Show All Premieres
          </button>
        </div>
      `;
      document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
        activeFilter = 'All Premieres';
        searchQuery = '';
        const searchEl = document.getElementById('premiereSearchInput');
        if (searchEl) searchEl.value = '';
        syncFilterPillsUi();
        renderPremieres();
      });
      return;
    }

    stack.innerHTML = list
      .map((film) => {
        const cd = formatCountdownParts(film.remainingSeconds);
        const btnClass = film.reminderActive ? 'btn-reminder-active' : 'btn-reminder-inactive';
        const btnContent = film.reminderActive
          ? `<span>&#10003; Reminder Enabled</span>`
          : `<span class="inline-flex items-center justify-center gap-2">
               <svg class="h-3.5 w-3.5 text-[#D4AF6A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                 <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
               </svg>
               <span>Notify Me</span>
             </span>`;

        return `
          <article class="luxury-card p-6 md:p-8" data-film-id="${film.id}">
            <div class="grid grid-cols-1 items-center gap-7 lg:grid-cols-12">
              <!-- Left Zone: Bespoke Vertical Art-Deco Poster Frame -->
              <div class="lg:col-span-3">
                <button
                  type="button"
                  data-poster-open="${film.id}"
                  class="artdeco-poster block aspect-[3/4] w-full max-w-[230px] mx-auto lg:max-w-none text-left focus:outline-none"
                  aria-label="Open 4K Teaser Reel and Screening Notes for ${escapeHtml(film.title)}"
                >
                  <div class="artdeco-poster-inner">
                    <div class="flex items-center justify-between">
                      <span class="text-[9.5px] font-semibold uppercase tracking-[0.26em] text-[#D4AF6A]">
                        PREMIERE
                      </span>
                      <span class="h-1.5 w-1.5 rounded-full bg-[#D4AF6A]/80"></span>
                    </div>

                    <div class="-mx-[0.9rem] min-h-0 flex-1 overflow-hidden bg-[#121011]">
                      <img
                        src="${escapeHtml(film.posterImage)}"
                        alt="${escapeHtml(film.title)} movie poster"
                        class="h-full w-full object-contain p-1"
                        loading="lazy"
                      />
                    </div>

                    <div class="border-t border-[rgba(212,175,106,0.22)] pt-2.5 text-center">
                      <p class="font-serif text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
                        ${escapeHtml(film.title)}
                      </p>
                      <p class="mt-1 text-[8.5px] uppercase tracking-[0.22em] text-[#9E9895]">
                        THEATRON PRESENTATION
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <!-- Center Zone: Film Metadata, Synopsis & Credits -->
              <div class="lg:col-span-5">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="rounded-full border border-[#8A2B3B] bg-[#3D141B] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF6A]">
                    ${escapeHtml(film.genre)}
                  </span>
                  <span class="text-xs tracking-wide text-[#9E9895]">
                    ${escapeHtml(film.meta)}
                  </span>
                </div>

                <h2 class="mt-4 font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-[#F5F2EB] sm:text-[26px]">
                  ${escapeHtml(film.title)}
                </h2>

                <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-[#9E9895]">
                  ${escapeHtml(film.synopsis)}
                </p>

                <p class="mt-4 text-xs leading-relaxed text-[#9E9895]">
                  <span>Director:</span>
                  <span class="font-semibold text-[#D4AF6A]">${escapeHtml(film.director)}</span>
                  <span class="mx-1.5">&bull;</span>
                  <span>Cast:</span>
                  <span class="text-[#F5F2EB]">${escapeHtml(film.cast)}</span>
                </p>

                <button
                  type="button"
                  data-poster-open="${film.id}"
                  class="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF6A] transition hover:text-[#F5F2EB]"
                >
                  <span>4K Teaser &amp; Screening Notes</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>

              <!-- Right Zone: Premiere Countdown Box & Priority Reminder Toggle -->
              <div class="lg:col-span-4">
                <div class="rounded-xl border border-[rgba(212,175,106,0.18)] bg-[#131011] p-5">
                  <p class="eyebrow">PREMIERE COUNTDOWN</p>

                  <div class="mt-3.5 grid grid-cols-3 gap-2.5">
                    <div class="countdown-tile">
                      <span data-cd-days="${film.id}" class="block font-mono text-xl font-bold tracking-wider text-[#F5F2EB]">
                        ${cd.days}
                      </span>
                      <span class="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9E9895]">
                        DAYS
                      </span>
                    </div>
                    <div class="countdown-tile">
                      <span data-cd-hours="${film.id}" class="block font-mono text-xl font-bold tracking-wider text-[#F5F2EB]">
                        ${cd.hours}
                      </span>
                      <span class="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9E9895]">
                        HOURS
                      </span>
                    </div>
                    <div class="countdown-tile">
                      <span data-cd-secs="${film.id}" class="block font-mono text-xl font-bold tracking-wider text-[#D4AF6A]">
                        ${cd.secs}
                      </span>
                      <span class="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9E9895]">
                        SECS
                      </span>
                    </div>
                  </div>

                  <p class="mt-4 text-xs text-[#9E9895]">
                    Release: <span class="font-semibold text-[#F5F2EB]">${escapeHtml(film.releaseDate)}</span>
                  </p>

                  <button
                    type="button"
                    data-toggle-reminder="${film.id}"
                    class="mt-4 flex w-full items-center justify-center rounded-xl px-4 py-3 text-xs uppercase tracking-[0.15em] transition ${btnClass}"
                  >
                    ${btnContent}
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    // Wire Poster / Screening Notes Modal Triggers
    stack.querySelectorAll('[data-poster-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-poster-open');
        const film = PREMIERES.find((p) => p.id === id);
        if (film) openTeaserModal(film);
      });
    });

    // Wire Reminder Toggle Buttons
    stack.querySelectorAll('[data-toggle-reminder]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-toggle-reminder');
        const film = PREMIERES.find((p) => p.id === id);
        if (!film) return;

        film.reminderActive = !film.reminderActive;
        updateReminderCounter();
        renderPremieres();

        if (film.reminderActive) {
          showToast('Priority Reminder Enabled', `${film.title} added to your VIP Gold alert queue.`);
        } else {
          showToast('Reminder Disabled', `Removed ${film.title} from priority opening-night alerts.`);
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Live 1-Second Countdown Ticker
  // ------------------------------------------------------------------------
  function startCountdownTicker() {
    setInterval(() => {
      PREMIERES.forEach((film) => {
        if (film.remainingSeconds > 0) {
          film.remainingSeconds -= 1;
        }
        const cd = formatCountdownParts(film.remainingSeconds);
        const daysEl = document.querySelector(`[data-cd-days="${film.id}"]`);
        const hoursEl = document.querySelector(`[data-cd-hours="${film.id}"]`);
        const secsEl = document.querySelector(`[data-cd-secs="${film.id}"]`);
        if (daysEl) daysEl.textContent = cd.days;
        if (hoursEl) hoursEl.textContent = cd.hours;
        if (secsEl) secsEl.textContent = cd.secs;
      });
    }, 1000);
  }

  // ------------------------------------------------------------------------
  // 5. Filter & Search Initialization
  // ------------------------------------------------------------------------
  function initFiltersAndSearch() {
    const pills = document.querySelectorAll('#genreFilterPills .filter-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        activeFilter = pill.getAttribute('data-filter') || 'All Premieres';
        syncFilterPillsUi();
        renderPremieres();
      });
    });

    const statusPill = document.getElementById('reminderStatusPill');
    statusPill?.addEventListener('click', () => {
      activeFilter =
        activeFilter === 'Active Reminders Only' ? 'All Premieres' : 'Active Reminders Only';
      syncFilterPillsUi();
      renderPremieres();
    });

    const searchInput = document.getElementById('premiereSearchInput');
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value || '';
      renderPremieres();
    });
  }

  // ------------------------------------------------------------------------
  // 6. Modals (4K Teaser Reel, Tickets, Profile, Admin)
  // ------------------------------------------------------------------------
  function openModal(eyebrow, title, bodyHtml) {
    const modal = document.getElementById('premiereModal');
    if (!modal) return;
    document.getElementById('premiereModalEyebrow').textContent = eyebrow;
    document.getElementById('premiereModalTitle').textContent = title;
    document.getElementById('premiereModalBody').innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    const modal = document.getElementById('premiereModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function openTeaserModal(film) {
    const detailId = film.detailId || film.id;
    openModal(
      `4K TEASER REEL & SCREENING NOTES • ${film.genre.toUpperCase()}`,
      film.title,
      `
        <div class="space-y-4">
          <div class="relative overflow-hidden rounded-xl border border-[rgba(212,175,106,0.28)] bg-[#121011] p-6">
            <div class="flex flex-col items-center justify-center py-4 text-center">
              <img src="${film.posterImage}" alt="${escapeHtml(film.title)} poster" class="mx-auto h-auto max-h-[320px] w-auto max-w-[240px] rounded-lg" />
              <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4AF6A]">
                4K DUAL-LASER MASTER PREVIEW • ${escapeHtml(film.formatSpec)}
              </p>
              <p class="mt-1 text-xs text-[#9E9895]">
                Directed by ${escapeHtml(film.director)} &bull; Release ${escapeHtml(film.releaseDate)}
              </p>
            </div>
          </div>

          <p class="text-sm leading-relaxed text-[#F5F2EB]">
            ${escapeHtml(film.synopsis)}
          </p>

          <div class="rounded-xl border border-[rgba(212,175,106,0.16)] bg-[#121011] p-4 text-xs">
            <p class="eyebrow">CURATORIAL SCREENING NOTES</p>
            <p class="mt-1.5 leading-relaxed text-[#9E9895]">${escapeHtml(film.screeningNotes)}</p>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              id="moreDetailsModalBtn"
              type="button"
              data-more-details="${escapeHtml(detailId)}"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF6A] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#121011] transition hover:bg-[#e2c282]"
            >
              <span>More Details</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      `
    );

    const moreDetailsBtn = document.getElementById('moreDetailsModalBtn');
    moreDetailsBtn?.addEventListener('click', () => {
      window.location.href = `movie-details.html?id=${encodeURIComponent(detailId)}`;
    });
  }

  function initModals() {
    const modal = document.getElementById('premiereModal');
    const closeBtn = document.getElementById('closePremiereModalBtn');

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    const showTickets = () =>
      openModal(
        'MY TICKETS (2 ACTIVE)',
        'ALEXANDER VANCE — PASSES',
        `
          <div class="space-y-3">
            <div class="rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4">
              <div class="flex items-center justify-between text-xs">
                <span class="font-mono font-semibold text-[#D4AF6A]">THT-2026-89</span>
                <span class="text-emerald-400">Confirmed • Luxury Recliner Seat B4</span>
              </div>
              <p class="mt-1.5 font-serif text-sm text-[#F5F2EB]">NOCTURNE IN OBSIDIAN (70mm Director’s Cut)</p>
              <p class="mt-1 text-xs text-[#9E9895]">IMAX Dual-Laser • Tonight 8:30 PM</p>
            </div>
            <div class="rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4">
              <div class="flex items-center justify-between text-xs">
                <span class="font-mono font-semibold text-[#D4AF6A]">THT-2026-14</span>
                <span class="text-emerald-400">Confirmed • Sovereign Loge A2</span>
              </div>
              <p class="mt-1.5 font-serif text-sm text-[#F5F2EB]">THE GLASS CONSERVATORY (Gala Premiere)</p>
              <p class="mt-1 text-xs text-[#9E9895]">Dolby Atmos Salon • Tomorrow 9:15 PM</p>
            </div>
          </div>
        `
      );

    const showProfile = () =>
      openModal(
        'VIP GOLD MEMBERSHIP',
        'ALEXANDER VANCE',
        `
          <div class="flex items-center gap-4 rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4">
            <span class="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF6A]/60 bg-[#3D141B] font-serif text-lg font-semibold text-[#D4AF6A]">A</span>
            <div>
              <p class="font-serif text-base text-[#F5F2EB]">Alexander Vance</p>
              <p class="text-xs text-[#D4AF6A]">Member ID: SG-88412 • 72-Hour Gala Priority Enabled</p>
            </div>
          </div>
        `
      );

    document.getElementById('ticketsBtn')?.addEventListener('click', showTickets);
    document.getElementById('profileBtn')?.addEventListener('click', showProfile);

    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'tickets') return showTickets();
        if (action === 'profile') return showProfile();
        const labels = {
          signin: ['Member Sign In', 'Currently signed in as Alexander Vance (VIP Gold).'],
          apply: ['VIP Gold Membership', 'Visit About Us or Help & Contact to submit a membership request.'],
          architecture: ['18-Page Architecture', 'THEATRON Flagship Specification v2026.4 loaded.'],
          privacy: ['Privacy Policy', 'Your reservation details and personal information are kept private.'],
          terms: ['Terms of Admission', 'Auditorium etiquette, quiet-service charter & suite policy.'],
        };
        const [title, detail] = labels[action] || ['THEATRON', 'Action acknowledged.'];
        showToast(title, detail);
      });
    });
  }

  // ------------------------------------------------------------------------
  // Bootstrap
  // ------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFiltersAndSearch();
    initModals();
    updateReminderCounter();
    renderPremieres();
    startCountdownTicker();
  });
})();
