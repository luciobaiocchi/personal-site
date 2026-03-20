# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website for Lucio Baiocchi. No build system — pure HTML, CSS, and JavaScript served directly as static files. Deployed to Cloudflare Pages at luciobaiocchi.com.

## Local Development

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

Or with Cloudflare's CLI:
```bash
wrangler pages dev .
```

## Deployment

```bash
wrangler pages deploy
npx wrangler pages deploy . --project-name=personal-site

```

## Architecture

### Page Structure
- `index.html` — Landing/splash page with hero section and CTA
- `home.html` — Main portfolio (about, featured projects, CV download, contacts)
- `projects.html` — Full project gallery
- `projects/*.html` — Individual project detail pages
- `template.html` — Base template for new project pages

### Assets
- `css/style.css` — Single stylesheet with full light/dark theme support
- `javascript/script.js` — Theme toggle (localStorage-persisted) and image lightbox
- `img/` — Site images; `img/projects/` for project-specific images

### Theme System
Bootstrap's `data-bs-theme` attribute drives the theme. CSS custom properties under `:root` (light) and `[data-bs-theme="dark"]` define the color palette. The toggle in `script.js` flips the attribute and persists the choice.

### Image Lightbox
Any image with class `.expandable-img` gets a click-to-expand overlay created dynamically by `script.js`.

### External Dependencies (CDN only, no npm)
- Bootstrap 5.3.0
- Font Awesome 6.4.0 + Bootstrap Icons 1.11.3
- Google Fonts (Poppins)
- Three.js 0.158.0 (loaded but unused in current pages)
