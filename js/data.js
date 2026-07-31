/* ===================================================================
   RouteLine Car Rentals — Vehicle Data
   Static dataset simulating a backend /api/cars response.
=================================================================== */

const CARS = [
  {
    id: 1,
    name: "Civic Tourer",
    brand: "Honda",
    category: "Sedan",
    price: 45,
    fuel: "Petrol",
    seats: 5,
    transmission: "Automatic",
    rating: 4.6,
    available: true,
    color: "#FFB800",
    tag: "Popular"
  },
  {
    id: 2,
    name: "Model E",
    brand: "Voltra",
    category: "Electric",
    price: 68,
    fuel: "Electric",
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    available: true,
    color: "#17A398",
    tag: "Eco Pick"
  },
  {
    id: 3,
    name: "Terrain X4",
    brand: "Nomad",
    category: "SUV",
    price: 72,
    fuel: "Diesel",
    seats: 7,
    transmission: "Automatic",
    rating: 4.5,
    available: true,
    color: "#E13A3A",
    tag: "Family"
  },
  {
    id: 4,
    name: "City Hatch",
    brand: "Suzu",
    category: "Hatchback",
    price: 32,
    fuel: "Petrol",
    seats: 4,
    transmission: "Manual",
    rating: 4.2,
    available: true,
    color: "#6B7280",
    tag: "Budget"
  },
  {
    id: 5,
    name: "Regal Line",
    brand: "Estella",
    category: "Luxury",
    price: 130,
    fuel: "Hybrid",
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    available: false,
    color: "#1B1D22",
    tag: "Premium"
  },
  {
    id: 6,
    name: "Ridge Runner",
    brand: "Nomad",
    category: "SUV",
    price: 80,
    fuel: "Petrol",
    seats: 5,
    transmission: "Automatic",
    rating: 4.4,
    available: true,
    color: "#FFB800",
    tag: null
  },
  {
    id: 7,
    name: "Volt Compact",
    brand: "Voltra",
    category: "Electric",
    price: 58,
    fuel: "Electric",
    seats: 4,
    transmission: "Automatic",
    rating: 4.7,
    available: true,
    color: "#17A398",
    tag: null
  },
  {
    id: 8,
    name: "Sedan Classic",
    brand: "Honda",
    category: "Sedan",
    price: 40,
    fuel: "Petrol",
    seats: 5,
    transmission: "Manual",
    rating: 4.1,
    available: false,
    color: "#E13A3A",
    tag: null
  },
  {
    id: 9,
    name: "Executive 7",
    brand: "Estella",
    category: "Luxury",
    price: 145,
    fuel: "Diesel",
    seats: 7,
    transmission: "Automatic",
    rating: 4.9,
    available: true,
    color: "#6B7280",
    tag: "Premium"
  },
  {
    id: 10,
    name: "Nano Hatch",
    brand: "Suzu",
    category: "Hatchback",
    price: 28,
    fuel: "Petrol",
    seats: 4,
    transmission: "Manual",
    rating: 4.0,
    available: true,
    color: "#FFB800",
    tag: "Budget"
  }
];

/* Generates a stylized side-profile car SVG as a data-free inline vector,
   so the project runs with zero external image dependencies. */
function carSVG(color, opts = {}) {
  const id = opts.id || Math.random().toString(36).slice(2, 8);
  return `
  <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" class="car-svg" role="img" aria-label="Car illustration">
    <defs>
      <linearGradient id="grad-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity="0.95"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0.65"/>
      </linearGradient>
    </defs>
    <ellipse cx="120" cy="100" rx="100" ry="8" fill="#000" opacity="0.15"/>
    <path d="M20 78 Q28 46 62 42 L84 24 Q96 16 116 16 L152 16 Q168 16 178 28 L196 42 Q220 46 224 70 L224 82 Q224 90 214 90 L20 90 Q12 90 12 82 Z"
      fill="url(#grad-${id})" stroke="#1B1D22" stroke-width="2.5"/>
    <path d="M92 26 L108 42 L160 42 L148 26 Z" fill="#EAF2F5" stroke="#1B1D22" stroke-width="2" opacity="0.9"/>
    <path d="M92 26 L84 42 L108 42 Z" fill="#EAF2F5" stroke="#1B1D22" stroke-width="2" opacity="0.9"/>
    <circle cx="66" cy="90" r="16" fill="#1B1D22"/>
    <circle cx="66" cy="90" r="7" fill="#9AA0A6"/>
    <circle cx="176" cy="90" r="16" fill="#1B1D22"/>
    <circle cx="176" cy="90" r="7" fill="#9AA0A6"/>
    <rect x="18" y="58" width="14" height="6" rx="2" fill="#FFB800"/>
    <rect x="208" y="58" width="14" height="6" rx="2" fill="#E13A3A"/>
  </svg>`;
}

/* Simple pub/sub-free helpers reused across pages */
function formatCurrency(n) {
  return "$" + Number(n).toFixed(0);
}

function getCarById(id) {
  return CARS.find((c) => c.id === Number(id));
}
