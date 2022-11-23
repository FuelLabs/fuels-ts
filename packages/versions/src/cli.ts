import { execSync } from 'child_process';

import { versions } from './index';

export async function run(_params: { programName: string }) {
  const { log } = console;

  const userForc = execSync('forc --version');
  const userFuelCore = execSync('fuel-core --version');

  console.log({ versions });
  console.log({ userForc, userFuelCore });

  // TODO: Implement version's check

  log('\nDone.⚡');
}
