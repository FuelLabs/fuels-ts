import { getBuiltinVersions } from './getBuiltinVersions';
import { majorEq, minorEq, patchEq } from './semver';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  if (/^\d+\.\d+\.\d+\D+/m.test(networkVersion)) {
    // eslint-disable-next-line no-console
    console.warn(`You're running against an unreleased fuel-core version: ${networkVersion}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`);
  }

  return {
    supportedVersion,
    isMajorSupported: majorEq(networkVersion, supportedVersion),
    isMinorSupported: minorEq(networkVersion, supportedVersion),
    isPatchSupported: patchEq(networkVersion, supportedVersion),
  };
}
