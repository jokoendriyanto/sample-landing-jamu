/* ============================================================
   whatsapp.js — Dynamic WhatsApp links (PRD §6.2)
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;

  /**
   * Nomor dianggap valid bila hanya digit dan panjang wajar untuk
   * nomor Indonesia berformat internasional (62 + 8..13 digit).
   * Nomor placeholder seperti "628XXXXXXXXXX" TIDAK valid.
   */
  function isNumberValid(number) {
    return /^62\d{8,13}$/.test(number);
  }

  /**
   * Bangun URL WhatsApp Click-to-Chat.
   * Jika nomor belum dikonfigurasi, kembalikan null agar tautan tidak
   * pernah mengarah ke nomor yang salah — pemanggil menanganinya
   * dengan fallback yang jujur kepada pengguna.
   *
   * @param {string} message - Pesan terisi otomatis
   * @returns {string|null} URL wa.me, atau null bila nomor belum valid
   */
  function buildWhatsAppUrl(message) {
    const number = String(cfg.whatsappNumber || "").replace(/[^\d]/g, "");
    if (!isNumberValid(number)) return null;

    const text = encodeURIComponent(message || cfg.messages.general);
    return `https://wa.me/${number}?text=${text}`;
  }

  /**
   * Tentukan pesan berdasarkan atribut data pada elemen CTA.
   * Elemen dapat memakai:
   *   data-wa="product"  → pesan product
   *   data-package="Paket Hemat" → pesan khusus paket
   *   (kosong)           → pesan general
   */
  function resolveMessage(el) {
    const pkg = el.getAttribute("data-package");
    if (pkg) return cfg.messages.package(pkg);

    const kind = el.getAttribute("data-wa");
    if (kind === "product") return cfg.messages.product;
    return cfg.messages.general;
  }

  /**
   * Pasang tautan WhatsApp pada semua elemen [data-wa] dan [data-package].
   */
  function initWhatsAppLinks() {
    const links = document.querySelectorAll("[data-wa], [data-package]");

    links.forEach(function (el) {
      const message = resolveMessage(el);
      const url = buildWhatsAppUrl(message);

      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");

      if (url) {
        el.setAttribute("href", url);
        el.removeAttribute("data-wa-placeholder");
        el.removeAttribute("aria-description");
        return;
      }

      /*
       * Nomor belum dikonfigurasi (masih placeholder).
       * Jangan hasilkan tautan rusak seperti "wa.me/628".
       * Tautan dinonaktifkan dan pengguna diberi tahu secara jujur.
       */
      el.removeAttribute("href");
      el.removeAttribute("target");
      el.setAttribute("role", "button");
      el.setAttribute("aria-disabled", "true");
      el.setAttribute("data-wa-placeholder", "true");
      el.setAttribute(
        "aria-description",
        "Nomor WhatsApp belum dikonfigurasi oleh pemilik situs."
      );
      el.setAttribute("title", "Nomor WhatsApp belum dikonfigurasi");

      el.addEventListener("click", function (event) {
        event.preventDefault();
        if (window.console && console.warn) {
          console.warn(
            "[Jamu] Nomor WhatsApp belum diatur. " +
            "Ubah whatsappNumber di js/config.js dengan nomor asli (contoh: 6281234567890)."
          );
        }
      });
    });
  }

  window.JamuWA = {
    buildWhatsAppUrl: buildWhatsAppUrl,
    isNumberValid: isNumberValid,
    initWhatsAppLinks: initWhatsAppLinks,
  };
})();
