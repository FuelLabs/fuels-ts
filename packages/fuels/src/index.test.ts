/* eslint-disable no-cond-assign */
import * as fs from 'fs';
import * as prettier from 'prettier';

import * as fuels from './index';

// this function parses a bundled file and returns a list of all modules that it references (import, require, export from, etc.)
const getListOfModules = (bundleContent: string) => {
  const formattedBundleContent = prettier.format(bundleContent, {
    parser: 'babel',
  });
  const listOfModules = new Set<string>();

  const requireRegex = /(?:^|[^.])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
  let match;
  while ((match = requireRegex.exec(formattedBundleContent))) {
    const moduleName = match[2];
    listOfModules.add(moduleName);
  }

  const importRegex = /import\s+(?:.+\s+from\s+)?["'](.+)["'];?/g;
  let importMatch;
  while ((importMatch = importRegex.exec(formattedBundleContent))) {
    const moduleName = importMatch[1];
    listOfModules.add(moduleName);
  }

  const exportRegex = /export\s+(?:.+\s+from\s+)?["'](.+)["'];?/g;
  let exportMatch;
  while ((exportMatch = exportRegex.exec(formattedBundleContent))) {
    const moduleName = exportMatch[1];
    listOfModules.add(moduleName);
  }

  return listOfModules;
};

describe('index.js', () => {
  test('should export everything', async () => {
    expect(fuels.AbiCoder).toBeTruthy();
    expect(fuels.Address).toBeTruthy();
    expect(fuels.Contract).toBeTruthy();
    expect(fuels.Predicate).toBeTruthy();
    expect(fuels.Provider).toBeTruthy();
    expect(fuels.Wallet).toBeTruthy();
    expect(fuels.TransactionType).toBeTruthy();
    expect(fuels.ScriptResultDecoderError).toBeTruthy();
  });

  test('is browser-compatible (does not reference any built-in Node.js modules in the browser bundle)', async () => {
    const NODE_BUILTIN_MODULES = [
      'assert',
      'buffer',
      'child_process',
      'cluster',
      'console',
      'constants',
      'crypto',
      'dgram',
      'dns',
      'events',
      'fs',
      'http',
      'http2',
      'https',
      'module',
      'net',
      'os',
      'path',
      'perf_hooks',
      'process',
      'punycode',
      'querystring',
      'readline',
      'repl',
      'stream',
      'string_decoder',
      'sys',
      'timers',
      'tls',
      'tty',
      'url',
      'util',
      'v8',
      'vm',
      'zlib',
    ];

    // get the list of all child packages by reading the `./packages/fuels/dist/index.mjs` file
    const fuelsBundle = fs.readFileSync('./packages/fuels/dist/index.mjs', 'utf8');
    const childPackages: string[] = [];
    getListOfModules(fuelsBundle).forEach((packageName) => {
      if (packageName.startsWith('@fuel-ts')) {
        childPackages.push(packageName.replace('@fuel-ts/', ''));
      }
    });

    // scans a bundled file for any references to built-in Node.js modules and throws an error if it finds any
    const scanBundleForNodeBuiltIns = (packageName: string) => {
      const bundle = fs.readFileSync(`./packages/${packageName}/dist/index.mjs`, 'utf8');
      const listOfModules = getListOfModules(bundle);
      listOfModules.forEach((moduleName) => {
        if (NODE_BUILTIN_MODULES.includes(moduleName)) {
          throw new Error(
            `The package ${packageName} references the built-in Node.js module ${moduleName}, which is may cause problems in the browser.`
          );
        }
      });
    };

    childPackages.forEach((packageName) => {
      scanBundleForNodeBuiltIns(packageName);
    });
  });
});
