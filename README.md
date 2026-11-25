# G. Reshwanth Reddy — Premium Developer Portfolio & Digital Experience

> **"Building digital experiences. Turning ideas into reality."**  
> A high-performance, minimal editorial portfolio website and digital product showcase for **G. Reshwanth Reddy** (Software Developer, App & Web Developer, Founder of Damayanti Crest).

---

## 🎨 Visual Identity & Design System

The portfolio is designed with a **Minimal Editorial + Experimental Digital Experience** direction, combining oversized editorial typography, structured data architectures, and purposeful motion design.

### Strict Color Palette
- **Primary Background (Soft Off-White):** `#F7F5F0`
- **Secondary Background (Warm Ivory):** `#F0EEE8`
- **Primary Typography (Deep Charcoal):** `#181818` / `#242424`
- **Secondary Typography (Muted Grey):** `#77746F`
- **Signature Accent (Vibrant Coral):** `#FF604A`
- **Highlight Tint:** `#FFF0EE`
- **Editorial Borders:** `#E4E0D8`
- **Dark Editorial Sections:** `#181818` with Coral/Gold accents

*Strict Rule Followed: Zero generic blue/purple gradients, zero unstyled template aesthetics.*

---

## 🏛️ Website Architecture

```
/ (Home Page)
├── 00. Introductory Loading Sequence (Animated Monogram & Progress)
├── 01. Full-Screen Editorial Hero (Oversized Headline, Interactive Generative Canvas, CTAs)
├── 02. Personal Manifesto ("I don't just build websites. I build digital products.")
├── 03. About Me (Asymmetric Editorial Grid, B.Tech ECE SNIST, Engineering Philosophy)
├── 04. Technical Proficiency (Interactive Disciplines: Programming, Frontend, Backend, Mobile, Embedded ECE)
├── 05. Horizontal Scroll Showcase (Vertical-to-Horizontal Panned Independent Ventures)
├── 06. Selected Projects (Category A: Independent Ventures | Category B: Built for Others)
├── 07. Practical Chronology (Interactive Milestones: Damayanti Crest, Sannivesham, Client Platforms)
├── 08. Damayanti Crest Ecosystem (Interactive 4-Division Map: Tech, Heritage, Publications, Traditions)
├── 09. Verified Activities & Technical Engagements (SNIST Robotics Club, IoT, Embedded Systems)
├── 10. Technical Resume (Interactive Modal Inspector & Print/PDF Ready Download)
├── 11. Contact & Inquiry Transmission (Input Validation, Direct Email Dispatch, One-Click Copy)
└── 12. Editorial Footer (Dynamic Year, Philosophy Statement, Back-to-Top, Social Links)

/projects/:slug (Dedicated Case Study Routes)
├── /projects/dc-excel             (Local-First Spreadsheet Application)
├── /projects/dc-word              (Privacy-First Document Processor)
├── /projects/sannivesham          (Telugu Cultural Platform & App - Live: sannivesham.com)
├── /projects/damayanti-crest      (4-Division Technology & Cultural Ecosystem)
├── /projects/abhay-hindu-sena     (Organisational Portal & Solutions)
├── /projects/syf-bharat           (Youth Foundation Web & App Interfaces)
└── /projects/sanathana-gurukulam  (E-Learning Platform with Courses & Certificates)
```

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript (Strict typing, ES2023)
- **Bundler & Tooling:** Vite 8 + `@tailwindcss/vite`
- **Styling:** Tailwind CSS v4 (Custom design tokens, CSS variables)
- **Motion & Gestures:** Framer Motion (Page transitions, scroll progress, layout animations)
- **Smooth Scrolling:** Lenis (Momentum scrolling with automatic `prefers-reduced-motion` bypass)
- **Icons:** Lucide React + Custom Inline Vector Assets
- **Routing:** React Router DOM (Single-Page Application with deep-linked case studies)
- **Feedback & Delights:** Canvas-Confetti (Celebratory feedback on inquiry and resume download)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (Tested with v24.21.0)
- **npm:** v9.0.0 or higher

### 2. Installation
Open your terminal in the project directory:
```bash
cd "C:\Users\Damayanti Crest\.gemini\antigravity\scratch\portfolio"
npm install
```

### 3. Local Development Server
Start the local development server with Hot Module Replacement:
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 4. Production Build
Generate an optimized production build in the `dist/` directory:
```bash
npm run build
```
This runs TypeScript type checking (`tsc -b`), compiles assets via Vite, and automatically creates `dist/404.html` for single-page routing on GitHub Pages.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## ⚙️ How to Update & Customize Content

All information across the portfolio is structured in the `src/data/` directory so you never have to search through complex JSX to update text, links, or projects:

### 1. Updating Projects & Case Studies
File: **[`src/data/projects.ts`](./src/data/projects.ts)**
- To edit any project's description, features, technologies, or live URL, locate the project in the `PROJECTS` array.
- To add a live URL when a deployment is ready, update `previewUrl: 'https://your-domain.com'` and set `isExternalLinkLive: true`.
- To attach screenshots, place image files in `public/assets/projects/` and reference them in the project object.

### 2. Updating Contact Information & Social Profiles
File: **[`src/data/navigation.ts`](./src/data/navigation.ts)**
- Locate `OWNER_INFO.social`:
  ```typescript
  social: {
    github: 'https://github.com/damayanti-technologies',
    linkedin: 'https://www.linkedin.com/in/reshwanth-reddy-519822295/',
    email: 'damayanti.crest@gmail.com',
    secondaryEmail: 'reshwanthreddy.dev@gmail.com'
  }
  ```

### 3. Updating the Resume
File: **[`public/`](./public/)** & **[`src/data/navigation.ts`](./src/data/navigation.ts)**
- Place your PDF resume in the `public/` directory (e.g. `public/G_Reshwanth_Reddy_Resume.pdf`).
- Update `OWNER_INFO.resume.fileName` and `lastUpdated` in `src/data/navigation.ts`.
- The website includes a built-in interactive resume inspector that also triggers clean print/PDF generation.

### 4. Updating Damayanti Crest Divisions
File: **[`src/data/ecosystem.ts`](./src/data/ecosystem.ts)**
- Contains the 4 divisions (`Technologies`, `Heritage`, `Publications`, `Traditions`), core principles, and initiatives.

### 5. Updating Skills & Technologies
File: **[`src/data/skills.ts`](./src/data/skills.ts)**
- Categorized into Programming, Frontend, Backend & Services, Application Dev, Engineering Tools, and Hardware/Embedded.

---

## 🌐 Deploying to GitHub Pages

The project is pre-configured with `.nojekyll` and automated `404.html` creation for single-page app routing on GitHub Pages:

### Step 1: Create a GitHub Repository
```bash
git init
git add .
git commit -m "feat: initial commit of premium portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Configure GitHub Pages
1. Open your repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - **Source:** Choose `Deploy from a branch` (or use GitHub Actions).
   - If deploying `dist` directly: select the branch and folder containing the built files.
   - Alternatively, add a standard GitHub Action for Vite (`actions/deploy-pages`).

### Step 3: Custom Apex Domain Setup (e.g. `reshwanth.dev` or `damayanticrest.online`)
1. In repository **Settings** > **Pages** > **Custom domain**, enter your domain.
2. Add DNS records at your registrar:
   - `A` records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - `CNAME` record for `www` pointing to `<username>.github.io`.
3. Check **Enforce HTTPS**.

---

## ♿ Accessibility & Performance Highlights

- **Reduced Motion:** Fully honors `prefers-reduced-motion: reduce` by disabling smooth-scroll acceleration and setting instant animations.
- **Color Contrast:** Strict WCAG AA compliance with charcoal `#181818` on warm off-white `#F7F5F0` and selective coral accents.
- **Keyboard Navigation:** Clean focus-visible rings (`outline: 2px solid #FF604A`).
- **Touch Friendly:** Custom desktop cursor automatically unmounts on touch devices (`pointer: coarse`) to preserve native mobile interactions.
- **Zero Heavy 3D Bloat:** Lightweight 2D canvas generative node network ensures 60 FPS performance on standard laptops and smartphones.

---

## 📄 License & Credits
Designed and engineered for **G. Reshwanth Reddy**. All rights reserved.
