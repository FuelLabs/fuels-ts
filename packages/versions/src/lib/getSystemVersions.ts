import { green } from 'chalk';
import { execSync } from 'child_process';

import { fuelUpLink } from './fuelUpLink';

export function getSystemForc() {
  let systemForcVersion: string | null = null;
  let error: Error | null = null;

  try {
    const reg = /[^0-9.]+/g;
    systemForcVersion = execSync('forc --version').toString().replace(reg, '');
  } catch (err: unknown) {
    error = err as Error;
  }

  return {
    error,
    systemForcVersion,
  };
}

export function getSystemFuelCore() {
  let systemFuelCoreVersion: string | null = null;
  let error: Error | null = null;

  try {
    const reg = /[^0-9.]+/g;
    systemFuelCoreVersion = execSync('fuel-core --version').toString().replace(reg, '');
  } catch (err: unknown) {
    error = err as Error;
  }

  return {
    error,
    systemFuelCoreVersion,
  };
}

export function getSystemVersions() {
  const { error } = console;

  const { error: errorForc, systemForcVersion } = getSystemForc();
  const { error: errorCore, systemFuelCoreVersion } = getSystemFuelCore();

  const err = errorForc ?? errorCore;

  if (err) {
    error('Make sure you have Forc and Fuel-Core installed.');
    error(`  ${green(fuelUpLink)}`);
    throw err;
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    systemForcVersion: systemForcVersion!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    systemFuelCoreVersion: systemFuelCoreVersion!,
  };
}
