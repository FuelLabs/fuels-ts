import { readFileSync, rmSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { join } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as shell from 'shelljs';

const root = join(__dirname, '..');
const templatesDir = join(root, 'src', 'templates', 'hbs');
const fixturesDir = join(root, 'test', 'fixtures', 'templates');

const { log } = console;

export function wrapFile(dirpath: string, filename: string) {
  const from = join(dirpath, filename);
  const fromContents = readFileSync(from, 'utf-8');

  const toDir = join(dirpath, 'transpiled');
  const to = join(toDir, `${filename}.ts`);
  const toContents = `export default \`${fromContents}\`;`;

  rmSync(to, { force: true });
  mkdirp.sync(toDir);
  writeFileSync(to, toContents);

  log('  -', to.replace(root, ''));
}

export function main() {
  const templates = shell.ls(templatesDir);
  const fixtures = shell.ls(fixturesDir);

  const hbsOnly = (t: string) => /\.hbs$/m.test(t);

  log('Transpiling handlebar templates and fixtures:');

  templates.filter(hbsOnly).forEach((t) => {
    wrapFile(templatesDir, t);
  });

  fixtures.filter(hbsOnly).forEach((f) => {
    wrapFile(fixturesDir, f);
  });

  log('Done.⚡');
}

main();
