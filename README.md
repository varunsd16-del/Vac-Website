# VAC Global Solutions — Website

A modern, premium, animated marketing website for VAC Global Solutions built with **Astro**.

## Brand Colors

| Token       | Hex       | Usage                     |
|-------------|-----------|---------------------------|
| Primary     | `#002D62` | Navy blue — main brand    |
| Secondary   | `#64748B` | Slate — supporting text   |
| Tertiary    | `#541D02` | Dark brown-red — accents  |
| Neutral     | `#F8FAFC` | Off-white — backgrounds   |

## Typography

- **Headlines:** Manrope (Google Fonts)
- **Body:** Inter (Google Fonts)

## Sections

1. **Hero** — Full-screen gradient hero with animated blobs, floating ERP card, and key stats
2. **About** — Who We Are with three pillars (Technology-First, Operations Focus, Global Reach)
3. **Challenge** — Why businesses struggle to scale (3 pain points)
4. **Services** — 4 service cards (Supply Chain, Digital, Marketing, ERP)
5. **ERP** — ERP platform overview with 6 modules
6. **Process** — 4-step engagement model (Analyze → Design → Implement → Scale)
7. **Outcomes** — Key metrics (40% efficiency, 25% cost reduction, 3× visibility)
8. **Pricing** — 4 pricing tiers (Starter, Growth ★, Scale, Custom OS)
9. **Industries** — 5 industry cards
10. **Contact** — CTA block with email, phone, website
11. **Footer** — Full footer with links and copyright

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Animations

- **Scroll-reveal** — Elements fade + slide in using IntersectionObserver (no dependencies)
- **Floating card** — CSS keyframe animation on the hero ERP card
- **Gradient blobs** — Animated radial gradient blobs in hero background
- **Hover interactions** — Cards lift with box-shadow on hover throughout
- **Staggered entrance** — `.stagger-1` through `.stagger-5` delay classes
- **Navbar** — Transparent → frosted glass on scroll

## Deployment

This is a static site. After `npm run build`, upload the `dist/` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static host

## File Structure

```
src/
  layouts/     Layout.astro (HTML shell + scroll observer script)
  components/  Navbar, Hero, About, Challenge, Services, ERP,
               Process, Outcomes, Pricing, Industries, Contact, Footer
  pages/       index.astro
  styles/      global.css
public/
  favicon.svg
  styles/      global.css (served statically)
```
