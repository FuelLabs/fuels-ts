import { readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { join } from 'path';
import { cwd } from 'process';

const files = globSync('packages/*/package.json', { cwd: cwd() });

/**
 * This script will do two things in all `package.json` files:
 *
 *  1) Backup current `exports` under `exports.js`
 *  2) Update `exports` configs pointing to `.ts` files
 *
 */

files
  .filter((f) => f !== '{}')
  .forEach((file) => {
    const filepath = join(__dirname, '..', file);
    const pkgAsStr = readFileSync(filepath, 'utf-8');
    const pkgAsJson = JSON.parse(pkgAsStr);

    // skip packages with no configured 'exports'
    if (!pkgAsJson.exports) {
      return;
    }

    const exportMembers: string[] = [];

    Object.keys(pkgAsJson.exports).forEach((key) => {
      const configs = pkgAsJson.exports[key];
      const cjsPath = configs.require;
      const newPath = cjsPath.replace('dist/cjs', 'src').replace('.js', '.ts');

      exportMembers.push(`    "${key}": "${newPath}"`);
    });

    const exportOpening = '"exports": {';
    const newExports = `${exportOpening}\n${exportMembers.join(',\n')}\n  },`;

    const replaceStr = `${newExports}\n  "exports.js": {`;
    const newFileContents = pkgAsStr.replace(exportOpening, replaceStr);

    writeFileSync(filepath, newFileContents);
  });
