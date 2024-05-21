import { FuelError } from '@fuel-ts/errors';
import {
  compareSystemVersions,
  eitherOr,
  getSystemForc,
  getSystemFuelCore,
  getBuiltinVersions,
} from '@fuel-ts/versions/cli';

/**
 * Tries to find compatible binaries on the filesystem, otherwise throws an error.
 *
 * @param paths - paths to the binaries (optional)
 * @returns - paths to the resolved binaries
 */
export const tryFindBinaries = (paths: { forcPath?: string; fuelCorePath?: string } = {}) => {
  // Ensure we can get the binary versions
  const { error: forcError, systemForcPath, systemForcVersion } = getSystemForc(paths.forcPath);

  const {
    error: fuelCoreError,
    systemFuelCorePath,
    systemFuelCoreVersion,
  } = getSystemFuelCore(paths.fuelCorePath);

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

  const { systemForcIsLt, systemFuelCoreIsLt } = compareSystemVersions({
    systemForcVersion: eitherOr(systemForcVersion, '0'),
    systemFuelCoreVersion: eitherOr(systemFuelCoreVersion, '0'),
  });

  if (systemForcIsLt || systemFuelCoreIsLt) {
    const { FORC: compatibleForcVersion, FUEL_CORE: compatibleFuelCoreVersion } =
      getBuiltinVersions();

    const errors = [
      'The following binaries on the filesystem are outdated:',
      systemForcIsLt
        ? ` -> '${systemForcPath}' is currently 'v${systemForcVersion}', but the current 'fuels' version requires 'v${compatibleForcVersion}'.`
        : undefined,
      systemFuelCoreIsLt
        ? ` -> '${systemFuelCorePath}' is currently 'v${systemFuelCoreVersion}', but the current 'fuels' version requires 'v${compatibleFuelCoreVersion}'.`
        : undefined,
    ];

    // eslint-disable-next-line no-console
    console.warn(`${errors.filter(Boolean).join('\n')}`);
  }

  return {
    forcPath: systemForcPath,
    fuelCorePath: systemFuelCorePath,
  };
};
