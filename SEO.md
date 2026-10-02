# DASTAN (داستان) — Technical SEO Architecture & Documentation

> **Brand Identity:** DASTAN (داستان — Story / Tale)  
> **Positioning:** Premier Cultural Tourism Platform for Pakistan (Khyber Pakhtunkhwa & Northern Pakistan)  
> **Canonical Domain:** `https://dastan.pk`

---

## 1. Technical Architecture & Rendering Strategy

DASTAN is engineered as a modern, high-performance application built with React, Vite, and Tailwind CSS. The technical SEO architecture is designed around the core principle:

> **Human experience first. Technical SEO underneath.**

Search engines can fully index content, crawl canonical URLs, parse Schema.org JSON-LD entities, and navigate clear semantic hierarchies (`header`, `nav`, `main`, `section`, `article`, `footer`) without sacrificing GSAP animations, smooth scroll interactions, or brand aesthetics.

---

## 2. URL Strategy & Hierarchy

DASTAN enforces clean, human-readable URLs with zero arbitrary query string clutter:

| Public Canonical Route | Content / Search Intent | Indexing Status |
| :--- | :--- | :--- |
| `https://dastan.pk/` | Homepage: Pakistan cultural tourism overview | `index, follow` |
| `https://dastan.pk/destinations` | All destinations index & interactive topography | `index, follow` |
| `https://dastan.pk/destinations/swat` | Swat Valley travel guide & Buddhist heritage | `index, follow` |
| `https://dastan.pk/destinations/kalam` | Kalam Valley, Mahodand Lake & alpine trails | `index, follow` |
| `https://dastan.pk/destinations/chitral` | Chitral & Kalash indigenous cultural guide | `index, follow` |
| `https://dastan.pk/destinations/hunza` | Hunza Valley & Karakoram living heritage | `index, follow` |
| `https://dastan.pk/destinations/skardu` | Skardu, Deosai plateau & K2 gateway | `index, follow` |
| `https://dastan.pk/experiences` | Authentic culinary & artisan masterclasses | `index, follow` |
| `https://dastan.pk/learn` | "Learn the Place": Pashto & Khowar phrases | `index, follow` |
| `https://dastan.pk/safety` | Live mountain road status & emergency helplines | `index, follow` |
| `https://dastan.pk/hosts` | Become a verified local provider in Pakistan | `index, follow` |

### Non-Indexable / Parameter-Protected URLs:
- Filter combinations (e.g. `?price=low&style=family`) are prevented from duplicate index bloat via standard canonical tags pointing back to the parent route.
- Private flows (`/admin`, `/checkout`, `/dashboard`, `/booking/confirmation`) are protected via `robots.txt` disallow directives.

---

## 3. Metadata System

Each indexable page maintains a unique, hand-crafted title (under 60 characters) and high-CTR meta description (140–160 characters):

### Titles & Descriptions:
- **Homepage:**  
  *Title:* `DASTAN — Discover Pakistan. Experience It Locally.`  
  *Description:* `Discover Pakistan through verified local stays, guides, transport and authentic cultural experiences. Plan your journey with DASTAN.`
- **Swat Valley:**  
  *Title:* `Swat Travel Guide & Local Experiences | DASTAN`  
  *Description:* `Explore Swat Valley with verified local guides. Experience ancient Buddhist stupas, emerald rivers, trout cuisine, and Yusufzai Pashtun hospitality.`
- **Kalam Valley:**  
  *Title:* `Kalam Travel Guide & Local Experiences | DASTAN`  
  *Description:* `Plan your journey to Kalam Valley. Explore Mahodand Lake, Ushu pine forest trails, and Falak Sar views with verified mountain 4x4 drivers and guides.`
- **Chitral & Kalash:**  
  *Title:* `Chitral Travel Guide & Cultural Experiences | DASTAN`  
  *Description:* `Discover Chitral and the Kalash Valleys under Tirich Mir. Experience ancient polytheistic culture, traditional Patti weaving, and royal fort heritage.`
- **Language Learning:**  
  *Title:* `Learn Pashto & Local Culture Before You Travel | DASTAN`  
  *Description:* `Learn essential Pashto and Khowar phrases with authentic pronunciation audio, script, and cultural etiquette before traveling to Pakistan.`
- **Safety Dashboard:**  
  *Title:* `Live Pakistan Mountain Road Status & Travel Safety | DASTAN`  
  *Description:* `Real-time road pass status for Swat Motorway, Kalam, and Lowari Tunnel with 24/7 KPK Tourism Police (1422) and emergency rescue contacts.`

---

## 4. Structured Data (Schema.org JSON-LD)

DASTAN embeds structured entity graphs validated against Google Search Central guidelines:

1. **`Organization` Schema (`https://dastan.pk/#organization`):**
   - Brand name: DASTAN (داستان)
   - Knows about: Cultural Tourism in Pakistan, Pashtunwali, Swat Valley, Kalash Culture
   - Area served: Pakistan
   - Logo: `https://dastan.pk/favicon.svg`
2. **`WebSite` Schema (`https://dastan.pk/#website`):**
   - SearchAction integration for destination and experience queries
3. **`BreadcrumbList` Schema:**
   - Injected dynamically for deep routes: `Home > Destinations > Swat Valley`
4. **`TouristDestination` Schema:**
   - Detailed geographic tags, region, altitude ranges, and official descriptions for Swat, Kalam, Chitral, Hunza, and Skardu

---

## 5. Robots.txt & XML Sitemap

- **Robots file:** Located at `/robots.txt`
  - Explicitly grants crawling to all public guides (`/`, `/destinations/*`, `/experiences/*`, `/learn`, `/safety`, `/hosts`)
  - Disallows internal checkout, dashboard, and demo admin flows (`/admin`, `/checkout`, `/api/`)
  - Declares canonical sitemap location: `https://dastan.pk/sitemap.xml`
- **Sitemap file:** Located at `/sitemap.xml`
  - Clean XML schema containing only high-priority canonical endpoints with `<lastmod>`, `<changefreq>`, and `<priority>`.

---

## 6. Image SEO & Core Web Vitals Optimization

1. **Next-Gen WebP Format:** All destination and hero photography has been encoded in high-fidelity `.webp` located in `/public/images/`, reducing payload sizes by ~65% while guaranteeing 100% availability on static hosting (Vercel, CDN) without 404 bundle misses.
2. **Semantic Alt Text:** Every image contains descriptive, un-stuffed natural alt text describing geography, culture, and architecture (e.g., *"Swat Valley Hindu Kush emerald river terraces in Khyber Pakhtunkhwa, Pakistan"*).
3. **Largest Contentful Paint (LCP):**
   - The hero image is prioritized and rendered with high priority.
   - Contrast scrims are implemented via pure CSS gradients rather than multiple DOM layers.
4. **Cumulative Layout Shift (CLS):**
   - Explicit aspect-ratio containers (`aspect-[4/3]`, `h-64 sm:h-72`) prevent reflows as images load.
5. **Interaction to Next Paint (INP):**
   - GSAP and motion transforms operate strictly on GPU-friendly compositing properties (`transform`, `opacity`).
   - Web Speech audio synthesis runs asynchronously without blocking main-thread responsiveness.

---

## 7. Google Search Console Onboarding Guide

To verify and launch DASTAN in Google Search Console:

1. **Add Property:**
   - Open [Google Search Console](https://search.google.com/search-console).
   - Add `https://dastan.pk` as a **URL Prefix** or `dastan.pk` as a **Domain Property**.
2. **Verify Ownership:**
   - Upload the HTML verification file to `/public` or add the DNS TXT record to your DNS provider (e.g. Cloudflare / Namecheap).
3. **Submit Sitemap:**
   - Navigate to **Sitemaps** in the left sidebar.
   - Enter `sitemap.xml` and click **Submit**.
4. **URL Inspection:**
   - Inspect `https://dastan.pk/` and `https://dastan.pk/destinations/swat`.
   - Verify that Googlebot renders the canonical tag, meta description, and JSON-LD schema without errors.
5. **Monitor Core Web Vitals:**
   - Review mobile & desktop Core Web Vitals reports for LCP (<2.5s) and CLS (<0.1).

---

## 8. Scalable Future Content Architecture

As DASTAN expands beyond Khyber Pakhtunkhwa into Gilgit-Baltistan and Balochistan, the content hierarchy scales as follows:

```
/destinations
  ├── /khyber-pakhtunkhwa
  │     ├── /swat
  │     ├── /kalam
  │     └── /chitral
  └── /gilgit-baltistan
        ├── /hunza
        └── /skardu

/experiences
  ├── /swati-clay-oven-cooking
  ├── /ushu-forest-alpine-trek
  └── /chitrali-patti-weaving

/guides
  ├── /swat-travel-guide
  └── /pashto-phrases-for-travelers
```
Every page serves unique, authoritative search intent without duplicate content.
