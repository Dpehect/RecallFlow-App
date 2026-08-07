# RecallFlow / Zero

Radical, interaction-first language learning landing page.

## Architecture

- `app/page.tsx`: compositional page shell and section orchestration
- `usePointerField`: requestAnimationFrame canvas loop isolated from React rendering
- `SignalField`, `Orbit`, `Chamber`: independently stateful visual systems
- CSS custom properties and containment-oriented layout; no UI-kit or Tailwind layer

## Commands

`npm install` · `npm run build` · `npm run typecheck`
