import { compareSystemVersions } from './compareSystemVersions';
import * as getBuiltinVersionsMod from './getBuiltinVersions';

/**
 * @group node
 */
describe('compareSystemVersions.js', () => {
  /*
    Hooks
  */
  beforeEach(() => {
    const v = '1.0.0';
    const spy = vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions');
    spy.mockImplementation(() => ({ FUELS: v, FORC: v, FUEL_CORE: v }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /*
    Tests
  */
  test('should compare against: newer versions', () => {
    const comparisons = compareSystemVersions({
      systemForcVersion: '1.0.1',
      systemFuelCoreVersion: '1.0.1',
    });

    expect(comparisons.systemForcIsGt).toEqual(true);
    expect(comparisons.systemForcIsEq).toEqual(false);

    expect(comparisons.systemFuelCoreIsGt).toEqual(true);
    expect(comparisons.systemFuelCoreIsEq).toEqual(false);
  });

  test('should compare against: exact versions', () => {
    const comparisons = compareSystemVersions({
      systemForcVersion: '1.0.0',
      systemFuelCoreVersion: '1.0.0',
    });

    expect(comparisons.systemForcIsGt).toEqual(false);
    expect(comparisons.systemForcIsEq).toEqual(true);

    expect(comparisons.systemFuelCoreIsGt).toEqual(false);
    expect(comparisons.systemFuelCoreIsEq).toEqual(true);
  });

  test('should compare against: older versions', () => {
    const comparisons = compareSystemVersions({
      systemForcVersion: '0.0.1',
      systemFuelCoreVersion: '0.0.1',
    });

    expect(comparisons.systemForcIsGt).toEqual(false);
    expect(comparisons.systemForcIsEq).toEqual(false);

    expect(comparisons.systemFuelCoreIsGt).toEqual(false);
    expect(comparisons.systemFuelCoreIsEq).toEqual(false);
  });
});
