const versionReg = /[0-9]+\.[0-9]+\.[0-9]/;
const defaultForcCommand = 'forc';
const defaultFuelCoreCommand = 'fuel-core';

export const getSystemVersion = async (command: string) => {
  let version: string | null = null;
  let error: Error | null = null;

  if (!process.env.TEST || process.env.TEST_ENV === 'node') {
    const { execSync } = await import('child_process');
    try {
      const contents = execSync(command, {
        stdio: ['pipe', 'pipe', 'ignore'],
        encoding: 'utf8',
      }).toString();
      if (versionReg.test(contents)) {
        version = contents.match(versionReg)?.[0] as string;
      } else {
        throw new Error(contents);
      }
    } catch (err: unknown) {
      error = err as Error;
    }
  }

  return {
    error,
    version,
  };
};

export async function getSystemForc(forcPath: string = defaultForcCommand) {
  const { error, version: v } = await getSystemVersion(`${forcPath} --version`);
  return { error, systemForcVersion: v, systemForcPath: forcPath };
}

export async function getSystemFuelCore(fuelCorePath: string = defaultFuelCoreCommand) {
  const { error, version: v } = await getSystemVersion(`${fuelCorePath} --version`);
  return { error, systemFuelCoreVersion: v, systemFuelCorePath: fuelCorePath };
}

export async function getSystemVersions(params: { forcPath?: string; fuelCorePath?: string } = {}) {
  const { forcPath, fuelCorePath } = params;
  const { error: errorForc, systemForcVersion, systemForcPath } = await getSystemForc(forcPath);
  const {
    error: errorCore,
    systemFuelCoreVersion,
    systemFuelCorePath,
  } = await getSystemFuelCore(fuelCorePath);

  const error = errorForc ?? errorCore;

  return {
    error,
    systemForcVersion,
    systemForcPath,
    systemFuelCoreVersion,
    systemFuelCorePath,
  };
}
