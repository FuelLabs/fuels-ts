import semver from 'semver';

import { getBuiltinVersions } from './getBuiltinVersions';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getBuiltinVersions();

  const networkMajor = semver.major(networkVersion);
  const networkMinor = semver.minor(networkVersion);
  const networkPatch = semver.patch(networkVersion);

  const supportedMajor = semver.major(supportedVersion);
  const supportedMinor = semver.minor(supportedVersion);
  const supportedPatch = semver.patch(supportedVersion);

  return {
    supportedVersion,
    isMajorSupported: networkMajor === supportedMajor,
    isMinorSupported: networkMinor === supportedMinor,
    isPatchSupported: networkPatch === supportedPatch,
  };
}
