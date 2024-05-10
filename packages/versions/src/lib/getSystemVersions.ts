import { execSync } from 'child_process';

const versionReg = /[0-9]+\.[0-9]+\.[0-9]/;

export const getSystemVersion = (command: string) => {
  let version: string | null = null;
  let error: Error | null = null;

  try {
    const contents = execSync(command).toString();
    if (versionReg.test(contents)) {
      version = contents.match(versionReg)?.[0] as string;
    } else {
      throw new Error(contents);
    }
  } catch (err: unknown) {
    error = err as Error;
  }

  return {
    error,
    version,
  };
};

export function getSystemForc() {
  const { error, version: v } = getSystemVersion('forc --version');
  return { error, systemForcVersion: v };
}

export function getSystemFuelCore() {
  const { error, version: v } = getSystemVersion('fuel-core --version');
  return { error, systemFuelCoreVersion: v };
}

export function getSystemVersions() {
  const { error: errorForc, systemForcVersion } = getSystemForc();
  const { error: errorCore, systemFuelCoreVersion } = getSystemFuelCore();

  const error = errorForc ?? errorCore;

  return {
    error,
    systemForcVersion,
    systemFuelCoreVersion,
  };
}
