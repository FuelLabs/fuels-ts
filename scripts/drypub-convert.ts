import { globSync } from 'glob';
import { log } from 'node:console';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const paths = globSync(['**/*package.json', '!node_modules']);

/**
 * Will override all `package.json` files, spreading the
 * inner properties from `publishConfig` in the root node.
 *
 * This is the same behavior that takes place during publish.
 * - Packages are linked by Javascript files (not Typescript)
 *
 * CI must always use this before running tests.
 */
for (const path of paths) {
  const fullpath = join(process.cwd(), path);
  const fileContent = readFileSync(fullpath, 'utf-8');
  const currentPkgJson = JSON.parse(fileContent);

  if (currentPkgJson.private) {
    log('Private. ', path);
    continue;
  }

  if (!currentPkgJson.exports) {
    if (!currentPkgJson.main) {
      log('ExpMainLess. ', path);
      continue;
    }
  }

  const publishConfig = {
    main: currentPkgJson.main,
    module: currentPkgJson.module,
    types: currentPkgJson.types,
    exports: JSON.parse(JSON.stringify(currentPkgJson.exports ?? {})),
    typesVersions: JSON.parse(JSON.stringify(currentPkgJson.typesVersions ?? [])),
  };

  const transformPath = (filepath: string) =>
    filepath.replace('dist/', 'src/').replace(/\.(m?js|d\.ts)$/, '.ts');

  const newMain = transformPath(currentPkgJson.main);
  const newModule = transformPath(currentPkgJson.module);
  const newTypes = transformPath(currentPkgJson.types);

  const newExports = {};

  for (const pathKey of Object.keys(currentPkgJson?.exports ?? {})) {
    const source = currentPkgJson.exports[pathKey];
    newExports[pathKey] = {
      types: transformPath(source.types),
      require: transformPath(source.require),
      import: transformPath(source.import),
    };
  }

  const newTypesVersions = currentPkgJson.typesVersions;

  for (const globalStr of Object.keys(newTypesVersions ?? {})) {
    const root = newTypesVersions[globalStr];
    for (const namespaceStr of Object.keys(root)) {
      const namespace = root[namespaceStr];
      const filepath = namespace[0];

      if (!newTypesVersions[globalStr]) {
        newTypesVersions[globalStr] = {};
      }

      newTypesVersions[globalStr][namespaceStr] = [transformPath(filepath)];
    }
  }

  currentPkgJson.exports = newExports;
  currentPkgJson.typesVersions = newTypesVersions;

  const newPkgJson = {
    private: currentPkgJson.private,
    name: currentPkgJson.name,
    version: currentPkgJson.version,
    description: currentPkgJson.description,
    keywords: currentPkgJson.keywords,
    author: currentPkgJson.author,
    bin: currentPkgJson.bin,
    main: newMain,
    module: newModule,
    types: newTypes,
    engines: currentPkgJson.engines,
    browser: currentPkgJson.browser,
    exports: currentPkgJson.exports,
    publishConfig,
    typesVersions: newTypesVersions,
    files: currentPkgJson.files,
    scripts: currentPkgJson.scripts,
    license: currentPkgJson.license,
    dependencies: currentPkgJson.dependencies,
    peerDependencies: currentPkgJson.peerDependencies,
    devDependencies: currentPkgJson.devDependencies,
  };

  if (Object.keys(newPkgJson?.typesVersions ?? {}).length === 0) {
    newPkgJson.typesVersions = undefined;
    newPkgJson.publishConfig.typesVersions = undefined;

    delete newPkgJson.typesVersions;
    delete newPkgJson.publishConfig.typesVersions;
  }

  if (newPkgJson.publishConfig.exports.length === 0) {
    newPkgJson.exports = undefined;
    newPkgJson.publishConfig.exports = undefined;

    delete newPkgJson.exports;
    delete newPkgJson.publishConfig.exports;
  }

  if (Object.keys(newPkgJson?.peerDependencies ?? {}).length === 0) {
    newPkgJson.peerDependencies = undefined;
    delete newPkgJson.peerDependencies;
  }

  const newPkgJsonStr = JSON.stringify(newPkgJson, null, 2);

  // log('Before');
  writeFileSync(fullpath, `${newPkgJsonStr}\n`);
  log('Done.', fullpath);
}
