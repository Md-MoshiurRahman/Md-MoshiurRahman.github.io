const navLinks = [...document.querySelectorAll(".side-nav a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));

let clickLock = false;
let scrollTimer;

function setActive(index) {
  navLinks.forEach((a, i) => a.classList.toggle("active", i === index));
}

function updateActive() {
  const line = window.scrollY + window.innerHeight * 0.3;
  let current = 0;
  sections.forEach((s, i) => {
    if (s.getBoundingClientRect().top + window.scrollY <= line) current = i;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections.length - 1;
  }
  setActive(current);
}

navLinks.forEach((a, i) => {
  a.addEventListener("click", () => {
    setActive(i);
    clickLock = true;
  });
});

window.addEventListener("scroll", () => {
  if (clickLock) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { clickLock = false; }, 150);
    return;
  }
  updateActive();
}, { passive: true });

window.addEventListener("resize", updateActive);
updateActive();
