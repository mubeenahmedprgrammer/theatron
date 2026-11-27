/* ==========================================================================
   THEATRON — Complete Interactive Engine, Full Data & Multi-Step Checkout
   ========================================================================== */

const REPERTOIRE_MOVIES = [
  {
    id: 'mov-hasnain',
    title: 'Shadow Strike: Vengeance',
    actor: 'Hasnain (Most Liked Actor)',
    genre: 'Action',
    hall: 'Hall 01 • Dual-Laser IMAX',
    duration: '2h 28m • PG-13',
    rating: '9.6 ★',
    times: ['04:30 PM', '07:30 PM', '10:45 PM'],
    recommendedPairings: ['pop-1', 'pop-3', 'snk-1', 'snk-2', 'drk-3'],
    pairingNote: 'High-octane IMAX action pairs best with Wagyu Smash Burgers, Smoky Peri-Peri Popcorn & Midnight Espresso Tonics.',
    synopsis: 'When an elite covert operative is betrayed in the high peaks of northern Pakistan, Hasnain leads an adrenaline-charged mission across rooftops and mountain passes in native 4K IMAX.',
    img: 'images/movie-hasnain.jpg'
  },
  {
    id: 'mov-karakoram',
    title: 'Eclipse Over Karakoram',
    genre: 'Action',
    actor: 'Zayd Malik & Sara Khan',
    hall: 'Hall 03 • Dolby Atmos VIP',
    duration: '2h 15m • PG-13',
    rating: '9.2 ★',
    times: ['06:00 PM', '09:15 PM'],
    recommendedPairings: ['pop-3', 'snk-5', 'snk-6', 'her-3'],
    pairingNote: 'Bold mountain adventure paired with Peshawari Shinwari Skewers, Loaded Fries & Korean Corn Dogs.',
    synopsis: 'A rescue squadron races against a solar storm above K2 in a breathless Dolby Atmos survival thriller.',
    img: 'images/movie-karakoram.jpg'
  },
  {
    id: 'mov-duet',
    title: 'Midnight Duet in Lahore',
    genre: 'Love Story',
    actor: 'Ahad & Mahira',
    hall: 'Hall 02 • Royal Velvet Lounge',
    duration: '2h 08m • PG',
    rating: '9.4 ★',
    times: ['05:15 PM', '08:30 PM'],
    recommendedPairings: ['pop-2', 'drk-1', 'drk-2', 'her-4'],
    pairingNote: 'Romantic Velvet Lounge screening matched with Salted Caramel Hazelnut Popcorn, Ruby Rose Sparklers & Shahi Tukda.',
    synopsis: 'Two classical musicians cross paths during a monsoon night in Old Lahore, sparking an unforgettable musical romance.',
    img: 'images/movie-midnight-duet.jpg'
  },
  {
    id: 'mov-blackwood',
    title: 'The Haunting of Blackwood Manor',
    genre: 'Horror',
    actor: 'Daniyal & Hira',
    hall: 'Hall 01 • Dual-Laser IMAX',
    duration: '1h 58m • R',
    rating: '9.1 ★',
    times: ['11:30 PM (Midnight Show)'],
    recommendedPairings: ['pop-3', 'snk-3', 'snk-8', 'drk-3'],
    pairingNote: 'Late-night horror survival kit: Tartufo Burrata Pizza, Double Cheddar Smash & Midnight Espresso.',
    synopsis: 'A paranormal archivist unlocks a sealed wing of a colonial estate where every whisper echoes in 64-channel Dolby Atmos.',
    img: 'images/movie-eclipse.jpg'
  },
  {
    id: 'mov-indus',
    title: 'Architects of the Indus',
    genre: 'Documentary',
    actor: 'Narrated by Zia Mohyeddin Archive',
    hall: 'Hall 02 • Royal Velvet Lounge',
    duration: '1h 45m • G',
    rating: '9.5 ★',
    times: ['04:00 PM', '07:00 PM'],
    recommendedPairings: ['pop-1', 'her-1', 'her-2', 'drk-2'],
    pairingNote: 'Cultural heritage showcase best enjoyed with Kashmiri Pink Chai, Cocktail Samosas & Lahori Samosa Chaat.',
    synopsis: 'An ultra-HD visual journey tracing 5,000 years of engineering, art, and river civilization from Mohenjo-daro to the Himalayas.',
    img: 'images/movie-architects-indus.jpg'
  },
  {
    id: 'mov-crimson',
    title: 'Crimson Horizon',
    genre: 'Action',
    actor: 'Hamza Ali',
    hall: 'Hall 01 • Dual-Laser IMAX',
    duration: '2h 12m • PG-13',
    rating: '9.0 ★',
    times: ['03:30 PM', '09:45 PM'],
    recommendedPairings: ['snk-2', 'snk-7', 'pop-1', 'drk-1'],
    pairingNote: 'Fast-paced espionage paired with mess-free Crispy Zinger Wraps & Nashville Hot Chicken Burgers.',
    synopsis: 'A diplomatic courier has 90 minutes to cross a locked-down metropolis before midnight.',
    img: 'images/curation-action.jpg'
  },
  {
    id: 'mov-margalla',
    title: 'Letters to Margalla',
    genre: 'Love Story',
    actor: 'Bilal & Sajal',
    hall: 'Hall 02 • Royal Velvet Lounge',
    duration: '2h 04m • PG',
    rating: '9.3 ★',
    times: ['06:45 PM', '09:30 PM'],
    recommendedPairings: ['pop-2', 'snk-4', 'drk-2', 'her-4'],
    pairingNote: 'Cozy rainy-evening romance paired with Stone-Baked Mini Pizzas & Spiced Kashmiri Pink Chai.',
    synopsis: 'An architect restoring a heritage cabin in the Margalla Hills discovers unsent letters from 1974.',
    img: 'images/hero-cinema.jpg'
  },
  {
    id: 'mov-whispers',
    title: 'Whispers in the Velvet Dark',
    genre: 'Horror',
    actor: 'Osman Khalid',
    hall: 'Hall 03 • Dolby Atmos VIP',
    duration: '1h 52m • R',
    rating: '8.9 ★',
    times: ['10:30 PM'],
    recommendedPairings: ['pop-3', 'snk-5', 'drk-3'],
    pairingNote: 'Edge-of-your-seat thriller fuel: Loaded Animal-Style Fries & Peri-Peri Cheddar Popcorn.',
    synopsis: 'During a midnight premiere, the audience realizes the events on screen are happening live inside the theater.',
    img: 'images/popcorn-battle.jpg'
  }
];

const FOOD_MENU = [
  // POPCORN
  {
    id: 'pop-1',
    name: 'Truffle & Aged Parmesan Popcorn',
    category: 'Popcorn',
    price: 1150,
    calories: '420 kcal',
    tag: 'Signature',
    movieMatch: ['Shadow Strike: Vengeance', 'Architects of the Indus', 'Crimson Horizon'],
    desc: 'Warm gourmet butterfly kernels tossed in white truffle oil, 24-month aged Parmigiano-Reggiano, and cracked black pepper.',
    img: 'images/popcorn-hall-cinematic.jpg'
  },
  {
    id: 'pop-2',
    name: 'Salted Caramel & Hazelnut Crunch',
    category: 'Popcorn',
    price: 980,
    calories: '510 kcal',
    tag: 'Bestseller',
    movieMatch: ['Midnight Duet in Lahore', 'Letters to Margalla'],
    desc: 'Small-batch amber caramel glaze folded with roasted Turkish hazelnuts and flaky Himalayan pink salt.',
    img: 'images/popcorn-caramel.jpg'
  },
  {
    id: 'pop-3',
    name: 'Smoky Peri-Peri & Cheddar Dust',
    category: 'Popcorn',
    price: 920,
    calories: '460 kcal',
    tag: 'Spicy',
    movieMatch: ['Shadow Strike: Vengeance', 'Eclipse Over Karakoram', 'The Haunting of Blackwood Manor', 'Whispers in the Velvet Dark'],
    desc: 'Fiery bird’s-eye chili spice blend paired with sharp aged cheddar dust for a bold cinema kick.',
    img: 'images/popcorn-periperi.jpg'
  },
  {
    id: 'pop-4',
    name: 'Classic Cinema Butter & Sea Salt Bucket',
    category: 'Popcorn',
    price: 750,
    calories: '390 kcal',
    tag: 'Classic',
    movieMatch: ['Shadow Strike: Vengeance', 'Midnight Duet in Lahore', 'Letters to Margalla'],
    desc: 'Freshly popped golden kernels drizzled with clarified cultured butter and flaky sea salt.',
    img: 'images/popcorn-battle.jpg'
  },

  // GOURMET SNACKS & BURGERS
  {
    id: 'snk-1',
    name: 'Wagyu Double Smash Cinema Burger',
    category: 'Gourmet Snacks',
    price: 2150,
    calories: '780 kcal',
    tag: 'Chef Special',
    movieMatch: ['Shadow Strike: Vengeance', 'Eclipse Over Karakoram'],
    desc: 'Two seared Wagyu beef patties, smoked gouda, caramelized shallots, and house truffle aioli on toasted brioche.',
    img: 'images/burger-wagyu.jpg'
  },
  {
    id: 'snk-2',
    name: 'Crispy Nashville Hot Chicken Burger',
    category: 'Gourmet Snacks',
    price: 1690,
    calories: '690 kcal',
    tag: 'Popular',
    movieMatch: ['Shadow Strike: Vengeance', 'Crimson Horizon'],
    desc: 'Buttermilk fried chicken thigh glazed in cayenne honey butter with crunchy dill pickles and slaw.',
    img: 'images/burger-chicken.jpg'
  },
  {
    id: 'snk-3',
    name: 'Artisanal Tartufo & Burrata Pizza',
    category: 'Gourmet Snacks',
    price: 2450,
    calories: '840 kcal',
    tag: 'For Sharing',
    movieMatch: ['The Haunting of Blackwood Manor', 'Midnight Duet in Lahore'],
    desc: 'Wood-fired sourdough crust topped with black truffle cream, roasted wild mushrooms, and fresh burrata.',
    img: 'images/pizza-tartufo.jpg'
  },
  {
    id: 'snk-4',
    name: 'Trio of Stone-Baked Mini Pizzas',
    category: 'Gourmet Snacks',
    price: 1450,
    calories: '620 kcal',
    tag: 'Easy Bite',
    movieMatch: ['Letters to Margalla', 'Architects of the Indus'],
    desc: 'Three bite-sized Margherita, Smoked Pepperoni, and Four-Cheese personal pizzas crafted for effortless seat dining.',
    img: 'images/minipizzas.jpg'
  },
  {
    id: 'snk-5',
    name: 'Loaded Animal-Style Cinema Fries',
    category: 'Gourmet Snacks',
    price: 1180,
    calories: '640 kcal',
    tag: 'Trending',
    movieMatch: ['Eclipse Over Karakoram', 'Whispers in the Velvet Dark'],
    desc: 'Crisp skin-on russet fries smothered in molten cheddar sauce, caramelized onions, and smoky THEATRON secret sauce.',
    img: 'images/snack-halloumi-fries.jpg'
  },
  {
    id: 'snk-6',
    name: 'Korean Mozzarella & Beef Corn Dogs',
    category: 'Gourmet Snacks',
    price: 1290,
    calories: '590 kcal',
    tag: 'Crunch',
    movieMatch: ['Eclipse Over Karakoram', 'Crimson Horizon'],
    desc: 'Golden panko-crusted skewers filled with stretchy mozzarella and smoked beef, finished with honey mustard & sriracha.',
    img: 'images/snack-corndogs.jpg'
  },
  {
    id: 'snk-7',
    name: 'Crispy Zinger Tortilla Wrap',
    category: 'Gourmet Snacks',
    price: 1350,
    calories: '560 kcal',
    tag: 'Mess-Free',
    movieMatch: ['Crimson Horizon', 'Shadow Strike: Vengeance'],
    desc: 'Crunchy spiced chicken tenders, purple slaw, and chipotle mayo rolled tight in a charred flour tortilla.',
    img: 'images/snack-crispy-wrap.jpg'
  },
  {
    id: 'snk-8',
    name: 'Classic Double Cheddar Smash & Fries',
    category: 'Gourmet Snacks',
    price: 1850,
    calories: '810 kcal',
    tag: 'Classic',
    movieMatch: ['The Haunting of Blackwood Manor', 'Shadow Strike: Vengeance'],
    desc: 'Juicy double-stacked cheddar burger served alongside a crisp basket of golden seasoned fries.',
    img: 'images/burrgerrrr.jpg'
  },
  {
    id: 'snk-9',
    name: 'Roasted Garlic & Four-Cheese Flatbread',
    category: 'Gourmet Snacks',
    price: 1790,
    calories: '710 kcal',
    tag: 'Vegetarian',
    movieMatch: ['Letters to Margalla', 'Midnight Duet in Lahore'],
    desc: 'Crispy artisan crust brushed with confit garlic oil, aged mozzarella, provolone, and shaved parmesan.',
    img: 'images/pizza1.jpg'
  },
  {
    id: 'snk-10',
    name: 'Truffle Mushroom Brioche Burger',
    category: 'Gourmet Snacks',
    price: 1920,
    calories: '730 kcal',
    tag: 'Gourmet',
    movieMatch: ['Architects of the Indus', 'Shadow Strike: Vengeance'],
    desc: 'Chargrilled prime patty topped with sautéed portobello mushrooms, Swiss cheese, and roasted garlic aioli.',
    img: 'images/burgers.jpg'
  },

  // DRINKS
  {
    id: 'drk-1',
    name: 'Ruby Pomegranate & Rose Sparkler',
    category: 'Drinks',
    price: 680,
    calories: '140 kcal',
    tag: 'Zero-Proof',
    movieMatch: ['Midnight Duet in Lahore', 'Crimson Horizon', 'Letters to Margalla'],
    desc: 'Cold-pressed Kandahari pomegranate juice, Damascus rosewater mist, and chilled artisanal tonic over crystal ice.',
    img: 'images/combo-couples-duet.jpg'
  },
  {
    id: 'drk-2',
    name: 'Spiced Kashmiri Pink Chai Latte',
    category: 'Drinks',
    price: 620,
    calories: '210 kcal',
    tag: 'Warm',
    movieMatch: ['Midnight Duet in Lahore', 'Architects of the Indus', 'Letters to Margalla'],
    desc: 'Velvety brewed green tea leaves steeped with green cardamom, star anise, crushed pistachios, and steamed milk.',
    img: 'images/heritage-kashmiri-chai.jpg'
  },
  {
    id: 'drk-3',
    name: 'Midnight Espresso & Gold Tonic',
    category: 'Drinks',
    price: 720,
    calories: '95 kcal',
    tag: 'Late Show',
    movieMatch: ['Shadow Strike: Vengeance', 'The Haunting of Blackwood Manor', 'Whispers in the Velvet Dark'],
    desc: 'Single-origin double espresso floated over chilled botanical tonic with a twist of charred blood orange.',
    img: 'images/reviews-hero.jpg'
  },

  // HERITAGE PAKISTANI
  {
    id: 'her-1',
    name: 'Crispy Punjabi Cocktail Samosas (6 pcs)',
    category: 'Heritage Pakistani',
    price: 790,
    calories: '480 kcal',
    tag: 'Local Favorite',
    movieMatch: ['Architects of the Indus', 'Midnight Duet in Lahore'],
    desc: 'Flaky golden pastry triangles stuffed with spiced potato, green peas, and roasted cumin, served with mint & tamarind chutneys.',
    img: 'images/samosas.jpg'
  },
  {
    id: 'her-2',
    name: 'Royal Lahori Samosa Chaat Platter',
    category: 'Heritage Pakistani',
    price: 950,
    calories: '530 kcal',
    tag: 'Street Classic',
    movieMatch: ['Architects of the Indus', 'Letters to Margalla'],
    desc: 'Crushed crisp samosas layered with spiced chickpeas, whipped yogurt, pomegranate pearls, and tangy plum chutney.',
    img: 'images/heritage-samosa-chaat.jpg'
  },
  {
    id: 'her-3',
    name: 'Peshawari Shinwari Chapli Skewers',
    category: 'Heritage Pakistani',
    price: 1590,
    calories: '670 kcal',
    tag: 'Smoky',
    movieMatch: ['Eclipse Over Karakoram', 'Shadow Strike: Vengeance'],
    desc: 'Chargrilled minced beef medallions infused with crushed coriander seeds, tomato, and green chilies with garlic naan bites.',
    img: 'images/heritage-shinwari-kabab.jpg'
  },
  {
    id: 'her-4',
    name: 'Saffron & Pistachio Shahi Tukda',
    category: 'Heritage Pakistani',
    price: 890,
    calories: '540 kcal',
    tag: 'Royal Dessert',
    movieMatch: ['Midnight Duet in Lahore', 'Letters to Margalla'],
    desc: 'Ghee-toasted brioche soaked in saffron-cardamom rabri, topped with silver varq, almonds, and Iranian pistachios.',
    img: 'images/heritage-shahi-tukda.jpg'
  }
];

const CURATED_COMBOS = [
  {
    id: 'cmb-1',
    name: 'The Royal Premiere Feast (For 2)',
    badge: 'MOST ORDERED COMBO',
    movieTag: 'Shadow Strike: Vengeance',
    price: 3850,
    originalPrice: 4650,
    items: '2× Wagyu or Nashville Burgers + 1× Large Truffle Popcorn + 2× Signature Drinks',
    img: 'images/combo-royal-feast.jpg'
  },
  {
    id: 'cmb-2',
    name: 'Midnight Thriller Survival Box',
    badge: 'LATE NIGHT SPECIAL',
    movieTag: 'The Haunting of Blackwood Manor',
    price: 3490,
    originalPrice: 4200,
    items: '1× Tartufo Wood-Fired Pizza + Loaded Cinema Fries + 2× Espresso Tonics',
    img: 'images/combo-midnight-thriller.jpg'
  },
  {
    id: 'cmb-3',
    name: 'Velvet Couples Duet',
    badge: 'DATE NIGHT',
    movieTag: 'Midnight Duet in Lahore',
    price: 2490,
    originalPrice: 3050,
    items: '1× Caramel & Hazelnut Popcorn + 6× Cocktail Samosas + 2× Ruby Rose Sparklers',
    img: 'images/combo-couples-duet.jpg'
  },
  {
    id: 'cmb-4',
    name: 'Grand Family Lounge Platter (For 4)',
    badge: 'BEST VALUE',
    movieTag: 'Architects of the Indus',
    price: 6200,
    originalPrice: 7500,
    items: '2× Mini Pizza Trios + 2× Large Popcorns + Shinwari Skewers + 4× Drinks',
    img: 'images/combo-family-pack.jpg'
  }
];

const AUDITORIUMS = [
  {
    name: 'Hall 01 • Dual-Laser IMAX Auditorium',
    screen: '72ft Curved Micro-Perforated Silver Screen (4K Dual-Laser)',
    sound: '12-Channel IMAX Precision Laser Surround + Sub-Bass Tactile Transducers',
    seats: '180 Stadium Maroon Velvet Recliners with Swivel Dining Tables',
    rows: ['Row A (Front VIP)', 'Row C (Center Prime)', 'Row E (IMAX Sweet Spot)', 'Row G (Royal Balcony)'],
    desc: 'Our flagship grand auditorium engineered for epic blockbusters and midnight premieres. Zero sightline obstruction with acoustic maroon wall baffling.',
    img: 'images/auditorium-hall01.jpg'
  },
  {
    name: 'Hall 02 • Royal Velvet Boutique Lounge',
    screen: '48ft Christie RGB Pure Laser 4K Screen',
    sound: 'Dolby Atmos 64-Speaker Overhead Hemisphere',
    seats: '42 Twin-Motor Italian Leather & Velvet Loveseats with Heated Cushions',
    rows: ['Loveseat Bay 01–04', 'Loveseat Bay 05–08', 'Royal Couple Suite 09–12'],
    desc: 'Intimate, ultra-private screening room featuring call-button butler service, complimentary blankets, and whisper-quiet climate control.',
    img: 'images/gallery-recliners.jpg'
  },
  {
    name: 'Hall 03 • Dolby Atmos VIP Suite',
    screen: '56ft High-Contrast HDR Laser Projection',
    sound: 'Dolby Atmos Flagship 3D Object Audio',
    seats: '96 Executive Zero-Gravity Recliners with Wireless Charging Consoles',
    rows: ['Row B (Atmos Core)', 'Row D (Center VIP)', 'Row F (Executive Rear)'],
    desc: 'Balanced acoustics and plush legroom tailored for immersive thrillers, concert films, and private corporate showcases.',
    img: 'images/auditorium-hall03.jpg'
  }
];

const GALLERY_PHOTOS = [
  { title: 'Hall 01 • Dual-Laser IMAX', category: 'Auditoriums', img: 'images/auditorium-hall01.jpg' },
  { title: 'VIP Velvet Recliners', category: 'Auditoriums', img: 'images/gallery-recliners.jpg' },
  { title: 'Private Screening Lounge', category: 'Auditoriums', img: 'images/auditorium-hall03.jpg' },
  { title: 'Grand Premiere Auditorium', category: 'Auditoriums', img: 'images/hero-cinema.jpg' },
  { title: 'Gourmet Concessions & Feast', category: 'Lounge & Dining', img: 'images/combo-royal-feast.jpg' },
  { title: 'In-Seat Popcorn & Auditorium View', category: 'Lounge & Dining', img: 'images/popcorn-hall-cinematic.jpg' },
  { title: 'Artisanal Burger & Fries Service', category: 'Lounge & Dining', img: 'images/burgers.jpg' },
  { title: 'Evening Premiere Screening', category: 'Architecture', img: 'images/gallery-facade.jpg' }
];

const REVIEWS_DATA = [
  {
    id: 'rev-1',
    author: 'Zainab Tariq',
    badge: 'VIP Gold Member',
    rating: 5,
    movie: 'Shadow Strike: Vengeance',
    hall: 'Hall 01 • IMAX',
    date: '2 days ago',
    helpful: 34,
    text: 'The Dual-Laser IMAX in Hall 01 is unmatched in Islamabad. Hasnain’s action sequences literally shook the velvet seats, and our Truffle Popcorn arrived warm right before the opening credits without a single distraction.'
  },
  {
    id: 'rev-2',
    author: 'Hamza & Ayesha K.',
    badge: 'Verified Premiere Guest',
    rating: 5,
    movie: 'Midnight Duet in Lahore',
    hall: 'Hall 02 • Velvet Lounge',
    date: '4 days ago',
    helpful: 29,
    text: 'Booked the Velvet Couples Duet in Hall 02. The heated loveseats, Ruby Pomegranate Sparklers, and Kashmiri Pink Chai made it feel like a 5-star private screening room.'
  },
  {
    id: 'rev-3',
    author: 'Dr. Usama Siddiqui',
    badge: 'Cinephile Critic',
    rating: 5,
    movie: 'Architects of the Indus',
    hall: 'Hall 02 • Velvet Lounge',
    date: '1 week ago',
    helpful: 21,
    text: 'Crystal-clear 4K HDR color grading and zero ambient light bounce thanks to the deep maroon velvet walls. Easily the finest acoustic room in the twin cities.'
  },
  {
    id: 'rev-4',
    author: 'Mahnoor Javed',
    badge: 'Verified Guest',
    rating: 4,
    movie: 'The Haunting of Blackwood Manor',
    hall: 'Hall 03 • Dolby Atmos',
    date: '1 week ago',
    helpful: 18,
    text: 'Dolby Atmos overhead audio during a midnight horror show is terrifyingly good! The Wagyu Double Smash Burger and Peri-Peri popcorn were 10/10.'
  },
  {
    id: 'rev-5',
    author: 'Bilal Raza',
    badge: 'VIP Platinum',
    rating: 5,
    movie: 'Eclipse Over Karakoram',
    hall: 'Hall 01 • IMAX',
    date: '2 weeks ago',
    helpful: 27,
    text: 'Valet parking in F-7 took 30 seconds, elevator straight to the lobby, and the Lahori Samosa Chaat platter is surprisingly gourmet. Never going back to standard multiplexes.'
  },
  {
    id: 'rev-6',
    author: 'Sana Mir',
    badge: 'Verified Guest',
    rating: 5,
    movie: 'Shadow Strike: Vengeance',
    hall: 'Hall 01 • IMAX',
    date: '2 weeks ago',
    helpful: 19,
    text: 'Ordered the Royal Premiere Feast straight to Row E Seat 12. Everything came plated neatly with warm towels. Truly lives up to the luxury promise.'
  }
];

/* ==========================================================================
   STATE MANAGEMENT (TRAY, SELECTED MOVIE FOR FOOD, CHECKOUT, REVIEWS, VOTES)
   ========================================================================== */
let loungeTray = JSON.parse(localStorage.getItem('theatron_tray')) || [
  { id: 'pop-1', name: 'Truffle & Aged Parmesan Popcorn', price: 1150, qty: 1 },
  { id: 'drk-1', name: 'Ruby Pomegranate & Rose Sparkler', price: 680, qty: 1 }
];

let selectedMovieForFood = localStorage.getItem('theatron_food_movie') || 'All';
let activeFoodCategory = 'All';
let selectedPaymentMethod = 'Credit / Debit Card';
let recentOrders = JSON.parse(localStorage.getItem('theatron_orders')) || [];

let userReviews = JSON.parse(localStorage.getItem('theatron_reviews')) || [...REVIEWS_DATA];
let battleVotes = JSON.parse(localStorage.getItem('theatron_votes')) || {
  truffle: 142,
  caramel: 118,
  wagyu: 164,
  tartufo: 129
};

function saveTray() {
  localStorage.setItem('theatron_tray', JSON.stringify(loungeTray));
  updateTrayUI();
  renderCheckoutSummary();
}

function showToast(msg) {
  const toast = document.getElementById('toastBanner');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
}

/* ==========================================================================
   SUB-PAGE NAVIGATION ("PAGES INSIDE PAGES" DOWN EACH PAGE)
   ========================================================================== */
function switchSubPage(groupName, targetId, btn) {
  document.querySelectorAll(`[data-subpage-group="${groupName}"]`).forEach(panel => {
    panel.style.display = panel.id === targetId ? 'block' : 'none';
  });
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.subpage-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  if (targetId === 'food-sub-checkout') {
    renderCheckoutSummary();
  }
}

/* ==========================================================================
   LOUNGE TRAY DRAWER & MULTI-STEP ORDER + PAYMENT WORKFLOW
   ========================================================================== */
function toggleTrayDrawer() {
  const drawer = document.getElementById('trayDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer || !backdrop) return;
  drawer.classList.toggle('open');
  backdrop.classList.toggle('open');
  updateTrayUI();
}

function addToTray(id, name, price) {
  const existing = loungeTray.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    loungeTray.push({ id, name, price, qty: 1 });
  }
  saveTray();
  showToast(`🍿 Added "${name}" to Lounge Tray`);
}

function addAllMoviePairings(movieTitle) {
  const movie = REPERTOIRE_MOVIES.find(m => m.title === movieTitle);
  if (!movie) return;
  movie.recommendedPairings.forEach(fid => {
    const item = FOOD_MENU.find(f => f.id === fid);
    if (item) {
      const existing = loungeTray.find(t => t.id === item.id);
      if (existing) existing.qty += 1;
      else loungeTray.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
  });
  saveTray();
  showToast(`🎬 Added complete "${movieTitle}" pairing bundle to Lounge Tray!`);
}

function changeTrayQty(index, delta) {
  if (!loungeTray[index]) return;
  loungeTray[index].qty += delta;
  if (loungeTray[index].qty <= 0) {
    loungeTray.splice(index, 1);
  }
  saveTray();
}

function updateTrayUI() {
  const countEl = document.getElementById('trayCount');
  const itemsEl = document.getElementById('trayItemsContainer');
  const subtotalEl = document.getElementById('traySubtotal');

  const totalCount = loungeTray.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = loungeTray.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (countEl) countEl.textContent = totalCount;
  if (subtotalEl) subtotalEl.textContent = `PKR ${totalPrice.toLocaleString()}`;

  if (!itemsEl) return;
  if (loungeTray.length === 0) {
    itemsEl.innerHTML = `<p class="text-xs text-center py-8" style="color: var(--text-muted);">Your Lounge Tray is empty. Select a movie or pick gourmet snacks from the menu!</p>`;
    return;
  }

  itemsEl.innerHTML = loungeTray.map((item, idx) => `
    <div class="p-3 rounded-xl flex justify-between items-center gap-3" style="background: #1a060a; border: 1px solid var(--border-burgundy);">
      <div>
        <div class="text-xs font-semibold" style="color: #fff;">${item.name}</div>
        <div class="text-[11px]" style="color: var(--gold-primary);">PKR ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeTrayQty(${idx}, -1)" class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style="background: #2b0910; color: #fff; border: 1px solid var(--border-burgundy);">-</button>
        <span class="text-xs font-bold w-4 text-center">${item.qty}</span>
        <button onclick="changeTrayQty(${idx}, 1)" class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style="background: #2b0910; color: var(--gold-light); border: 1px solid var(--border-gold);">+</button>
      </div>
    </div>
  `).join('');
}

function proceedToPaymentFromDrawer() {
  if (loungeTray.length === 0) {
    showToast('⚠️ Add items to your Lounge Tray first.');
    return;
  }
  toggleTrayDrawer();
  const checkoutTab = document.getElementById('tab-food-checkout');
  if (checkoutTab) {
    switchSubPage('food-subpages', 'food-sub-checkout', checkoutTab);
    document.getElementById('foodSubpageAnchor')?.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = 'food-snacks.html#checkout';
  }
}

function selectPaymentMethod(method, btn) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cardFields = document.getElementById('cardPaymentFields');
  const walletFields = document.getElementById('walletPaymentFields');
  const cashNote = document.getElementById('cashPaymentNote');

  if (cardFields) cardFields.style.display = method === 'Credit / Debit Card' ? 'grid' : 'none';
  if (walletFields) walletFields.style.display = (method === 'JazzCash' || method === 'EasyPaisa') ? 'block' : 'none';
  if (cashNote) cashNote.style.display = method === 'Pay at Seat (Butler POS)' ? 'block' : 'none';
}

function renderCheckoutSummary() {
  const listEl = document.getElementById('checkoutOrderItems');
  const subEl = document.getElementById('checkoutSubtotal');
  const taxEl = document.getElementById('checkoutTax');
  const grandEl = document.getElementById('checkoutGrandTotal');
  const movieBadge = document.getElementById('checkoutMovieTag');

  if (movieBadge) {
    movieBadge.textContent = selectedMovieForFood === 'All' ? 'General Lounge Dining' : `🎬 Paired with: ${selectedMovieForFood}`;
  }

  if (!listEl) return;
  const subtotal = loungeTray.reduce((s, i) => s + i.price * i.qty, 0);
  const serviceFee = subtotal > 0 ? 150 : 0;
  const grandTotal = subtotal + serviceFee;

  if (subEl) subEl.textContent = `PKR ${subtotal.toLocaleString()}`;
  if (taxEl) taxEl.textContent = `PKR ${serviceFee.toLocaleString()}`;
  if (grandEl) grandEl.textContent = `PKR ${grandTotal.toLocaleString()}`;

  if (loungeTray.length === 0) {
    listEl.innerHTML = `<p class="text-xs py-4 text-center" style="color: var(--text-muted);">No items in tray yet. Switch to the Menu tab above to add snacks!</p>`;
    return;
  }

  listEl.innerHTML = loungeTray.map((item, idx) => `
    <div class="flex justify-between items-center py-2.5 px-3 rounded-xl" style="background: #120306; border: 1px solid var(--border-burgundy);">
      <div>
        <div class="text-xs font-bold text-white">${item.name} <span style="color: var(--gold-primary);">×${item.qty}</span></div>
        <div class="text-[11px]" style="color: var(--text-muted);">PKR ${item.price.toLocaleString()} each</div>
      </div>
      <div class="flex items-center gap-2">
        <strong class="text-xs" style="color: var(--gold-light);">PKR ${(item.price * item.qty).toLocaleString()}</strong>
        <button type="button" onclick="changeTrayQty(${idx}, -1)" class="px-2 py-0.5 rounded text-xs" style="background:#26080e; color:#fff;">−</button>
        <button type="button" onclick="changeTrayQty(${idx}, 1)" class="px-2 py-0.5 rounded text-xs" style="background:#26080e; color:var(--gold-primary);">+</button>
      </div>
    </div>
  `).join('');
}

function submitFoodPaymentOrder(e) {
  e.preventDefault();
  if (loungeTray.length === 0) {
    showToast('⚠️ Please add at least one snack or combo before paying.');
    return;
  }

  const guestName = document.getElementById('payGuestName')?.value.trim() || 'Alexander';
  const hall = document.getElementById('payHallSelect')?.value || 'Hall 01';
  const seat = document.getElementById('paySeatInput')?.value.trim() || 'Row E • Seat 12';
  const deliveryTiming = document.getElementById('payDeliveryTime')?.value || '15 mins into movie';
  const subtotal = loungeTray.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = subtotal + 150;
  const orderId = 'THT-' + Math.floor(100000 + Math.random() * 900000);

  const orderRecord = {
    orderId,
    guestName,
    movie: selectedMovieForFood === 'All' ? 'Flagship Screening' : selectedMovieForFood,
    hall,
    seat,
    deliveryTiming,
    paymentMethod: selectedPaymentMethod,
    total: grandTotal,
    items: [...loungeTray],
    status: 'Confirmed & Sent to Kitchen'
  };

  recentOrders.unshift(orderRecord);
  localStorage.setItem('theatron_orders', JSON.stringify(recentOrders));

  loungeTray = [];
  saveTray();

  const receiptBox = document.getElementById('paymentReceiptBox');
  if (receiptBox) {
    receiptBox.style.display = 'block';
    receiptBox.innerHTML = `
      <div class="p-5 rounded-2xl space-y-2" style="background: linear-gradient(145deg, #1b2e1e, #0d170f); border: 1.5px solid #4ade80;">
        <div class="flex justify-between items-center">
          <span class="text-xs font-extrabold uppercase tracking-wider" style="color: #4ade80;">✅ PAYMENT &amp; BUTLER DISPATCH CONFIRMED</span>
          <span class="text-xs font-mono font-bold text-white">${orderRecord.orderId}</span>
        </div>
        <p class="text-xs text-white"><strong>Guest:</strong> ${orderRecord.guestName} • <strong>Seat:</strong> ${orderRecord.hall} (${orderRecord.seat})</p>
        <p class="text-xs" style="color: #d1fae5;"><strong>Screening:</strong> ${orderRecord.movie} • <strong>Delivery:</strong> ${orderRecord.deliveryTiming}</p>
        <p class="text-xs" style="color: #d1fae5;"><strong>Paid via:</strong> ${orderRecord.paymentMethod} • <strong>Amount:</strong> PKR ${orderRecord.total.toLocaleString()}</p>
      </div>
    `;
  }

  showToast(`✅ Payment Complete! Order ${orderId} dispatched to ${hall} (${seat}).`);
}

/* ==========================================================================
   FOOD & SNACKS PAGE — MOVIE PAIRING FILTER + MENU + COMBOS
   ========================================================================== */
function setMovieForFood(movieTitle) {
  selectedMovieForFood = movieTitle;
  localStorage.setItem('theatron_food_movie', movieTitle);

  const selector = document.getElementById('movieFoodSelector');
  if (selector && selector.value !== movieTitle) {
    selector.value = movieTitle;
  }

  const banner = document.getElementById('moviePairingBanner');
  if (banner) {
    if (movieTitle === 'All') {
      banner.innerHTML = `
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--gold-primary);">🎬 ALL SCREENINGS MENU</span>
            <p class="text-xs mt-0.5" style="color: var(--text-muted);">Choose your movie above to filter chef-recommended snacks &amp; one-click pairings for your exact screening.</p>
          </div>
        </div>
      `;
    } else {
      const mov = REPERTOIRE_MOVIES.find(m => m.title === movieTitle);
      banner.innerHTML = `
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-wider" style="color: var(--gold-primary);">✨ CHEF PAIRING FOR: ${movieTitle.toUpperCase()}</span>
            <p class="text-xs mt-1 text-white">${mov ? mov.pairingNote : 'Curated snacks matched to your feature presentation.'}</p>
          </div>
          <button onclick="addAllMoviePairings('${movieTitle.replace(/'/g, "\\'")}')" class="gold-cta-btn" style="padding: 8px 16px; font-size: 11px;">
            + Add Complete Movie Pairing Bundle
          </button>
        </div>
      `;
    }
  }

  renderFoodMenu();
  renderCheckoutSummary();
}

function renderFoodCombos() {
  const grid = document.getElementById('combosGrid');
  if (!grid) return;

  grid.innerHTML = CURATED_COMBOS.map(c => `
    <div class="combo-card tilt-card">
      <div class="relative h-44 overflow-hidden">
        <img src="${c.img}" alt="${c.name}" class="w-full h-full object-cover">
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase" style="background: var(--gold-primary); color: #120406;">${c.badge}</span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[10px] font-bold block mb-1" style="color: var(--gold-light);">🎬 Best with: ${c.movieTag}</span>
          <h4 style="font-family: var(--font-display); font-size: 16px; color: #fff;">${c.name}</h4>
          <p class="text-xs mt-1.5 leading-relaxed" style="color: var(--text-muted);">${c.items}</p>
        </div>
        <div class="mt-4 pt-3 flex items-center justify-between" style="border-top: 1px solid rgba(255,255,255,0.08);">
          <div>
            <span class="text-xs line-through block" style="color: var(--text-muted);">PKR ${c.originalPrice.toLocaleString()}</span>
            <strong style="color: var(--gold-primary); font-size: 15px;">PKR ${c.price.toLocaleString()}</strong>
          </div>
          <button onclick="addToTray('${c.id}', '${c.name.replace(/'/g, "\\'")}', ${c.price})" class="gold-cta-btn" style="padding: 8px 14px; font-size: 11px;">+ Add Combo</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFoodMenu() {
  const grid = document.getElementById('foodGrid');
  if (!grid) return;

  const query = (document.getElementById('foodSearchInput')?.value || '').toLowerCase().trim();
  const filtered = FOOD_MENU.filter(item => {
    const matchCat = activeFoodCategory === 'All' || item.category === activeFoodCategory;
    const matchMovie = selectedMovieForFood === 'All' || (item.movieMatch && item.movieMatch.includes(selectedMovieForFood));
    const matchQuery = !query || item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCat && matchMovie && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-10 text-sm" style="color: var(--text-muted);">No items matched that filter. Try switching category to "All" or selecting "All Movies".</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="food-card tilt-card">
      <div class="relative h-48 overflow-hidden">
        <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
        <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase" style="background: rgba(13,4,6,0.85); color: var(--gold-light); border: 1px solid var(--border-gold);">${item.tag}</span>
        <span class="absolute bottom-2.5 right-3 px-2 py-0.5 rounded text-[10px]" style="background: rgba(0,0,0,0.75); color: #ddd;">${item.calories}</span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[10px] uppercase tracking-wider font-bold" style="color: var(--gold-primary);">${item.category}</span>
          <h4 style="font-family: var(--font-display); font-size: 16.5px; color: #fff; margin: 2px 0 6px;">${item.name}</h4>
          <p class="text-xs leading-relaxed" style="color: var(--text-muted);">${item.desc}</p>
        </div>
        <div class="mt-4 pt-3 flex items-center justify-between" style="border-top: 1px solid rgba(255,255,255,0.08);">
          <strong style="color: var(--gold-light); font-size: 15px;">PKR ${item.price.toLocaleString()}</strong>
          <button onclick="addToTray('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price})" class="filter-btn active" style="padding: 7px 14px; font-size: 11.5px;">+ Add to Tray</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setFoodCategory(cat, btn) {
  activeFoodCategory = cat;
  document.querySelectorAll('#foodCategoryTabs .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFoodMenu();
}

function filterFoodMenu() {
  renderFoodMenu();
}

/* ==========================================================================
   SNACK BATTLE ARENA (VOTING)
   ========================================================================== */
function renderBattleArena() {
  const container = document.getElementById('battleArenaGrid');
  if (!container) return;

  const popTotal = battleVotes.truffle + battleVotes.caramel;
  const trufflePct = Math.round((battleVotes.truffle / popTotal) * 100);
  const caramelPct = 100 - trufflePct;

  const mainTotal = battleVotes.wagyu + battleVotes.tartufo;
  const wagyuPct = Math.round((battleVotes.wagyu / mainTotal) * 100);
  const tartufoPct = 100 - wagyuPct;

  container.innerHTML = `
    <div class="battle-match-card">
      <div class="flex justify-between items-center mb-3">
        <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--gold-primary);">MATCH 01 • POPCORN CROWN</span>
        <span class="text-xs" style="color: var(--text-muted);">${popTotal} Votes</span>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="p-3 rounded-xl text-center" style="background: #1b060a; border: 1px solid var(--border-burgundy);">
          <img src="images/popcorn-hall-cinematic.jpg" alt="Truffle Popcorn" class="w-full h-24 object-cover rounded-lg mb-2">
          <div class="text-xs font-bold text-white">Truffle Parmesan</div>
          <div class="text-sm font-extrabold mt-1" style="color: var(--gold-primary);">${trufflePct}%</div>
          <button onclick="castBattleVote('truffle')" class="filter-btn mt-2 w-full" style="padding: 6px; font-size: 11px;">Vote Truffle</button>
        </div>
        <div class="p-3 rounded-xl text-center" style="background: #1b060a; border: 1px solid var(--border-burgundy);">
          <img src="images/popcorn-caramel.jpg" alt="Salted Caramel" class="w-full h-24 object-cover rounded-lg mb-2">
          <div class="text-xs font-bold text-white">Salted Caramel</div>
          <div class="text-sm font-extrabold mt-1" style="color: var(--gold-light);">${caramelPct}%</div>
          <button onclick="castBattleVote('caramel')" class="filter-btn mt-2 w-full" style="padding: 6px; font-size: 11px;">Vote Caramel</button>
        </div>
      </div>
      <div class="rating-bar-track">
        <div class="rating-bar-fill" style="width: ${trufflePct}%;"></div>
      </div>
    </div>

    <div class="battle-match-card">
      <div class="flex justify-between items-center mb-3">
        <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--gold-primary);">MATCH 02 • HEAVYWEIGHT FEAST</span>
        <span class="text-xs" style="color: var(--text-muted);">${mainTotal} Votes</span>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="p-3 rounded-xl text-center" style="background: #1b060a; border: 1px solid var(--border-burgundy);">
          <img src="images/burger-wagyu.jpg" alt="Wagyu Smash" class="w-full h-24 object-cover rounded-lg mb-2">
          <div class="text-xs font-bold text-white">Wagyu Double Smash</div>
          <div class="text-sm font-extrabold mt-1" style="color: var(--gold-primary);">${wagyuPct}%</div>
          <button onclick="castBattleVote('wagyu')" class="filter-btn mt-2 w-full" style="padding: 6px; font-size: 11px;">Vote Wagyu</button>
        </div>
        <div class="p-3 rounded-xl text-center" style="background: #1b060a; border: 1px solid var(--border-burgundy);">
          <img src="images/pizza-tartufo.jpg" alt="Tartufo Pizza" class="w-full h-24 object-cover rounded-lg mb-2">
          <div class="text-xs font-bold text-white">Tartufo Burrata Pizza</div>
          <div class="text-sm font-extrabold mt-1" style="color: var(--gold-light);">${tartufoPct}%</div>
          <button onclick="castBattleVote('tartufo')" class="filter-btn mt-2 w-full" style="padding: 6px; font-size: 11px;">Vote Tartufo</button>
        </div>
      </div>
      <div class="rating-bar-track">
        <div class="rating-bar-fill" style="width: ${wagyuPct}%;"></div>
      </div>
    </div>
  `;
}

function castBattleVote(key) {
  battleVotes[key] = (battleVotes[key] || 0) + 1;
  localStorage.setItem('theatron_votes', JSON.stringify(battleVotes));
  renderBattleArena();
  showToast('🗳️ Vote recorded! Live arena standings updated.');
}

/* ==========================================================================
   CINEMA DETAILS PAGE — REPERTOIRE, MOVIE DETAILS MODAL, AUDITORIUMS, GALLERY
   ========================================================================== */
function renderRepertoire(genre = 'All') {
  const grid = document.getElementById('repertoireGrid');
  if (!grid) return;

  const list = genre === 'All' ? REPERTOIRE_MOVIES : REPERTOIRE_MOVIES.filter(m => m.genre === genre);
  grid.innerHTML = list.map(m => `
    <div class="food-card tilt-card">
      <div class="relative h-56 overflow-hidden cursor-pointer" onclick="openMovieDetailModal('${m.id}')">
        <img src="${m.img}" alt="${m.title}" class="w-full h-full object-cover">
        <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold" style="background: rgba(13,4,6,0.88); color: var(--gold-light); border: 1px solid var(--border-gold);">${m.genre}</span>
        <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-extrabold" style="background: var(--gold-primary); color: #120406;">${m.rating}</span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="cursor-pointer hover:underline" onclick="openMovieDetailModal('${m.id}')" style="font-family: var(--font-display); font-size: 15.5px; color: #fff;">${m.title}</h4>
          <p class="text-[11px] mt-1" style="color: var(--gold-light);">${m.hall}</p>
          <p class="text-[11px] mt-0.5" style="color: var(--text-muted);">🕒 ${m.times.join(' • ')}</p>
        </div>
        <div class="mt-3 space-y-2">
          <button onclick="openTicketBookingModal('${m.title.replace(/'/g, "\\'")}', '${m.hall}')" class="filter-btn active w-full" style="padding: 7px; font-size: 11px;">🎟️ Reserve VIP Seat</button>
          <button onclick="goToFoodForMovie('${m.title.replace(/'/g, "\\'")}')" class="filter-btn w-full" style="padding: 6px; font-size: 10.5px;">🍿 Order Food for This Movie →</button>
        </div>
      </div>
    </div>
  `).join('');
}

function goToFoodForMovie(movieTitle) {
  localStorage.setItem('theatron_food_movie', movieTitle);
  window.location.href = 'food-snacks.html';
}

function openMovieDetailModal(movieId) {
  const m = REPERTOIRE_MOVIES.find(x => x.id === movieId);
  const modal = document.getElementById('movieDetailModal');
  if (!m || !modal) return;

  document.getElementById('mdPoster').src = m.img;
  document.getElementById('mdTitle').textContent = m.title;
  document.getElementById('mdMeta').textContent = `${m.genre} • ${m.duration} • ${m.hall} • ${m.rating}`;
  document.getElementById('mdSynopsis').textContent = m.synopsis;
  document.getElementById('mdPairingNote').textContent = m.pairingNote;
  document.getElementById('mdBookBtn').onclick = () => {
    closeMovieDetailModal();
    openTicketBookingModal(m.title, m.hall);
  };
  document.getElementById('mdFoodBtn').onclick = () => goToFoodForMovie(m.title);

  modal.style.display = 'flex';
}

function closeMovieDetailModal() {
  const modal = document.getElementById('movieDetailModal');
  if (modal) modal.style.display = 'none';
}

function filterRepertoire(genre, btn) {
  document.querySelectorAll('#genreRepertoireTabs .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderRepertoire(genre);
}

function selectAuditorium(idx, btn) {
  document.querySelectorAll('#auditoriumTabs .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const container = document.getElementById('auditoriumShowcase');
  const aud = AUDITORIUMS[idx];
  if (!container || !aud) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
      <div class="lg:col-span-5">
        <div class="rounded-2xl overflow-hidden" style="border: 1px solid var(--border-gold);">
          <img src="${aud.img}" alt="${aud.name}" class="w-full h-64 object-cover">
        </div>
      </div>
      <div class="lg:col-span-7 space-y-3">
        <h4 style="font-family: var(--font-display); font-size: 22px; color: var(--gold-primary);">${aud.name}</h4>
        <p class="text-sm leading-relaxed" style="color: #eadbd9;">${aud.desc}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div class="p-3 rounded-xl" style="background: #120306; border: 1px solid var(--border-burgundy);">
            <span class="text-[10px] uppercase font-bold block" style="color: var(--gold-primary);">📽️ Projection</span>
            <span class="text-xs text-white mt-1 block">${aud.screen}</span>
          </div>
          <div class="p-3 rounded-xl" style="background: #120306; border: 1px solid var(--border-burgundy);">
            <span class="text-[10px] uppercase font-bold block" style="color: var(--gold-primary);">🔊 Acoustics</span>
            <span class="text-xs text-white mt-1 block">${aud.sound}</span>
          </div>
          <div class="p-3 rounded-xl" style="background: #120306; border: 1px solid var(--border-burgundy);">
            <span class="text-[10px] uppercase font-bold block" style="color: var(--gold-primary);">🛋️ Seating Bays</span>
            <span class="text-xs text-white mt-1 block">${aud.seats}</span>
          </div>
        </div>
        <div class="pt-2 flex flex-wrap items-center gap-2">
          <span class="text-[11px] font-bold" style="color: var(--gold-light);">Available Tiers:</span>
          ${aud.rows.map(r => `<span class="movie-badge-pill">${r}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderPhotoGallery(category = 'All') {
  const grid = document.getElementById('photoGalleryGrid');
  if (!grid) return;

  const list = category === 'All' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.category === category);
  grid.innerHTML = list.map(p => `
    <div onclick="openLightbox('${p.img}', '${p.title.replace(/'/g, "\\'")}')" class="rounded-2xl overflow-hidden cursor-pointer tilt-card relative group" style="border: 1px solid var(--border-burgundy); background: #120306;">
      <img src="${p.img}" alt="${p.title}" class="w-full h-52 object-cover transition duration-500 group-hover:scale-105">
      <div class="p-3 flex justify-between items-center">
        <div>
          <div class="text-xs font-bold text-white">${p.title}</div>
          <div class="text-[10px]" style="color: var(--gold-primary);">${p.category}</div>
        </div>
        <span class="text-xs" style="color: var(--gold-light);">🔍</span>
      </div>
    </div>
  `).join('');
}

function filterGallery(cat, btn) {
  document.querySelectorAll('#galleryTabs .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPhotoGallery(cat);
}

function openLightbox(src, title) {
  const lb = document.getElementById('photoLightbox');
  if (!lb) return;
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = title;
  lb.style.display = 'flex';
}

function closeLightbox() {
  const lb = document.getElementById('photoLightbox');
  if (lb) lb.style.display = 'none';
}

function openTicketBookingModal(movieTitle, hallName) {
  const modal = document.getElementById('ticketBookingModal');
  if (!modal) return;
  document.getElementById('bookingMovieTitle').textContent = movieTitle;
  document.getElementById('bookingHallLabel').textContent = hallName;
  modal.style.display = 'flex';
}

function closeTicketBookingModal() {
  const modal = document.getElementById('ticketBookingModal');
  if (modal) modal.style.display = 'none';
}

function confirmTicketReservation(e) {
  e.preventDefault();
  const movie = document.getElementById('bookingMovieTitle')?.textContent || 'Feature Film';
  const showtime = document.getElementById('bookingShowtime')?.value || '08:30 PM';
  const seats = document.getElementById('bookingSeats')?.value || 'Row E • Seats 11–12';
  const guest = document.getElementById('bookingGuestName')?.value || 'VIP Guest';
  const addFoodNow = document.getElementById('bookingAddFoodCheck')?.checked;

  closeTicketBookingModal();
  if (addFoodNow) {
    goToFoodForMovie(movie.replace(' (Starring Hasnain)', ''));
  } else {
    showToast(`🎟️ Reserved for ${guest}: ${movie} (${showtime} • ${seats})`);
  }
}

/* ==========================================================================
   REVIEWS PAGE LOGIC
   ========================================================================== */
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  const filter = document.getElementById('reviewMovieFilter')?.value || 'All';
  const sort = document.getElementById('reviewSortSelect')?.value || 'newest';

  let list = [...userReviews];
  if (filter !== 'All') {
    list = list.filter(r => r.movie === filter);
  }
  if (sort === 'highest') {
    list.sort((a, b) => b.rating - a.rating);
  }

  grid.innerHTML = list.map((r, idx) => `
    <div class="review-card tilt-card flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start gap-2 mb-3">
          <div>
            <h4 class="text-sm font-bold text-white">${r.author}</h4>
            <span class="text-[10px]" style="color: var(--gold-primary);">${r.badge} • ${r.date}</span>
          </div>
          <div class="text-xs font-bold" style="color: var(--gold-primary);">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        </div>
        <div class="mb-3">
          <span class="movie-badge-pill">🎬 ${r.movie} • ${r.hall}</span>
        </div>
        <p class="text-xs leading-relaxed mb-4" style="color: #e6d7d5;">"${r.text}"</p>
      </div>
      <div class="pt-2.5 flex justify-between items-center" style="border-top: 1px solid rgba(255,255,255,0.07);">
        <button onclick="upvoteReview(${idx})" class="text-[11px] px-2.5 py-1 rounded-full" style="background: #1f070c; border: 1px solid var(--border-burgundy); color: var(--gold-light);">
          👍 Helpful (${r.helpful || 12})
        </button>
        <button onclick="goToFoodForMovie('${r.movie.replace(/'/g, "\\'")}')" class="text-[11px] underline" style="color: var(--text-muted);">
          Pair Snacks →
        </button>
      </div>
    </div>
  `).join('');
}

function upvoteReview(idx) {
  if (!userReviews[idx]) return;
  userReviews[idx].helpful = (userReviews[idx].helpful || 12) + 1;
  localStorage.setItem('theatron_reviews', JSON.stringify(userReviews));
  renderReviews();
}

function openReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.style.display = 'flex';
}

function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.style.display = 'none';
}

function submitNewReview(e) {
  e.preventDefault();
  const author = document.getElementById('revAuthorInput').value.trim();
  const movie = document.getElementById('revMovieInput').value;
  const rating = parseInt(document.getElementById('revRatingInput').value, 10) || 5;
  const text = document.getElementById('revTextInput').value.trim();

  if (!author || !text) return;

  userReviews.unshift({
    id: 'rev-' + Date.now(),
    author,
    badge: 'Verified Premiere Guest',
    rating,
    movie,
    hall: 'Hall 01 • IMAX',
    date: 'Just now',
    helpful: 1,
    text
  });

  localStorage.setItem('theatron_reviews', JSON.stringify(userReviews));
  closeReviewModal();
  e.target.reset();
  renderReviews();
  showToast('⭐ Thank you! Your verified review is now live.');
}

/* ==========================================================================
   AMBIENT GOLD DUST & CURSOR SPOTLIGHT
   ========================================================================== */
function initAmbientEffects() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (spotlight) {
    window.addEventListener('mousemove', e => {
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
    });
  }

  const canvas = document.getElementById('ambientDustCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 38 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.5,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.35 - 0.1,
    alpha: Math.random() * 0.5 + 0.15
  }));

  function animateDust() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) p.y = h;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animateDust);
  }
  animateDust();
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  updateTrayUI();
  initAmbientEffects();

  // Populate movie selector on Food & Snacks page if present
  const movieSelect = document.getElementById('movieFoodSelector');
  if (movieSelect) {
    REPERTOIRE_MOVIES.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.title;
      opt.textContent = `${m.title} (${m.hall.split('•')[0].trim()})`;
      movieSelect.appendChild(opt);
    });
    setMovieForFood(selectedMovieForFood);
  }

  renderFoodCombos();
  renderFoodMenu();
  renderBattleArena();
  renderCheckoutSummary();
  renderRepertoire('All');
  selectAuditorium(0, document.querySelector('#auditoriumTabs .filter-btn'));
  renderPhotoGallery('All');
  renderReviews();

  if (window.location.hash === '#checkout') {
    const checkoutTab = document.getElementById('tab-food-checkout');
    if (checkoutTab) switchSubPage('food-subpages', 'food-sub-checkout', checkoutTab);
  }
});/* ==========================================================================
   INTERACTIVE SEAT MAP & CINEMA FAQ ENGINE
   ========================================================================== */
let selectedSeatIds = ['E5', 'E6'];

function renderInteractiveSeatMap() {
  const container = document.getElementById('interactiveSeatMap');
  if (!container) return;

  const rows = ['B', 'C', 'D', 'E', 'F'];
  const occupied = new Set(['B3', 'B4', 'C6', 'C7', 'D2', 'E8', 'E9', 'F4', 'F5']);

  container.innerHTML = rows.map(row => {
    const seatsHtml = Array.from({ length: 10 }, (_, idx) => {
      const seatId = `${row}${idx + 1}`;
      const isOcc = occupied.has(seatId);
      const isSel = selectedSeatIds.includes(seatId);
      const cls = isOcc ? 'seat-node occupied' : isSel ? 'seat-node selected' : 'seat-node';
      const clickAttr = isOcc ? '' : `onclick="toggleSeatNode('${seatId}')"`;
      return `<button type="button" ${clickAttr} class="${cls}" title="${isOcc ? 'Reserved' : 'PKR 2,200 • VIP Recliner'}">${seatId}</button>`;
    }).join('');

    return `
      <div class="flex items-center justify-center gap-1.5">
        <span class="text-[11px] font-bold w-6 text-right mr-1" style="color: var(--gold-primary);">${row}</span>
        <div class="flex gap-1.5">${seatsHtml}</div>
      </div>
    `;
  }).join('');

  updateSelectedSeatsReadout();
}

function toggleSeatNode(seatId) {
  if (selectedSeatIds.includes(seatId)) {
    selectedSeatIds = selectedSeatIds.filter(s => s !== seatId);
  } else {
    selectedSeatIds.push(seatId);
  }
  renderInteractiveSeatMap();
}

function updateSelectedSeatsReadout() {
  const el = document.getElementById('selectedSeatsReadout');
  if (!el) return;
  if (selectedSeatIds.length === 0) {
    el.textContent = 'No seats selected — click any available recliner above';
    return;
  }
  const total = selectedSeatIds.length * 2200;
  el.textContent = `${selectedSeatIds.join(', ')} (${selectedSeatIds.length} Recliner${selectedSeatIds.length > 1 ? 's' : ''} • PKR ${total.toLocaleString()})`;
}

function bookSelectedMapSeats() {
  if (selectedSeatIds.length === 0) {
    showToast('⚠️ Please select at least one VIP recliner on the seat map.');
    return;
  }
  openTicketBookingModal('VIP Screening • Custom Seat Selection', `Selected Recliners: ${selectedSeatIds.join(', ')}`);
  const seatSelect = document.getElementById('bookingSeats');
  if (seatSelect) {
    const opt = document.createElement('option');
    opt.textContent = `Custom Bay • ${selectedSeatIds.join(', ')}`;
    opt.selected = true;
    seatSelect.prepend(opt);
  }
}

const CINEMA_FAQS = [
  {
    q: 'How does silent in-seat food & beverage delivery work during a movie?',
    a: 'Every recliner is mapped to our kitchen dispatch console. Orders placed via the Food & Snacks page or your armrest call button are delivered silently through rear butler aisles in warm-hold trays—never blocking the screen or disturbing other guests.'
  },
  {
    q: 'Are restrooms, prayer rooms, and baby-changing suites available on all levels?',
    a: 'Yes. Attendant-maintained obsidian marble restrooms are located on both Level 1 (Main Lobby) and Level 2 (VIP Balcony), alongside private nursing/infant care suites and separate men’s and women’s prayer rooms with heated wudu areas.'
  },
  {
    q: 'Is valet parking complimentary and are EV chargers available?',
    a: 'Covered 2-level subterranean parking in Sector F-7 Markaz is complimentary for all ticket holders, with fast valet drop-off at the West Portico and 8 Type-2/CCS2 EV charging bays on Basement Level B1.'
  },
  {
    q: 'What is your ticket rescheduling and cancellation policy?',
    a: 'Tickets and pre-ordered Lounge Tray meals can be rescheduled free of charge up to 90 minutes before showtime, or refunded 100% to your THEATRON VIP Wallet or original payment method.'
  },
  {
    q: 'Can I book Hall 02 (Royal Velvet Lounge) for a private screening or corporate event?',
    a: 'Yes! Hall 02 (42 heated Italian leather & velvet loveseats) can be reserved for private premieres, birthdays, or corporate keynotes with custom DCP/4K playback and bespoke catering.'
  },
  {
    q: 'Are outside food items allowed inside the auditoriums?',
    a: 'To maintain our allergen-controlled velvet upholstery and gourmet dining standards, outside food and beverages are not permitted, except infant formula and prescribed medical items.'
  }
];

function renderCinemaFaq(query = '') {
  const container = document.getElementById('cinemaFaqAccordion');
  if (!container) return;

  const q = query.toLowerCase().trim();
  const filtered = CINEMA_FAQS.filter(item => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));

  container.innerHTML = filtered.map((item, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}" id="faq-item-${idx}">
      <button type="button" class="faq-question" onclick="document.getElementById('faq-item-${idx}').classList.toggle('open')">
        <span>${item.q}</span>
        <span style="color: var(--gold-primary);">+</span>
      </button>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join('');
}

function filterFaqList() {
  const val = document.getElementById('faqSearchInput')?.value || '';
  renderCinemaFaq(val);
}renderInteractiveSeatMap();
  renderCinemaFaq();