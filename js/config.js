/* ============================================================
   config.js — SINGLE SOURCE OF TRUTH
   ============================================================
   Ubah data bisnis di file ini saja. Semua CTA, pesan WhatsApp,
   harga, dan informasi legal membaca dari sini.

   ⚠️  PENTING (PRD §12): Nilai bertanda PLACEHOLDER wajib diganti
   dengan data aktual sebelum website dipublikasikan.
   ============================================================ */

const SITE_CONFIG = {
  /* ---------- Brand ---------- */
  brandName: "Jamu Pegal Linu Sukoharjo",
  brandShort: "Jamu Sukoharjo",
  tagline: "Warisan Jamu Tradisional Sukoharjo",

  /* ---------- WhatsApp (§6.2) ----------
     Format: kode negara tanpa "+" dan tanpa spasi/leading zero.
     Contoh benar: "6281234567890"
     ⚠️ PLACEHOLDER — ganti dengan nomor asli */
  whatsappNumber: "628XXXXXXXXXX",
  whatsappDisplay: "+62 8XX-XXXX-XXXX",

  /* ---------- Product data (§4.4) ----------
     ⚠️ Semua placeholder sampai data resmi dari produsen diterima */
  product: {
    name: "Jamu Pegal Linu Alami",
    origin: "Sukoharjo, Jawa Tengah",
    description:
      "Jamu tradisional berbahan herbal pilihan yang diracik mengikuti resep warisan, dikemas praktis untuk menemani aktivitas harian Anda.",
    composition: "PLACEHOLDER — isi sesuai label produk",
    weight: "PLACEHOLDER — isi sesuai kemasan (mis. 300 ml)",
    form: "PLACEHOLDER — bentuk produk (mis. cairan/botol)",
    producer: "PLACEHOLDER — nama & alamat produsen",
    permit: "PLACEHOLDER — nomor izin edar (setelah diverifikasi)",
  },

  /* ---------- Pricing (§4.7) ----------
     ⚠️ Taruh harga asli di `price`. Jika `price` null,
     kartu menampilkan "Harga menyusul" — bukan angka rekaan. */
  packages: [
    {
      id: "satuan",
      name: "Paket Satuan",
      description: "Cocok untuk mencoba produk.",
      price: null,            // contoh: 35000
      unit: "1 kemasan",
      features: [
        "1 kemasan jamu",
        "Informasi komposisi lengkap",
        "Petunjuk penggunaan",
      ],
      featured: false,
    },
    {
      id: "hemat",
      name: "Paket Hemat",
      description: "Pilihan paling banyak dipesan.",
      price: null,
      unit: "3 kemasan",
      features: [
        "3 kemasan jamu",
        "Lebih hemat per kemasan",
        "Informasi komposisi lengkap",
      ],
      featured: true,
    },
    {
      id: "keluarga",
      name: "Paket Keluarga",
      description: "Untuk kebutuhan beberapa anggota keluarga.",
      price: null,
      unit: "5 kemasan",
      features: [
        "5 kemasan jamu",
        "Nilai terbaik per kemasan",
        "Informasi komposisi lengkap",
      ],
      featured: false,
    },
  ],

  /* ---------- Messaging ---------- */
  messages: {
    general:
      "Halo, saya tertarik dengan produk Jamu Pegal Linu Sukoharjo.\n\n" +
      "Saya ingin mendapatkan informasi mengenai:\n" +
      "- Harga produk\n" +
      "- Pilihan paket\n" +
      "- Ketersediaan produk\n" +
      "- Cara pemesanan\n\n" +
      "Apakah bisa dibantu?",
    product:
      "Halo, saya ingin bertanya tentang produk Jamu Pegal Linu Alami Sukoharjo. " +
      "Boleh dibantu informasi komposisi dan cara pemakaiannya?",
    package: (name) =>
      `Halo, saya tertarik memesan ${name} dari Jamu Pegal Linu Sukoharjo. ` +
      "Mohon informasi harga, ketersediaan, dan cara pemesanannya.",
  },

  /* ---------- Analytics (§6.3) ----------
     Set `enabled: false` bila belum ingin mengirim event apa pun.
     Dapat dihubungkan ke GA4 / GTM / Meta Pixel tanpa ubah kode lain. */
  analytics: {
    enabled: false,     // ⚠️ aktifkan setelah ID tracking diisi
    ga4MeasurementId: "",  // contoh: "G-XXXXXXXXXX"
    metaPixelId: "",
  },

  /* ---------- Misc ---------- */
  year: new Date().getFullYear(),
};

/* Ekspos secara global agar modul lain dapat membacanya. */
window.SITE_CONFIG = SITE_CONFIG;
