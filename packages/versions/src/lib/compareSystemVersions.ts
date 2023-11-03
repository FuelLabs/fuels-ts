import semver from 'semver';

import { getBuiltinVersions } from './getBuiltinVersions';

export interface ICompareVersionsParams {
  systemForcVersion: string;
  systemFuelCoreVersion: string;
}

export function compareSystemVersions(params: ICompareVersionsParams) {
  const { systemForcVersion, systemFuelCoreVersion } = params;

  const versions = getBuiltinVersions();

  // are user's versions GREATER than the ones supported by the SDK?
  const systemForcIsGt = semver.gt(systemForcVersion, versions.FORC);
  const systemFuelCoreIsGt = semver.gt(systemFuelCoreVersion, versions.FUEL_CORE);

  // are user's versions EXACTLY the ones supported by the SDK?
  const systemForcIsEq = semver.eq(systemForcVersion, versions.FORC);
  const systemFuelCoreIsEq = semver.eq(systemFuelCoreVersion, versions.FUEL_CORE);

  return {
    systemForcIsGt,
    systemFuelCoreIsGt,
    systemForcIsEq,
    systemFuelCoreIsEq,
  };
}
