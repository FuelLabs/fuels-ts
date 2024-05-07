import { execSync } from 'child_process';

const versionReg = /[0-9]+\.[0-9]+\.[0-9]/;
const defaultForcCommand = 'forc';
const defaultFuelCoreCommand = 'fuel-core';

export const getSystemVersion = (command: string) => {
  let version: string | null = null;
  let error: Error | null = null;

  try {
    const contents = execSync(command, { stdio: 'pipe' }).toString();
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

export function getSystemForc(forcPath: string = defaultForcCommand) {
  const { error, version: v } = getSystemVersion(`${forcPath} --version`);
  return { error, systemForcVersion: v };
}

export function getSystemFuelCore(fuelCorePath: string = defaultFuelCoreCommand) {
  const { error, version: v } = getSystemVersion(`${fuelCorePath} --version`);
  return { error, systemFuelCoreVersion: v };
}

export function getSystemVersions(params: { forcPath?: string; fuelCorePath?: string } = {}) {
  const { forcPath, fuelCorePath } = params;
  const { error: errorForc, systemForcVersion } = getSystemForc(forcPath);
  const { error: errorCore, systemFuelCoreVersion } = getSystemFuelCore(fuelCorePath);

  const error = errorForc ?? errorCore;

  return {
    error,
    systemForcVersion,
    systemFuelCoreVersion,
  };
}
