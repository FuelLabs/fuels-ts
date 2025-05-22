import { globSync } from 'glob';
import { log } from 'node:console';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const paths = await globSync(['**/*package.json', '!node_modules']);

/**
 * Will override all `package.json` files, spreading the
 * inner properties from `publishConfig` in the root node.
 *asdf
 * This is the same behavior that takes place during publish.
 * - Packages are linked by Javascript files (not Typescript)
 *
 * CI must always use this before running tests.
 */
for (const path of paths) {
  const fullpath = join(process.cwd(), path);
  const fileContent = readFileSync(fullpath, 'utf-8');
  const pkgJson = JSON.parse(fileContent);

  if (pkgJson.publishConfig) {
    const publishConfig = { ...pkgJson.publishConfig };
    pkgJson.publishConfig = undefined;

    const newPkgJson = {
      ...pkgJson,
      ...publishConfig,
    };

    const newPkgJsonStr = JSON.stringify(newPkgJson, null, 2);

    writeFileSync(fullpath, `${newPkgJsonStr}\n`);
    log(path);
  }
}
