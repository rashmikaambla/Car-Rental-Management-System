/* ===================================================================
   Car details page — reads ?id= from the URL and renders one car
=================================================================== */

const params = new URLSearchParams(location.search);
const car = getCarById(params.get("id"));
const root = document.getElementById("details-root");
const relatedGrid = document.getElementById("related-grid");

if (!car) {
  root.innerHTML = `
    <div class="empty-state" style="grid-column:1/-1;">
      <div style="font-size:2rem;">❓</div>
      <h3>We couldn't find that car</h3>
      <p>It may have been removed from the fleet. Browse the full lineup instead.</p>
      <a href="cars.html" class="btn btn-primary mt-40">Back to fleet</a>
    </div>`;
} else {
  document.title = `${car.name} — RouteLine Car Rentals`;
  document.getElementById("crumb-name").textContent = car.name;

  root.innerHTML = `
    <div class="details-media reveal in">
      ${car.tag ? `<span class="car-tag" style="position:relative;display:inline-block;margin-bottom:14px;">${car.tag}</span>` : ""}
      ${carSVG(car.color, { id: "detail-" + car.id })}
    </div>
    <div class="reveal in">
      <span class="eyebrow">${car.brand} · ${car.category}</span>
      <h1>${car.name}</h1>
      <div class="flex-between" style="margin-bottom:18px;">
        <span class="badge ${car.available ? "on" : "off"}">${car.available ? "Available now" : "Currently booked"}</span>
        <span class="mono" style="color:var(--amber);font-size:1.1rem;">★ ${car.rating} rating</span>
      </div>
      <p>The ${car.name} from ${car.brand} is a ${car.category.toLowerCase()} built for ${car.seats}-passenger trips,
      running on ${car.fuel.toLowerCase()} with a smooth ${car.transmission.toLowerCase()} gearbox. Reserve it below and
      we'll hold it for your selected dates.</p>

      <table class="spec-table">
        <tr><td>Daily rate</td><td class="mono">${formatCurrency(car.price)} / day</td></tr>
        <tr><td>Fuel type</td><td>${car.fuel}</td></tr>
        <tr><td>Seating capacity</td><td>${car.seats} seats</td></tr>
        <tr><td>Transmission</td><td>${car.transmission}</td></tr>
        <tr><td>Category</td><td>${car.category}</td></tr>
      </table>

      <div class="hero-cta">
        <a href="booking.html?car=${car.id}" class="btn btn-primary">${car.available ? "Book this car" : "Join waitlist"}</a>
        <a href="cars.html" class="btn btn-outline">← All cars</a>
      </div>
    </div>`;

  const related = CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);
  const fallback = related.length ? related : CARS.filter((c) => c.id !== car.id).slice(0, 3);
  relatedGrid.innerHTML = fallback
    .map(
      (c) => `
    <div class="car-card reveal in">
      <div class="car-media">
        <span class="car-status ${c.available ? "on" : "off"}">${c.available ? "Available" : "Booked"}</span>
        ${carSVG(c.color, { id: "rel-" + c.id })}
      </div>
      <div class="car-body">
        <div class="car-title-row">
          <div><h3>${c.name}</h3><span class="car-brand">${c.brand} · ${c.category}</span></div>
          <div class="car-price">${formatCurrency(c.price)}<br><small>/ day</small></div>
        </div>
        <div class="car-actions">
          <a href="car-details.html?id=${c.id}" class="btn btn-outline btn-sm">Details</a>
          <a href="booking.html?car=${c.id}" class="btn btn-primary btn-sm">Book</a>
        </div>
      </div>
    </div>`
    )
    .join("");
}
