import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const initialDependencies: { file: string; contents: string }[] = [];

/**
 * - Needs refactoring
 * - Make dynamic for package names and replacements
 */
const hardlinkDeps = () => {
  const packagesDir = join(__dirname, '../packages/');
  const packagesSupportingBrowserTesting = ['fuel-gauge'];
  const searchAndReplaces = [
    { search: 'fuels', replace: 'file:../fuels' },
    { search: '@fuel-ts/wallet', replace: 'file:../wallet' },
    { search: '@fuel-ts/forc', replace: 'file:../forc' },
    { search: '@fuel-ts/utils', replace: 'file:../utils' },
    { search: '@fuel-ts/errors', replace: 'file:../errors' },
  ];

  packagesSupportingBrowserTesting.forEach((packageName) => {
    const packageFilePath = join(packagesDir, `${packageName}/package.json`);
    const fileContents = readFileSync(packageFilePath, 'utf8');
    initialDependencies.push({ file: packageFilePath, contents: fileContents });

    const lines = fileContents.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('workspace:*')) {
        searchAndReplaces.forEach((s) => {
          if (line.includes(s.search)) {
            lines[index] = line.replace('workspace:*', s.replace);
          }
        });
      }
      writeFileSync(packageFilePath, lines.join('\n'));
    });
  });
};

const symlinkDeps = () =>
  initialDependencies.forEach(({ file, contents }) => writeFileSync(file, contents));

(() => {
  hardlinkDeps();

  execSync('pnpm install');

  execSync('vitest --run --coverage --config vite.browser.config.ts $(scripts/tests-find.sh --browser)');

  symlinkDeps();

  execSync('pnpm install');
})();