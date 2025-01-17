#!/usr/bin/env node
import { exec, execSync, spawn } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { cwd } from 'process';

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

  mdFiles.forEach((filepath) => {
    const content = readFileSync(filepath).toString();
    writeFileSync(filepath, content.replace(/DOCS_API_URL/g, 'http://localhost:9876'));
  });
  // TODO: Stop ignoring doc links in `link-check.config.json`
  // The above requires this to be merged and deployed:
  //  - https://github.com/FuelLabs/fuels-ts/pull/3500
  try {
    execSync(`pnpm markdown-link-check -q -c ./link-check.config.json ${mdFiles.join(' ')}`, {
      stdio: 'inherit',
    });
  } catch {
    log('Some files have broken links. Please fix them.');
    process.exit(1);
  }
})();
