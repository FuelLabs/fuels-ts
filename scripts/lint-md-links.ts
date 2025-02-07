#!/usr/bin/env node
import { execSync, spawn } from 'child_process';
import { globSync } from 'glob';

const { log } = console;

// eslint-disable-next-line no-void
void (async () => {
  const docsApi = spawn(`pnpm vite preview --port 9876 --outDir apps/docs-api/src/api`, {
    shell: true,
  });

  await new Promise((resolve) => {
    docsApi.stdout.on('data', () => {
      resolve(undefined);
    });
  });

  const mdFiles = globSync('**/*.md', {
    ignore: ['**/node_modules/**', 'apps/demo-*/**', '.changeset/**', '**/CHANGELOG.md'],
  });

  execSync(`pnpm markdown-link-check -q -c ./link-check.config.json ${mdFiles.join(' ')}`, {
    stdio: 'inherit',
  });
})()
  .catch(() => {
    log('Some files have broken links. Please fix them.');
    process.exit(1);
  })
  .then(() => process.exit(0));
