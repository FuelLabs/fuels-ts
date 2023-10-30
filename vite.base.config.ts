import plainText from 'vite-plugin-plain-text';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    plainText('**/*.hbs', {
      namedExport: false,
    }),
  ],
  esbuild: { target: 'es2022' },
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '/apps/demo-nextjs',
      '/apps/demo-react-cra',
      '/apps/demo-react-vite',
    ],
    globals: true,
    ui: false,
    setupFiles: ['./vite.env.ts'],
    globalSetup: ['./vite.setup.ts'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json'],
      exclude: ['**/dist/**', '**/test/**', '**/*.test.ts', '**/*.d.ts'],
    },
  },
});
