import { compileSwayToTs } from '../utils/sway/compileSwayToTs';

import { contractPaths } from '.';

const { log } = console;

// Object.keys(contractPaths).forEach((key) => {
['structNested'].forEach((key) => {
  const contractPath: string = contractPaths[key];
  log('——————————————————————————————————————————————————————');
  log(contractPath);
  log('——————————————————————————————————————————————————————');

  const ts = compileSwayToTs({ contractPath, inPlace: true });
  log(ts.dts);
  log('\n\n');
});
