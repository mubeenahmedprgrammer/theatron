/* ==========================================================================
   THEATRON CINEMA LOUNGES — Help & Contact Interactive Controller
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // Data Stores: Ticket Vault Demo Records & Curated Patron FAQs
  // ------------------------------------------------------------------------
  const TICKET_VAULT = {
    'THT-2026-89': {
      id: 'THT-2026-89',
      status: 'Confirmed • Luxury Recliner Seat B4',
      film: 'NOCTURNE IN OBSIDIAN (70mm Director’s Cut)',
      format: 'IMAX Dual-Laser',
      showtime: 'Tonight • 8:30 PM',
      flagship: 'Manhattan — Fifth Avenue Flagship',
      seats: 'Luxury Recliner Seat B4 (2 Seats)',
      valetStatus: 'VIP Valet Drop-Off Bay 2 Reserved',
      posterLabel: 'IMAX LASER',
    },
    'THT-2026-14': {
      id: 'THT-2026-14',
      status: 'Confirmed • VIP Lounge Seat A2',
      film: 'THE GLASS CONSERVATORY (Gala Premiere)',
      format: 'Dolby Atmos Salon',
      showtime: 'Tomorrow • 9:15 PM',
      flagship: 'London — Mayfair House',
      seats: 'VIP Lounge Seat A2 (2 Seats)',
      valetStatus: 'VIP Valet Drop-Off Requested',
      posterLabel: 'DOLBY ATMOS',
    },
  };

  const FAQ_ITEMS = [
    {
      id: 'faq-1',
      category: 'Tickets & Refunds',
      question: 'Can I change or refund my Luxury Recliner Seat tickets before the movie?',
      answer:
        'Luxury Recliner Seat and VIP Lounge bookings can be changed, moved to another showtime, or refunded in full up to 2 hours before the movie starts. Within 2 hours of showtime, call our 24/7 Box Office Support and we will help move your seats to another showing that evening whenever available.',
    },
    {
      id: 'faq-2',
      category: 'In-Seat Food & Drinks',
      question: 'How does quiet in-seat food and drink delivery work during the movie?',
      answer:
        'Each armrest has a gentle call button that silently notifies our kitchen and server team. Orders placed before trailers end are brought quietly through side walkways without blocking anyone’s view. Drink refills and snacks are served softly by our staff throughout the film.',
    },
    {
      id: 'faq-3',
      category: 'VIP Gold Membership',
      question: 'What are the perks of VIP Gold Membership and how do I join?',
      answer:
        'VIP Gold Membership gives you 72-hour early access to opening-night tickets, complimentary VIP Valet Drop-Off, special food & drink perks, and free ticket changes at our Manhattan, Beverly Hills, London, and Dubai cinema locations. You can apply anytime using the form above.',
    },
    {
      id: 'faq-4',
      category: 'Screen & Sound Tech',
      question: 'What makes THEATRON’s Dual-Laser IMAX screens and maroon velvet rooms special?',
      answer:
        'Every theater pairs ultra-bright 4K Dual-Laser projection with custom soundproof maroon velvet walls that block outside noise and eliminate echo. Combined with Dolby Atmos surround sound, every whisper and action scene sounds crystal clear.',
    },
    {
      id: 'faq-5',
      category: 'Tickets & Refunds',
      question: 'Is there a dress code or recommended arrival time for special premieres?',
      answer:
        'For regular movie nights, smart casual evening attire is great. For opening-night premieres and special Q&A screenings, cocktail or smart evening wear is encouraged. We recommend arriving 35 minutes early to relax in the lounge and enjoy pre-movie snacks and drinks.',
    },
    {
      id: 'faq-6',
      category: 'VIP Gold Membership',
      question: 'How does VIP Valet Drop-Off work at your cinema locations?',
      answer:
        'Our VIP Valet Drop-Off lanes are open 24/7 for quick, effortless arrival. VIP Gold Membership guests and Luxury Recliner Seat ticket holders get priority curbside service—just tap "Request Valet" in My Tickets about 15 minutes before the movie ends.',
    },
  ];

  // Placeholder film poster SVG generator (zero broken images)
  function createPosterSvgDataUri(badgeText) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240">
      <defs>
        <linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3D141B"/>
          <stop offset="55%" stop-color="#181516"/>
          <stop offset="100%" stop-color="#121011"/>
        </linearGradient>
      </defs>
      <rect width="180" height="240" rx="10" fill="url(#pbg)"/>
      <rect x="10" y="10" width="160" height="220" rx="6" fill="none" stroke="#D4AF6A" stroke-opacity="0.38" stroke-width="1"/>
      <circle cx="90" cy="95" r="34" fill="none" stroke="#D4AF6A" stroke-opacity="0.55" stroke-width="1.2"/>
      <text x="90" y="102" text-anchor="middle" fill="#D4AF6A" font-family="Georgia, serif" font-size="22">T</text>
      <text x="90" y="165" text-anchor="middle" fill="#F5F2EB" font-family="Georgia, serif" font-size="10" letter-spacing="2.5">THEATRON</text>
      <text x="90" y="184" text-anchor="middle" fill="#D4AF6A" font-family="sans-serif" font-size="8" letter-spacing="2">${badgeText}</text>
      <text x="90" y="210" text-anchor="middle" fill="#9E9895" font-family="sans-serif" font-size="7" letter-spacing="1.2">POSTER PLACEHOLDER</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // ------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------
  let selectedCategory = 'Ticket & Seat Changes';
  let activeFaqFilter = 'All Topics';
  const openFaqIds = new Set(['faq-1']);

  // ------------------------------------------------------------------------
  // Toast Notifications
  // ------------------------------------------------------------------------
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

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
      link.addEventListener('click', (e) => {
        const targetName = link.getAttribute('data-nav');
        if (targetName === 'About Us' || targetName === 'Coming Soon') {
          return; // Allow real page navigation
        }
        if (targetName !== 'Help & Contact') {
          e.preventDefault();
          showToast(`Navigating to ${targetName}`, 'Currently viewing Help & Contact — Customer Support & Box Office.');
        }

        // Update active visual highlight across desktop & mobile navs
        document.querySelectorAll('[data-nav]').forEach((el) => {
          const matches = el.getAttribute('data-nav') === targetName;
          el.classList.toggle('nav-link-active', matches);
          if (matches) {
            el.setAttribute('aria-current', 'page');
          } else {
            el.removeAttribute('aria-current');
          }
        });

        if (drawer && !drawer.classList.contains('hidden')) {
          drawer.classList.add('hidden');
          mobileBtn.setAttribute('aria-expanded', 'false');
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Copy-to-Clipboard Support Channels
  // ------------------------------------------------------------------------
  async function copyText(text) {
    if (!text) return false;

    if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        // Fall through to execCommand fallback
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('aria-hidden', 'true');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }
    textarea.remove();
    return ok;
  }

  function initCopyButtons() {
    const triggerCopy = async (btn, valueToCopy, label) => {
      const copied = await copyText(valueToCopy);
      const labelSpan = btn?.querySelector('span');

      if (copied) {
        showToast('Copied to Clipboard', `${label}: ${valueToCopy}`);
        if (btn && labelSpan) {
          const originalText = btn.dataset.originalText || labelSpan.textContent;
          btn.dataset.originalText = originalText;

          if (btn._copyTimer) {
            clearTimeout(btn._copyTimer);
          }

          labelSpan.textContent = 'Copied to Clipboard';
          btn.classList.add('copy-btn-copied');
          btn._copyTimer = setTimeout(() => {
            labelSpan.textContent = originalText;
            btn.classList.remove('copy-btn-copied');
            btn._copyTimer = null;
          }, 1800);
        }
      } else {
        showToast('Copy Unavailable', `Please copy manually: ${valueToCopy}`);
      }
    };

    document.querySelectorAll('.copy-btn').forEach((btn) => {
      const labelSpan = btn.querySelector('span');
      if (labelSpan) {
        btn.dataset.originalText = labelSpan.textContent;
      }

      btn.addEventListener('click', () => {
        const valueToCopy = (btn.getAttribute('data-copy') || '').trim();
        const label = btn.getAttribute('data-label') || 'Concierge contact';
        triggerCopy(btn, valueToCopy, label);
      });
    });

    document.querySelectorAll('.copy-email-text[data-copy]').forEach((el) => {
      el.addEventListener('click', () => {
        const valueToCopy = (el.getAttribute('data-copy') || el.textContent || '').trim();
        const label = el.getAttribute('data-label') || 'Email address';
        const cardBtn = el.parentElement?.querySelector('.copy-btn') || null;
        triggerCopy(cardBtn, valueToCopy, label);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Send Us a Message Form
  // ------------------------------------------------------------------------
  function initConciergeForm() {
    const pillsContainer = document.getElementById('categoryPills');
    const form = document.getElementById('conciergeForm');
    const confirmation = document.getElementById('conciergeConfirmation');
    const errorEl = document.getElementById('formErrorMsg');
    const resetBtn = document.getElementById('resetConciergeFormBtn');

    if (pillsContainer) {
      pillsContainer.querySelectorAll('.category-pill').forEach((pill) => {
        pill.addEventListener('click', () => {
          selectedCategory = pill.getAttribute('data-category') || selectedCategory;
          pillsContainer.querySelectorAll('.category-pill').forEach((p) => {
            const isActive = p === pill;
            p.classList.toggle('category-pill-active', isActive);
            p.setAttribute('aria-checked', String(isActive));
          });
        });
      });
    }

    if (form && confirmation) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('patronName').value.trim();
        const email = document.getElementById('patronEmail').value.trim();
        const location = document.getElementById('flagshipLocation').value;
        const message = document.getElementById('conciergeMessage').value.trim();

        if (!name || !email || !email.includes('@') || !message) {
          errorEl.textContent =
            'Please enter your name, a valid email address, and your message before sending.';
          errorEl.classList.remove('hidden');
          return;
        }

        errorEl.classList.add('hidden');
        const dossierNumber = Math.floor(1000 + Math.random() * 9000);
        const dossierId = `#THT-CON-${dossierNumber}`;

        document.getElementById('dossierRefId').textContent = dossierId;
        document.getElementById('confirmLocation').textContent = location;
        document.getElementById('confirmPatron').textContent = `${name} (${email})`;
        document.getElementById('confirmCategory').textContent = selectedCategory;
        document.getElementById('confirmSnippet').textContent =
          message.length > 140 ? `"${message.slice(0, 140)}…"` : `"${message}"`;

        form.classList.add('hidden');
        confirmation.classList.remove('hidden');
        showToast('Message Sent', `Support Request ID ${dossierId} assigned to our team.`);
      });
    }

    if (resetBtn && form && confirmation) {
      resetBtn.addEventListener('click', () => {
        document.getElementById('conciergeMessage').value = '';
        confirmation.classList.add('hidden');
        form.classList.remove('hidden');
      });
    }
  }

  // ------------------------------------------------------------------------
  // 4. Instant Reservation Lookup
  // ------------------------------------------------------------------------
  function renderTicketLookup(bookingIdRaw) {
    const resultContainer = document.getElementById('ticketLookupResult');
    if (!resultContainer) return;

    const normalized = bookingIdRaw.trim().toUpperCase();
    const record = TICKET_VAULT[normalized];

    // Sync active chip styling
    document.querySelectorAll('[data-booking-chip]').forEach((chip) => {
      const chipId = chip.getAttribute('data-booking-chip');
      chip.classList.toggle('vault-chip-active', chipId === normalized);
    });

    if (!record) {
      resultContainer.innerHTML = `
        <div class="py-2 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF6A]">Booking Not Found</p>
          <p class="mt-1.5 text-xs text-[#9E9895]">
            No active ticket matched <span class="font-mono text-[#F5F2EB]">${escapeHtml(normalized || 'EMPTY')}</span>.
            Try sample IDs <span class="font-mono text-[#D4AF6A]">THT-2026-89</span> or <span class="font-mono text-[#D4AF6A]">THT-2026-14</span>.
          </p>
        </div>
      `;
      return;
    }

    resultContainer.innerHTML = `
      <div class="flex gap-3.5">
        <img
          src="${createPosterSvgDataUri(record.posterLabel)}"
          alt="${escapeHtml(record.film)} Placeholder Poster"
          class="h-24 w-[72px] shrink-0 rounded-lg border border-[rgba(212,175,106,0.28)] object-cover"
        />
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full border border-[#8A2B3B] bg-[#3D141B] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF6A]">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              ${escapeHtml(record.status)}
            </span>
          </div>
          <h3 class="mt-2 truncate font-serif text-sm font-semibold tracking-wider text-[#F5F2EB]">
            ${escapeHtml(record.film)}
          </h3>
          <p class="mt-1 text-xs text-[#9E9895]">
            <span class="text-[#D4AF6A]">${escapeHtml(record.format)}</span> • ${escapeHtml(record.showtime)}
          </p>
          <p class="mt-0.5 truncate text-[11px] text-[#9E9895]">
            ${escapeHtml(record.flagship)}
          </p>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-3.5">
        <button
          type="button"
          data-vault-action="modify"
          data-vault-id="${escapeHtml(record.id)}"
          class="rounded-lg border border-[rgba(212,175,106,0.3)] bg-[#181516] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5F2EB] transition hover:border-[#D4AF6A] hover:text-[#D4AF6A]"
        >
          Modify Seats
        </button>
        <button
          type="button"
          data-vault-action="valet"
          data-vault-id="${escapeHtml(record.id)}"
          class="rounded-lg border border-[#8A2B3B] bg-[#3D141B] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF6A] transition hover:border-[#D4AF6A] hover:bg-[#5A1E28]"
        >
          Request Valet
        </button>
      </div>
    `;

    resultContainer.querySelectorAll('[data-vault-action]').forEach((actionBtn) => {
      actionBtn.addEventListener('click', () => {
        const action = actionBtn.getAttribute('data-vault-action');
        const id = actionBtn.getAttribute('data-vault-id');
        const activeRecord = TICKET_VAULT[id];

        if (action === 'modify' && activeRecord) {
          const codeInput = document.getElementById('reservationCode');
          const msgInput = document.getElementById('conciergeMessage');
          const form = document.getElementById('conciergeForm');
          const confirmation = document.getElementById('conciergeConfirmation');

          if (confirmation && form) {
            confirmation.classList.add('hidden');
            form.classList.remove('hidden');
          }
          if (codeInput) codeInput.value = activeRecord.id;
          if (msgInput) {
            msgInput.value = `Requesting seat change for ${activeRecord.id} (${activeRecord.film} — ${activeRecord.seats}).`;
            msgInput.focus();
          }
          document.querySelector('[data-category="Ticket & Seat Changes"]')?.click();
          showToast('Seat Change Ready', `Loaded ${activeRecord.id} into Send Us a Message.`);
        } else if (action === 'valet' && activeRecord) {
          showToast('VIP Valet Confirmed', `${activeRecord.valetStatus} confirmed for ${activeRecord.id}.`);
        }
      });
    });
  }

  function initTicketLookup() {
    const form = document.getElementById('ticketLookupForm');
    const input = document.getElementById('bookingIdInput');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        renderTicketLookup(input.value);
      });
    }

    document.querySelectorAll('[data-booking-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-booking-chip') || '';
        if (input) input.value = id;
        renderTicketLookup(id);
      });
    });

    renderTicketLookup('THT-2026-89');
  }

  // ------------------------------------------------------------------------
  // 5. Filterable Customer FAQ Accordion
  // ------------------------------------------------------------------------
  function renderFaqList() {
    const container = document.getElementById('faqAccordionList');
    if (!container) return;

    const filtered =
      activeFaqFilter === 'All Topics'
        ? FAQ_ITEMS
        : FAQ_ITEMS.filter((item) => item.category === activeFaqFilter);

    container.innerHTML = filtered
      .map((item) => {
        const isOpen = openFaqIds.has(item.id);
        return `
          <article class="faq-item luxury-card overflow-hidden" data-faq-id="${item.id}" data-open="${isOpen}">
            <button
              type="button"
              class="faq-trigger flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
              aria-expanded="${isOpen}"
              aria-controls="${item.id}-panel"
            >
              <div class="min-w-0">
                <span class="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF6A]">
                  ${escapeHtml(item.category)}
                </span>
                <h3 class="mt-1.5 font-serif text-sm font-semibold tracking-wider text-[#F5F2EB] sm:text-base">
                  ${escapeHtml(item.question)}
                </h3>
              </div>
              <span
                class="faq-symbol flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(212,175,106,0.3)] bg-[#121011] font-mono text-base font-semibold text-[#D4AF6A] transition"
                aria-hidden="true"
              >
                ${isOpen ? '−' : '+'}
              </span>
            </button>
            <div id="${item.id}-panel" class="faq-answer-wrapper">
              <div class="faq-answer-inner">
                <p class="border-t border-white/10 px-6 pb-5 pt-4 text-sm leading-relaxed text-[#9E9895]">
                  ${escapeHtml(item.answer)}
                </p>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    container.querySelectorAll('.faq-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const itemEl = trigger.closest('.faq-item');
        const id = itemEl.getAttribute('data-faq-id');
        const willOpen = !openFaqIds.has(id);

        if (willOpen) {
          openFaqIds.add(id);
        } else {
          openFaqIds.delete(id);
        }

        itemEl.setAttribute('data-open', String(willOpen));
        trigger.setAttribute('aria-expanded', String(willOpen));
        const symbol = trigger.querySelector('.faq-symbol');
        if (symbol) symbol.textContent = willOpen ? '−' : '+';
      });
    });
  }

  function initFaqSection() {
    const tabs = document.querySelectorAll('#faqFilterTabs .faq-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeFaqFilter = tab.getAttribute('data-faq-filter') || 'All Topics';
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('faq-tab-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        renderFaqList();
      });
    });

    renderFaqList();
  }

  // ------------------------------------------------------------------------
  // 6. Modals for Tickets (2), VIP Gold Profile, & Footer Actions
  // ------------------------------------------------------------------------
  function openModal(eyebrow, title, bodyHtml) {
    const modal = document.getElementById('conciergeModal');
    if (!modal) return;
    document.getElementById('modalEyebrow').textContent = eyebrow;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    const modal = document.getElementById('conciergeModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function initModalsAndFooterActions() {
    const modal = document.getElementById('conciergeModal');
    const closeBtn = document.getElementById('closeModalBtn');

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    const showTicketsModal = () => {
      openModal(
        'MY TICKETS (2 ACTIVE)',
        'ALEXANDER VANCE — TICKETS',
        `
          <div class="space-y-3">
            ${Object.values(TICKET_VAULT)
              .map(
                (t) => `
                <div class="rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-mono text-xs font-semibold text-[#D4AF6A]">${escapeHtml(t.id)}</span>
                    <span class="text-[11px] font-medium text-emerald-400">${escapeHtml(t.status)}</span>
                  </div>
                  <p class="mt-1.5 font-serif text-sm text-[#F5F2EB]">${escapeHtml(t.film)}</p>
                  <p class="mt-1 text-xs text-[#9E9895]">${escapeHtml(t.format)} • ${escapeHtml(t.showtime)}</p>
                </div>
              `
              )
              .join('')}
          </div>
        `
      );
    };

    const showProfileModal = () => {
      openModal(
        'VIP GOLD MEMBERSHIP',
        'ALEXANDER VANCE',
        `
          <div class="space-y-4">
            <div class="flex items-center gap-4 rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4">
              <span class="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF6A]/60 bg-[#3D141B] font-serif text-lg font-semibold text-[#D4AF6A]">A</span>
              <div>
                <p class="font-serif text-base text-[#F5F2EB]">Alexander Vance</p>
                <p class="text-xs text-[#D4AF6A]">Member ID: SG-88412 • Priority Support Active</p>
              </div>
            </div>
            <p class="text-xs leading-relaxed text-[#9E9895]">
              Complimentary VIP Valet Drop-Off, 72-hour early premiere tickets, and priority in-seat food &amp; drink service across all 4 cinema locations.
            </p>
          </div>
        `
      );
    };

    document.getElementById('ticketsBtn')?.addEventListener('click', showTicketsModal);
    document.getElementById('profileBtn')?.addEventListener('click', showProfileModal);

    document.getElementById('adminPanelBtn')?.addEventListener('click', () => {
      openModal(
        'OPERATIONS & THEATER CONTROL',
        'ADMIN CONTROL PANEL',
        `
          <p class="leading-relaxed">
            Theater projector diagnostics, seating charts, and daily showtime controls are reserved for theater managers.
          </p>
          <div class="mt-4 rounded-xl border border-[rgba(212,175,106,0.2)] bg-[#121011] p-4 text-xs">
            <p class="text-[#F5F2EB]">Manhattan Fifth Avenue • All 6 Luxury Theaters Ready</p>
            <p class="mt-1 text-[#D4AF6A]">Screen &amp; Sound Status: 100% IMAX Laser / Dolby Atmos Online</p>
          </div>
        `
      );
    });

    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'tickets') return showTicketsModal();
        if (action === 'profile') return showProfileModal();
        if (action === 'apply') {
          document.querySelector('[data-category="VIP Gold Membership"]')?.click();
          document.getElementById('conciergeForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          showToast('Membership Selected', 'Fill out the form to apply for VIP Gold Membership.');
          return;
        }
        const labels = {
          signin: ['Member Sign In', 'Currently signed in as Alexander Vance (VIP Gold Membership).'],
          architecture: ['18-Page Architecture', 'THEATRON Cinema Specification v2026.4 loaded.'],
          privacy: ['Privacy Policy', 'Your personal details and ticket history are kept private and secure.'],
          terms: ['Terms & Rules', 'Theater guidelines, quiet-service rules, and refund policy.'],
        };
        const [title, detail] = labels[action] || ['THEATRON Support', 'Request acknowledged.'];
        showToast(title, detail);
      });
    });
  }

  // ------------------------------------------------------------------------
  // Bootstrap
  // ------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCopyButtons();
    initConciergeForm();
    initTicketLookup();
    initFaqSection();
    initModalsAndFooterActions();
  });
})();
