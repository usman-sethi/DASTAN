# DASTAN (داستان) — Cultural Tourism & Verified Travel Platform

> **"Don't just visit a place. Understand it."**
> **Tagline:** Every place has a story.

DASTAN is a competition-ready, fully interactive cultural tourism platform designed to connect travelers with verified places, local custodians, authentic culinary and artisan experiences, and native language learning. The launch platform focuses on Khyber Pakhtunkhwa (Swat, Kalam, Chitral & Kalash) and Northern Pakistan.

---

## 🏔️ The 60-Second Competition Demo Flow

Judges and investors can test the complete end-to-end journey in under 60 seconds:

1. **Homepage & Cinematic Hero:**
   - Cinematic landscape of Swat Valley with authentic bilingual typography (*داستان*).
   - Interactive Quick Planning Console (Destination, Season, Budget Tier, Travel Style).

2. **Destination Exploration & Interactive Mountain Map:**
   - Explore Swat ("The Switzerland of Pakistan"), Kalam ("Into the High Mountains"), Chitral ("Where Ancient Cultures Meet"), Hunza, and Skardu.
   - **Interactive Topographic Map (`GeographicMap`):** Lightweight vector-rendered topographic relief map of Northern Pakistan with altitude contours, high peaks (Tirich Mir, Falak Sar, Rakaposhi, K2, Nanga Parbat), and highway corridors (M-16 Swat Motorway, Lowari Tunnel, N-35 Karakoram Highway, Jaglot-Skardu road).
   - Clickable destination clusters with live distance/transit times from Islamabad, elevations, and direct trip creation buttons.
   - Click any destination card to open a full modal containing verified stays, licensed 4x4 drivers, local experiences, and regional customs.
   - Click **"Build My Swat Trip"** to transfer immediately into the Trip Builder.

3. **Deterministic Trip Studio Planner:**
   - Change days (2 to 7 days), budget tiers, traveling group (Solo, Couple, Family, Friends), and interest tags.
   - Watch the itinerary and itemized cost breakdown dynamically calculate in real-time.
   - Customize included services (Verified Stay, Private Driver, Local Guide, Food Experiences).
   - Review transparent economic value distribution (**86% paid directly to local hosts**).

4. **Experience Marketplace:**
   - Filter authentic masterclasses: *The Swati Kitchen*, *Ushu Pine Whispers Trek*, *Pashtun Hujra Musical Evening*, *Chitrali Patti Loom Weaving*, and *Miandam Orchard Sunrise*.
   - View host credentials, what's included, and cultural context.

5. **Language Learning ("Learn Before You Go"):**
   - Cultural differentiator: Interactive Pashto & Khowar phrasebook.
   - Click the 🔊 **Listen** button on any phrase (e.g., *"Sta num tsa de?"*, *"Manana"*, *"Kore mo wadaan"*) to hear speech audio.
   - Switch to **Interactive Flashcards Mode** to test phrases and mark them as learned.
   - Track progress with the live **7 / 20 phrases learned** indicator.

6. **Provider Verification System:**
   - In-depth dossiers for Ahmad Khan (Senior Heritage Guide, Swat), Gul Zarin (Alpine 4x4 Specialist, Kalam), and Bibi Maryam (Artisan & Culinary Host, Chitral).
   - 4-point verification badge system: Identity (NADRA), Location, Business certification, and Community reviews.
   - Send simulated direct inquiries to local hosts.

7. **5-Step Booking Flow:**
   - Click **"Book this journey"** from the Trip Builder.
   - Step 1: Review Itinerary → Step 2: Traveler Information → Step 3: Verified Provider Preferences → Step 4: Price Summary → Step 5: **"Your Dastan Begins"** instant confirmation.
   - Generates simulated booking reference (`DST-2026-XXXX`).

8. **My Trips Dashboard:**
   - Access saved journeys and confirmed bookings.
   - Live readiness timeline: Stay ✓, Driver ✓, Guide ✓, Experience ✓, Language 60%.
   - Quick actions to continue language learning or share itinerary.

9. **Host Guild & Impact:**
   - Value distribution diagram: *One traveler. Multiple local livelihoods.*
   - Interactive Host Application onboarding form with instant verification dispatch.

10. **Investor & Prototype Metrics (`/admin` or top banner):**
    - Executive review of GMV (PKR 3.84M), 128 simulated bookings, unit economics (5% marketplace commission), and phased geographic roadmap.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`) with custom typography and color tokens
- **Animations:** Motion (`motion/react`) for smooth micro-interactions, layout transitions, and interactive flashcards
- **Icons:** Lucide React
- **Audio:** Web Speech API (`window.speechSynthesis`) with custom pitch/rate modulation and synthesized Web Audio chime fallback
- **Typography:** *Plus Jakarta Sans* (Interface body), *Outfit* (Editorial headings), and *Noto Nastaliq Urdu* (Authentic Arabic/Urdu calligraphy)
- **Zero Broken Image Policy:** High-fidelity generated imagery with failover fallbacks and WCAG AA contrast scrims

---

## 📁 Project Structure

```
src/
├── assets/
│   └── images/              # High-fidelity photography of Swat, Kalam, Chitral, Hunza
├── components/
│   ├── AdminDemoModal.tsx   # Investor unit economics and prototype metrics
│   ├── BookingModal.tsx     # 5-step simulated booking flow with DST-2026 ID
│   ├── CultureSection.tsx   # "Know Before You Go" etiquette & wisdom
│   ├── CustomCursor.tsx     # Elegant desktop custom cursor
│   ├── DestinationExplorer.tsx
│   ├── DestinationModal.tsx # Full-depth destination dossier & stays
│   ├── ExperienceMarketplace.tsx
│   ├── ExperienceModal.tsx  # Masterclass detail with host profiles
│   ├── Footer.tsx           # 3-zone bottom bar with contact & emergency
│   ├── ForHosts.tsx         # Host onboarding form & economic impact
│   ├── Hero.tsx             # Cinematic hero with multi-parameter search bar
│   ├── LanguageLearning.tsx # Interactive phrasebook & flashcard quiz
│   ├── MyTripsDashboard.tsx # Traveler dashboard with progress tracking
│   ├── Navbar.tsx           # 3-zone top bar contract with responsive drawer
│   ├── ProviderVerification.tsx # Ahmad Khan, Gul Zarin, Bibi Maryam dossiers
│   ├── SearchModal.tsx      # Global live autocomplete search
│   ├── Toast.tsx            # Micro-interaction notifications
│   ├── TravelSafety.tsx     # Live road conditions & 24/7 emergency helplines
│   └── TripBuilder.tsx      # Deterministic multi-step itinerary generator
├── data/
│   ├── culture.ts           # Pashtunwali, etiquette, attire, and food customs
│   ├── destinations.ts      # Swat, Kalam, Chitral, Hunza, Skardu databases
│   ├── experiences.ts       # Culinary, alpine walks, and artisan workshops
│   ├── generator.ts         # Deterministic trip generator engine
│   ├── phrases.ts           # Multilingual Pashto & Khowar phrases dataset
│   ├── providers.ts         # Verified local guides, drivers, and artisans
│   └── safety.ts            # Road conditions and emergency contacts
├── lib/
│   └── speech.ts            # Speech synthesis audio player
├── types/
│   └── index.ts             # Complete TypeScript interfaces
├── App.tsx                  # Main orchestrated application
├── index.css                # Global theme tokens and base styles
└── main.tsx
```

---

## 🚀 Development & Run Instructions

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build
```
