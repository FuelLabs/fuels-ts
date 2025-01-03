#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

const { log } = console;

(() => {
  const mdFiles = globSync('**/*.md', {
    ignore: ['**/node_modules/**', 'apps/demo-*/**', '.changeset/**', '**/CHANGELOG.md'],
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
