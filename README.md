# Memory

Short Description

- Browser-based memory matching game with four themes.

Languages Used

- HTML — page structure and modules
- TypeScript — game logic (see [src](src/))
- SCSS — styling (`main.scss`)
- JavaScript — runtime / bundled output

Dependencies (from `package.json`)

- canvas-confetti: ^1.9.4

Dev Dependencies

- vite: ^8.0.16
- typescript: ^6.0.3
- sass: ^1.100.0
- typedoc: ^0.28.19

NPM Scripts

- `npm run dev` — start development server (Vite)
- `npm run build` — TypeScript check + build (`tsc -noEmit && vite build`)
- `npm run preview` — preview the production build (`vite preview`)
- `npm run docs` — generate API documentation (TypeDoc)

Quickstart

1. `npm install`
2. `npm run dev` — start development server
3. `npm run build` — build for production
4. `npm run preview` — view the production build locally
5. Optional: `npm run docs` — generate documentation

System Requirements / Notes

- Node.js recommended >= 18
- Project module type: `commonjs` (see `package.json`)
- Entry point: `index.html`

License

- ISC (see `package.json`)
