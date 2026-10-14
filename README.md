# Solemotion — 3D Shoes E-commerce Website

A responsive React + Vite shoe store demo with a Three.js / React Three Fiber animated hero sneaker, product cards, filters, search, favorites, product detail modal, size selector, cart drawer, quantity controls, and newsletter UI.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
solemotion-shoes-store/
├── index.html
├── package.json
├── README.md
├── public/
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Notes
- Product catalogue and cart state are implemented in `src/App.jsx`.
- Product images use remote Unsplash URLs, and the font uses Google Fonts; an internet connection is needed for those assets.
- The animated hero sneaker is procedural Three.js geometry, so no external 3D model file is required.
- This is a frontend demo. Checkout currently displays a demo message and does not process payments or create real orders. Integrate a backend and payment provider for production.
- Product sizes are demo UI only and are not currently stored per cart item.
