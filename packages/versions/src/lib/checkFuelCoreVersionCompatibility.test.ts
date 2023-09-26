import { checkFuelCoreVersionCompatibility } from './checkFuelCoreVersionCompatibility';
import * as getSupportedVersionsMod from './getSupportedVersions';

describe('getDifferenceToUserFuelCoreVersion', () => {
  const v = '0.1.2';
  const spy = jest.spyOn(getSupportedVersionsMod, 'getSupportedVersions');
  spy.mockImplementation(() => ({ FUELS: v, FORC: v, FUEL_CORE: v }));

  it.each([
    {
      version: '1.1.2',
      isSupportedResult: {
        major: false,
        minor: true,
        patch: true,
      },
    },
    {
      version: '1.2.2',
      isSupportedResult: {
        major: false,
        minor: false,
        patch: true,
      },
    },
    {
      version: '1.1.3',
      isSupportedResult: {
        major: false,
        minor: true,
        patch: false,
      },
    },
    {
      version: '0.2.2',
      isSupportedResult: {
        major: true,
        minor: false,
        patch: true,
      },
    },
    {
      version: '0.2.3',
      isSupportedResult: {
        major: true,
        minor: false,
        patch: false,
      },
    },
    {
      version: '0.1.3',
      isSupportedResult: {
        major: true,
        minor: true,
        patch: false,
      },
    },
    {
      version: '0.1.2',
      isSupportedResult: {
        major: true,
        minor: true,
        patch: true,
      },
    },
  ])(
    `returns $expectedResult when checking $version and ${v} equality`,
    ({ version, isSupportedResult: { major, minor, patch } }) => {
      const { isMajorSupported, isMinorSupported, isPatchSupported, userVersion } =
        checkFuelCoreVersionCompatibility(version);

      expect(isMajorSupported).toEqual(major);
      expect(isMinorSupported).toEqual(minor);
      expect(isPatchSupported).toEqual(patch);

      expect(userVersion).toEqual(v);
    }
  );
});
