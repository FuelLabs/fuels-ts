import semver from 'semver';

import { getSupportedVersions } from './getSupportedVersions';

export function checkFuelCoreVersionCompatibility(version: string): {
  isPatchSupported: boolean;
  isMinorSupported: boolean;
  isMajorSupported: boolean;
  userVersion: string;
} {
  const major = semver.major(version);
  const minor = semver.minor(version);
  const patch = semver.patch(version);

  const { FUEL_CORE } = getSupportedVersions();

  const supportedMajor = semver.major(FUEL_CORE);
  const supportedMinor = semver.minor(FUEL_CORE);
  const supportedPatch = semver.patch(FUEL_CORE);

  return {
    userVersion: FUEL_CORE,
    isMajorSupported: major === supportedMajor,
    isMinorSupported: minor === supportedMinor,
    isPatchSupported: patch === supportedPatch,
  };
}
