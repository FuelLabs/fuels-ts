import semver from 'semver';

import { getSupportedVersions } from './getSupportedVersions';

type VersionDifference = {
  difference: 'major' | 'minor' | 'patch' | 'equal';
  userVersion: string;
};

export function getDifferenceToUserFuelCoreVersion(version: string): VersionDifference {
  const major = semver.major(version);
  const minor = semver.minor(version);
  const patch = semver.patch(version);

  const { FUEL_CORE } = getSupportedVersions();

  const supportedMajor = semver.major(FUEL_CORE);
  const supportedMinor = semver.minor(FUEL_CORE);
  const supportedPatch = semver.patch(FUEL_CORE);

  const result: VersionDifference = {
    userVersion: FUEL_CORE,
    difference: 'equal',
  };

  if (major !== supportedMajor) result.difference = 'major';
  else if (minor !== supportedMinor) result.difference = 'minor';
  else if (patch !== supportedPatch) result.difference = 'patch';

  return result;
}
