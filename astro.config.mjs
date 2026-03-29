import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const reactClientEntrypoint = fileURLToPath(
  new URL('./node_modules/@astrojs/react/dist/client.js', import.meta.url)
);
const reactServerEntrypoint = fileURLToPath(
  new URL('./node_modules/@astrojs/react/dist/server.js', import.meta.url)
);

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@astrojs/react/client.js': reactClientEntrypoint,
        '@astrojs/react/server.js': reactServerEntrypoint,
      },
    },
  },
});
