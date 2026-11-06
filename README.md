# Landing Page Jamu Pegal Linu Sukoharjo

Landing page statis untuk produk jamu pegal linu alami khas Sukoharjo.
Dibangun dengan **HTML5 + CSS3 + Vanilla JS** — tanpa framework, tanpa build step,
siap di-hosting di hosting statis apa pun (Netlify, Vercel, GitHub Pages, cPanel).

---

## 1. Menjalankan Secara Lokal

```bash
# Dari folder project
python3 -m http.server 8899
# lalu buka http://localhost:8899
```

Bisa juga membuka `index.html` langsung, tetapi server lokal lebih dianjurkan
agar lazy-loading dan font bekerja normal.

---

## 2. Konfigurasi — SATU TEMPAT

Hampir semua data bisnis diatur di **`js/config.js`**. Yang wajib diganti sebelum
publikasi ditandai ⚠️.

| Setting | Baris | Keterangan |
|---|---|---|
| ⚠️ `whatsappNumber` | `"628XXXXXXXXXX"` | Nomor WhatsApp format internasional, tanpa `+`, tanpa spasi. Contoh: `6281234567890` |
| ⚠️ `packages[].price` | `null` | Harga asli tiap paket (angka, tanpa titik). Contoh: `35000`. Selama `null`, kartu menampilkan **"Harga menyusul"** — bukan angka rekaan |
| ⚠️ `product.composition` | placeholder | Komposisi sesuai label |
| ⚠️ `product.producer` | placeholder | Nama & alamat produsen |
| ⚠️ `product.permit` | placeholder | Nomor izin edar, **setelah diverifikasi** |
| `analytics.enabled` | `false` | Aktifkan setelah ID tracking diisi |
| `messages.*` | sudah terisi | Pesan WhatsApp otomatis per konteks |

### Mengaktifkan tombol WhatsApp

Until `whatsappNumber` diisi dengan nomor valid (`62` + 8–13 digit):

- Semua tombol pemesanan **otomatis dinonaktifkan** (tidak menghasilkan link rusak)
- Muncul banner peringatan di atas halaman
- Console menampilkan instruksi perbaikan

Begitu nomor valid diisi, banner hilang dan seluruh CTA aktif dengan pesan
yang sudah terisi otomatis.

---

## 3. Mengganti Foto

Semua gambar ada di `assets/images/`.

| File | Dipakai di | Ukuran disarankan |
|---|---|---|
| `hero-jamu.webp` | Hero section | 920 × 652 (rasio 3:2) |
| `hero-jamu-460.webp` | Hero (layar kecil) | 460 × 326 |
| `product-placeholder.svg` | Galeri produk | ilustrasi — ganti bila ada foto asli |
| `packaging-placeholder.svg` | Galeri kemasan | ilustrasi |
| `ingredients-placeholder.svg` | Bahan baku & solution panel | ilustrasi |
| `logo.svg` | Favicon & logo | SVG 64 × 64 |

**Cara mengganti foto hero:**

1. Siapkan foto dengan rasio **3:2** (landscape).
2. Simpan sebagai `hero-jamu.webp` (920px) dan `hero-jamu-460.webp` (460px).
   Konversi dengan: `cwebp -q 82 -resize 920 0 foto.jpg -o hero-jamu.webp`
3. Perbarui `alt` pada `index.html` di bagian Hero agar deskriptif.

**Cara mengganti foto galeri:** ganti file `*-placeholder.svg` dengan foto asli
(nama file sama), atau ubah `src` pada tiga tombol galeri di `index.html`.

---

## 4. Struktur Proyek

```text
├── index.html              # Halaman tunggal, semantic HTML5
├── assets/images/          # Foto & ilustrasi
├── css/
│   ├── tokens.css          # Design tokens (warna, radius, spacing, font)
│   ├── style.css           # Reset, tipografi, tombol, card
│   ├── layout.css          # Nav, hero, product, solution
│   └── components.css      # Benefits, testimoni, pricing, FAQ, footer, float
├── js/
│   ├── config.js           # ⚙️  SEMUA konfigurasi bisnis
│   ├── analytics.js        # Event tracking (GA4 / GTM / Meta Pixel)
│   ├── whatsapp.js         # Pembangun link WhatsApp
│   ├── navigation.js       # Sticky nav, drawer, smooth scroll, active link
│   ├── faq.js              # Accordion (satu terbuka pada satu waktu)
│   ├── pricing.js          # Render kartu harga dari config
│   └── main.js             # Bootstrap: reveal, gallery, to-top, tracking
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 5. Design System

Mengikuti PRD v1.0 §3 dan `design-system/jamu-pegal-linu-sukoharjo/MASTER.md`.

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-primary` | `#245B43` | Tombol utama, heading, brand |
| `--color-secondary` | `#8BA88E` | Dekoratif, pendukung |
| `--color-accent` | `#C69B53` | Aksen terbatas |
| `--color-bg` | `#FAF8F1` | Background utama |
| `--color-text` | `#252B27` | Teks utama |
| `--color-muted` | `#666E68` | Teks sekunder |
| Font heading | Plus Jakarta Sans | 500–800 |
| Font body | Inter | 400–600 |

> **Catatan aksesibilitas:** `--color-muted` memakai
> `#666E68`, bukan `#737B75` dari PRD. Nilai asli hanya mencapai kontras
> 4.1:1 (gagal WCAG AA 4.5:1). Versi gelap ini mencapai 4.76–5.26:1 pada semua
> permukaan. Perubahan kecil, secara visual tetap abu-abu netral.

---

## 6. Analytics

Event yang tersedia (`js/analytics.js`):

`page_view`, `hero_cta_click`, `product_view`, `pricing_view`,
`pricing_cta_click`, `whatsapp_click`, `faq_open`

Untuk mengaktifkan GA4:

1. Tambahkan snippet gtag di `<head>` `index.html`.
2. Set `analytics.enabled: true` di `js/config.js`.
3. Isi `ga4MeasurementId` bila perlu.

Selama `enabled: false`, **tidak ada data yang dikirim**.

---

## 7. Hasil Pengujian

| Aspek | Hasil |
|---|---|
| Lighthouse Accessibility | **100** |
| Lighthouse Best Practices | **100** |
| Lighthouse SEO | **100** |
| Horizontal overflow (320–1440px) | Tidak ada |
| Console error | Tidak ada |
| FAQ accordion | Berfungsi (eksklusif, keyboard-accessible) |
| Mobile drawer | Berfungsi (buka/tutup/Escape/klik luar) |
| Galeri produk | Berfungsi (swap gambar + aria-selected) |
| Hero CTA di atas fold | Ya |
| `prefers-reduced-motion` | Dihormati |

Target PRD §9.1 (≥90 semua kategori) terpenuhi.

---

## 8. Aksesibilitas

- Kontras teks ≥ 4.5:1 pada semua permukaan
- Focus state terlihat (outline 3px)
- Target sentuh ≥ 44×44px
- Navigasi keyboard penuh, `Escape` menutup drawer
- FAQ memakai `<details>` — tetap berfungsi tanpa JS
- Gambar memiliki `alt` deskriptif
- `prefers-reduced-motion` mematikan animasi

---

## 9. Kepatuhan Klaim (PRD §10)

Halaman ini **sengaja tidak** memuat:

- Klaim kesembuhan atau "tanpa efek samping"
- Sertifikasi / nomor izin edar yang belum terverifikasi
- Testimoni konsumen yang dibuat-buat (diganti **cerita produsen**)
- Harga atau diskon rekaan

Semua placeholder ditandai secara visual. Isi hanya setelah data resmi tersedia.

---

## 10. Checklist Sebelum Go-Live

- [ ] `whatsappNumber` diisi nomor asli dan **diuji dari ponsel**
- [ ] Harga tiap paket diisi angka asli
- [ ] Komposisi, berat, bentuk sesuai label
- [ ] Nama & alamat produsen diisi
- [ ] Nomor izin edar **diverifikasi** sebelum ditampilkan
- [ ] Foto produk asli menggantikan placeholder
- [ ] `canonical`, `og:url`, `og:image` diganti domain asli
- [ ] `sitemap.xml` & `robots.txt` diganti domain asli
- [ ] Analytics diaktifkan (opsional)
- [ ] Uji di Chrome, Firefox, Safari, Edge, Android, iOS
