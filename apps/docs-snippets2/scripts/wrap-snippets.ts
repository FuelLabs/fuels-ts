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

  // creates node launcher injector and replaces `LOCAL_NETWORK_URL`
  let nodeLauncher = '';
  if (/LOCAL_NETWORK_URL/.test(imports)) {
    imports = imports.replace(/LOCAL_NETWORK_URL/, 'TESTNET_NETWORK_URL');
    imports += `\nimport { launchTestNode } from 'fuels/test-utils'`;
    nodeLauncher = [
      'using node = await launchTestNode();',
      'const LOCAL_NETWORK_URL = node.provider.url;',
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
const ignore = [`src/typegend`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapSnippet);
