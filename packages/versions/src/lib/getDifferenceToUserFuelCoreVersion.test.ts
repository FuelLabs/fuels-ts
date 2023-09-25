import { getDifferenceToUserFuelCoreVersion } from './getDifferenceToUserFuelCoreVersion';
import * as getSupportedVersionsMod from './getSupportedVersions';

describe('getDifferenceToUserFuelCoreVersion', () => {
  const v = '0.1.2';
  const spy = jest.spyOn(getSupportedVersionsMod, 'getSupportedVersions');
  spy.mockImplementation(() => ({ FUELS: v, FORC: v, FUEL_CORE: v }));

  it.each([
    { version: '1.1.2', expectedResult: 'major' },
    { version: '1.2.2', expectedResult: 'major' },
    { version: '1.1.3', expectedResult: 'major' },
    { version: '0.2.2', expectedResult: 'minor' },
    { version: '0.2.3', expectedResult: 'minor' },
    { version: '0.1.3', expectedResult: 'patch' },
    {
      version: '0.1.2',
      expectedResult: 'equal',
    },
  ])(
    `returns $expectedResult when checking $version and ${v} equality`,
    ({ version, expectedResult }) => {
      const { difference, userVersion } = getDifferenceToUserFuelCoreVersion(version);
      expect(difference).toEqual(expectedResult);
      expect(userVersion).toEqual(v);
    }
  );
});
