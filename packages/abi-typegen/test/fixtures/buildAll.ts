import { compileSwayToTs } from '../utils/sway/compileSwayToTs';

import { contractPaths } from '.';

const { log } = console;

function get(source: { [k: string]: string }, key: string) {
  return source[key];
}

Object.keys(contractPaths).forEach((key) => {
  const contractPath: string = get(contractPaths, key);

  log('——————————————————————————————————————————————————————');
  log(contractPath);
  log('——————————————————————————————————————————————————————');

  const ts = compileSwayToTs({ contractPath, inPlace: true });

  ts.typegen.files.forEach((f) => {
    log('----------');
    log(f.path);
    log(f.contents);
  });

  log('\n\n');
});
