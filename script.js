/**
 * THEATRON Cinema Lounges — Shared Navigation & UI Interactivity (Vanilla JS)
 */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('primary-nav-menu');
  const mobileBreakpoint = 860;

  if (header) {
    const syncScrollState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 16);
    };
    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });
  }

  if (hamburgerBtn && navMenu) {
    const setMenuState = (isOpen) => {
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      navMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMenu = () => setMenuState(false);

    // Keep mobile drawer aligned below the sticky header even if utility bar scrolls away.
    const syncDrawerTop = () => {
      if (!header || window.innerWidth > mobileBreakpoint) {
        navMenu.style.top = '';
        return;
      }
      const rect = header.getBoundingClientRect();
      navMenu.style.top = `${Math.max(0, Math.round(rect.bottom))}px`;
    };

    hamburgerBtn.addEventListener('click', () => {
      const isCurrentlyOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      syncDrawerTop();
      setMenuState(!isCurrentlyOpen);
    });

    // Close menu when a navigation link or CTA inside the drawer is selected.
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key for keyboard accessibility.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });

    // Close when clicking outside the header/drawer.
    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('is-open')) return;
      if (header && !header.contains(event.target)) {
        closeMenu();
      }
    });

    // Reset menu when resizing above mobile breakpoint.
    window.addEventListener('resize', () => {
      if (window.innerWidth > mobileBreakpoint && navMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        syncDrawerTop();
      }
    });
  }

  // ------------------------------------------------------------------------
  // All-Genre Curated Repertoire (index.html)
  // ------------------------------------------------------------------------
  const moviesData = [
    {
      id: 1,
      title: 'Hasnain — Shadow Strike: Doomsday',
      genre: 'Action',
      duration: '2h 28m',
      format: 'Dual-Laser IMAX • Atmos',
      image: 'images/movie-1.jpg',
      description:
        'A high-stakes covert mission across frozen northern ridges where every second counts against an orbital countdown.',
      showtimes: ['03:30 PM', '07:00 PM', '10:30 PM', '11:45 PM'],
    },
    {
      id: 2,
      title: 'Monsoon Letters in Murree',
      genre: 'Love Story',
      duration: '2h 04m',
      format: 'Obsidian Lounge • 4K',
      image: 'images/movie-2.jpg',
      description:
        'Two architects reunite in misty hillside cafés over an unfinished correspondence spanning a decade.',
      showtimes: ['01:45 PM', '05:15 PM', '08:45 PM'],
    },
    {
      id: 3,
      title: 'The Seventh Velvet Seat',
      genre: 'Horror',
      duration: '1h 52m',
      format: '64-Channel Atmos',
      image: 'images/movie-3.jpg',
      description:
        'When a restored 1960s screening hall opens after midnight, its final reel refuses to end when the projector stops.',
      showtimes: ['06:15 PM', '09:30 PM', '11:55 PM'],
    },
    {
      id: 4,
      title: 'Peaks of Silence: K2 Winter',
      genre: 'Documentary',
      duration: '1h 46m',
      format: 'Dual-Laser IMAX',
      image: 'images/movie-4.jpg',
      description:
        'Intimate 8K expedition cinematography chronicling high-altitude mountaineers and Balti porters above 8,000 meters.',
      showtimes: ['12:30 PM', '04:00 PM', '07:30 PM'],
    },
    {
      id: 5,
      title: 'Obsidian Protocol',
      genre: 'Action',
      duration: '2h 14m',
      format: 'Crimson Suite • Atmos',
      image: 'images/movie-5.jpg',
      description:
        'An underground diplomat turns whistleblower in a breathless chase through glass towers and midnight rail tunnels.',
      showtimes: ['02:30 PM', '06:00 PM', '09:45 PM'],
    },
    {
      id: 6,
      title: 'Saffron & Rain',
      genre: 'Love Story',
      duration: '1h 58m',
      format: 'Italian Recliner Hall',
      image: 'images/movie-6.jpg',
      description:
        'A classical cellist and a culinary historian find harmony in an old courtyard restaurant during autumn.',
      showtimes: ['01:15 PM', '04:45 PM', '08:15 PM'],
    },
    {
      id: 7,
      title: 'Echoes Beneath Margalla',
      genre: 'Horror',
      duration: '1h 49m',
      format: '64-Channel Atmos',
      image: 'images/movie-7.jpg',
      description:
        'A night-shift acoustic surveyor captures subterranean frequencies that awaken an ancient hillside folklore.',
      showtimes: ['07:45 PM', '10:15 PM', '11:50 PM'],
    },
    {
      id: 8,
      title: 'Crafted in Gold: Cinema Architecture',
      genre: 'Documentary',
      duration: '1h 34m',
      format: '4K Laser Lounge',
      image: 'images/movie-8.jpg',
      description:
        'A visual journey through the world’s grandest art-deco theaters, acoustic chambers, and bespoke projection rooms.',
      showtimes: ['01:00 PM', '03:45 PM', '06:30 PM'],
    },
  ];

  const moviesGrid = document.getElementById('movies-grid');
  const filterButtons = document.querySelectorAll('.filter-btn[data-genre]');

  const renderMovies = (selectedGenre) => {
    if (!moviesGrid) return;

    const filtered =
      selectedGenre === 'All'
        ? moviesData
        : moviesData.filter((movie) => movie.genre === selectedGenre);

    if (filtered.length === 0) {
      moviesGrid.innerHTML =
        '<p class="movies-empty">No screenings currently scheduled in this genre.</p>';
      return;
    }

    moviesGrid.innerHTML = filtered
      .map(
        (movie) => `
        <article class="movie-card">
          <div class="movie-poster-wrap">
            <span class="movie-genre-tag">${movie.genre}</span>
            <img
              src="${movie.image}"
              alt="${movie.title} poster"
              loading="lazy"
              onerror="this.parentElement.classList.add('is-missing-poster')"
            />
            <div class="poster-fallback" aria-hidden="true">
              <span class="poster-fallback-title">${movie.title}</span>
              <span class="poster-fallback-genre">${movie.genre} &bull; ${movie.duration}</span>
            </div>
          </div>
          <div class="movie-card-body">
            <h3 class="movie-card-title">${movie.title}</h3>
            <p class="movie-card-specs">${movie.duration} &bull; ${movie.format}</p>
            <p class="movie-card-desc">${movie.description}</p>
            <div>
              <span class="showtime-label">Showtimes</span>
              <div class="showtime-chips">
                ${movie.showtimes
                  .map((time) => `<button class="showtime-chip" type="button">${time}</button>`)
                  .join('')}
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  };

  if (moviesGrid) {
    renderMovies('All');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const genre = button.dataset.genre || 'All';
        filterButtons.forEach((btn) => {
          const isSelected = btn === button;
          btn.classList.toggle('is-active', isSelected);
          btn.setAttribute('aria-pressed', String(isSelected));
        });
        renderMovies(genre);
      });
    });

    // Interactive selection state for showtime chips across spotlight and grid.
    document.addEventListener('click', (event) => {
      const chip = event.target.closest('.showtime-chip');
      if (!chip) return;
      const container = chip.closest('.showtime-chips');
      if (!container) return;
      container.querySelectorAll('.showtime-chip').forEach((c) => {
        c.classList.toggle('is-selected', c === chip);
      });
    });
  }

  // ------------------------------------------------------------------------
  // Three Imperial Auditoriums Tab Switcher (index.html)
  // ------------------------------------------------------------------------
  const hallsData = {
    'hall-01': {
      badge: 'Hall 01 • Flagship',
      kicker: 'Hall 01 • Dual-Laser Flagship',
      title: 'The Obsidian IMAX',
      image: 'images/hall-01.jpg',
      alt: 'Hall 01 — The Obsidian IMAX interior',
      fallbackSub: 'Hall 01 • 28 Italian Recliners',
      description:
        'Our signature 28-seat grand lounge built around an edge-to-edge silver curved screen, delivering razor-sharp Dual-Laser IMAX imagery and thunderous 64-channel Atmos depth.',
      specs: [
        { label: 'Seating', value: '28 Heated Italian Recliners' },
        { label: 'Projection', value: '4K Dual-Laser IMAX' },
        { label: 'Acoustics', value: '64-Channel Dolby Atmos' },
        { label: 'Hospitality', value: 'In-Seat Silent Butler Call' },
      ],
      ctaText: 'Book Hall 01 — The Obsidian IMAX',
    },
    'hall-02': {
      badge: 'Hall 02 • Royal Suite',
      kicker: 'Hall 02 • Crimson Velvet Chamber',
      title: 'The Crimson Royal Suite',
      image: 'images/hall-02.jpg',
      alt: 'Hall 02 — The Crimson Royal Suite interior',
      fallbackSub: 'Hall 02 • 16 Double Loveseats',
      description:
        'Draped in deep crimson acoustic velvet with wide loveseat pods, warm brass reading sconces, and direct kitchen pass-through for uninterrupted multi-course lounge dining.',
      specs: [
        { label: 'Seating', value: '16 Twin Motorized Loveseats' },
        { label: 'Projection', value: '4K RGB Laser Reference' },
        { label: 'Acoustics', value: '64-Channel Atmos Dome' },
        { label: 'Hospitality', value: 'Dedicated Culinary Steward' },
      ],
      ctaText: 'Book Hall 02 — The Crimson Royal Suite',
    },
    'hall-03': {
      badge: 'Hall 03 • Private Salon',
      kicker: 'Hall 03 • Sovereign Buyout Lounge',
      title: 'The Sovereign Salon',
      image: 'images/hall-03.jpg',
      alt: 'Hall 03 — The Sovereign Salon interior',
      fallbackSub: 'Hall 03 • 12 Private Club Seats',
      description:
        'Designed for private family premieres, diplomatic screenings, and executive buyouts in F-7 Markaz with an adjacent pre-screening espresso bar and custom lighting presets.',
      specs: [
        { label: 'Seating', value: '12 First-Class Club Loungers' },
        { label: 'Projection', value: '4K Laser HDR Cinema' },
        { label: 'Acoustics', value: 'Isolated Studio Tuning' },
        { label: 'Hospitality', value: 'Private Foyer & Valet Entry' },
      ],
      ctaText: 'Book Hall 03 — The Sovereign Salon',
    },
  };

  const hallTabs = document.querySelectorAll('.hall-tab[data-hall]');
  const hallPanel = document.getElementById('auditorium-panel');

  if (hallTabs.length && hallPanel) {
    const hallBadge = document.getElementById('hall-badge');
    const hallImage = document.getElementById('hall-image');
    const hallFallbackTitle = document.getElementById('hall-fallback-title');
    const hallFallbackSub = document.getElementById('hall-fallback-sub');
    const hallKicker = document.getElementById('hall-kicker');
    const hallTitle = document.getElementById('hall-title');
    const hallDesc = document.getElementById('hall-desc');
    const hallSpecs = document.getElementById('hall-specs');
    const hallBookBtn = document.getElementById('hall-book-btn');

    const updateHallView = (hallKey) => {
      const data = hallsData[hallKey];
      if (!data) return;

      hallTabs.forEach((tab) => {
        const isActive = tab.dataset.hall === hallKey;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      if (hallBadge) hallBadge.textContent = data.badge;
      if (hallKicker) hallKicker.textContent = data.kicker;
      if (hallTitle) hallTitle.textContent = data.title;
      if (hallDesc) hallDesc.textContent = data.description;
      if (hallFallbackTitle) hallFallbackTitle.textContent = data.title;
      if (hallFallbackSub) hallFallbackSub.textContent = data.fallbackSub;

      if (hallImage) {
        hallImage.parentElement.classList.remove('is-missing-poster');
        hallImage.src = data.image;
        hallImage.alt = data.alt;
      }

      if (hallSpecs) {
        hallSpecs.innerHTML = data.specs
          .map(
            (spec) => `
            <div class="hall-spec-cell">
              <dt>${spec.label}</dt>
              <dd>${spec.value}</dd>
            </div>
          `
          )
          .join('');
      }

      if (hallBookBtn) {
        hallBookBtn.textContent = data.ctaText;
        hallBookBtn.dataset.selectedHall = hallKey;
      }
    };

    hallTabs.forEach((tab) => {
      tab.addEventListener('click', () => updateHallView(tab.dataset.hall));
    });
  }

  // ------------------------------------------------------------------------
  // Filterable 6-Card Architectural Gallery & Fullscreen Lightbox (index.html)
  // ------------------------------------------------------------------------
  const galleryData = [
    {
      id: 1,
      category: 'Auditoriums',
      title: 'The Obsidian IMAX Curved Screen',
      image: 'images/gallery-1.jpg',
      description:
        'Floor-to-ceiling perforated acoustic screen framed by matte obsidian baffles and recessed gold coves.',
    },
    {
      id: 2,
      category: 'Foyer & Bar',
      title: 'The Crimson Espresso & Elixir Bar',
      image: 'images/gallery-2.jpg',
      description:
        'Nero Marquina marble bar counter serving handcrafted saffron mocktails and specialty pour-overs.',
    },
    {
      id: 3,
      category: 'Private Suites',
      title: 'Crimson Royal Loveseat Pods',
      image: 'images/gallery-3.jpg',
      description:
        'Motorized twin velvet recliners fitted with brass dining trays and whisper-quiet butler call buttons.',
    },
    {
      id: 4,
      category: 'Auditoriums',
      title: '64-Channel Acoustic Ceiling Array',
      image: 'images/gallery-4.jpg',
      description:
        'Precision-angled overhead speakers concealed behind geometric crimson-and-brass architectural ribs.',
    },
    {
      id: 5,
      category: 'Foyer & Bar',
      title: 'Diamond Crest Grand Arrival Atrium',
      image: 'images/gallery-5.jpg',
      description:
        'Double-height entrance hall in F-7 Markaz featuring warm chandelier geometry and velvet waiting alcoves.',
    },
    {
      id: 6,
      category: 'Private Suites',
      title: 'The Sovereign Pre-Screening Salon',
      image: 'images/gallery-6.jpg',
      description:
        'Sound-isolated hospitality lounge reserved for private premiere hosts and VIP buyout guests.',
    },
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilterBtns = document.querySelectorAll('.filter-btn[data-gallery-filter]');
  const lightboxModal = document.getElementById('lightbox-modal');

  if (galleryGrid && lightboxModal) {
    let visibleGalleryItems = [...galleryData];
    let currentLightboxIndex = 0;
    let lastFocusedElement = null;

    const lbCounter = document.getElementById('lightbox-counter');
    const lbMediaWrap = document.getElementById('lightbox-media-wrap');
    const lbImage = document.getElementById('lightbox-image');
    const lbFallbackTitle = document.getElementById('lightbox-fallback-title');
    const lbFallbackCat = document.getElementById('lightbox-fallback-cat');
    const lbCategory = document.getElementById('lightbox-category');
    const lbTitle = document.getElementById('lightbox-title');
    const lbDesc = document.getElementById('lightbox-desc');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    const renderGallery = (category) => {
      visibleGalleryItems =
        category === 'All'
          ? [...galleryData]
          : galleryData.filter((item) => item.category === category);

      galleryGrid.innerHTML = visibleGalleryItems
        .map(
          (item, index) => `
          <button
            class="gallery-card"
            type="button"
            data-gallery-index="${index}"
            aria-label="Inspect ${item.title} in fullscreen"
          >
            <div class="gallery-thumb">
              <img
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
                onerror="this.parentElement.classList.add('is-missing-poster')"
              />
              <div class="poster-fallback" aria-hidden="true">
                <span class="poster-fallback-title">${item.title}</span>
                <span class="poster-fallback-genre">${item.category}</span>
              </div>
              <span class="gallery-expand-hint">Expand</span>
            </div>
            <div class="gallery-card-meta">
              <span class="gallery-card-cat">${item.category}</span>
              <h3 class="gallery-card-title">${item.title}</h3>
            </div>
          </button>
        `
        )
        .join('');
    };

    const syncLightboxSlide = () => {
      const item = visibleGalleryItems[currentLightboxIndex];
      if (!item) return;

      if (lbCounter) {
        lbCounter.textContent = `${currentLightboxIndex + 1} / ${visibleGalleryItems.length}`;
      }
      if (lbMediaWrap) lbMediaWrap.classList.remove('is-missing-poster');
      if (lbImage) {
        lbImage.src = item.image;
        lbImage.alt = item.title;
      }
      if (lbFallbackTitle) lbFallbackTitle.textContent = item.title;
      if (lbFallbackCat) lbFallbackCat.textContent = item.category;
      if (lbCategory) lbCategory.textContent = item.category;
      if (lbTitle) lbTitle.textContent = item.title;
      if (lbDesc) lbDesc.textContent = item.description;
    };

    const openLightbox = (index) => {
      lastFocusedElement = document.activeElement;
      currentLightboxIndex = index;
      syncLightboxSlide();
      lightboxModal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lbClose) lbClose.focus();
    };

    const closeLightbox = () => {
      if (lightboxModal.hidden) return;
      lightboxModal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    };

    const stepLightbox = (delta) => {
      if (visibleGalleryItems.length === 0) return;
      currentLightboxIndex =
        (currentLightboxIndex + delta + visibleGalleryItems.length) % visibleGalleryItems.length;
      syncLightboxSlide();
    };

    renderGallery('All');

    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.galleryFilter || 'All';
        galleryFilterBtns.forEach((b) => {
          const isSelected = b === btn;
          b.classList.toggle('is-active', isSelected);
          b.setAttribute('aria-pressed', String(isSelected));
        });
        renderGallery(category);
      });
    });

    galleryGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.gallery-card[data-gallery-index]');
      if (!card) return;
      const idx = Number(card.dataset.galleryIndex);
      if (!Number.isNaN(idx)) openLightbox(idx);
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => stepLightbox(-1));
    if (lbNext) lbNext.addEventListener('click', () => stepLightbox(1));

    lightboxModal.querySelectorAll('[data-lightbox-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', (event) => {
      if (lightboxModal.hidden) return;
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        stepLightbox(1);
      } else if (event.key === 'ArrowLeft') {
        stepLightbox(-1);
      }
    });
  }
})();
