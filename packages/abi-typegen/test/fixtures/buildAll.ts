import { compileSwayToTs } from '../utils/sway/compileSwayToTs';

import { contractPaths } from '.';

const { log } = console;

Object.entries(contractPaths).forEach(([_contractName, contractPath]) => {
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
