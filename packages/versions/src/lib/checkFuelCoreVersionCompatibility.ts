import { getBuiltinVersions } from './getBuiltinVersions';
import { Semver } from './semver';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  return {
    supportedVersion,
    isMajorSupported: Semver.majorEq(networkVersion, supportedVersion),
    isMinorSupported: Semver.minorEq(networkVersion, supportedVersion),
    isPatchSupported: Semver.patchEq(networkVersion, supportedVersion),
  };
}
