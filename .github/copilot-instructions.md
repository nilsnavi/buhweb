# GitHub Copilot Instructions — BuhWeb (React + Vite)

These instructions help AI coding agents work productively in this repo. Focus on existing patterns and workflows — do not introduce frameworks unless requested.

## Overview
- Stack: React 18, Vite 5, Emotion, Redux Toolkit, Vitest, vite-plugin-pwa.
- Goal: Marketing/PWA site for accounting services with calculator, reviews, FAQ, notifications, analytics, and admin content management.
- Aliases: `@` maps to `src` (see `vite.config.js` + `tsconfig.json`). Use absolute imports.

## State & Data Flow
- Global state via Redux Toolkit in `src/store`:
  - `contentSlice.ts`: `texts`, `images`, `blocks`, `loading`, `error`; reducers like `updateText`, `updateImage`, `updateBlock`, `reorderBlocks`.
  - `store.ts`: configures store, typed hooks `useAppSelector`, `useAppDispatch`.
- UI components consume constants from `src/constants.js` and Redux for admin features.
- Analytics: `src/components/Analytics.jsx` provides `AnalyticsProvider` + `useAnalytics()`; events saved to `localStorage` (`analytics_events`, capped to 200).

## Developer Workflow
- Dev: `npm run dev` (Vite, port 3000, opens browser). Proxy `'/api'` → `VITE_API_URL` (set in `.env`).
- Build: `npm run build` (sourcemaps enabled). Preview: `npm run preview`.
- Lint/Format: `npm run lint`, `npm run format`.
- Test: `npm test` (Vitest, jsdom). Setup file currently `src/setupTests.js`; Vite config references `.ts` — prefer keeping JS or create TS shim.

## PWA & Assets
- PWA via `vite-plugin-pwa` in `vite.config.js` — autoUpdate SW, Workbox `NetworkFirst` for `/api.example.com` (adjust for real API).
- Manifest provided via plugin; root `manifest.json` also exists — keep a single source of truth to avoid drift.

## Conventions
- Components in `src/components`, hooks in `src/hooks`, styles in `src/styles`.
- Emotion enabled via Babel; CSS files are used for site styling. Follow existing class naming; avoid inline styles unless using Emotion patterns.
- Prefer `useThemeNew.js` (data-theme on `<html>`) over legacy `useTheme.js` (body class). Remove duplication when editing.
- TypeScript is used for store; components are JS/JSX. Maintain type-safety in store and actions; keep public APIs stable.

## Testing Patterns
- Unit tests: Testing Library + Vitest; add tests near files or under `src/__tests__`.
- Minimal setup in `src/setupTests.js` (`@testing-library/jest-dom`).

## Examples
- Using analytics: wrap app with `AnalyticsProvider` and call `useAnalytics().trackEvent('button_click', { buttonName: 'Contact', section: 'hero' })`.
- Using store: `const items = useAppSelector(s => s.content.blocks); const dispatch = useAppDispatch(); dispatch(updateBlock({ id, updates: { visible: false } }));`

## Build/Bundle Notes
- `manualChunks` in Vite splits `react` deps; `vendor` references `lodash`/`axios` — align with actual deps before relying on chunk names.
- Bundle analysis: run Vite with `--mode analyze` to open `bundle-analyzer-report.html`.

## When Adding Features
- Reuse constants from `src/constants.js` and extend `contentSlice` (keep IDs as `string`, orders 1..N).
- For new API calls, go through `/api` proxy and configure `VITE_API_URL`.
- Ensure PWA compatibility (no blocking SW) and analytics events where meaningful.

---
Questions: Confirm test setup file (`.js` vs `.ts`), intended API host for proxy, and whether to standardize on `useThemeNew`. 