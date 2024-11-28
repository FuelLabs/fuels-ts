#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

const { log } = console;

(() => {
  const mdFiles = globSync('**/*.md', {
    ignore: [
      '**/node_modules/**',
      'apps/demo/**',
      'apps/demo-react-cra/**',
      'apps/demo-nextjs/**',
      '.changeset/**',
      '**/CHANGELOG.md',
    ],
  });

  try {
    execSync(`pnpm markdown-link-check -q -c ./link-check.config.json ${mdFiles.join(' ')}`, {
      stdio: 'inherit',
    });
  } catch {
    log('Some files have broken links. Please fix them.');
    process.exit(1);
  }
})();
