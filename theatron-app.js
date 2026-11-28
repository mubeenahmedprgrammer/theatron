(function () {
  "use strict";

  const TRAY_STORAGE_KEY = "theatron_lounge_tray";
  const REVIEWS_STORAGE_KEY = "theatron_guest_reviews_v1";
  const JOKES_STORAGE_KEY = "theatron_jokes_laughs_v1";
  const LAUGHED_STORAGE_KEY = "theatron_laughed_jokes_v1";
  const SEAT_PRICE = 1800;

  const foodItems = [
    {
      id: "f1",
      name: "Classic Striped Popcorn Tub",
      cat: "popcorn",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Classic Tub",
      price: 1150,
      desc: "Crisp buttered cinema popcorn served in a classic striped tub.",
      img: "images/combo-couples-duet.jpg"
    },
    {
      id: "f2",
      name: "Hall Cinematic Popcorn",
      cat: "popcorn",
      genre: "action",
      genreLabel: "Action & IMAX",
      tag: "IMAX Tub",
      price: 1250,
      desc: "Freshly popped cinema tub ready for big-screen screenings.",
      img: "images/popcorn-hall-cinematic.jpg"
    },
    {
      id: "f3",
      name: "Peri-Peri Popcorn Box",
      cat: "popcorn",
      genre: "thriller",
      genreLabel: "Midnight & Thriller",
      tag: "Spiced Box",
      price: 1300,
      desc: "Zesty peri-peri seasoned popcorn for late-night thrillers.",
      img: "images/popcorn-periperi.jpg"
    },
    {
      id: "f4",
      name: "Crispy Chicken Tender & Bun",
      cat: "mains",
      genre: "action",
      genreLabel: "Action & IMAX",
      tag: "Crunchy Bite",
      price: 1650,
      desc: "Golden fried chicken tender with toasted bun bite and dip.",
      img: "images/burger-chicken.jpg"
    },
    {
      id: "f5",
      name: "Mushroom & Cheese Lounge Burger",
      cat: "mains",
      genre: "thriller",
      genreLabel: "Midnight & Thriller",
      tag: "Chef Burger",
      price: 2250,
      desc: "Sautéed mushrooms, melted cheese, fresh greens, and crisp fries.",
      img: "images/burgers.jpg"
    },
    {
      id: "f6",
      name: "Cheddar Burger & Golden Fries",
      cat: "mains",
      genre: "action",
      genreLabel: "Action & IMAX",
      tag: "Hot Box",
      price: 2100,
      desc: "Melted cheddar burger paired with golden-crisp french fries.",
      img: "images/burrgerrrr.jpg"
    },
    {
      id: "f7",
      name: "Heritage Crispy Wrap",
      cat: "mains",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Hand-Rolled",
      price: 1550,
      desc: "Crispy golden bites wrapped with fresh greens and creamy sauce.",
      img: "images/heritage-bun-kabab.jpg"
    },
    {
      id: "f8",
      name: "Heritage Chapli Sliders",
      cat: "mains",
      genre: "thriller",
      genreLabel: "Midnight & Thriller",
      tag: "Spiced Platter",
      price: 1950,
      desc: "Savory spiced chapli platter garnished with lemon, tomatoes, and chilies.",
      img: "images/heritage-chapli-sliders.jpg"
    },
    {
      id: "f9",
      name: "Loaded Cheese & Sauce Fries",
      cat: "mains",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Share Tray",
      price: 1600,
      desc: "Tray of golden fries topped with melted cheese, caramelized onions, and sauce.",
      img: "images/nachos-battle.jpg"
    },
    {
      id: "f10",
      name: "Classic Cheese Garlic Pizza",
      cat: "mains",
      genre: "romance",
      genreLabel: "Drama & Romance",
      tag: "Wood-Baked",
      price: 2400,
      desc: "Golden crust pizza baked with melted cheese and roasted garlic.",
      img: "images/pizza1.jpg"
    },
    {
      id: "f11",
      name: "Garden Olive & Pepper Pizza",
      cat: "mains",
      genre: "romance",
      genreLabel: "Drama & Romance",
      tag: "Artisan Slice",
      price: 2650,
      desc: "Topped with black olives, red onions, bell peppers, and fresh herbs.",
      img: "images/pizza2.jpg"
    },
    {
      id: "f12",
      name: "Caramel Sweet Popcorn",
      cat: "sweets",
      genre: "romance",
      genreLabel: "Drama & Romance",
      tag: "Sweet Treat",
      price: 1350,
      desc: "Sweet caramel-coated popcorn served warm for evening screenings.",
      img: "images/popcorn-caramel.jpg"
    },
    {
      id: "f13",
      name: "Pastry & Macaron Dessert Plate",
      cat: "sweets",
      genre: "romance",
      genreLabel: "Drama & Romance",
      tag: "Sweet Patisserie",
      price: 1850,
      desc: "Assorted macarons with layered chocolate, caramel, and cream cake slices.",
      img: "images/sweet.jpg"
    },
    {
      id: "f14",
      name: "Heritage Sweet & Treat Platter",
      cat: "sweets",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Sweet Platter",
      price: 1750,
      desc: "Traditional sweet bites and glazed treats served on a lounge platter.",
      img: "images/heritage-shahi-tukda.jpg"
    },
    {
      id: "f15",
      name: "Kulhad Chai Pour",
      cat: "sweets",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Warm Sip",
      price: 650,
      desc: "Hot spiced milk tea poured fresh into a traditional clay kulhad cup.",
      img: "images/drink-blue-lagoon.jpg"
    }
  ];

  const comboItems = [
    {
      id: "c1",
      name: "Royal Lounge Platter Combo",
      genre: "action",
      genreLabel: "Action & IMAX",
      tag: "Grand Spread",
      price: 4600,
      desc: "Burger, fries, crispy bites, club sandwiches, and pizza slices.",
      img: "images/combo-royal-feast.jpg"
    },
    {
      id: "c2",
      name: "Midnight Double Burger Combo",
      genre: "thriller",
      genreLabel: "Midnight & Thriller",
      tag: "Late Screening",
      price: 2950,
      desc: "Stacked melted-cheese burgers served with a chilled frothy drink.",
      img: "images/combo-midnight-thriller.jpg"
    },
    {
      id: "c3",
      name: "Classic Family Feast Box",
      genre: "comedy",
      genreLabel: "Comedy & Family",
      tag: "Group Feast",
      price: 5600,
      desc: "Sharing spread with sandwiches, crispy tenders, salad, fries, and pizza.",
      img: "images/combo-family-pack.jpg"
    },
    {
      id: "c4",
      name: "Pepperoni & Lounge Table Combo",
      genre: "action",
      genreLabel: "Action & IMAX",
      tag: "Premiere Pack",
      price: 4950,
      desc: "Hearty lounge platter featuring pizza, burger, fries, and crispy bites.",
      img: "images/pizza-pepperoni.jpg"
    },
    {
      id: "c5",
      name: "Tartufo & Lounge Feast Combo",
      genre: "romance",
      genreLabel: "Drama & Romance",
      tag: "Evening Spread",
      price: 5200,
      desc: "Generous sharing spread with pizza, sandwiches, fries, and crispy sides.",
      img: "images/pizza-tartufo.jpg"
    },
    {
      id: "c6",
      name: "Cinema Popcorn Battle Combo",
      genre: "thriller",
      genreLabel: "Midnight & Thriller",
      tag: "Screening Pack",
      price: 3400,
      desc: "Cinema popcorn paired with lounge snacks for late-night screenings.",
      img: "images/popcorn-battle.jpg"
    }
  ];

  const shows = [
    {
      id: "s1",
      title: "Solaris Horizon",
      genre: "action",
      tag: "IMAX Laser",
      hall: "Hall 01",
      time: "07:30 PM",
      price: 1800,
      desc: "Sci-fi spectacle calibrated for grand-format projection and surround audio.",
      img: "images/gallery-imax.jpg"
    },
    {
      id: "s2",
      title: "Velvet Echoes",
      genre: "romance",
      tag: "Atmos",
      hall: "Hall 02",
      time: "09:45 PM",
      price: 1800,
      desc: "Atmospheric drama paired with warm lounge seating and intermission treats.",
      img: "images/gallery-royal-salon.jpg"
    },
    {
      id: "s3",
      title: "Nightfall in Margalla",
      genre: "thriller",
      tag: "Royal Salon",
      hall: "Hall 03",
      time: "11:30 PM",
      price: 2200,
      desc: "Late-night thriller screening with direct recliner butler service.",
      img: "images/gallery-recliners.jpg"
    },
    {
      id: "s4",
      title: "Sunday at F-7",
      genre: "comedy",
      tag: "Lounge Matinee",
      hall: "Hall 02",
      time: "04:15 PM",
      price: 1600,
      desc: "Lighthearted family comedy screening with classic popcorn and sweet treats.",
      img: "images/gallery-concession-bar.jpg"
    }
  ];

  const defaultReviews = [
    {
      id: "r1",
      author: "Bilal K., Islamabad",
      hall: "Hall 01 — IMAX",
      rating: 5,
      comment: "Super comfortable recliners and the caramel popcorn arrived right before the trailers ended.",
      date: "Verified Screening"
    },
    {
      id: "r2",
      author: "Sana M., F-7 Markaz",
      hall: "Food & Butler Service",
      rating: 5,
      comment: "Ordering pizza and burgers straight to the seat without missing a scene makes movie night effortless.",
      date: "Verified Dining Order"
    },
    {
      id: "r3",
      author: "Hamza R., Rawalpindi",
      hall: "Hall 03 — Royal Salon",
      rating: 5,
      comment: "Crisp sound, clean halls, and the jokes corner free-ticket contest keeps our group coming back.",
      date: "Verified Screening"
    },
    {
      id: "r4",
      author: "Ayesha T., E-7",
      hall: "Hall 02 — Atmos",
      rating: 5,
      comment: "The spatial audio in Hall 02 during evening dramas is unmatched in Islamabad.",
      date: "Verified Screening"
    },
    {
      id: "r5",
      author: "Usman Q., F-6",
      hall: "Food & Butler Service",
      rating: 5,
      comment: "Kulhad chai and hot snacks delivered silently in 9 minutes flat.",
      date: "Verified Dining Order"
    },
    {
      id: "r6",
      author: "Minaal S., Bahria Town",
      hall: "Hall 01 — IMAX",
      rating: 5,
      comment: "Legroom, recliner angle, and screen brightness are genuinely top tier.",
      date: "Verified Screening"
    }
  ];

  const defaultJokes = [
    {
      id: "j1",
      author: "Zainab",
      text: "Why did the popcorn get kicked out of the cinema? Because it kept popping up during the quiet scene!",
      laughs: 14
    },
    {
      id: "j2",
      author: "Daniyal",
      text: "My friend ordered a large burger for a 3-hour movie and still finished it before the trailers ended.",
      laughs: 11
    },
    {
      id: "j3",
      author: "Areeba",
      text: "The recliner is so comfortable I almost needed a boarding pass just to sit down.",
      laughs: 9
    }
  ];

  let activeCat = "all";
  let activeGenre = "all";
  let activeShowGenre = "all";
  let tray = [];
  let pendingPayment = null;
  let selectedSeats = [];
  let reviews = [];
  let activeReviewCat = "all";
  let jokes = [];
  let laughedIds = [];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------- TRAY & PAYMENT ----------
  function loadTray() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(TRAY_STORAGE_KEY) || "[]");
      tray = Array.isArray(raw) ? raw : [];
    } catch (e) {
      tray = [];
    }
  }

  function saveTray() {
    try {
      window.localStorage.setItem(TRAY_STORAGE_KEY, JSON.stringify(tray));
    } catch (e) {}
  }

  function getTrayTotal() {
    return tray.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function hidePaymentPanels() {
    const payPanel = document.getElementById("paymentStepPanel");
    const billPanel = document.getElementById("billOtpPanel");
    const payErr = document.getElementById("paymentValidationError");
    const otpErr = document.getElementById("otpValidationError");
    if (payPanel) payPanel.style.display = "none";
    if (billPanel) billPanel.style.display = "none";
    if (payErr) { payErr.style.display = "none"; payErr.textContent = ""; }
    if (otpErr) { otpErr.style.display = "none"; otpErr.textContent = ""; }
  }

  function updateTrayUI() {
    const count = tray.reduce((sum, item) => sum + item.qty, 0);
    const total = getTrayTotal();

    const navBadge = document.getElementById("navTrayCount");
    const heroBadge = document.getElementById("heroTrayCount");
    const totalEl = document.getElementById("trayTotal");
    const list = document.getElementById("trayItemsList");

    if (navBadge) navBadge.textContent = count;
    if (heroBadge) heroBadge.textContent = count;
    if (totalEl) totalEl.textContent = "PKR " + total.toLocaleString();

    if (!list) return;

    if (!tray.length) {
      list.innerHTML = "<p class='text-muted'>Your Lounge Tray is empty.</p>";
      hidePaymentPanels();
      return;
    }

    list.innerHTML = tray.map(item => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <div>
          <strong style="color:#fff;">${escapeHtml(item.name)}</strong>
          <div style="font-size:0.85rem;color:var(--color-gold);">PKR ${(item.price * item.qty).toLocaleString()}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button type="button" class="stepper-btn qty-dec" data-id="${escapeHtml(item.id)}">-</button>
          <span>${item.qty}</span>
          <button type="button" class="stepper-btn qty-inc" data-id="${escapeHtml(item.id)}">+</button>
        </div>
      </div>
    `).join("");
  }

  function addItemToTray(item) {
    const found = tray.find(i => i.id === item.id);
    if (found) found.qty += 1;
    else tray.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    saveTray();

    const alertBox = document.getElementById("trayOrderAlert");
    if (alertBox) alertBox.style.display = "none";

    updateTrayUI();
    const drawer = document.getElementById("trayDrawer");
    if (drawer) {
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function syncPaymentLabel() {
    const method = document.querySelector('input[name="trayPaymentMethod"]:checked')?.value || "card";
    const label = document.getElementById("paymentAccountLabel");
    const input = document.getElementById("trayAccountInput");
    const err = document.getElementById("paymentValidationError");
    if (err) { err.style.display = "none"; err.textContent = ""; }

    if (!label || !input) return;
    if (method === "card") {
      label.textContent = "Card Number (11 Digits)";
      input.placeholder = "Enter 11-digit card number";
    } else if (method === "easypaisa") {
      label.textContent = "EasyPaisa Number (11 Digits)";
      input.placeholder = "Enter 11-digit EasyPaisa number";
    } else {
      label.textContent = "JazzCash Number (11 Digits)";
      input.placeholder = "Enter 11-digit JazzCash number";
    }
  }

  function initTrayAndPayment() {
    loadTray();
    updateTrayUI();

    const drawer = document.getElementById("trayDrawer");
    const openTray = () => {
      updateTrayUI();
      if (drawer) {
        drawer.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    };
    const closeTray = () => {
      if (drawer) {
        drawer.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    document.getElementById("openTrayBtn")?.addEventListener("click", openTray);
    document.getElementById("heroTrayBtn")?.addEventListener("click", openTray);
    document.getElementById("subnavTrayBtn")?.addEventListener("click", openTray);
    document.getElementById("closeTrayBtn")?.addEventListener("click", closeTray);
    drawer?.addEventListener("click", e => {
      if (e.target.id === "trayDrawer") closeTray();
    });

    document.getElementById("trayItemsList")?.addEventListener("click", e => {
      const dec = e.target.closest(".qty-dec");
      const inc = e.target.closest(".qty-inc");
      const id = (dec || inc)?.dataset.id;
      if (!id) return;
      const entry = tray.find(i => i.id === id);
      if (!entry) return;
      entry.qty += inc ? 1 : -1;
      if (entry.qty <= 0) tray = tray.filter(i => i.id !== id);
      saveTray();
      updateTrayUI();
    });

    document.getElementById("clearTrayBtn")?.addEventListener("click", () => {
      tray = [];
      pendingPayment = null;
      saveTray();
      const alertBox = document.getElementById("trayOrderAlert");
      if (alertBox) alertBox.style.display = "none";
      updateTrayUI();
    });

    document.querySelectorAll('input[name="trayPaymentMethod"]').forEach(radio => {
      radio.addEventListener("change", syncPaymentLabel);
    });

    document.getElementById("placeTrayOrderBtn")?.addEventListener("click", () => {
      const alertBox = document.getElementById("trayOrderAlert");
      if (!tray.length) {
        if (alertBox) {
          alertBox.style.display = "block";
          alertBox.style.background = "rgba(220, 38, 38, 0.18)";
          alertBox.style.border = "1px solid #ef4444";
          alertBox.style.color = "#fca5a5";
          alertBox.textContent = "Please add items to your Lounge Tray first.";
        }
        return;
      }
      if (alertBox) alertBox.style.display = "none";
      const billPanel = document.getElementById("billOtpPanel");
      const payPanel = document.getElementById("paymentStepPanel");
      if (billPanel) billPanel.style.display = "none";
      if (payPanel) payPanel.style.display = "block";
      syncPaymentLabel();
    });

    document.getElementById("backToTrayBtn")?.addEventListener("click", hidePaymentPanels);

    document.getElementById("reviewBillOtpBtn")?.addEventListener("click", () => {
      const method = document.querySelector('input[name="trayPaymentMethod"]:checked')?.value || "card";
      const rawAccount = document.getElementById("trayAccountInput")?.value || "";
      const digitsOnly = rawAccount.replace(/\D/g, "");
      const errBox = document.getElementById("paymentValidationError");

      if (digitsOnly.length !== 11) {
        let msg = "Card number must be exactly 11 digits.";
        if (method === "easypaisa") msg = "EasyPaisa number must be exactly 11 digits.";
        if (method === "jazzcash") msg = "JazzCash number must be exactly 11 digits.";
        if (errBox) {
          errBox.style.display = "block";
          errBox.textContent = msg;
        }
        return;
      }

      if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }

      const methodLabel = method === "card"
        ? "Card"
        : method === "easypaisa"
          ? "EasyPaisa"
          : "JazzCash";

      const mode = document.getElementById("deliveryModeSelect")?.value || "In-Seat Butler";
      const seatRef = document.getElementById("seatOrGuestRef")?.value.trim() || "VIP Guest";
      const subtotal = getTrayTotal();

      pendingPayment = { methodLabel, digitsOnly, mode, seatRef, subtotal };

      const itemsSummary = tray.map(i =>
        `<div class="bill-line"><span>${escapeHtml(i.name)} × ${i.qty}</span><span>PKR ${(i.price * i.qty).toLocaleString()}</span></div>`
      ).join("");

      const billBox = document.getElementById("billBreakdownBox");
      if (billBox) {
        billBox.innerHTML = `
          ${itemsSummary}
          <div class="bill-line"><span>Delivery</span><span>${escapeHtml(mode)} (${escapeHtml(seatRef)})</span></div>
          <div class="bill-line"><span>Method</span><span>${escapeHtml(methodLabel)} (${escapeHtml(digitsOnly)})</span></div>
          <div class="bill-line"><span>Total Bill</span><span>PKR ${subtotal.toLocaleString()}</span></div>
        `;
      }

      const otpInput = document.getElementById("trayOtpInput");
      if (otpInput) otpInput.value = "";
      const otpErr = document.getElementById("otpValidationError");
      if (otpErr) { otpErr.style.display = "none"; otpErr.textContent = ""; }

      document.getElementById("paymentStepPanel").style.display = "none";
      document.getElementById("billOtpPanel").style.display = "block";
    });

    document.getElementById("backToPaymentBtn")?.addEventListener("click", () => {
      document.getElementById("billOtpPanel").style.display = "none";
      document.getElementById("paymentStepPanel").style.display = "block";
    });

    document.getElementById("confirmPaymentBtn")?.addEventListener("click", () => {
      const otpRaw = (document.getElementById("trayOtpInput")?.value || "").trim();
      const otpErr = document.getElementById("otpValidationError");

      if (!/^\d{4}$/.test(otpRaw)) {
        if (otpErr) {
          otpErr.style.display = "block";
          otpErr.textContent = "Please enter any 4-digit OTP code (0–9).";
        }
        return;
      }

      if (otpErr) { otpErr.style.display = "none"; otpErr.textContent = ""; }

      const info = pendingPayment || {
        methodLabel: "Card",
        digitsOnly: "",
        mode: document.getElementById("deliveryModeSelect")?.value || "In-Seat Butler",
        seatRef: document.getElementById("seatOrGuestRef")?.value.trim() || "VIP Guest",
        subtotal: getTrayTotal()
      };

      const orderCode = "TR-" + Math.floor(1000 + Math.random() * 9000);
      const alertBox = document.getElementById("trayOrderAlert");
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.style.background = "rgba(34, 197, 94, 0.16)";
        alertBox.style.border = "1px solid #22c55e";
        alertBox.style.color = "#86efac";
        alertBox.innerHTML = `<strong>Order #${orderCode} Confirmed!</strong> Paid PKR ${info.subtotal.toLocaleString()} via <strong>${escapeHtml(info.methodLabel)}</strong> (${escapeHtml(info.digitsOnly)}) • OTP verified • Sent to <strong>${escapeHtml(info.mode)}</strong> (${escapeHtml(info.seatRef)}).`;
      }

      tray = [];
      pendingPayment = null;
      if (document.getElementById("trayAccountInput")) {
        document.getElementById("trayAccountInput").value = "";
      }
      saveTray();
      updateTrayUI();
    });
  }

  // ---------- FOOD & SNACKS PAGE ----------
  function renderFoods() {
    const grid = document.getElementById("foodMenuGrid");
    if (!grid) return;

    const items = foodItems.filter(item => {
      const matchCat = activeCat === "all" || item.cat === activeCat;
      const matchGenre = activeGenre === "all" || item.genre === activeGenre;
      return matchCat && matchGenre;
    });

    if (!items.length) {
      grid.innerHTML = `<p class="text-muted" style="grid-column:1/-1;text-align:center;">No food items match both filters—try "All Categories" or "All Genres".</p>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <article class="movie-card">
        <div class="movie-poster-wrap" style="aspect-ratio:16/10;">
          <img src="${item.img}" alt="${escapeHtml(item.name)}" onerror="this.closest('.movie-card').style.display='none'">
          <div class="movie-poster-overlay"></div>
          <span class="movie-format-pill badge badge-gold">${escapeHtml(item.tag)}</span>
          <span class="movie-rating-pill">${escapeHtml(item.genreLabel)}</span>
        </div>
        <div class="movie-card-body">
          <h3 class="movie-title">${escapeHtml(item.name)}</h3>
          <p class="movie-desc">${escapeHtml(item.desc)}</p>
          <div class="movie-card-footer">
            <div class="movie-card-price">PKR ${item.price.toLocaleString()}</div>
            <button type="button" class="btn btn-gold btn-sm add-food" data-id="${escapeHtml(item.id)}">+ Add to Tray</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderCombos() {
    const grid = document.getElementById("combosGrid");
    if (!grid) return;

    const items = activeGenre === "all"
      ? comboItems
      : comboItems.filter(item => item.genre === activeGenre);

    if (!items.length) {
      grid.innerHTML = `<p class="text-muted" style="grid-column:1/-1;text-align:center;">No combos for this genre filter.</p>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <article class="movie-card">
        <div class="movie-poster-wrap" style="aspect-ratio:16/10;">
          <img src="${item.img}" alt="${escapeHtml(item.name)}" onerror="this.closest('.movie-card').style.display='none'">
          <div class="movie-poster-overlay"></div>
          <span class="movie-format-pill badge badge-crimson">${escapeHtml(item.tag)}</span>
          <span class="movie-rating-pill">${escapeHtml(item.genreLabel)}</span>
        </div>
        <div class="movie-card-body">
          <h3 class="movie-title">${escapeHtml(item.name)}</h3>
          <p class="movie-desc">${escapeHtml(item.desc)}</p>
          <div class="movie-card-footer">
            <div class="movie-card-price">PKR ${item.price.toLocaleString()}</div>
            <button type="button" class="btn btn-primary btn-sm add-combo" data-id="${escapeHtml(item.id)}">+ Add Combo</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function setActiveCategory(cat) {
    activeCat = cat;
    document.querySelectorAll("#foodCategoryFilters .genre-filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.cat === cat);
    });
    document.querySelectorAll("#subnavLinks .page-subnav-link[data-subfilter]").forEach(link => {
      const sf = link.dataset.subfilter;
      const isMatch = (cat === "all" && sf === "all") || (cat !== "all" && sf === cat);
      link.classList.toggle("active", isMatch);
    });
    renderFoods();
  }

  function initFoodPage() {
    if (!document.getElementById("foodMenuGrid") && !document.getElementById("combosGrid")) return;
    renderFoods();
    renderCombos();

    document.querySelectorAll("#foodCategoryFilters .genre-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => setActiveCategory(btn.dataset.cat));
    });

    document.querySelectorAll("#subnavLinks .page-subnav-link[data-subfilter]").forEach(link => {
      link.addEventListener("click", () => {
        const sf = link.dataset.subfilter;
        if (sf === "combos") {
          document.querySelectorAll("#subnavLinks .page-subnav-link").forEach(l => {
            l.classList.toggle("active", l.dataset.subfilter === "combos");
          });
        } else {
          setActiveCategory(sf);
        }
      });
    });

    const genreBtns = document.querySelectorAll("#foodGenreFilters .genre-filter-btn");
    genreBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        genreBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeGenre = btn.dataset.genre;
        renderFoods();
        renderCombos();
      });
    });

    document.getElementById("foodMenuGrid")?.addEventListener("click", e => {
      const btn = e.target.closest(".add-food");
      if (!btn) return;
      const item = foodItems.find(f => f.id === btn.dataset.id);
      if (item) addItemToTray(item);
    });

    document.getElementById("combosGrid")?.addEventListener("click", e => {
      const btn = e.target.closest(".add-combo");
      if (!btn) return;
      const item = comboItems.find(c => c.id === btn.dataset.id);
      if (item) addItemToTray(item);
    });
  }

  // ---------- CINEMA PAGE ----------
  function renderShows() {
    const grid = document.getElementById("showsGrid");
    if (!grid) return;

    const list = activeShowGenre === "all"
      ? shows
      : shows.filter(s => s.genre === activeShowGenre);

    grid.innerHTML = list.map(s => `
      <article class="movie-card">
        <div class="movie-poster-wrap" style="aspect-ratio:16/10;">
          <img src="${s.img}" alt="${escapeHtml(s.title)}" onerror="this.closest('.movie-card').style.display='none'">
          <div class="movie-poster-overlay"></div>
          <span class="movie-format-pill badge badge-gold">${escapeHtml(s.tag)}</span>
          <span class="movie-rating-pill">${escapeHtml(s.hall)} • ${escapeHtml(s.time)}</span>
        </div>
        <div class="movie-card-body">
          <h3 class="movie-title">${escapeHtml(s.title)}</h3>
          <p class="movie-desc">${escapeHtml(s.desc)}</p>
          <div class="movie-card-footer">
            <div class="movie-card-price">PKR ${s.price.toLocaleString()}</div>
            <a href="#floorplan" class="btn btn-gold btn-sm">Select Seats</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderSeats() {
    const wrap = document.getElementById("seatMapRows");
    if (!wrap) return;
    const rows = ["A", "B", "C", "D"];
    wrap.innerHTML = rows.map(r => {
      const btns = [1, 2, 3, 4, 5, 6].map(n => {
        const code = `${r}${n}`;
        const active = selectedSeats.includes(code) ? "selected" : "";
        return `<button type="button" class="seat-btn ${active}" data-seat="${code}">${code}</button>`;
      }).join("");
      return `<div class="seat-row"><span style="width:22px;color:var(--color-gold);font-weight:700;">${r}</span>${btns}</div>`;
    }).join("");

    const label = document.getElementById("selectedSeatsLabel");
    const total = document.getElementById("seatTotalLabel");
    if (label) label.textContent = selectedSeats.length ? selectedSeats.join(", ") : "None";
    if (total) total.textContent = "PKR " + (selectedSeats.length * SEAT_PRICE).toLocaleString();
  }

  function initCinemaPage() {
    if (!document.getElementById("showsGrid") && !document.getElementById("seatMapRows")) return;
    renderShows();
    renderSeats();

    const genreBtns = document.querySelectorAll("#cinemaGenreFilters .genre-filter-btn");
    genreBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        genreBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeShowGenre = btn.dataset.showgenre;
        renderShows();
      });
    });

    document.getElementById("seatMapRows")?.addEventListener("click", e => {
      const btn = e.target.closest(".seat-btn");
      if (!btn) return;
      const seat = btn.dataset.seat;
      if (selectedSeats.includes(seat)) {
        selectedSeats = selectedSeats.filter(s => s !== seat);
      } else {
        selectedSeats.push(seat);
      }
      renderSeats();
    });

    document.getElementById("clearSeatsBtn")?.addEventListener("click", () => {
      selectedSeats = [];
      renderSeats();
      const alertBox = document.getElementById("seatBookingAlert");
      if (alertBox) alertBox.style.display = "none";
    });

    document.getElementById("confirmSeatHoldBtn")?.addEventListener("click", () => {
      const alertBox = document.getElementById("seatBookingAlert");
      if (!alertBox) return;
      if (!selectedSeats.length) {
        alertBox.style.display = "block";
        alertBox.style.background = "rgba(220, 38, 38, 0.18)";
        alertBox.style.border = "1px solid #ef4444";
        alertBox.style.color = "#fca5a5";
        alertBox.textContent = "Please select at least one recliner seat first.";
        return;
      }
      const hall = document.getElementById("floorHallSelect")?.value || "Hall 01";
      const guest = (document.getElementById("floorGuestInput")?.value || "").trim() || "Guest";
      const totalAmt = (selectedSeats.length * SEAT_PRICE).toLocaleString();
      alertBox.style.display = "block";
      alertBox.style.background = "rgba(34, 197, 94, 0.16)";
      alertBox.style.border = "1px solid #22c55e";
      alertBox.style.color = "#86efac";
      alertBox.innerHTML = `<strong>Seats Held!</strong> ${escapeHtml(guest)} — ${escapeHtml(hall)} • Seats: <strong>${escapeHtml(selectedSeats.join(", "))}</strong> (PKR ${totalAmt}).`;
    });
  }

  // ---------- GUEST REVIEWS & JOKES FREE-TICKET PAGE ----------
  function loadReviews() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(REVIEWS_STORAGE_KEY) || "null");
      reviews = Array.isArray(raw) && raw.length ? raw : defaultReviews.slice();
    } catch (e) {
      reviews = defaultReviews.slice();
    }
  }

  function saveReviews() {
    try {
      window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {}
  }

  function renderReviews() {
    const grid = document.getElementById("reviewsGridContainer");
    const totalEl = document.getElementById("totalReviewsCount");
    if (totalEl) totalEl.textContent = reviews.length;
    if (!grid) return;

    const filtered = activeReviewCat === "all"
      ? reviews
      : reviews.filter(r => r.hall === activeReviewCat);

    if (!filtered.length) {
      grid.innerHTML = `<p class="text-muted" style="grid-column:1/-1;text-align:center;">No reviews under this category yet—be the first to write one below!</p>`;
      return;
    }

    grid.innerHTML = filtered.map(r => {
      const ratingNum = parseInt(r.rating, 10) || 5;
      const stars = "★".repeat(Math.max(1, Math.min(5, ratingNum))) + "☆".repeat(Math.max(0, 5 - ratingNum));
      return `
        <article class="review-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
              <span style="color:var(--color-gold);font-weight:700;">${stars}</span>
              <span class="badge badge-gold" style="font-size:0.72rem;">${escapeHtml(r.hall)}</span>
            </div>
            <p class="movie-desc" style="color:var(--color-text-light);">"${escapeHtml(r.comment)}"</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.84rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;">
            <strong style="color:#fff;">— ${escapeHtml(r.author)}</strong>
            <span class="text-muted">${escapeHtml(r.date || "Verified Guest")}</span>
          </div>
        </article>
      `;
    }).join("");
  }

  function showFormMessage(boxId, msg, isError) {
    const box = document.getElementById(boxId);
    if (!box) return;
    box.style.display = "block";
    if (isError) {
      box.style.background = "rgba(220, 38, 38, 0.18)";
      box.style.border = "1px solid #ef4444";
      box.style.color = "#fca5a5";
    } else {
      box.style.background = "rgba(34, 197, 94, 0.16)";
      box.style.border = "1px solid #22c55e";
      box.style.color = "#86efac";
    }
    box.textContent = msg;
  }

  function loadJokes() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(JOKES_STORAGE_KEY) || "null");
      jokes = Array.isArray(raw) && raw.length ? raw : defaultJokes.slice();
    } catch (e) {
      jokes = defaultJokes.slice();
    }
  }

  function saveJokes() {
    try {
      window.localStorage.setItem(JOKES_STORAGE_KEY, JSON.stringify(jokes));
    } catch (e) {}
  }

  function loadLaughedIds() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(LAUGHED_STORAGE_KEY) || "[]");
      laughedIds = Array.isArray(raw) ? raw : [];
    } catch (e) {
      laughedIds = [];
    }
  }

  function saveLaughedIds() {
    try {
      window.localStorage.setItem(LAUGHED_STORAGE_KEY, JSON.stringify(laughedIds));
    } catch (e) {}
  }

  function renderJokesAndWinner() {
    const listEl = document.getElementById("jokesListContainer");
    const leaderText = document.getElementById("leaderText");
    const leaderBadge = document.getElementById("leaderLaughsBadge");
    if (!listEl) return;

    const sorted = jokes.slice().sort((a, b) => b.laughs - a.laughs);
    const topJoke = sorted[0];

    if (topJoke && leaderText && leaderBadge) {
      leaderText.textContent = `${topJoke.author} is leading for the Free Ticket with "${topJoke.text}"`;
      leaderBadge.textContent = `${topJoke.laughs} ${topJoke.laughs === 1 ? "Laugh" : "Laughs"} 😂`;
    }

    listEl.innerHTML = sorted.map((joke, idx) => {
      const isLeader = idx === 0 && joke.laughs > 0;
      const hasLaughed = laughedIds.includes(joke.id);
      return `
        <article class="joke-card ${isLeader ? "leading-joke" : ""}">
          <div style="flex:1;min-width:220px;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
              <strong style="color:#fff;">${escapeHtml(joke.author)}</strong>
              ${isLeader ? '<span class="badge badge-gold">🎟️ Free Ticket Leader</span>' : ""}
            </div>
            <p class="movie-desc" style="margin:0;color:var(--color-text-light);">"${escapeHtml(joke.text)}"</p>
          </div>
          <button type="button" class="laugh-btn add-laugh-btn ${hasLaughed ? "laughed" : ""}" data-id="${escapeHtml(joke.id)}">
            <span>${hasLaughed ? "😂 Laughed" : "😂 Laugh"}</span>
            <span>(${joke.laughs})</span>
          </button>
        </article>
      `;
    }).join("");
  }

  function initReviewsPage() {
    if (document.getElementById("reviewsGridContainer")) {
      loadReviews();
      renderReviews();

      const revCatBtns = document.querySelectorAll("#reviewCategoryFilters .genre-filter-btn");
      revCatBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          revCatBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          activeReviewCat = btn.dataset.revcat;
          renderReviews();
        });
      });

      document.getElementById("guestReviewForm")?.addEventListener("submit", e => {
        e.preventDefault();
        const nameInput = document.getElementById("reviewGuestName");
        const hallSelect = document.getElementById("reviewHallSelect");
        const ratingSelect = document.getElementById("reviewRatingSelect");
        const commentInput = document.getElementById("reviewCommentInput");

        const author = (nameInput?.value || "").trim() || "Guest";
        const hall = hallSelect?.value || "Hall 01 — IMAX";
        const rating = parseInt(ratingSelect?.value || "5", 10) || 5;
        const comment = (commentInput?.value || "").trim();

        if (!comment) {
          showFormMessage("reviewFormFeedback", "Please write your review comment before submitting.", true);
          commentInput?.focus();
          return;
        }

        reviews.unshift({
          id: "r_" + Date.now(),
          author,
          hall,
          rating,
          comment,
          date: "Just Now"
        });

        saveReviews();
        activeReviewCat = "all";
        document.querySelectorAll("#reviewCategoryFilters .genre-filter-btn").forEach(b => {
          b.classList.toggle("active", b.dataset.revcat === "all");
        });
        renderReviews();
        showFormMessage("reviewFormFeedback", "Thank you! Your guest review has been published above.", false);
        if (commentInput) commentInput.value = "";
      });
    }

    if (document.getElementById("jokesListContainer") || document.getElementById("jokeEntryForm")) {
      loadJokes();
      loadLaughedIds();
      renderJokesAndWinner();

      const form = document.getElementById("jokeEntryForm");
      const authorInput = document.getElementById("jokeAuthorInput");
      const jokeInput = document.getElementById("jokeTextInput");

      form?.addEventListener("submit", e => {
        e.preventDefault();
        const author = (authorInput?.value || "").trim() || "Guest";
        const text = (jokeInput?.value || "").trim();

        if (!text) {
          showFormMessage("jokeFormFeedback", "Please type a joke before clicking Enter Joke.", true);
          jokeInput?.focus();
          return;
        }

        jokes.unshift({
          id: "j_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
          author,
          text,
          laughs: 1
        });

        saveJokes();
        renderJokesAndWinner();
        showFormMessage("jokeFormFeedback", "Joke entered! You can give 1 laugh per joke toward the free ticket.", false);

        if (jokeInput) {
          jokeInput.value = "";
          jokeInput.focus();
        }
      });

      document.getElementById("jokesListContainer")?.addEventListener("click", e => {
        const btn = e.target.closest(".add-laugh-btn");
        if (!btn) return;
        const id = btn.dataset.id;
        const target = jokes.find(j => j.id === id);
        if (!target) return;

        if (laughedIds.includes(id)) {
          target.laughs = Math.max(0, target.laughs - 1);
          laughedIds = laughedIds.filter(item => item !== id);
        } else {
          target.laughs += 1;
          laughedIds.push(id);
        }

        saveJokes();
        saveLaughedIds();
        renderJokesAndWinner();
      });
    }
  }

  // ---------- GLOBAL NAV & SCROLL ----------
  function initSharedChrome() {
    const hamburger = document.getElementById("navHamburger");
    const menu = document.getElementById("navMenu");
    const header = document.getElementById("mainHeader");

    hamburger?.addEventListener("click", () => {
      menu?.classList.toggle("mobile-open");
    });

    window.addEventListener("scroll", () => {
      if (!header) return;
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }

  function initAll() {
    initSharedChrome();
    initTrayAndPayment();
    initFoodPage();
    initCinemaPage();
    initReviewsPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();