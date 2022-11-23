import { bold, red, green } from 'chalk';
import { execSync } from 'child_process';
import semver from 'semver';

import { versions } from './index';

export async function run(_params: { programName: string }) {
  const { log } = console;

  const errorFooter: string = [
    '\nYou can install/update them with:',
    ` ${green('https://github.com/fuellabs/fuelup')}`,
  ].join('\n');

  let userForc: string | undefined;
  let userFuelCore: string | undefined;

  try {
    const reg = /[^0-9.]+/g;
    userForc = execSync('forc --version').toString().replace(reg, '');
    userFuelCore = execSync('fuel-core --version').toString().replace(reg, '');
  } catch (err) {
    log('Make sure you have Forc and fuel-core installed.');
    log(errorFooter);
    throw err;
  }

  const forcOk = semver.satisfies(userForc, versions.FORC);
  const coreOk = semver.satisfies(userFuelCore, versions.FUEL_CORE);

  if (!forcOk) {
    log(`Supported Forc version: ${green(versions.FORC)}`);
    log(`You're using Forc: ${red(userForc)}`);
    log(errorFooter);
    process.exit(1);
  } else if (!coreOk) {
    log(`Supported ${bold('fuel-core')} version: ${green(versions.FUEL_CORE)}`);
    log(`You're using ${bold('fuel-core')}: ${red(userFuelCore)}`);
    log(errorFooter);
    process.exit(1);
  }
  log(`You have all the right versions! ⚡`);
  log(` ${bold('Forc')}: ${green(userForc)}`);
  log(` ${bold('fuel-core')}: ${green(userFuelCore)}`);

  process.exit(0);
}
