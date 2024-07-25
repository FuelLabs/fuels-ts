import { getSystemVersions } from './getSystemVersions';
import type { BinaryVersions } from './types';

export const getBinaryVersions = (
  params: { forcPath?: string; fuelCorePath?: string } = {}
): Partial<BinaryVersions> => {
  const { systemForcVersion, systemFuelCoreVersion } = getSystemVersions(params);

  return {
    FORC: systemForcVersion ?? undefined,
    FUEL_CORE: systemFuelCoreVersion ?? undefined,
  };
};
