import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const importsReg = /import[\s\S]+from.+['"];/gm;

const wrapper = `export const main = async (): Promise<any | any[]> => {
  const logs: any[] = [];
  const console = { log (...args: any[]) { logs.push(args) }};
  // ———>>>
  %WIDGET%
  // <<<———
  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
}`.replace(/^\s{4}/gm, '  ');

export const wrapWidget = (filepath: string) => {
  const raw = readFileSync(filepath, 'utf8');

  // match
  const imports = raw.match(importsReg)?.toString() ?? '';
  const widget = imports.length ? raw.split(imports)[1] : raw;

  // format
  const indented = widget.replace(/^/gm, '  ').trim();
  const formatted = wrapper.replace('%WIDGET%', indented);

  // write
  const wrappedPath = filepath.replace('.ts', '.wrapped.ts');
  const wrappedWidget = [imports, '\n', formatted].join('');

  writeFileSync(wrappedPath, wrappedWidget);
};

const dir = 'src/**';
const src = `${dir}/*.ts`;
const ignore = [`src/typegend`, `${dir}/*.test.ts`, `${dir}/*.wrapped.ts`];

globSync(src, { ignore }).forEach(wrapWidget);
