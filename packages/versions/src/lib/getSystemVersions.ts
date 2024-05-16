const versionReg = /[0-9]+\.[0-9]+\.[0-9]/;

export const getSystemVersion = async (command: string) => {
  let version: string | null = null;
  let error: Error | null = null;

  if (!process.env.VITEST || process.env.VITEST_ENV === 'node') {
    const { execSync } = await import('child_process');
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
  }

  return {
    error,
    version,
  };
};

export async function getSystemForc() {
  const { error, version: v } = await getSystemVersion('forc --version');
  return { error, systemForcVersion: v };
}

export async function getSystemFuelCore() {
  const { error, version: v } = await getSystemVersion('fuel-core --version');
  return { error, systemFuelCoreVersion: v };
}

export async function getSystemVersions() {
  const { error: errorForc, systemForcVersion } = await getSystemForc();
  const { error: errorCore, systemFuelCoreVersion } = await getSystemFuelCore();

  const error = errorForc ?? errorCore;

  return {
    error,
    systemForcVersion,
    systemFuelCoreVersion,
  };
}
