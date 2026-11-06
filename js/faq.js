/* ============================================================
   faq.js — Accordion behaviour + analytics (PRD §4.9)
   ============================================================ */
(function () {
  "use strict";

  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  /**
   * Pastikan hanya satu item yang terbuka pada satu waktu.
   * Menggunakan elemen <details> sehingga tetap berfungsi tanpa JS.
   */
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;

      items.forEach(function (other) {
        if (other !== item && other.open) other.open = false;
      });

      if (window.JamuAnalytics) {
        const summary = item.querySelector("summary");
        window.JamuAnalytics.track("faq_open", {
          question: summary ? summary.textContent.trim() : "",
        });
      }
    });
  });
})();
