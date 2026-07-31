/* ===================================================================
   RouteLine — shared behaviors across all pages
=================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavToggle();
  initScrollReveal();
  markActiveNav();
  renderAuthState();
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});

/* ---------- Theme (dark default, light optional) ---------- */
function initTheme() {
  const saved = localStorage.getItem("rl_theme");
  if (saved === "light") document.body.classList.add("light-mode");
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;
  updateThemeIcon(btn);
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("rl_theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    updateThemeIcon(btn);
  });
}
function updateThemeIcon(btn) {
  btn.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
}

/* ---------- Mobile nav ---------- */
function initNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
}

/* ---------- Highlight active nav link ---------- */
function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-links] a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => obs.observe(el));
}

/* ---------- Toast ---------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ---------- Simple auth state (demo only, localStorage) ---------- */
function renderAuthState() {
  const slot = document.querySelector("[data-auth-slot]");
  if (!slot) return;
  const user = JSON.parse(localStorage.getItem("rl_user") || "null");
  if (user) {
    slot.innerHTML = `<a href="booking-history.html" class="btn btn-outline btn-sm">Hi, ${escapeHtml(user.name.split(" ")[0])}</a>
      <button class="icon-btn" title="Log out" data-logout>⏻</button>`;
    const logoutBtn = slot.querySelector("[data-logout]");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("rl_user");
      showToast("Signed out");
      setTimeout(() => location.reload(), 500);
    });
  } else {
    slot.innerHTML = `<a href="login.html" class="btn btn-outline btn-sm">Log in</a>`;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
