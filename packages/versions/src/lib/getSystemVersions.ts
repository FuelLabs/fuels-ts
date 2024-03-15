import { execSync } from 'child_process';

const matchVersion = /[0-9]+\.[0-9]+\.[0-9]/;
const excludeVersion = /[^0-9.]+/g;

export function getSystemForc() {
  let systemForcVersion: string | null = null;
  let error: Error | null = null;

  try {
    const io = execSync('forc --version').toString()
    if (!matchVersion.test(io)) {
      throw new Error(io)
    }
    systemForcVersion = io.replace(excludeVersion, '');
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
    const io = execSync('fuel-core --version').toString()
    if (!matchVersion.test(io)) {
      throw new Error(io)
    }
    systemFuelCoreVersion = io.replace(excludeVersion, '');
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
