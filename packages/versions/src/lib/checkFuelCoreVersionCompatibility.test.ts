import { checkFuelCoreVersionCompatibility } from './checkFuelCoreVersionCompatibility';
import * as getBuiltinVersionsMod from './getBuiltinVersions';

/**
 * @group node
 */
describe('getDifferenceToUserFuelCoreVersion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should validate all possible version mismatches', () => {
    const supportedVersion = '0.1.2';

    vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockImplementation(() => ({
      FUELS: '1', // not under test
      FORC: '1', // not under test
      FUEL_CORE: supportedVersion,
    }));

    expect(checkFuelCoreVersionCompatibility('1.1.2')).toEqual({
      isMajorSupported: false,
      isMinorSupported: true,
      isPatchSupported: true,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('1.2.2')).toEqual({
      isMajorSupported: false,
      isMinorSupported: false,
      isPatchSupported: true,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('1.1.3')).toEqual({
      isMajorSupported: false,
      isMinorSupported: true,
      isPatchSupported: false,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('0.2.2')).toEqual({
      isMajorSupported: true,
      isMinorSupported: false,
      isPatchSupported: true,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('0.2.3')).toEqual({
      isMajorSupported: true,
      isMinorSupported: false,
      isPatchSupported: false,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('0.1.3')).toEqual({
      isMajorSupported: true,
      isMinorSupported: true,
      isPatchSupported: false,
      supportedVersion,
    });

    expect(checkFuelCoreVersionCompatibility('0.1.2')).toEqual({
      isMajorSupported: true,
      isMinorSupported: true,
      isPatchSupported: true,
      supportedVersion,
    });
  });

  it("warns when the version doesn't conform to strict major.minor.patch versioning (e.g. nightly build)", () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockImplementation(() => ({
      FUELS: '1', // not under test
      FORC: '1', // not under test
      FUEL_CORE: '0.1.2',
    }));

    checkFuelCoreVersionCompatibility('0.1.2+nightly.20240212.5cbe7e2984');

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    expect(consoleWarnSpy)
      .toHaveBeenCalledWith(`You're running against an unreleased fuel-core version: 0.1.2+nightly.20240212.5cbe7e2984. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`);
  });

  it("doesn't warn when version conforms to strict major.minor.patch versioning", () => {
    vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockImplementation(() => ({
      FUELS: '1', // not under test
      FORC: '1', // not under test
      FUEL_CORE: '0.1.2',
    }));

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    checkFuelCoreVersionCompatibility('0.1.2');

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
