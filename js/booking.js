/* ===================================================================
   Booking form — validation, live price estimate, localStorage save
=================================================================== */

const carSelect = document.getElementById("carSelect");
const form = document.getElementById("bookingForm");
const formMsg = document.getElementById("formMsg");
const estimateLine = document.getElementById("estimateLine");

CARS.forEach((c) => {
  const opt = document.createElement("option");
  opt.value = c.id;
  opt.textContent = `${c.name} — ${c.brand} (${formatCurrency(c.price)}/day)${c.available ? "" : " · currently booked"}`;
  carSelect.appendChild(opt);
});

const params = new URLSearchParams(location.search);
const preselect = params.get("car");
if (preselect && getCarById(preselect)) carSelect.value = preselect;

/* Default date bounds: pickup can't be before today */
const today = new Date().toISOString().split("T")[0];
document.getElementById("pickupDate").min = today;
document.getElementById("returnDate").min = today;

const fields = {
  car: carSelect,
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  license: document.getElementById("license"),
  pickupDate: document.getElementById("pickupDate"),
  returnDate: document.getElementById("returnDate")
};

function setError(name, message) {
  const errEl = document.getElementById("err-" + name);
  const fieldWrap = fields[name].closest(".field");
  errEl.textContent = message || "";
  fieldWrap.classList.toggle("has-error", Boolean(message));
}

function validate() {
  let valid = true;

  if (!fields.car.value) { setError("car", "Please choose a car."); valid = false; }
  else setError("car", "");

  if (!fields.fullName.value.trim() || fields.fullName.value.trim().length < 2) {
    setError("fullName", "Enter your full name."); valid = false;
  } else setError("fullName", "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(fields.email.value.trim())) {
    setError("email", "Enter a valid email address."); valid = false;
  } else setError("email", "");

  const phonePattern = /^[+\d][\d\s-]{7,15}$/;
  if (!phonePattern.test(fields.phone.value.trim())) {
    setError("phone", "Enter a valid phone number (8+ digits)."); valid = false;
  } else setError("phone", "");

  if (!fields.license.value.trim() || fields.license.value.trim().length < 4) {
    setError("license", "Enter a valid license number."); valid = false;
  } else setError("license", "");

  if (!fields.pickupDate.value) {
    setError("pickupDate", "Select a pickup date."); valid = false;
  } else if (fields.pickupDate.value < today) {
    setError("pickupDate", "Pickup date can't be in the past."); valid = false;
  } else setError("pickupDate", "");

  if (!fields.returnDate.value) {
    setError("returnDate", "Select a return date."); valid = false;
  } else if (fields.pickupDate.value && fields.returnDate.value <= fields.pickupDate.value) {
    setError("returnDate", "Return date must be after pickup date."); valid = false;
  } else setError("returnDate", "");

  return valid;
}

function computeDays() {
  if (!fields.pickupDate.value || !fields.returnDate.value) return 0;
  const p = new Date(fields.pickupDate.value);
  const r = new Date(fields.returnDate.value);
  const diff = Math.round((r - p) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function addonRate(value) {
  return { none: 0, driver: 20, insurance: 12, both: 32 }[value] || 0;
}

function updateEstimate() {
  const car = getCarById(carSelect.value);
  const days = computeDays();
  if (!car || !days) {
    estimateLine.textContent = "Estimated total: —";
    return;
  }
  const addon = addonRate(document.getElementById("addonDriver").value);
  const total = (car.price + addon) * days;
  estimateLine.innerHTML = `Estimated total: <span class="mono" style="color:var(--amber);">${formatCurrency(total)}</span> for ${days} day${days === 1 ? "" : "s"}`;
}

["car", "pickupDate", "returnDate"].forEach((k) => fields[k].addEventListener("change", updateEstimate));
document.getElementById("addonDriver").addEventListener("change", updateEstimate);
fields.pickupDate.addEventListener("change", () => {
  document.getElementById("returnDate").min = fields.pickupDate.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) {
    formMsg.textContent = "Please fix the highlighted fields before submitting.";
    formMsg.className = "form-msg error show";
    return;
  }

  const car = getCarById(carSelect.value);
  const days = computeDays();
  const addon = addonRate(document.getElementById("addonDriver").value);
  const total = (car.price + addon) * days;

  const booking = {
    id: "BK" + Date.now().toString().slice(-8),
    carId: car.id,
    carName: `${car.name} (${car.brand})`,
    fullName: fields.fullName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    license: fields.license.value.trim(),
    pickupDate: fields.pickupDate.value,
    returnDate: fields.returnDate.value,
    pickupLocation: document.getElementById("pickupLocation").value,
    addon: document.getElementById("addonDriver").value,
    notes: document.getElementById("notes").value.trim(),
    days,
    total,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  const bookings = JSON.parse(localStorage.getItem("rl_bookings") || "[]");
  bookings.unshift(booking);
  localStorage.setItem("rl_bookings", JSON.stringify(bookings));

  formMsg.textContent = `Booking confirmed! Reference ${booking.id} — ${car.name} from ${booking.pickupDate} to ${booking.returnDate}. Redirecting to your bookings…`;
  formMsg.className = "form-msg success show";
  form.reset();
  updateEstimate();
  showToast("Booking saved to My Bookings");

  setTimeout(() => { window.location.href = "booking-history.html"; }, 1600);
});

updateEstimate();
