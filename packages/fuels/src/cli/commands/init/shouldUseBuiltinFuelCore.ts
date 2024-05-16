import { getSystemFuelCore } from '@fuel-ts/versions/cli';

export const shouldUseBuiltinFuelCore = async () => {
  // first, tries use system binary
  const { systemFuelCoreVersion } = await getSystemFuelCore();
  if (systemFuelCoreVersion !== null) {
    return false;
  }

  // if its not found, will default to the built-in binary
  return true;
};
