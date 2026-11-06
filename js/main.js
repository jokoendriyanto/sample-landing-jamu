/* ============================================================
   main.js — Bootstrap: scroll reveal, to-top, analytics, footer
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.querySelector("[data-to-top]");
    if (!btn) return;

    let ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        window.requestAnimationFrame(function () {
          btn.classList.toggle("is-visible", window.scrollY > 700);
          ticking = false;
        });
        ticking = true;
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      const logo = document.querySelector(".nav-logo");
      if (logo) logo.focus({ preventScroll: true });
    });
  }

  /* ---------- Product gallery ---------- */
  function initGallery() {
    const main = document.querySelector("[data-gallery-main]");
    const thumbs = document.querySelectorAll("[data-gallery-thumb]");
    if (!main || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        const src = thumb.getAttribute("data-src");
        const alt = thumb.getAttribute("data-alt") || main.alt;
        if (!src) return;

        main.src = src;
        main.alt = alt;

        thumbs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        thumb.setAttribute("aria-selected", "true");

        if (window.JamuAnalytics) {
          window.JamuAnalytics.track("product_view", { image: src });
        }
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = document.querySelector("[data-year]");
    if (el && window.SITE_CONFIG) el.textContent = window.SITE_CONFIG.year;
  }

  /* ---------- Analytics: clicks & views ---------- */
  function initAnalytics() {
    if (!window.JamuAnalytics) return;

    window.JamuAnalytics.track("page_view", {
      page: document.title,
      path: window.location.pathname,
    });

    // Satu listener untuk semua CTA (event delegation)
    document.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isWhatsApp = href.indexOf("wa.me") !== -1 ||
                         link.hasAttribute("data-wa") ||
                         link.hasAttribute("data-package");

      if (!isWhatsApp) return;

      const pkg = link.getAttribute("data-package");
      const section = link.closest("section");
      const sectionId = section ? section.id : "unknown";

      if (pkg) {
        window.JamuAnalytics.track("pricing_cta_click", {
          package: pkg,
          location: sectionId,
        });
      } else if (sectionId === "hero") {
        window.JamuAnalytics.track("hero_cta_click", { location: "hero" });
      }

      window.JamuAnalytics.track("whatsapp_click", {
        location: sectionId,
        package: pkg || null,
      });
    });

    // Cek apakah pricing terlihat
    const pricing = document.querySelector("#pricing");
    if (pricing && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            window.JamuAnalytics.track("pricing_view", {});
            obs.disconnect();
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(pricing);
    }
  }

  /* ---------- Setup notice: tampil bila nomor WA belum diatur ---------- */
  function initSetupNotice() {
    const notice = document.querySelector("[data-setup-notice]");
    if (!notice || !window.JamuWA) return;

    const number = String(window.SITE_CONFIG.whatsappNumber || "").replace(/[^\d]/g, "");
    if (!window.JamuWA.isNumberValid(number)) {
      notice.classList.add("is-visible");
    }
  }

  /* ---------- Init ---------- */
  function init() {
    if (window.JamuWA) window.JamuWA.initWhatsAppLinks();
    initSetupNotice();
    initReveal();
    initBackToTop();
    initGallery();
    initYear();
    initAnalytics();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
