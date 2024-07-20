import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

const importsReg = /^[\s\S]+from.+['"];/gm;

const wrapperFnFilepath = join(__dirname, 'wrapper-fn.ts');
const wrapperFnContents = readFileSync(wrapperFnFilepath, 'utf-8');

export const wrapSnippet = (filepath: string) => {
  const raw = readFileSync(filepath, 'utf8');

  // match
  let imports = raw.match(importsReg)?.toString() ?? '';
  const snippet = imports.length ? raw.split(imports)[1] : raw;

  // 1—— creates node launcher injector
  const keys = ['LOCAL_NETWORK_URL', 'WALLET_ADDRESS', 'WALLET_PVT_KEY'];

  const envImportReg = /import.+\{.+([\s\S]+).+\}.+from.+'\.\.\/env';/gm;
  if (envImportReg.test(imports)) {
    // match all import groups up to the `env.ts` import
    const allImports = imports.match(envImportReg)?.[0];
    const envImport = `import ${allImports?.split('import ').pop()}`;

    // isolater the `env.ts` import line and extract its members
    const envMembersReg = /import.+\{(.+)\}.+from.+'\.\.\/env'/m;
    const envConstants = envImport.match(envMembersReg)?.[1].trim().split(/,\s?/);

    // check and warns against unsupported env members
    envConstants?.forEach((envConst) => {
      const found = keys.find((k) => k === envConst);
      if (!found) {
        throw new Error(`Mocked env consty '${envConst}' not supported in code snippets.`);
      }
    });

    // Remove the env import line, favoring the
    // inline declared variables.
    imports = imports.replace(envImport, '');
  }

  let nodeLauncher = '';

  const localNetworkReg = /LOCAL_NETWORK_URL/;
  if (localNetworkReg.test(imports)) {
    // 2—— replaces `LOCAL_NETWORK_URL`
    imports = imports.replace(localNetworkReg, 'TESTNET_NETWORK_URL');
    imports += `\nimport { launchTestNode } from 'fuels/test-utils'`;

    // 3—— injects launched node and env constants
    nodeLauncher = [
      'using node = await launchTestNode();',
      'const LOCAL_NETWORK_URL = node.provider.url;',
      'const WALLET_ADDRESS = node.wallets[0].address;',
      'const WALLET_PVT_KEY = node.wallets[0].privateKey;',
    ].join('\n  ');
  }

  // format
  const indented = snippet.replace(/^/gm, '    ').trim();

  const formatted = wrapperFnContents
    .replace('// %SNIPPET%', indented)
    .replace('// %NODE_LAUNCHER%', nodeLauncher);

  // write
  const wrappedPath = filepath.replace('.ts', '.wrapped.ts');
  const wrappedSnippet = [imports, '\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedSnippet);
};

const dir = 'src/**';
const src = `${dir}/*.ts`;
const ignore = [`src/typegend/**`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapSnippet);
