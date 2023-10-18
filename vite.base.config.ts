import plainText from 'vite-plugin-plain-text';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    plainText('**/*.hbs', {
      namedExport: false,
    }),
  ],
  test: {
    globals: true,
    ui: false,
    setupFiles: ['./vite.env.ts'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json', 'text', 'text-summary'],
    },
  },
});
