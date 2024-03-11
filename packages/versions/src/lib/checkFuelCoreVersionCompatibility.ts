import { getBuiltinVersions } from './getBuiltinVersions';
import { majorEq, minorEq, patchEq } from './semver';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  if (networkVersion.match(/^[0-9]+\.[0-9]+\.[0-9]+$/) === null) {
    console.warn(
      `You're running against a non-official fuel-core version: ${networkVersion}. Things may work as expected, but it's not guaranteed. Please use an official release.`
    );
  }

  return {
    supportedVersion,
    isMajorSupported: majorEq(networkVersion, supportedVersion),
    isMinorSupported: minorEq(networkVersion, supportedVersion),
    isPatchSupported: patchEq(networkVersion, supportedVersion),
  };
}
