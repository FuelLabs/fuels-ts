import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const importsReg = /import[\s\S]+from.+['"];/gm;

const wrapper = `export const main = async (): Promise<any | any[]> => {
  const logs: any[] = [];
  const console = { log (...args: any[]) { logs.push(args) }};
  // ———>>>
  %SNIPPET%
  // <<<———
  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
}`.replace(/^\s{4}/gm, '  ');

export const wrapSnippet = (filepath: string) => {
  const raw = readFileSync(filepath, 'utf8');

  // match
  const imports = raw.match(importsReg)?.toString() ?? '';
  const snippet = imports.length ? raw.split(imports)[1] : raw;

  // format
  const indented = snippet.replace(/^/gm, '  ').trim();
  const formatted = wrapper.replace('%SNIPPET%', indented);

  // write
  const wrappedPath = filepath.replace('.ts', '.wrapped.ts');
  const wrappedSnippet = [imports, '\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedSnippet);
};

const dir = 'src/**';
const src = `${dir}/*.ts`;
const ignore = [`src/typegend`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapSnippet);
