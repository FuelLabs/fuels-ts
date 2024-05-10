import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true,
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: './src/index.ts',
      name: 'browser',
      formats: ['es'],
      fileName: 'browser',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
