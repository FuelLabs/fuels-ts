#!/usr/bin/env node
import { execSync } from 'child_process';
import { globSync } from 'glob';

const { error, log } = console;

(() => {
  const includePattern = '**/*.md';
  const ignorePatterns = [
    '**/node_modules/**',
    'apps/demo/**',
    'apps/demo-react-cra/**',
    'apps/demo-nextjs/**',
    '.changeset/**',
    '**/CHANGELOG.md',
  ];

  const allFiles = globSync(includePattern);

  const mdFiles = globSync(includePattern, { ignore: ignorePatterns });
  const skippedFiles = allFiles.filter((file) => !mdFiles.includes(file));

  log('Markdown files to be checked:\n');
  log(mdFiles.join('\n'));

  log('\nMarkdown files being skipped:\n');
  log(skippedFiles.join('\n'));

  try {
    execSync(`pnpm markdown-link-check -q -c ./link-check.config.json ${mdFiles.join(' ')}`, {
      stdio: 'inherit',
    });
    log('\nAll markdown files passed link checks.');
  } catch {
    error('\nSome files have broken links. Please fix them.');
    process.exit(1);
  }
})();
