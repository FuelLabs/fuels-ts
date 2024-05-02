import { FuelError } from '@fuel-ts/errors';
import { getSystemForc, getSystemFuelCore } from '@fuel-ts/versions/cli';

const defaultBinaryPaths = {
  forcPath: 'forc',
  fuelCorePath: 'fuel-core',
} as const;

/**
 * Tries to find the binaries in the system, otherwise throws an error.
 * 
 * @param paths - paths to the binaries (optional)
 * @returns - paths and versions of the binaries
 */
export const tryFindBinaries = (paths: { forcPath?: string; fuelCorePath?: string } = {}) => {
  const { forcPath, fuelCorePath } = { ...defaultBinaryPaths, ...paths };

  // Ensure we can get the binary versions
  const { error: forcError, systemForcVersion } = getSystemForc(forcPath);
  const { error: fuelCoreError, systemFuelCoreVersion } = getSystemFuelCore(fuelCorePath);
  if (forcError || fuelCoreError) {
    const errors = [
      forcError ? `Binary for 'forc' not found at path '${forcPath}'` : undefined,
      fuelCoreError ? `Binary for 'fuel-core' not found at path '${fuelCorePath}'` : undefined,
    ];
    throw new FuelError(FuelError.CODES.BIN_FILE_NOT_FOUND, errors.filter(Boolean).join('\n'));
  }

  return {
    forcPath,
    fuelCorePath,
  };
};
