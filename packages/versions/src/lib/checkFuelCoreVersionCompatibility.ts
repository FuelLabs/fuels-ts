import { getBuiltinVersions } from './getBuiltinVersions';
import { majorEq, minorEq, patchEq } from './semver';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  if (networkVersion.match(/^[0-9]+\.[0-9]+\.[0-9]+$/) === null) {
    console.warn(
      `You're running against an unreleased fuel-core version: ${networkVersion}. Things may work as expected, but it's not guaranteed. Please use a released version.`
    );
  }

  return {
    supportedVersion,
    isMajorSupported: majorEq(networkVersion, supportedVersion),
    isMinorSupported: minorEq(networkVersion, supportedVersion),
    isPatchSupported: patchEq(networkVersion, supportedVersion),
  };
}
