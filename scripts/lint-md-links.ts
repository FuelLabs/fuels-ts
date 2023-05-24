#!/usr/bin/env node
import glob from 'glob';
import sh from 'shelljs';

(() => {
  const mdFiles = glob.sync('**/*.md', {
    ignore: ['**/node_modules/**', '**/CHANGELOG.md'],
  });
  const filesWithLintErrors: string[] = [];
  mdFiles.forEach((file) => {
    const { code } = sh.exec(`npx textlint ${file}`);
    if (code !== 0) {
      filesWithLintErrors.push(file);
    }
  });
  if (filesWithLintErrors.length > 0) {
    process.exit(1);
  }
})();
