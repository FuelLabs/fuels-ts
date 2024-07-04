import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

const importsReg = /import[\s\S]+from.+['"];/gm;

const wrapperFnFilepath = join(__dirname, 'wrapper-fn.ts');
const wrapperFnContents = readFileSync(wrapperFnFilepath, 'utf-8');

export const wrapSnippet = (filepath: string) => {
  const raw = readFileSync(filepath, 'utf8');

  // match
  const imports = raw.match(importsReg)?.toString() ?? '';
  const snippet = imports.length ? raw.split(imports)[1] : raw;

  // format
  const indented = snippet.replace(/^/gm, '  ').trim();
  const formatted = wrapperFnContents.replace('// %SNIPPET%', indented);

  // write
  const wrappedPath = filepath.replace('.ts', '.wrapped.ts');
  const wrappedSnippet = [imports, '\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedSnippet);
};

const dir = 'src/**';
const src = `${dir}/*.ts`;
const ignore = [`src/typegend`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapSnippet);
