/* eslint-disable @typescript-eslint/naming-convention */
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const wrapperFnFilepath = join(__dirname, 'test-template.ts');
const wrapperFnContents = readFileSync(wrapperFnFilepath, 'utf-8');

/**
 * Wrap snippet for testing
 * @param filepath - Snippet filepath
 */
export const wrapSnippet = (filepath: string) => {
  const snippetContents = readFileSync(filepath, 'utf8');

  /**
   * Test environment
   */
  let testEnvironments = '';

  // Check if the file contains 'node' or 'browser' groups at the top of the file
  const fileContents = readFileSync(filepath, 'utf8');
  const hasNodeComment = fileContents.includes('@group node');
  const hasBrowserComment = fileContents.includes('@group browser');

  if (hasNodeComment && !hasBrowserComment) {
    testEnvironments = '/**\n * @group node\n */';
  } else if (hasBrowserComment && !hasNodeComment) {
    testEnvironments = '/**\n * @group browser\n */';
  } else {
    testEnvironments = '/**\n * @group node\n * @group browser\n */';
  }

  /*
    Filter all imports from file.
  */
  const importsReg = /^[\s\S]+from.+['"];/gm;

  let imports = snippetContents.match(importsReg)?.toString() ?? '';

  const snippetsNoImports = imports.length ? snippetContents.split(imports)[1] : snippetContents;

  // Does the snippet requires node launcher?
  const requiresNodeLauncher = /NETWORK_URL/.test(imports) || /WALLET_/.test(imports);

  /*
    Removes .env file import
  */
  const envImportReg = /\nimport\s*\{([^}]+)\}\s*from\s*['"](\.\.\/)+env['"];/gm;
  if (envImportReg.test(imports)) {
    const allImports = imports.match(envImportReg)?.[0];
    const envImport = `import ${allImports?.split('import ').pop()}`;
    imports = imports.replace(envImport, '');
  }

  /*
    Inject node launcher & friends
  */
  let nodeLauncher = '';

  if (requiresNodeLauncher) {
    /*
     Adds `launchTestNode` import, always right below the last `fuels` import
     and before the next relative one.
   */
    const launchImport = `import { launchTestNode } from 'fuels/test-utils';`;

    const searchStr = `from 'fuels';`;
    const lastIndexStart = imports.lastIndexOf(searchStr);
    const lastIndexEnd = lastIndexStart + searchStr.length;

    const prefix = imports.slice(0, lastIndexEnd).trim();
    const suffix = imports.slice(lastIndexEnd).trim();

    imports = `${prefix}\n${launchImport}\n\n${suffix}`;

    /*
      Injects launched code snippet and populates env constants
    */
    nodeLauncher = readFileSync(join(__dirname, 'launcher-snippet.ts'), 'utf-8')
      .replace(/import.*$/gm, '') // ignore file imports
      .trim() // zip
      .replace(/\n/g, '\n  '); // indent chunk
  }

  /*
    Format indentation
  */
  const indented = snippetsNoImports.replace(/^/gm, '  ').trim();

  // const eslintDisableRule = '// eslint-disable-next-line eslint-comments/disable-enable-pair\n';

  const wrappedSnippet =
    // eslintDisableRule +
    wrapperFnContents
      .replace('// %TEST_ENVIRONMENT%', testEnvironments)
      .replace('// %IMPORTS%', imports)
      .replace('%NAME%', basename(filepath))
      .replace('// %SNIPPET%', indented)
      .replace('// %NODE_LAUNCHER%', nodeLauncher)
      .replace(/^.*#(end)?region.+$/gm, '')
      .replace(/^[\s]*$/gm, '') // trailing spaces
      .replace(/^([\s\S]]*\n){2,}/, '') // multiple empty lines
      .trim();

  /*
    Write snippet wrapped in an test to disk
  */
  const wrappedPath = filepath.replace('.ts', '.test.ts');
  // const wrappedSnippet = ['\n\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedSnippet);
};

/*
  Wrap all snippets inside `src` dir
*/
const dir = 'src/**';
const src = `${dir}/snippets/*.ts`;
const ignore = [
  `src/snippets/typegend/**`,
  `src/snippets/env.ts`,
  `src/snippets/transactions/new-api.ts`,
  `${dir}/*.test.ts`,
];

globSync(src, { ignore }).forEach(wrapSnippet);
