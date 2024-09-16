#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

(() => {
  const mdFiles = globSync('**/*.md', {
    ignore: [
      '**/node_modules/**',
      'apps/docs/src/api/**', // generated api
      '**/CHANGELOG.md',
      'apps/demo-nextjs/**',
      'apps/demo-react-cra/**',
      'apps/demo-react-vite/**',
      'templates/**',
      'apps/demo-wallet-sdk-react/**',
      'apps/create-fuels-counter-guide/**',
      'internal/forc/sway-repo/**',
      'internal/fuel-core/fuel-core-repo/**',
    ],
  });

  execSync(`pnpm textlint ${mdFiles.join(' ')} --debug`, { stdio: 'inherit' });
})();
