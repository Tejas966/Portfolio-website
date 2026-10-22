import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isPreview }) => ({
  plugins: [react()],
  // `vite preview` should behave like the static host: real files only, no SPA fallback to index.html.
  appType: isPreview ? 'mpa' : 'spa',
  // The SSR build (used only for prerendering) bundles packages that ship CSS or browser-first ESM.
  ssr: { noExternal: [/^@fontsource/, 'gsap', 'lenis'] },
}));
