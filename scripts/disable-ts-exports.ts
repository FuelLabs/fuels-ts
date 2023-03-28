import { readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { join } from 'path';
import { cwd } from 'process';

const files = globSync('packages/*/package.json', { cwd: cwd() });

/**
 * This script will undo all changes from the `./enable-ts-exports.ts` script.
 */

files
  .filter((f) => f !== '{}')
  .forEach((file) => {
    const filepath = join(__dirname, '..', file);
    const pkgAsStr = readFileSync(filepath, 'utf-8');
    const pkgAsJson = JSON.parse(pkgAsStr);

    // skip packages not in need of be rolled back
    if (!pkgAsJson.exports || !pkgAsJson['exports.js']) {
      return;
    }

    let capturing = true;

    const outputLines = pkgAsStr.split('\n').filter((line) => {
      if (/"exports": /.test(line)) {
        capturing = false;
        return false;
      }

      if (!capturing && / {2}},/.test(line)) {
        capturing = true;
        return false;
      }

      return capturing;
    });

    // rolls back original js exports
    const newFileContents = outputLines.join('\n').replace('exports.js', 'exports');

    writeFileSync(filepath, newFileContents);
  });
