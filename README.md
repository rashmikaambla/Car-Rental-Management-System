# RouteLine — Car Rental Management System

A modern, responsive car rental website built with plain **HTML, CSS and JavaScript**
(no build tools or npm install required). Data is stored in a static JS array and
bookings/accounts are persisted in the browser's `localStorage`.

## How to run

No installation needed.

1. Unzip the project.
2. Double-click `index.html` to open it in your browser, **or** for the best experience
   (so relative links and localStorage behave normally), serve it with a tiny local server:
   ```bash
   cd car-rental
   python3 -m http.server 8080
   # then open http://localhost:8080
   ```

## Project structure

```
car-rental/
├── index.html              Homepage (hero, intro, featured cars, CTA)
├── cars.html                Full fleet with search & filters
├── car-details.html         Single car detail page (?id=)
├── booking.html              Booking form with validation
├── booking-history.html      "My Bookings" (localStorage)
├── login.html                 Login / Sign up UI (demo auth)
├── admin.html                 Admin dashboard UI
├── css/style.css              Design system + all styles
├── js/data.js                 Car dataset + SVG car illustrations
├── js/main.js                 Shared: nav, dark/light mode, toasts, scroll reveal
├── js/cars.js                 Fleet search/filter/sort logic
├── js/details.js               Car details rendering
├── js/booking.js                Booking form validation + price estimate
├── js/history.js                 Booking history table (cancel/remove)
├── js/auth.js                     Login/signup validation (localStorage)
└── js/admin.js                     Admin stats + tables
```

## Features implemented

- **Homepage**: hero banner with animated speedometer graphic, company intro,
  featured cars, call-to-action sections.
- **Car listing**: image (SVG), name/model, price/day, fuel type, seats,
  availability badge, category tag.
- **Search & filter**: live search by name/brand, filter by category, fuel type,
  availability, and price range slider, plus sorting.
- **Booking form**: name, email, phone, license, pickup/return dates, pickup
  location, extras, notes — with full inline validation (required fields, email
  format, phone format, date logic) and a live price estimate.
- **Responsive design**: mobile-first breakpoints for nav, hero, grids, and forms.
- **Navigation & footer**: sticky nav with mobile hamburger menu, footer with
  contact and social links.
- **Bonus features**: light/dark mode toggle, car details page, booking history
  with cancel/remove, login/signup UI, admin dashboard UI (fleet + bookings +
  stats), scroll-reveal animation, toast notifications.

## Design notes

The visual identity ("RouteLine") uses an asphalt/amber palette with a dashed
lane-line motif as a recurring divider, Oswald for display type (highway-sign
feel), Inter for body copy, and JetBrains Mono for data readouts (prices,
specs, references) — evoking a dashboard/instrument-cluster aesthetic that
matches the car-rental subject matter.

## Notes for extending this project

- Swap `js/data.js` for a real API/JSON fetch to connect a backend.
- Replace the demo `js/auth.js` with real authentication before any production use —
  passwords are currently stored in plain text in localStorage for demo purposes only.
- The admin dashboard is UI-only; wire it to real endpoints for live fleet/booking data.
