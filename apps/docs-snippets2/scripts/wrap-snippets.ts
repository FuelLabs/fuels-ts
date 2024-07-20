import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

const wrapperFnFilepath = join(__dirname, 'wrapper-fn.ts');
const wrapperFnContents = readFileSync(wrapperFnFilepath, 'utf-8');

/**
 * Wrap snippet for testing
 * @param filepath - Snippet filepath
 */
export const wrapSnippet = (filepath: string) => {
  // 0— filter all imports from file
  const raw = readFileSync(filepath, 'utf8');
  const importsReg = /^[\s\S]+from.+['"];/gm;
  let imports = raw.match(importsReg)?.toString() ?? '';
  const snippet = imports.length ? raw.split(imports)[1] : raw;

  // 1— remove .env import
  const envImportReg = /import.+\{.+([\s\S]+).+\}.+from.+'\.\.\/env';/gm;
  if (envImportReg.test(imports)) {
    const allImports = imports.match(envImportReg)?.[0];
    const envImport = `import ${allImports?.split('import ').pop()}`;
    imports = imports.replace(envImport, '');
  }

  // 2— creates node launcher injector
  let nodeLauncher = '';
  const localNetworkReg = /LOCAL_NETWORK_URL/;
  if (localNetworkReg.test(imports)) {
    // 2.a—— replaces `LOCAL_NETWORK_URL`
    imports = imports.replace(localNetworkReg, 'TESTNET_NETWORK_URL');
    imports += `\nimport { launchTestNode } from 'fuels/test-utils'`;

    // 2.b—— injects launched node and env constants
    nodeLauncher = readFileSync(join(__dirname, 'launcher.ts'), 'utf-8')
      .replace(/import.*$/gm, '')
      .replace(/export/g, '')
      .trim()
      .replace(/\n/g, '\n  ');
  }

  // 3— format indentation
  const indented = snippet.replace(/^/gm, '    ').trim();
  const formatted = wrapperFnContents
    .replace('// %SNIPPET%', indented)
    .replace('// %NODE_LAUNCHER%', nodeLauncher);

  // 4— write wrapped snippet to disk
  const wrappedPath = filepath.replace('.ts', '.wrapped.ts');
  const wrappedSnippet = [imports, '\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedSnippet);
};

/*
  Wrap all snippets inside `src` dir
*/
const dir = 'src/**';
const src = `${dir}/*.ts`;
const ignore = [`src/typegend/**`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapSnippet);
