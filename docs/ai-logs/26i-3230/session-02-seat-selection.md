Build seat-selection.html, seat-selection.css, and seat-selection.js in the root folder of E_Group_Theatron.

Follow these exact project conventions and requirements:
1. Shared Architecture & Styling:
   - Link theatron-shared.css and seat-selection.css in the <head>, and load theatron-shared.js before seat-selection.js at the bottom of <body>.
   - Match the exact navbar, footer, dark luxury color palette, typography, and spacing from theatron-shared.css and index.html (and match the style of showtimes.html).
   - Use window.Theatron helpers from theatron-shared.js (STORAGE_KEYS, createPosterPlaceholder, updateNavbarState).

2. Booking Draft Handoff (Input from Showtimes):
   - Read the selected screening object from localStorage using STORAGE_KEYS.latestBooking ("theatron_latest_booking"), expecting fields such as movieTitle, poster, cinema, hall, format, date, time, pricePerSeat, rating, runtime, and language.
   - If theatron_latest_booking is missing or has no movieTitle, display a clean empty-state card with a button linking back to showtimes.html instead of crashing.
   - Display a screening summary banner at the top showing the movie poster (with createPosterPlaceholder fallback), movie title, cinema, hall, format, date, time, and base price per seat.

3. Interactive Auditorium Seat Map & Pricing:
   - Include a 3-step booking progress bar at the top: "1. Showtimes" (completed), "2. Seat Selection" (active), "3. Checkout".
   - Render a curved "SCREEN THIS WAY" banner above a multi-row auditorium layout with a center aisle gap, divided into tiers (e.g., VIP Recliner, Prime, Standard) with clear row labels (A–G) and per-tier pricing.
   - Support three seat states: Available, Selected (toggleable up to a maximum of 8 seats), and Occupied (disabled/unclickable pre-booked seats). Include a clear legend below the map.
   - Include a sticky Order Summary sidebar showing selected seat badges (e.g., D5, D6), ticket count, live seat subtotal calculation in PKR, a "Change Showtime" link back to showtimes.html, and a "Proceed to Checkout" button (disabled until at least 1 seat is selected).

4. Checkout Handoff (Output to Checkout):
   - When the user clicks "Proceed to Checkout", save the updated booking object back to localStorage under STORAGE_KEYS.latestBooking ("theatron_latest_booking") preserving all screening fields while updating seats (array of selected seat codes) and seatSubtotal, then navigate to checkout.html.

Built seat-selection.html, seat-selection.css, and seat-selection.js in E_Group_Theatron.

What Was Implemented

  

  

Shared Architecture & Navigation


  

  
seat-selection.html links theatron-shared.css and seat-selection.css in <head>, loads theatron-shared.js before seat-selection.js at the bottom of <body>, and reuses the shared header (#nav-tickets-count, #nav-patron-initials, #nav-patron-name) and footer from showtimes.html.

  
seat-selection.js uses window.Theatron helpers (STORAGE_KEYS, createPosterPlaceholder, updateNavbarState, readStorage, writeStorage).

  

  

  

  

Booking Draft Handoff & Empty State


  

  
Reads the active draft from localStorage under STORAGE_KEYS.LATEST ("theatron_latest_booking").

  
Displays #empty-booking-state with a link back to showtimes.html if the draft is missing or lacks movieTitle.

  
Populates the top .screening-banner with the movie poster (falling back to createPosterPlaceholder), movieTitle, rating/runtime/language badges, cinema, hall, format, date & time, and base price per seat in PKR (normalizeBasePricePkr preserves PKR amounts >= 200 and scales lower USD-denominated showtimes.js base prices to PKR).

  

  

  

  

Progress Bar, Auditorium Seat Map & Order Summary


  

  
Includes the 3-step .booking-progress bar (1. Showtimes completed link, 2. Seat Selection active, 3. Checkout pending).

  
Renders the curved .screen-stage (SCREEN THIS WAY) banner above rows A–G with a center .seat-aisle gap across three priced tiers (Standard rows A–B, Prime rows C–E, and VIP Recliner rows F–G), deterministic pre-booked Occupied seats, Available seats, and toggleable Selected seats (capped at MAX_SEATS = 8 with #seat-feedback notice) plus .seat-legend.

  
Includes the sticky .order-summary-sidebar displaying clickable selected seat badges (#selected-seat-badges), per-tier breakdown (#tier-breakdown), ticket count (#summary-ticket-count), live PKR subtotal (#summary-seat-subtotal), a Change Showtime link to showtimes.html, and #btn-proceed-checkout (disabled until at least 1 seat is selected).

  

  

  

  

Checkout Handoff


  

  
Clicking #btn-proceed-checkout preserves all existing fields in theatron_latest_booking, updates seats (sorted seat codes) and seatSubtotal, writes back to localStorage, and navigates to checkout.html.

  

  

  
Verification

  
Verified with PowerShell static checks that all DOM IDs referenced in seat-selection.js exist in seat-selection.html, stylesheets and scripts load in the required order, and JS braces/parentheses are balanced (127/127, 310/310).

  
Live browser execution could not be run in this environment (node/npx were unavailable and headless chrome.exe exited with code 1 inside the sandbox), so interactive DOM behavior was not executed in a live browser.