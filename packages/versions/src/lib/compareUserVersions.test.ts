import { compareUserVersions } from './compareUserVersions';
import * as getSupportedVersionsMod from './getSupportedVersions';

describe('compareVersions.js', () => {
  /*
    Hooks
  */
  beforeEach(() => {
    const v = '1.0.0';
    const spy = jest.spyOn(getSupportedVersionsMod, 'getSupportedVersions');
    spy.mockImplementation(() => ({ FUELS: v, FORC: v, FUEL_CORE: v }));
  });

  afterEach(jest.restoreAllMocks);

  /*
    Tests
  */
  test('should compare against: newer versions', () => {
    const comparisons = compareUserVersions({
      userForcVersion: '1.0.1',
      userFuelCoreVersion: '1.0.1',
    });

    expect(comparisons.userForcIsGt).toEqual(true);
    expect(comparisons.userForcIsEq).toEqual(false);

    expect(comparisons.userFuelCoreIsGt).toEqual(true);
    expect(comparisons.userFuelCoreIsEq).toEqual(false);
  });

  test('should compare against: exact versions', () => {
    const comparisons = compareUserVersions({
      userForcVersion: '1.0.0',
      userFuelCoreVersion: '1.0.0',
    });

    expect(comparisons.userForcIsGt).toEqual(false);
    expect(comparisons.userForcIsEq).toEqual(true);

    expect(comparisons.userFuelCoreIsGt).toEqual(false);
    expect(comparisons.userFuelCoreIsEq).toEqual(true);
  });

  test('should compare against: older versions', () => {
    const comparisons = compareUserVersions({
      userForcVersion: '0.0.1',
      userFuelCoreVersion: '0.0.1',
    });

    expect(comparisons.userForcIsGt).toEqual(false);
    expect(comparisons.userForcIsEq).toEqual(false);

    expect(comparisons.userFuelCoreIsGt).toEqual(false);
    expect(comparisons.userFuelCoreIsEq).toEqual(false);
  });
});
