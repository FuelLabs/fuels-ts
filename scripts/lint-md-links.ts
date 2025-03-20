#!/usr/bin/env node
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { execSync, spawn } from 'child_process';
import { globSync } from 'glob';

const { error } = console;

let docsApi: ChildProcessWithoutNullStreams;
let exitCode = 0;

// eslint-disable-next-line no-void
void (async () => {
  docsApi = spawn(`pnpm vite preview --port 9876 --outDir apps/docs-api/src/api`, {
    shell: true,
  });

  await new Promise((resolve) => {
    docsApi.stdout.on('data', () => {
      resolve(undefined);
    });
  });

  const mdFiles = globSync('**/*.md', {
    ignore: [
      '**/node_modules/**',
      'apps/demo-*/**',
      '.changeset/**',
      '**/CHANGELOG.md',
      'internal/**',
    ],
  });

  execSync(`pnpm markdown-link-check -q -c ./link-check.config.json ${mdFiles.join(' ')}`, {
    stdio: 'inherit',
  });
})()
  .catch((e) => {
    error('Some files have broken links. Please fix them.');
    error(e);
    exitCode = 1;
  })
  .finally(() => {
    if (docsApi.pid) {
      process.kill(docsApi.pid);
    }
    process.exit(exitCode);
  });
