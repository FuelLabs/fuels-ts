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
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json'],
    },
  },
});
