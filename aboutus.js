/* ==========================================================================
   THEATRON CINEMA LOUNGES — About Us Interactive Controller
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // Data: Three Pillars of Craftsmanship
  // ------------------------------------------------------------------------
  const PILLARS = {
    velvet: {
      eyebrow: 'PILLAR I • ACOUSTIC ARCHITECTURE',
      title: 'ACOUSTIC MAROON VELVET',
      summary:
        'Custom-loomed heavyweight Italian silk-velvet wall draping tuned to a 0.28-second reverberation decay, paired with Italian full-grain leather heated reclining suites.',
      specs: [
        { label: 'Reverberation Decay (RT60)', value: '0.28 Seconds' },
        { label: 'Wall Draping Textile', value: '680gsm Italian Silk-Velvet' },
        { label: 'Suite Upholstery', value: 'Heated Full-Grain Saddle Leather' },
        { label: 'Noise Floor Isolation', value: 'NC-12 Room-in-Room Shell' },
      ],
      blueprintCaption: 'ARCHITECTURAL SECTION • ACOUSTIC VELVET BAFFLE MATRIX',
      svg: `
        <svg viewBox="0 0 480 310" class="h-full w-full" aria-label="Acoustic Maroon Velvet Architectural Blueprint">
          <defs>
            <linearGradient id="velvetGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3D141B" stop-opacity="0.72"/>
              <stop offset="100%" stop-color="#121011" stop-opacity="0.95"/>
            </linearGradient>
          </defs>
          <rect width="480" height="310" rx="12" fill="url(#velvetGrad)"/>
          <g stroke="#D4AF6A" stroke-opacity="0.16" stroke-width="0.75">
            <line x1="40" y1="30" x2="40" y2="280"/>
            <line x1="120" y1="30" x2="120" y2="280"/>
            <line x1="200" y1="30" x2="200" y2="280"/>
            <line x1="280" y1="30" x2="280" y2="280"/>
            <line x1="360" y1="30" x2="360" y2="280"/>
            <line x1="440" y1="30" x2="440" y2="280"/>
            <line x1="25" y1="80" x2="455" y2="80"/>
            <line x1="25" y1="155" x2="455" y2="155"/>
            <line x1="25" y1="230" x2="455" y2="230"/>
          </g>
          <!-- Acoustic Wavefront & Velvet Pleat Geometry -->
          <path d="M55 245 V110 C55 62 125 45 240 45 C355 45 425 62 425 110 V245" fill="none" stroke="#D4AF6A" stroke-width="1.5" stroke-opacity="0.8"/>
          <path d="M85 245 V122 C85 82 145 68 240 68 C335 68 395 82 395 122 V245" fill="none" stroke="#8A2B3B" stroke-width="2"/>
          <!-- Acoustic Diffuser Louvers -->
          <g stroke="#D4AF6A" stroke-width="1.2" stroke-opacity="0.65">
            <path d="M110 115 Q140 155 110 195"/>
            <path d="M135 110 Q170 155 135 200"/>
            <path d="M370 115 Q340 155 370 195"/>
            <path d="M345 110 Q310 155 345 200"/>
          </g>
          <!-- Twin Luxury Recliner Seats -->
          <rect x="170" y="170" width="58" height="44" rx="7" fill="#5A1E28" stroke="#D4AF6A" stroke-width="1.2"/>
          <rect x="252" y="170" width="58" height="44" rx="7" fill="#5A1E28" stroke="#D4AF6A" stroke-width="1.2"/>
          <circle cx="240" cy="112" r="22" fill="none" stroke="#D4AF6A" stroke-dasharray="4 3" stroke-width="1.2"/>
          <text x="240" y="116" text-anchor="middle" fill="#D4AF6A" font-family="monospace" font-size="10">0.28s</text>
          <text x="240" y="268" text-anchor="middle" fill="#F5F2EB" font-family="Georgia, serif" font-size="11" letter-spacing="3">MAROON VELVET ACOUSTIC SHELL</text>
        </svg>
      `,
    },
    optics: {
      eyebrow: 'PILLAR II • OPTICAL CALIBRATION',
      title: 'DUAL-LASER IMAX & OPTICS',
      summary:
        'Custom micro-perforated silver screens calibrated nightly to 22 foot-lamberts, delivering razor-sharp HDR contrast and zero-speckle 4K laser clarity.',
      specs: [
        { label: 'Projection Engine', value: '4K RGB Dual-Laser IMAX' },
        { label: 'Screen Luminance', value: '22 Foot-Lamberts (Nightly)' },
        { label: 'Spatial Audio Array', value: '128-Channel Dolby Atmos' },
        { label: 'Aspect Ratio Support', value: '1.43:1 & 2.39:1 Anamorphic' },
      ],
      blueprintCaption: 'OPTICAL PROJECTION AXIS • DUAL-LASER CONVERGENCE',
      svg: `
        <svg viewBox="0 0 480 310" class="h-full w-full" aria-label="Dual-Laser IMAX Optics Blueprint">
          <rect width="480" height="310" rx="12" fill="#121011"/>
          <g stroke="#D4AF6A" stroke-opacity="0.14" stroke-width="0.75">
            <rect x="26" y="26" width="428" height="258" rx="8" fill="none"/>
            <line x1="26" y1="155" x2="454" y2="155"/>
          </g>
          <!-- Projection Booth Origin -->
          <rect x="44" y="128" width="52" height="54" rx="6" fill="#3D141B" stroke="#D4AF6A" stroke-width="1.4"/>
          <circle cx="96" cy="145" r="5" fill="#D4AF6A"/>
          <circle cx="96" cy="165" r="5" fill="#D4AF6A"/>
          <!-- Dual Laser Beams -->
          <polygon points="96,145 412,56 412,248" fill="#D4AF6A" fill-opacity="0.09" stroke="#D4AF6A" stroke-width="1.2"/>
          <polygon points="96,165 412,68 412,260" fill="#8A2B3B" fill-opacity="0.18" stroke="#8A2B3B" stroke-width="1.2"/>
          <!-- Curved Micro-Perforated Silver Screen -->
          <path d="M412 52 Q434 155 412 258" fill="none" stroke="#F5F2EB" stroke-width="3.2"/>
          <path d="M420 60 Q440 155 420 250" fill="none" stroke="#D4AF6A" stroke-dasharray="3 3" stroke-width="1"/>
          <text x="245" y="148" text-anchor="middle" fill="#D4AF6A" font-family="monospace" font-size="11">22 fL CALIBRATED BEAM</text>
          <text x="240" y="268" text-anchor="middle" fill="#F5F2EB" font-family="Georgia, serif" font-size="11" letter-spacing="3">4K DUAL-LASER OPTICAL AXIS</text>
        </svg>
      `,
    },
    gastronomy: {
      eyebrow: 'PILLAR III • SILENT SERVICE',
      title: 'IN-SEAT FOOD & DRINKS',
      summary:
        'Whisper-quiet service corridors behind every row and silent brass call-buttons connecting directly to our executive chef and vintage sommelier cellar.',
      specs: [
        { label: 'Service Architecture', value: 'Dedicated Rear Steward Corridors' },
        { label: 'Ordering Interface', value: 'Illuminated Brass Call-Button' },
        { label: 'Cellar Portfolio', value: '420+ Vintage & Rare Vintages' },
        { label: 'Acoustic Glassware', value: 'Hand-Blown Dampened Crystal' },
      ],
      blueprintCaption: 'SUITE FLOORPLAN • STEWARD CORRIDOR & CELLAR FLOW',
      svg: `
        <svg viewBox="0 0 480 310" class="h-full w-full" aria-label="In-Seat Food & Drinks Blueprint">
          <rect width="480" height="310" rx="12" fill="#121011"/>
          <!-- Steward Corridor Perimeter -->
          <rect x="44" y="42" width="392" height="202" rx="14" fill="#181516" stroke="#8A2B3B" stroke-width="1.5"/>
          <rect x="82" y="72" width="316" height="142" rx="10" fill="#121011" stroke="#D4AF6A" stroke-opacity="0.45" stroke-dasharray="5 4" stroke-width="1.2"/>
          <!-- Suite Bays with Brass Call Nodes -->
          <rect x="108" y="96" width="74" height="94" rx="8" fill="#3D141B" stroke="#D4AF6A" stroke-width="1.2"/>
          <rect x="203" y="96" width="74" height="94" rx="8" fill="#3D141B" stroke="#D4AF6A" stroke-width="1.2"/>
          <rect x="298" y="96" width="74" height="94" rx="8" fill="#3D141B" stroke="#D4AF6A" stroke-width="1.2"/>
          <circle cx="145" cy="143" r="6" fill="#D4AF6A"/>
          <circle cx="240" cy="143" r="6" fill="#D4AF6A"/>
          <circle cx="335" cy="143" r="6" fill="#D4AF6A"/>
          <text x="240" y="61" text-anchor="middle" fill="#D4AF6A" font-family="monospace" font-size="10">WHISPER-QUIET STEWARD SERVICE LANE</text>
          <text x="240" y="268" text-anchor="middle" fill="#F5F2EB" font-family="Georgia, serif" font-size="11" letter-spacing="3">SILENT IN-SEAT CULINARY CORRIDOR</text>
        </svg>
      `,
    },
  };

  // ------------------------------------------------------------------------
  // Data: Cinema Locations
  // ------------------------------------------------------------------------
  const FLAGSHIPS = {
    manhattan: {
      city: 'Manhattan',
      houseName: 'Manhattan — Fifth Avenue Cinema',
      address: '712 Fifth Avenue, Suite Mezzanine, New York, NY 10019',
      auditoriums: '6 Velvet Salons (Incl. 1 IMAX Dual-Laser)',
      suiteCapacity: '32 Luxury Recliner Seats Max',
      acousticRating: 'NC-12 • 0.28s RT60 Reference',
      inaugurated: 'Inaugurated 2018',
      note: 'Features a private chauffeur VIP Valet Drop-Off and 600-bottle Champagne drink collection.',
    },
    'beverly-hills': {
      city: 'Beverly Hills',
      houseName: 'Beverly Hills — Rodeo Vault',
      address: '418 N. Rodeo Drive, Private Courtyard, Beverly Hills, CA 90210',
      auditoriums: '5 Screening Salons (2 Dolby Atmos Premier)',
      suiteCapacity: '36 Heated Saddle-Leather Suites',
      acousticRating: 'NC-10 • Guild Mastering Spec',
      inaugurated: 'Inaugurated 2021',
      note: 'Designed for filmmaker Q&As, Academy guild previews, and discreet talent arrivals.',
    },
    london: {
      city: 'London',
      houseName: 'London — Mayfair House',
      address: '29 Mount Street, Mayfair, London W1K 2TH',
      auditoriums: '4 Heritage Salons (Incl. 70mm Archival)',
      suiteCapacity: '28 Sovereign Velvet Loges',
      acousticRating: 'NC-12 • Tuned Silk-Velvet Baffles',
      inaugurated: 'Inaugurated 2023',
      note: 'Housed inside an Edwardian townhouse with dedicated bespoke cocktail conservatory.',
    },
    dubai: {
      city: 'Dubai',
      houseName: 'Dubai — DIFC Pavilion',
      address: 'Gate Village 08, DIFC, Dubai, United Arab Emirates',
      auditoriums: '6 Dual-Laser IMAX & Atmos Palaces',
      suiteCapacity: '38 Luxury Recliner Seats',
      acousticRating: 'NC-11 • 128-Channel Spatial Array',
      inaugurated: 'Inaugurated 2026',
      note: 'Our newest architectural flagship with climate-controlled valet gallery and private majlis lounges.',
    },
  };

  // ------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------
  let activePillar = 'velvet';
  let activeCity = 'manhattan';

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
  // 2. Three-Pillar Craftsmanship Switcher
  // ------------------------------------------------------------------------
  function renderPillar(pillarKey) {
    const card = document.getElementById('pillarDisplayCard');
    const data = PILLARS[pillarKey];
    if (!card || !data) return;

    card.innerHTML = `
      <div class="panel-reveal grid grid-cols-1 items-center gap-7 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <div class="overflow-hidden rounded-xl border border-[rgba(212,175,106,0.22)] bg-[#121011] p-2">
            <div class="aspect-[16/10] w-full">
              ${data.svg}
            </div>
          </div>
          <p class="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#9E9895]">
            ${escapeHtml(data.blueprintCaption)}
          </p>
        </div>

        <div class="lg:col-span-6">
          <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
          <h3 class="mt-2 font-serif text-xl font-semibold uppercase tracking-[0.12em] text-[#F5F2EB] sm:text-2xl">
            ${escapeHtml(data.title)}
          </h3>
          <p class="mt-3.5 text-sm leading-relaxed text-[#9E9895]">
            ${escapeHtml(data.summary)}
          </p>

          <dl class="mt-6 grid grid-cols-1 gap-3.5 border-t border-white/10 pt-5 sm:grid-cols-2">
            ${data.specs
              .map(
                (spec) => `
                  <div class="rounded-xl border border-[rgba(212,175,106,0.14)] bg-[#121011] px-4 py-3">
                    <dt class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E9895]">
                      ${escapeHtml(spec.label)}
                    </dt>
                    <dd class="mt-1 text-xs font-semibold text-[#D4AF6A]">
                      ${escapeHtml(spec.value)}
                    </dd>
                  </div>
                `
              )
              .join('')}
          </dl>
        </div>
      </div>
    `;
  }

  function initPillarTabs() {
    const tabs = document.querySelectorAll('#pillarTabs .pillar-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activePillar = tab.getAttribute('data-pillar') || 'velvet';
        tabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle('pillar-tab-active', isActive);
          t.setAttribute('aria-selected', String(isActive));
        });
        renderPillar(activePillar);
      });
    });

    document.querySelectorAll('[data-pillar-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-pillar-jump');
        const targetTab = document.querySelector(`#pillarTabs [data-pillar="${key}"]`);
        targetTab?.click();
        document.getElementById('pillarsHeading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    renderPillar(activePillar);
  }

  // ------------------------------------------------------------------------
  // 3. Cinema Locations City Switcher
  // ------------------------------------------------------------------------
  function renderFlagship(cityKey) {
    const panel = document.getElementById('flagshipPalacePanel');
    const palace = FLAGSHIPS[cityKey];
    if (!panel || !palace) return;

    panel.innerHTML = `
      <div class="panel-reveal">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="rounded-full border border-[#8A2B3B] bg-[#3D141B] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF6A]">
            ${escapeHtml(palace.inaugurated)}
          </span>
          <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9E9895]">
            ${escapeHtml(palace.city)}
          </span>
        </div>

        <h3 class="mt-4 font-serif text-lg font-semibold uppercase tracking-[0.1em] text-[#F5F2EB]">
          ${escapeHtml(palace.houseName)}
        </h3>
        <p class="mt-1.5 text-xs text-[#D4AF6A]">
          ${escapeHtml(palace.address)}
        </p>
        <p class="mt-3 text-xs leading-relaxed text-[#9E9895]">
          ${escapeHtml(palace.note)}
        </p>

        <dl class="mt-5 divide-y divide-white/10 border-t border-white/10 text-xs">
          <div class="flex items-center justify-between gap-4 py-2.5">
            <dt class="text-[#9E9895]">Auditorium Count</dt>
            <dd class="text-right font-medium text-[#F5F2EB]">${escapeHtml(palace.auditoriums)}</dd>
          </div>
          <div class="flex items-center justify-between gap-4 py-2.5">
            <dt class="text-[#9E9895]">Signature Suite Cap</dt>
            <dd class="text-right font-medium text-[#F5F2EB]">${escapeHtml(palace.suiteCapacity)}</dd>
          </div>
          <div class="flex items-center justify-between gap-4 py-2.5">
            <dt class="text-[#9E9895]">Acoustic Rating</dt>
            <dd class="text-right font-medium text-[#D4AF6A]">${escapeHtml(palace.acousticRating)}</dd>
          </div>
        </dl>
      </div>
    `;
  }

  function initCitySwitcher() {
    const tabs = document.querySelectorAll('#citySwitcherTabs .city-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeCity = tab.getAttribute('data-city') || 'manhattan';
        tabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle('city-tab-active', isActive);
          t.setAttribute('aria-selected', String(isActive));
        });
        renderFlagship(activeCity);
      });
    });

    renderFlagship(activeCity);
  }

  // ------------------------------------------------------------------------
  // 4. Modals (Walkthrough Request, Sovereign Membership, Tickets, Profile)
  // ------------------------------------------------------------------------
  function openModal(eyebrow, title, bodyHtml) {
    const modal = document.getElementById('aboutModal');
    if (!modal) return;
    document.getElementById('aboutModalEyebrow').textContent = eyebrow;
    document.getElementById('aboutModalTitle').textContent = title;
    document.getElementById('aboutModalBody').innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    const modal = document.getElementById('aboutModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function openWalkthroughModal() {
    const palace = FLAGSHIPS[activeCity] || FLAGSHIPS.manhattan;
    openModal(
      'ARCHITECTURAL TOUR SUPPORT',
      `WALKTHROUGH — ${palace.city.toUpperCase()}`,
      `
        <form id="walkthroughForm" class="space-y-4">
          <div class="rounded-xl border border-[rgba(212,175,106,0.22)] bg-[#121011] p-3.5 text-xs">
            <p class="font-semibold text-[#F5F2EB]">${escapeHtml(palace.houseName)}</p>
            <p class="mt-0.5 text-[#9E9895]">${escapeHtml(palace.address)}</p>
          </div>

          <div>
            <label for="wtPatronName" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
              Patron Name
            </label>
            <input id="wtPatronName" type="text" required value="Alexander Vance" class="luxury-input" />
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label for="wtDate" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
                Preferred Date
              </label>
              <input id="wtDate" type="date" required value="2026-12-04" class="luxury-input" />
            </div>
            <div>
              <label for="wtFocus" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
                Tour Focus
              </label>
              <select id="wtFocus" class="luxury-input">
                <option>Luxury Recliner Seats &amp; Lounge</option>
                <option>Private Theater Rentals &amp; Events</option>
                <option>VIP Gold Membership</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            class="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#D4AF6A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#121011] transition hover:bg-[#e2c282]"
          >
            Confirm Private Tour
          </button>
        </form>
      `
    );

    const form = document.getElementById('walkthroughForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const patron = document.getElementById('wtPatronName').value.trim() || 'Alexander Vance';
      const date = document.getElementById('wtDate').value;
      const focus = document.getElementById('wtFocus').value;
      const ref = `#THT-TOUR-${Math.floor(1000 + Math.random() * 9000)}`;

      document.getElementById('aboutModalBody').innerHTML = `
        <div class="space-y-4 rounded-xl border border-[#D4AF6A]/40 bg-[#121011] p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-[#8A2B3B] bg-[#3D141B] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF6A]">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Tour Scheduled
            </span>
            <span class="font-mono text-xs font-semibold text-[#D4AF6A]">${ref}</span>
          </div>
          <p class="text-sm text-[#F5F2EB]">
            Our cinema team at <span class="text-[#D4AF6A]">${escapeHtml(palace.houseName)}</span> will welcome
            ${escapeHtml(patron)} on <span class="font-medium">${escapeHtml(date)}</span> for a private
            <span class="italic">${escapeHtml(focus)}</span> viewing.
          </p>
          <button
            id="doneTourBtn"
            type="button"
            class="inline-flex w-full items-center justify-center rounded-xl border border-[#D4AF6A]/40 bg-[#181516] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF6A] transition hover:bg-[#D4AF6A] hover:text-[#121011]"
          >
            Return to About Us
          </button>
        </div>
      `;
      document.getElementById('doneTourBtn')?.addEventListener('click', closeModal);
      showToast('Walkthrough Confirmed', `${ref} scheduled for ${palace.city}.`);
    });
  }

  function openMembershipModal() {
    openModal(
      'VIP GOLD MEMBERSHIP APPLICATION',
      'MEMBERSHIP REQUEST',
      `
        <form id="membershipApplyForm" class="space-y-4">
          <p class="text-xs leading-relaxed text-[#9E9895]">
            Submit your details for VIP Gold Membership. Our team reviews applications within 24 hours.
          </p>
          <div>
            <label for="memName" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
              Full Name
            </label>
            <input id="memName" type="text" required value="Alexander Vance" class="luxury-input" />
          </div>
          <div>
            <label for="memEmail" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
              Private Email
            </label>
            <input id="memEmail" type="email" required value="a.vance@sovereignvault.com" class="luxury-input" />
          </div>
          <div>
            <label for="memHomeHouse" class="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]">
              Primary Flagship House
            </label>
            <select id="memHomeHouse" class="luxury-input">
              <option>Manhattan — Fifth Avenue Cinema</option>
              <option>Beverly Hills — Rodeo Vault</option>
              <option>London — Mayfair House</option>
              <option>Dubai — DIFC Pavilion</option>
            </select>
          </div>
          <button
            type="submit"
            class="inline-flex w-full items-center justify-center rounded-xl bg-[#D4AF6A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#121011] transition hover:bg-[#e2c282]"
          >
            Submit VIP Gold Membership Request
          </button>
        </form>
      `
    );

    document.getElementById('membershipApplyForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const house = document.getElementById('memHomeHouse').value;
      const ref = `#THT-SG-${Math.floor(1000 + Math.random() * 9000)}`;
      closeModal();
      showToast('Membership Request Received', `${ref} routed to ${house}.`);
    });
  }

  function initModals() {
    const modal = document.getElementById('aboutModal');
    const closeBtn = document.getElementById('closeAboutModalBtn');

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('requestWalkthroughBtn')?.addEventListener('click', openWalkthroughModal);
    document.getElementById('applyMembershipBtn')?.addEventListener('click', openMembershipModal);

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
                <span class="text-emerald-400">Confirmed • Luxury Recliner Seat A2</span>
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
              <p class="text-xs text-[#D4AF6A]">Member ID: SG-88412 • VIP Gold Active</p>
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
        if (action === 'apply') return openMembershipModal();

        const labels = {
          signin: ['Member Sign In', 'Currently signed in as Alexander Vance (VIP Gold).'],
          architecture: ['18-Page Cinema Guide', 'THEATRON Cinema Location Guide v2026.4 loaded.'],
          privacy: ['Privacy Policy', 'Reservation and ticket information is encrypted and kept private.'],
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
    initPillarTabs();
    initCitySwitcher();
    initModals();
  });
})();
