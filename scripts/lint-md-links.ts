#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

(() => {
  const mdFiles = globSync('**/*.md', {
    ignore: [
      '**/node_modules/**',
      '**/CHANGELOG.md',
      'apps/demo-nextjs/**',
      'apps/demo-react-cra/**',
      'apps/demo-react-vite/**',
      'templates/**',
    ],
  });
  const filesWithLintErrors: string[] = [];
  mdFiles.forEach((file) => {
    try {
      execSync(`pnpm textlint ${file}`).toString();
    } catch (error) {
      filesWithLintErrors.push(file);
    }
  });
  if (filesWithLintErrors.length > 0) {
    process.exit(1);
  }
})();
