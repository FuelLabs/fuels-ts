import { getBuiltinVersions } from './getBuiltinVersions';
import { getSystemVersions } from './getSystemVersions';
import type { BinaryVersions } from './types';

export const getBinaryVersions = (
  params: { forcPath?: string; fuelCorePath?: string } = {}
): BinaryVersions => {
  const { FUELS } = getBuiltinVersions();
  const { systemForcVersion, systemFuelCoreVersion } = getSystemVersions(params);

  return {
    FUELS,
    FORC: systemForcVersion ?? undefined,
    FUEL_CORE: systemFuelCoreVersion ?? undefined,
  };
};
