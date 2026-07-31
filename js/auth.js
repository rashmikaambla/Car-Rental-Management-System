/* ===================================================================
   Demo auth — localStorage only, for UI/UX demonstration purposes.
   Not secure; illustrates form handling & validation patterns.
=================================================================== */

const modeButtons = document.querySelectorAll("[data-mode]");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMsg = document.getElementById("authMsg");

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const isLogin = btn.dataset.mode === "login";
    loginForm.style.display = isLogin ? "block" : "none";
    signupForm.style.display = isLogin ? "none" : "block";
    authMsg.className = "form-msg";
  });
});

function setErr(id, msg) {
  document.getElementById("err-" + id).textContent = msg || "";
  document.getElementById(id).closest(".field").classList.toggle("has-error", Boolean(msg));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("rl_users") || "[]");
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  let valid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("loginEmail", "Enter a valid email."); valid = false; }
  else setErr("loginEmail", "");
  if (!password) { setErr("loginPassword", "Enter your password."); valid = false; }
  else setErr("loginPassword", "");
  if (!valid) return;

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    authMsg.textContent = "No account matches those details. Try signing up instead.";
    authMsg.className = "form-msg error show";
    return;
  }
  localStorage.setItem("rl_user", JSON.stringify({ name: user.name, email: user.email }));
  authMsg.textContent = `Welcome back, ${user.name.split(" ")[0]}! Redirecting…`;
  authMsg.className = "form-msg success show";
  setTimeout(() => (window.location.href = "index.html"), 1000);
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  let valid = true;

  if (name.length < 2) { setErr("signupName", "Enter your full name."); valid = false; }
  else setErr("signupName", "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("signupEmail", "Enter a valid email."); valid = false; }
  else setErr("signupEmail", "");
  if (password.length < 6) { setErr("signupPassword", "Use at least 6 characters."); valid = false; }
  else setErr("signupPassword", "");
  if (!valid) return;

  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    authMsg.textContent = "An account with that email already exists — try logging in.";
    authMsg.className = "form-msg error show";
    return;
  }
  users.push({ name, email, password });
  localStorage.setItem("rl_users", JSON.stringify(users));
  localStorage.setItem("rl_user", JSON.stringify({ name, email }));
  authMsg.textContent = "Account created! Redirecting…";
  authMsg.className = "form-msg success show";
  setTimeout(() => (window.location.href = "index.html"), 1000);
});
