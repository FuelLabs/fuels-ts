import { bold, red, green } from 'chalk';
import { execSync } from 'child_process';
import semver from 'semver';

import { versions } from './index';

export function run(_params: { programName: string }) {
  const { error, info } = console;

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
    error('Make sure you have Forc and fuel-core installed.');
    error(errorFooter);
    throw err;
  }

  const forcOk = semver.satisfies(userForc, versions.FORC);
  const coreOk = semver.satisfies(userFuelCore, versions.FUEL_CORE);

  if (!forcOk) {
    error(`Supported ${bold('Forc')} version: ${green(versions.FORC)}`);
    error(`You're using ${bold('Forc')}: ${red(userForc)}`);
    error(errorFooter);
    process.exit(1);
  } else if (!coreOk) {
    error(`Supported ${bold('fuel-core')} version: ${green(versions.FUEL_CORE)}`);
    error(`You're using ${bold('fuel-core')}: ${red(userFuelCore)}`);
    error(errorFooter);
    process.exit(1);
  } else {
    info(`You have all the right versions! ⚡`);
    info(` ${bold('Forc')}: ${green(userForc)}`);
    info(` ${bold('fuel-core')}: ${green(userFuelCore)}`);
    process.exit(0);
  }
}
