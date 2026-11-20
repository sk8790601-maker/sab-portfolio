# Sabari P. — Gaming & Metaverse portfolio

React + Vite frontend with Tailwind CSS, React Router, Motion for React and GSAP ScrollTrigger. No backend is required. The contact form validates locally; it does not send or save messages.

## Run
```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 5173
```

## Production preview
```sh
npm run build
npm run preview -- --host 0.0.0.0 --port 5173
```

## Structure
- `src/components/`: shared UI, media player and isolated animation layers.
- `src/sections/`: landing-page sections.
- `src/pages/`: home, project archive and project detail routes.
- `src/data/`: project, technology and video content.
- `src/hooks/`: shared GSAP context lifecycle hook.
- `src/index.css`: existing base styles, utilities and CSS animations.
- `public/images/`: currently referenced portraits, concept artwork and video posters.
- `public/videos/web/`: optimized playback videos and lightweight hover clips.

Project imagery represents concept studies, not completed commissions. Technology entries describe exploration interests, not verified professional proficiency. The video showcase uses the five supplied commercial/3D reels.

The larger original videos and two source environment renders are preserved in the sibling `../media-originals/` folder. They are not copied into production builds.

Optional browser tests live in `../tests/`. See that folder's README for instructions. Generated `node_modules/` and `dist/` directories can be recreated and are ignored by Git.
