import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json', 'text', 'html'],
      include: ['packages', 'internal', 'apps'],
      exclude: [
        '**/*.js',
        '**/node_modules/**',
        '**/dist/**',
        '**/test/**',
        '**/*.test.ts',
        '**/*.d.ts',
        '**/bin.ts',
        'packages/fuel-gauge/**',
        'apps/demo-*',
        'apps/docs',
      ],
    },
  },
});
