/* ============================================================
   pricing.js — Render paket harga dari konfigurasi (PRD §4.7)
   Harga kosong (null) ditampilkan sebagai "Harga menyusul",
   tidak pernah berupa angka rekaan.
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const grid = document.querySelector("[data-pricing-grid]");
  if (!grid || !cfg || !Array.isArray(cfg.packages)) return;

  /** Format angka ke Rupiah, mis. 35000 → "Rp35.000" */
  function formatRupiah(value) {
    try {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    } catch (err) {
      return "Rp" + Number(value).toLocaleString("id-ID");
    }
  }

  const CHECK_ICON =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="20 6 9 17 4 12"></polyline></svg>';

  function renderCard(pkg) {
    const hasPrice = typeof pkg.price === "number" && pkg.price > 0;

    const priceMarkup = hasPrice
      ? `<span class="amount">${formatRupiah(pkg.price)}</span>
         <span class="unit">/ ${pkg.unit}</span>`
      : `<span class="amount amount--placeholder">Harga menyusul</span>
         <span class="unit">${pkg.unit}</span>`;

    const features = pkg.features
      .map(function (f) {
        return `<li>${CHECK_ICON}<span>${f}</span></li>`;
      })
      .join("");

    return `
      <article class="pricing-card${pkg.featured ? " pricing-card--featured" : ""}">
        ${pkg.featured ? '<span class="pricing-flag">Paling Dipilih</span>' : ""}
        <h3>${pkg.name}</h3>
        <p class="pricing-desc">${pkg.description}</p>
        <p class="pricing-price">${priceMarkup}</p>
        <ul class="pricing-features">${features}</ul>
        <a class="btn ${pkg.featured ? "btn-primary" : "btn-secondary"} btn-block"
           href="#" data-package="${pkg.name}">
          Pilih ${pkg.name}
        </a>
      </article>`;
  }

  grid.innerHTML = cfg.packages.map(renderCard).join("");

  // Pasang ulang link WhatsApp untuk kartu yang baru dirender
  if (window.JamuWA) window.JamuWA.initWhatsAppLinks();
})();
