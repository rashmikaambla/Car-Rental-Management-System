/* ===================================================================
   Admin dashboard — read-only UI over CARS data + rl_bookings storage
=================================================================== */

const bookings = JSON.parse(localStorage.getItem("rl_bookings") || "[]");

document.getElementById("stat-fleet").textContent = CARS.length;
document.getElementById("stat-available").textContent = CARS.filter((c) => c.available).length;
document.getElementById("stat-bookings").textContent = bookings.length;
document.getElementById("stat-revenue").textContent = formatCurrency(
  bookings.reduce((sum, b) => sum + (b.status !== "Cancelled" ? b.total : 0), 0)
);

const fleetBody = document.querySelector("#fleetTable tbody");
fleetBody.innerHTML = CARS.map(
  (c) => `
  <tr>
    <td>${c.name} <span style="color:var(--text-muted);">(${c.brand})</span></td>
    <td>${c.category}</td>
    <td>${c.fuel}</td>
    <td class="mono">${formatCurrency(c.price)}</td>
    <td class="mono">★ ${c.rating}</td>
    <td><span class="badge ${c.available ? "on" : "off"}">${c.available ? "Available" : "Booked"}</span></td>
  </tr>`
).join("");

const bookingsPanel = document.getElementById("bookingsPanel");
if (!bookings.length) {
  bookingsPanel.innerHTML = `<div class="empty-state" style="border:none;">
    <div style="font-size:1.8rem;">📭</div>
    <h3>No bookings recorded yet</h3>
    <p>Bookings made on this device via the booking form will appear here.</p>
  </div>`;
} else {
  bookingsPanel.innerHTML = `
    <table class="data-table">
      <thead>
        <tr><th>Reference</th><th>Customer</th><th>Car</th><th>Dates</th><th>Total</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${bookings
          .map(
            (b) => `
          <tr>
            <td class="mono">${b.id}</td>
            <td>${b.fullName}<br><span style="color:var(--text-muted);font-size:0.78rem;">${b.email}</span></td>
            <td>${b.carName}</td>
            <td class="mono">${b.pickupDate} → ${b.returnDate}</td>
            <td class="mono">${formatCurrency(b.total)}</td>
            <td><span class="badge ${b.status === "Cancelled" ? "off" : "on"}">${b.status}</span></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
}

/* Smooth-scroll side nav + active state (single-page sections) */
document.querySelectorAll("[data-panel-link]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll("[data-panel-link]").forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});
