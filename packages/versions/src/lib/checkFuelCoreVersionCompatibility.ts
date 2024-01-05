import { getBuiltinVersions } from './getBuiltinVersions';
import { majorEq, minorEq, patchEq } from './semver';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  return {
    supportedVersion,
    isMajorSupported: majorEq(networkVersion, supportedVersion),
    isMinorSupported: minorEq(networkVersion, supportedVersion),
    isPatchSupported: patchEq(networkVersion, supportedVersion),
  };
}
