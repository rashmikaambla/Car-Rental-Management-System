/* ===================================================================
   Fleet listing — search, filter, sort (client-side over CARS array)
=================================================================== */

const grid = document.getElementById("car-grid");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const fuelSelect = document.getElementById("fuel");
const availSelect = document.getElementById("availability");
const sortSelect = document.getElementById("sort");
const maxPriceInput = document.getElementById("maxPrice");
const maxPriceLabel = document.getElementById("maxPriceLabel");
const resultCount = document.getElementById("resultCount");
const resetBtn = document.getElementById("resetFilters");

function populateSelect(select, values) {
  values.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}
populateSelect(categorySelect, [...new Set(CARS.map((c) => c.category))].sort());
populateSelect(fuelSelect, [...new Set(CARS.map((c) => c.fuel))].sort());

/* Preselect category from URL, e.g. cars.html?category=SUV */
const params = new URLSearchParams(location.search);
if (params.get("category")) categorySelect.value = params.get("category");

function renderCard(car) {
  return `
  <div class="car-card reveal in">
    <div class="car-media">
      ${car.tag ? `<span class="car-tag">${car.tag}</span>` : ""}
      <span class="car-status ${car.available ? "on" : "off"}">${car.available ? "Available" : "Booked"}</span>
      ${carSVG(car.color, { id: "list-" + car.id })}
    </div>
    <div class="car-body">
      <div class="car-title-row">
        <div>
          <h3>${car.name}</h3>
          <span class="car-brand">${car.brand} · ${car.category}</span>
        </div>
        <div class="car-price">${formatCurrency(car.price)}<br><small>/ day</small></div>
      </div>
      <div class="spec-row">
        <span>⛽ ${car.fuel}</span>
        <span>👤 ${car.seats} seats</span>
        <span>⚙ ${car.transmission}</span>
        <span>★ ${car.rating}</span>
      </div>
      <div class="car-actions">
        <a href="car-details.html?id=${car.id}" class="btn btn-outline btn-sm">Details</a>
        <a href="booking.html?car=${car.id}" class="btn btn-primary btn-sm">${car.available ? "Book" : "Waitlist"}</a>
      </div>
    </div>
  </div>`;
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const fuel = fuelSelect.value;
  const avail = availSelect.value;
  const maxPrice = Number(maxPriceInput.value);
  const sort = sortSelect.value;

  maxPriceLabel.textContent = formatCurrency(maxPrice);

  let results = CARS.filter((car) => {
    const matchesQuery = !q || car.name.toLowerCase().includes(q) || car.brand.toLowerCase().includes(q);
    const matchesCategory = !category || car.category === category;
    const matchesFuel = !fuel || car.fuel === fuel;
    const matchesAvail = !avail || (avail === "available" ? car.available : !car.available);
    const matchesPrice = car.price <= maxPrice;
    return matchesQuery && matchesCategory && matchesFuel && matchesAvail && matchesPrice;
  });

  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  else if (sort === "rating-desc") results.sort((a, b) => b.rating - a.rating);

  resultCount.textContent = `${results.length} car${results.length === 1 ? "" : "s"} found`;

  grid.innerHTML = results.length
    ? results.map(renderCard).join("")
    : `<div class="empty-state">
         <div style="font-size:2rem;">🚧</div>
         <h3>No cars match those filters</h3>
         <p>Try widening the price range or clearing a filter.</p>
       </div>`;
}

[searchInput, categorySelect, fuelSelect, availSelect, sortSelect, maxPriceInput].forEach((el) =>
  el.addEventListener("input", applyFilters)
);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "";
  fuelSelect.value = "";
  availSelect.value = "";
  sortSelect.value = "default";
  maxPriceInput.value = 150;
  applyFilters();
});

applyFilters();
