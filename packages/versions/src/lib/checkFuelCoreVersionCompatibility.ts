import semver from 'semver';

import { getSupportedVersions } from './getSupportedVersions';

export function checkFuelCoreVersionCompatibility(networkVersion: string) {
  const { FUEL_CORE: supportedVersion } = getSupportedVersions();

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
