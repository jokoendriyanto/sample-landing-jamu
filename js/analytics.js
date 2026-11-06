/* ============================================================
   analytics.js — Event tracking (PRD §6.3)
   Aman: tidak mengirim apa pun bila `enabled: false`.
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const conf = cfg.analytics || {};

  /**
   * Kirim event ke semua destination yang terpasang.
   * @param {string} name - Nama event
   * @param {Object} [params] - Parameter tambahan
   */
  function track(name, params) {
    if (!conf.enabled) return;

    const payload = Object.assign(
      { event: name, timestamp: new Date().toISOString() },
      params || {}
    );

    // Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }

    // Google Tag Manager
    if (window.dataLayer && typeof window.dataLayer.push === "function") {
      window.dataLayer.push(payload);
    }

    // Meta Pixel (custom event)
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", name, params || {});
    }

    // Debug lokal
    if (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") {
      console.debug("[analytics]", name, params || {});
    }
  }

  window.JamuAnalytics = { track: track };
})();
