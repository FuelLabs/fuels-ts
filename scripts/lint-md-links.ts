#!/usr/bin/env node
import { globSync } from 'glob';
import sh from 'shelljs';

(() => {
  const mdFiles = globSync('**/*.md', {
    ignore: [
      '**/node_modules/**',
      '**/CHANGELOG.md',
      'apps/demo-nextjs/**',
      'apps/demo-react-cra/**',
      'apps/demo-react-vite/**',
    ],
  });
  const filesWithLintErrors: string[] = [];
  mdFiles.forEach((file) => {
    const { code } = sh.exec(`pnpm textlint ${file}`);
    if (code !== 0) {
      filesWithLintErrors.push(file);
    }
  });
  if (filesWithLintErrors.length > 0) {
    process.exit(1);
  }
})();
