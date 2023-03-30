import { existsSync, readFileSync, writeFileSync } from 'fs';
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
    const tsconfigPath = filepath.replace('package.json', 'tsconfig.build.json');

    const pkgAsStr = readFileSync(filepath, 'utf-8');
    const pkgAsJson = JSON.parse(pkgAsStr);

    let tsconfig = JSON.parse('{}');
    if (existsSync(tsconfigPath)) {
      tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
    }

    // skip packages with no configured 'exports' or `typesVersions`
    if (!pkgAsJson.exports || !pkgAsJson.typesVersions) {
      return;
    }

    const typesMembers: string[] = [];
    const exportMembers: string[] = [];

    Object.keys(pkgAsJson.exports).forEach((key) => {
      const configs = pkgAsJson.exports[key];
      const cjsPath = configs.require;
      const typesAlias = key === '.' ? '*' : key.replace(/^\.\//m, '');

      let newPath = cjsPath.replace('dist/cjs', 'src').replace('.js', '.ts');

      if (tsconfig?.include.length > 1) {
        tsconfig.include.forEach((dir: string) => {
          newPath = newPath.replace(`${dir}/${dir}`, `${dir}`);
        });
      }

      exportMembers.push(`    "${key}": "${newPath}"`);
      typesMembers.push(`      "${typesAlias}": [ "${newPath}" ]`);
    });

    // formatting data for fields `exports` and `typesVersions`
    const exportOpening = '"exports": {';
    const newExports = `${exportOpening}\n${exportMembers.join(',\n')}\n  },`;

    const typesOpening = '"typesVersions": {\n    "*": {';
    const newTypesVersions = `${typesOpening}\n${typesMembers.join(',\n')}\n    }\n  },`;

    // backing up original fields, and mutating them
    const replaceStr = `${newExports}\n  "exports.original": {`;
    let newFileContents = pkgAsStr.replace(exportOpening, replaceStr);

    const replaceTypesStr = `${newTypesVersions}\n  "typesVersions.original": {\n    "*": {`;
    newFileContents = newFileContents.replace(typesOpening, replaceTypesStr);

    writeFileSync(filepath, newFileContents);
  });
