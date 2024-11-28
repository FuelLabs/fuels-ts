#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

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

  execSync(`pnpm markdown-link-check -c ./link-check.config.json ${mdFiles.join(' ')}`, {
    stdio: 'inherit',
  });
})();
