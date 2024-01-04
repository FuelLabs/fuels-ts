export class Semver {
  private major: number;
  private minor: number;
  private patch: number;

  private constructor(version: string) {
    const [major, minor, patch] = version.split('.').map((v) => parseInt(v, 10));
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  private static compareVersions(version1: string, version2: string): number {
    const semver1 = new Semver(version1);
    const semver2 = new Semver(version2);

    if (semver1.major !== semver2.major) {
      return semver1.major - semver2.major;
    }
    if (semver1.minor !== semver2.minor) {
      return semver1.minor - semver2.minor;
    }
    return semver1.patch - semver2.patch;
  }

  public static gt(version1: string, version2: string): boolean {
    return this.compareVersions(version1, version2) > 0;
  }

  public static eq(version1: string, version2: string): boolean {
    return this.compareVersions(version1, version2) === 0;
  }

  public static majorEq(version1: string, version2: string): boolean {
    const semver1 = new Semver(version1);
    const semver2 = new Semver(version2);
    return semver1.major === semver2.major;
  }

  public static minorEq(version1: string, version2: string): boolean {
    const semver1 = new Semver(version1);
    const semver2 = new Semver(version2);
    return semver1.minor === semver2.minor;
  }

  public static patchEq(version1: string, version2: string): boolean {
    const semver1 = new Semver(version1);
    const semver2 = new Semver(version2);
    return semver1.patch === semver2.patch;
  }
}
