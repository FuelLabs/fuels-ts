import { execSync } from 'child_process';
import plainText from 'vite-plugin-plain-text';
import { defineConfig } from 'vitest/config';

const vCpuCount =
  parseInt(execSync("cat /proc/cpuinfo | awk '/^processor/{print $3}'").toString(), 10) + 1; // we add one because the result is zero-indexed

console.log('vCPUs', vCpuCount);
export default defineConfig({
  plugins: [
    plainText('**/*.hbs', {
      namedExport: false,
    }),
  ],
  esbuild: { target: 'es2022' },
  test: {
    maxThreads: vCpuCount + 1,
    minThreads: vCpuCount, // ubuntu-latest has two CPUs (four threads?)
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
    globalSetup: ['vite.global-setup.ts'],
    testTimeout: 15000,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json'],
      exclude: ['**/dist/**', '**/test/**', '**/*.test.ts', '**/*.d.ts'],
    },
  },
});
