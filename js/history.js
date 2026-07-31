/* ===================================================================
   Booking history — reads rl_bookings from localStorage
=================================================================== */

const historyRoot = document.getElementById("history-root");

function loadBookings() {
  return JSON.parse(localStorage.getItem("rl_bookings") || "[]");
}
function saveBookings(list) {
  localStorage.setItem("rl_bookings", JSON.stringify(list));
}

function statusBadge(status) {
  const cls = status === "Cancelled" ? "off" : "on";
  return `<span class="badge ${cls}">${status}</span>`;
}

function renderHistory() {
  const bookings = loadBookings();

  if (!bookings.length) {
    historyRoot.innerHTML = `
      <div class="empty-state">
        <div style="font-size:2rem;">🗂️</div>
        <h3>No bookings yet</h3>
        <p>Once you reserve a car, it'll show up here with its confirmation reference.</p>
        <a href="booking.html" class="btn btn-primary mt-40">Book a car</a>
      </div>`;
    return;
  }

  historyRoot.innerHTML = `
    <div class="card table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Car</th>
            <th>Dates</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${bookings
            .map(
              (b) => `
            <tr>
              <td class="mono">${b.id}</td>
              <td>${b.carName}</td>
              <td class="mono">${b.pickupDate} → ${b.returnDate}</td>
              <td class="mono">${formatCurrency(b.total)}</td>
              <td>${statusBadge(b.status)}</td>
              <td>
                ${b.status !== "Cancelled"
                  ? `<button class="btn btn-outline btn-sm" data-cancel="${b.id}">Cancel</button>`
                  : `<button class="btn btn-outline btn-sm" data-remove="${b.id}">Remove</button>`}
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;

  historyRoot.querySelectorAll("[data-cancel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = loadBookings().map((b) => (b.id === btn.dataset.cancel ? { ...b, status: "Cancelled" } : b));
      saveBookings(list);
      showToast("Booking cancelled");
      renderHistory();
    });
  });
  historyRoot.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = loadBookings().filter((b) => b.id !== btn.dataset.remove);
      saveBookings(list);
      renderHistory();
    });
  });
}

renderHistory();
