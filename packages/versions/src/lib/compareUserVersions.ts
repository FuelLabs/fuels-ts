import semver from 'semver';

import { getBuiltinVersions } from './getBuiltinVersions';

export interface ICompareVersionsParams {
  systemForcVersion: string;
  systemFuelCoreVersion: string;
}

export function compareUserVersions(params: ICompareVersionsParams) {
  const { systemForcVersion, systemFuelCoreVersion } = params;

  const versions = getBuiltinVersions();

  // are user's versions GREATER than the ones supported by the SDK?
  const userForcIsGt = semver.gt(systemForcVersion, versions.FORC);
  const userFuelCoreIsGt = semver.gt(systemFuelCoreVersion, versions.FUEL_CORE);

  // are user's versions EXACTLY the ones supported by the SDK?
  const userForcIsEq = semver.eq(systemForcVersion, versions.FORC);
  const userFuelCoreIsEq = semver.eq(systemFuelCoreVersion, versions.FUEL_CORE);

  return {
    userForcIsGt,
    userFuelCoreIsGt,
    userForcIsEq,
    userFuelCoreIsEq,
  };
}
