import { FuelError } from '@fuel-ts/errors';
import { getSystemForc, getSystemFuelCore } from '@fuel-ts/versions/cli';

/**
 * Tries to find the binaries in the system, otherwise throws an error.
 *
 * @param paths - paths to the binaries (optional)
 * @returns - paths to the resolved binaries
 */
export const tryFindBinaries = (paths: { forcPath?: string; fuelCorePath?: string } = {}) => {
  // Ensure we can get the binary versions
  const { error: forcError, systemForcPath } = getSystemForc(paths.forcPath);
  const { error: fuelCoreError, systemFuelCorePath } = getSystemFuelCore(paths.fuelCorePath);
  if (forcError || fuelCoreError) {
    const errors = [
      'Unable to find the following binaries on the filesystem:',
      forcError ? ` -> 'forc' at path '${systemForcPath}'` : undefined,
      fuelCoreError ? ` -> 'fuel-core' at path '${systemFuelCorePath}'` : undefined,
      `\nVisit https://docs.fuel.network/guides/installation/ for an installation guide.`,
    ];
    throw new FuelError(
      FuelError.CODES.BIN_FILE_NOT_FOUND,
      `${errors.filter(Boolean).join('\n')}`,
      { ...paths }
    );
  }

  return {
    forcPath: systemForcPath,
    fuelCorePath: systemFuelCorePath,
  };
};
