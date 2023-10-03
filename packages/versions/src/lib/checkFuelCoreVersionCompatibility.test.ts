import { checkFuelCoreVersionCompatibility } from './checkFuelCoreVersionCompatibility';
import * as getSupportedVersionsMod from './getSupportedVersions';

describe('getDifferenceToUserFuelCoreVersion', () => {
  afterAll(() => jest.restoreAllMocks());

  it('should validate all possible version mismatches', () => {
    const supportedVersion = '0.1.2';

    jest.spyOn(getSupportedVersionsMod, 'getSupportedVersions').mockImplementation(() => ({
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
});
