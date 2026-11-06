/* ============================================================
   navigation.js — Sticky nav, mobile drawer, active link (PRD §4.1)
   ============================================================ */
(function () {
  "use strict";

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav) return;

  /* ---------- Mobile drawer ---------- */
  function closeDrawer() {
    nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu navigasi");
    }
  }

  function openDrawer() {
    nav.classList.add("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Tutup menu navigasi");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  // Tutup drawer saat link diklik
  nav.addEventListener("click", function (e) {
    if (e.target.closest(".nav-drawer a")) closeDrawer();
  });

  // Tutup drawer saat klik di luar
  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || (toggle && toggle.contains(e.target))) return;
    closeDrawer();
  });

  // Tutup drawer dengan Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeDrawer();
      if (toggle) toggle.focus();
    }
  });

  // Tutup drawer saat layar diperbesar ke desktop
  const desktopQuery = window.matchMedia("(min-width: 1024px)");
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", function (e) {
      if (e.matches) closeDrawer();
    });
  }

  /* ---------- Sticky behaviour: hide on scroll down ---------- */
  let lastScroll = window.scrollY;
  let ticking = false;

  function onScroll() {
    const current = window.scrollY;

    nav.classList.toggle("is-scrolled", current > 8);

    // Sembunyikan saat scroll turun, tampilkan saat scroll naik
    if (current > 180 && current > lastScroll) {
      closeDrawer();
      nav.classList.add("is-hidden");
    } else {
      nav.classList.remove("is-hidden");
    }

    lastScroll = current;
    ticking = false;
    updateActiveLink();
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  /* ---------- Active section highlight ---------- */
  const navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"], .nav-drawer a[href^="#"]')
  );

  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return null;
      const target = document.querySelector(id);
      return target ? { link: link, target: target, id: id } : null;
    })
    .filter(Boolean);

  function updateActiveLink() {
    if (!sections.length) return;

    const offset = 140;
    let active = null;

    sections.forEach(function (item) {
      const top = item.target.getBoundingClientRect().top;
      if (top - offset <= 0) active = item;
    });

    if (!active || window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      sections.forEach(function (i) { i.link.classList.remove("is-active"); });
      return;
    }

    sections.forEach(function (i) {
      i.link.classList.toggle("is-active", i === active);
    });
  }

  /* ---------- Smooth scroll with nav offset ---------- */
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    closeDrawer();

    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });

    // Perbarui fokus untuk aksesibilitas keyboard
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
})();
