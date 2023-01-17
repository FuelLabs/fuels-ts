import semver from 'semver';

import { getSupportedVersions } from './getSupportedVersions';

export interface ICompareVersionsParams {
  userForcVersion: string;
  userFuelCoreVersion: string;
}

export function compareUserVersions(params: ICompareVersionsParams) {
  const { userForcVersion, userFuelCoreVersion } = params;

  const versions = getSupportedVersions();

  // are user's versions GREATER than the ones supported by the SDK?
  const userForcIsGt = semver.gt(userForcVersion, versions.FORC);
  const userFuelCoreIsGt = semver.gt(userFuelCoreVersion, versions.FUEL_CORE);

  // are user's versions EXACTLY the ones supported by the SDK?
  const userForcIsEq = semver.eq(userForcVersion, versions.FORC);
  const userFuelCoreIsEq = semver.eq(userFuelCoreVersion, versions.FUEL_CORE);

  return {
    userForcIsGt,
    userFuelCoreIsGt,
    userForcIsEq,
    userFuelCoreIsEq,
  };
}
