# STREETFITMOVEMENT — Shane Mendes
**Breakdance Artist · Certified Fitness Trainer · Movement Coach — Goa, India**

---

## Project Structure
```
streetfitmovement/
├── index.html              ← Main website (single page)
├── styles.css              ← All CSS (extracted from original inline styles)
├── app.js                  ← All JavaScript (nav, BMI calc, tabs, reveal)
├── assets/
│   ├── icons/
│   │   ├── favicon.svg     ← SVG favicon (replace with high-res logo)
│   │   └── apple-touch-icon.png  ← (add 180×180 PNG)
│   └── images/
│       ├── shane-logo.png        ← HIGH-RES LOGO (replace SFM placeholder)
│       ├── og-image.jpg          ← Social share image (1200×630px)
│       ├── boty-india.jpg        ← Battle of the Year India photo
│       ├── redbull-bcone.jpg     ← Red Bull BC One photo
│       ├── workshops.jpg         ← Workshops overview photo
│       ├── ws-school.jpg         ← School programs
│       ├── ws-corporate.jpg      ← Corporate wellness
│       ├── ws-teambuilding.jpg   ← Team building
│       ├── ws-dance.jpg          ← Dance workshops
│       ├── ws-choreo.jpg         ← Choreography
│       ├── ws-speaking.jpg       ← Guest speaking
│       ├── gallery/
│       │   ├── photo-01.jpg … photo-08.jpg
│       │   ├── comp-boty.jpg
│       │   ├── comp-redbull.jpg
│       │   ├── comp-local.jpg
│       │   └── comp-perf.jpg
│       └── ig/
│           └── post-01.jpg … post-06.jpg
└── README.md
```

---

## How to Replace Placeholders

### Logo
Replace the `<div class="hero-logo-inner">SFM</div>` in the hero with:
```html
<img src="assets/images/shane-logo.png" alt="Shane Mendes — STREETFITMOVEMENT" />
```
And in the nav, replace `.nav-sfm-mark` span with:
```html
<img src="assets/images/shane-logo.png" alt="STREETFITMOVEMENT" class="nav-logo-img" />
```

### Photos
Each `<div class="img-ph">` block is labelled with the filename it expects.
Simply replace the entire `.img-ph` div with an `<img>` tag:
```html
<!-- Before -->
<div class="img-ph"><div class="img-ph-inner"><p class="img-ph-label">PHOTO: ws-school.jpg</p></div></div>

<!-- After -->
<img src="assets/images/ws-school.jpg" alt="Shane teaching school students" loading="lazy" />
```

### Videos
Replace `.video-ph` divs with YouTube iframes:
```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Shane Mendes performance reel"
  loading="lazy"
  allowfullscreen
  style="width:100%;height:100%;border:none;">
</iframe>
```

### WhatsApp Number
The real number `918830067403` is already used throughout. If it changes,
do a find-and-replace on `918830067403`.

---

## GitHub Pages Deployment

1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`
3. Site will be live at `https://yourusername.github.io/streetfitmovement/`

For a custom domain (streetfitmovement.com):
- Add a `CNAME` file to the root containing: `streetfitmovement.com`
- Point your domain DNS to GitHub Pages IPs

---

## SEO Checklist
- [x] Meta title (keyword-optimised)
- [x] Meta description
- [x] Keywords meta tag
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URL
- [x] Footer SEO text (Breakdance Goa, Fitness Trainer Goa…)
- [ ] Add `og-image.jpg` (1200×630px) to assets/images/
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics / Search Console verification meta tag

---

## What Was Upgraded (v2)

| # | Improvement |
|---|-------------|
| 1 | Real client testimonials (Priya S., Maria D., Rohan M., Carlos F., Ananya K., Nisha V.) |
| 2 | "Why Train With Shane?" section (6 credentials with SVG icons) |
| 3 | "Workshops & Events" section (6 types with dedicated CTA for each) |
| 4 | Media gallery with tabs (Photos / Videos / Competitions) — emoji removed |
| 5 | Hero: "Move Better. Perform Stronger. Live Freely." + role subtitle |
| 6 | Achievements section (BOTY India, Red Bull BC One, 200+ Workshops) |
| 7 | Instagram showcase section @trainwidshane |
| 8 | Full SEO (title, description, keywords, OG, Twitter, canonical) |
| 9 | Logo placeholder → production-ready swap instructions + favicon.svg |
| 10 | CSS → styles.css, JS → app.js, assets/ folder structure |
| 11 | Mobile nav, reduced motion, scroll offset, lazy load, accessibility |
| 12 | WhatsApp CTAs on every section (consultation, coaching, workshop, performance) |
