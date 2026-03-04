import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  { extends: './vitest.node.config.mts', test: { name: 'node' } },
  { extends: './vitest.browser.config.mts', test: { name: 'browser' } },
]);
