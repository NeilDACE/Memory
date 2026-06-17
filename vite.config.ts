import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Du kannst die Pfade einfach direkt als String angeben!
        main: 'index.html',
        'about-me': 'src/pages/about-me.html',
        game: 'src/pages/game.html',
        'privacy-policy': 'src/pages/privacy-policy.html',
        settings: 'src/pages/settings.html',
      },
    },
  },
});