# Design System Master File

> **PROJECT SOURCE OF TRUTH:** PRD v1.0 "Landing Page Jamu Pegal Linu Alami Sukoharjo"
> PRD mengesampingkan setiap rekomendasi otomatis yang bertentangan dengan spesifikasinya.
> Palet, tipografi, dan struktur section di bawah ini WAJIB diikuti sesuai PRD §3.
> Saat membangun page: cek `design-system/pages/[page-name].md` dulu. Jika ada, override Master. Jika tidak, ikuti Master ini.

---

**Project:** Jamu Pegal Linu Sukoharjo
**Generated:** 2026-11-06 (disesuaikan agar sesuai PRD v1.0)
**Category:** Local Product / Herbal Wellness / E-Commerce Landing Page
**Design Direction:** Modern Traditional Herbal Brand — Simple, Clean, Natural, Trustworthy, Conversion-Oriented.

---

## Global Rules

### Color Palette (PRD §3.2)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (Forest Green) | `#245B43` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary (Sage Green) | `#8BA88E` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent (Warm Gold) | `#C69B53` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Background (Cream) | `#FAF8F1` | `--color-background` |
| Surface | `#FFFFFF` | `--color-surface` |
| Text Primary (Dark Charcoal) | `#252B27` | `--color-text` |
| Text Secondary (Muted Gray) | `#737B75` | `--color-muted` |
| Border (Soft Gray) | `#E8EAE5` | `--color-border` |
| Ring / Focus | `#245B43` | `--color-ring` |

**Aturan penggunaan warna (PRD §3.2):**
- Forest Green → tombol utama, heading penting, elemen brand.
- Cream → background utama.
- White → card & area konten.
- Warm Gold → aksen terbatas.
- Sage Green → elemen dekoratif & pendukung.

### Typography (PRD §3.3)

- **Heading:** Plus Jakarta Sans (display; tegas, mudah dibaca).
- **Body:** Inter (min 16px, line-height 1.5–1.7).
- **Fallback:** system-ui, sans-serif.
- Maksimal dua font. Batasi variasi weight dan ukuran.

**Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
```

### Spacing & Radius (PRD §7.4)

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Tombol kecil |
| `--radius-md` | 16px | Kartu |
| `--radius-lg` | 24px | Kartu unggulan, hero |
| `--container-width` | 1200px | Konten maksimum |
| `--spacing-section` | 96px | Jarak antar section |

### Shadow & Motion

- Hover smooth 200–250ms, `translateY(-2px)` ringan.
- Scroll reveal: kemunculan halus (IntersectionObserver, `opacity 0→1`, `y 12px`).
- Hormati `prefers-reduced-motion`.

---

## Page Pattern (PRD §4)

**Pola:** Funnel Konversi Produk Lokal (7 section utama + pendukung).

**Urutan Section:**
1. Hero (dua kolom: copy + foto produk; trust indicators)
2. Problem & Solution (3 problem cards → solusi produk)
3. Product Showcase (galeri foto kiri + info produk kanan; badge faktual)
4. Benefits (4 benefit cards)
5. Testimonials (3 kartu; autentik saja)
6. Pricing (3 paket: Satuan/Hemat/Keluarga)
7. FAQ (accordion interaktif, 7 pertanyaan)
8. Final CTA (background Forest Green, font putih, tombol WhatsApp kontras)

**Pendukung:** Navigation (sticky, hamburger mobile), floating WhatsApp button, back-to-top, footer.

---

## Component Specs

### Buttons

```css
.btn-primary {
  background: #245B43;            /* Forest Green */
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
  min-height: 44px;               /* target sentuh aksesibel */
}
.btn-primary:hover { opacity: 0.92; transform: translateY(-1px); }

.btn-secondary {
  background: transparent;
  color: #245B43;
  border: 2px solid #8BA88E;      /* Sage Green */
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
  min-height: 44px;
}

.btn-whatsapp {
  background: #25D366;            /* brand WhatsApp */
  color: #FFFFFF;
  /* dipakai untuk CTA konversi utama */
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E8EAE5;
  border-radius: 16px;
  padding: 24px;
  transition: all 200ms ease;
}
.card:hover { box-shadow: 0 10px 25px rgba(36, 91, 67, 0.08); transform: translateY(-2px); }
```

---

## Konvensi Pengkodean (PRD §7)

- Semantic HTML5 (header/nav/main/section/article/footer).
- CSS Variables sebagai token.
- Flexbox + Grid, mobile-first (320 → 1440px).
- JavaScript vanilla modular; IntersectionObserver untuk scroll reveal; lazy loading gambar; event delegation.
- Tanpa `!important` berlebihan; tanpa inline CSS; tanpa animasi berlebihan.

---

## Anti-Patterns (Jangan Dilakukan)

- ❌ Menggambarkan jamu sebagai obat yang pasti menyembuhkan / klaim medis tidak berdasar.
- ❌ Klaim sertifikasi/BPOM/PIRT yang tidak dimiliki. (PRD §10)
- ❌ Testimoni palsu / angka kepuasan tanpa data. (PRD §4.6)
- ❌ Harga & diskon palsu. (PRD §4.7)
- ❌ Emoji sebagai ikon — pakai SVG (Phosphor/Lucide) sederhana.
- ❌ Elemen klik tanpa `cursor:pointer` dan focus state terlihat.
- ❌ Layout yang muncul sebagai "template AI generik" / gradient berlebihan / terlalu banyak card.

---

## Pre-Delivery Checklist

- [ ] Kontras teks ≥ 4.5:1.
- [ ] Keyboard navigation + focus state terlihat.
- [ ] Target sentuh ≥ 44×44px.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Semua gambar: alt text, width/height, lazy loading (kecuali hero).
- [ ] Responsive: 320 / 375 / 768 / 1024 / 1440 — tanpa horizontal overflow.
- [ ] Satu H1; H2 per section; meta title, description, OG, canonical.
- [ ] Tidak ada broken link; tidak ada JavaScript error.
