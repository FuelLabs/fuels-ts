function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const [major, minor, patch] = version.split('.').map((v) => parseInt(v, 10));
  return { major, minor, patch };
}

function versionDiffs(
  version1: string,
  version2: string
): { major: number; minor: number; patch: number; fullVersionDiff: number } {
  const semver1 = parseVersion(version1);
  const semver2 = parseVersion(version2);
  const major = semver1.major - semver2.major;
  const minor = semver1.minor - semver2.minor;
  const patch = semver1.patch - semver2.patch;
  return {
    major,
    minor,
    patch,
    fullVersionDiff: major || minor || patch,
  };
}

export function gt(version1: string, version2: string): boolean {
  const { fullVersionDiff } = versionDiffs(version1, version2);
  return fullVersionDiff > 0;
}

export function eq(version1: string, version2: string): boolean {
  const { fullVersionDiff } = versionDiffs(version1, version2);
  return fullVersionDiff === 0;
}

export function majorEq(version1: string, version2: string): boolean {
  const { major } = versionDiffs(version1, version2);
  return major === 0;
}

export function minorEq(version1: string, version2: string): boolean {
  const { minor } = versionDiffs(version1, version2);
  return minor === 0;
}

export function patchEq(version1: string, version2: string): boolean {
  const { patch } = versionDiffs(version1, version2);
  return patch === 0;
}
