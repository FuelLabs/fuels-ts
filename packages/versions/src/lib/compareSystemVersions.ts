import { getBuiltinVersions } from './getBuiltinVersions';
import { Semver } from './semver';

export interface ICompareVersionsParams {
  systemForcVersion: string;
  systemFuelCoreVersion: string;
}

export function compareSystemVersions(params: ICompareVersionsParams) {
  const { systemForcVersion, systemFuelCoreVersion } = params;

  const versions = getBuiltinVersions();

  // are user's versions GREATER than the ones supported by the SDK?
  const systemForcIsGt = Semver.gt(systemForcVersion, versions.FORC);
  const systemFuelCoreIsGt = Semver.gt(systemFuelCoreVersion, versions.FUEL_CORE);

  // are user's versions EXACTLY the ones supported by the SDK?
  const systemForcIsEq = Semver.eq(systemForcVersion, versions.FORC);
  const systemFuelCoreIsEq = Semver.eq(systemFuelCoreVersion, versions.FUEL_CORE);

  return {
    systemForcIsGt,
    systemFuelCoreIsGt,
    systemForcIsEq,
    systemFuelCoreIsEq,
  };
}
