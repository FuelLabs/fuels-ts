import { getBuiltinVersions } from './getBuiltinVersions';
import { gt, eq } from './semver';

export interface ICompareVersionsParams {
  systemForcVersion: string;
  systemFuelCoreVersion: string;
}

export function compareSystemVersions(params: ICompareVersionsParams) {
  const { systemForcVersion, systemFuelCoreVersion } = params;

  const versions = getBuiltinVersions();

  // are user's versions GREATER than the ones supported by the SDK?
  const systemForcIsGt = gt(systemForcVersion, versions.FORC);
  const systemFuelCoreIsGt = gt(systemFuelCoreVersion, versions.FUEL_CORE);

  // are user's versions EXACTLY the ones supported by the SDK?
  const systemForcIsEq = eq(systemForcVersion, versions.FORC);
  const systemFuelCoreIsEq = eq(systemFuelCoreVersion, versions.FUEL_CORE);

  return {
    systemForcIsGt,
    systemFuelCoreIsGt,
    systemForcIsEq,
    systemFuelCoreIsEq,
  };
}
