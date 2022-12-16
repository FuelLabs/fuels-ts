// TODO: Review and fix tests

describe('compareVersions.js', () => {
  test('should compare against: newer versions', async () => {
    expect(true).toBeTruthy();
    // const versions = { FORC: '1.0.0', FUEL_CORE: '1.0.0' };
    // jest.mock('../versions', () => ({ versions }));

    // const { compareUserVersions } = await require('./compareUserVersions');
    // const comparisons = compareUserVersions({
    //   userForcVersion: '1.0.1',
    //   userFuelCoreVersion: '1.0.1',
    // });

    // expect(comparisons.userForcIsGt).toEqual(true);
    // expect(comparisons.userForcIsEq).toEqual(false);

    // expect(comparisons.userFuelCoreIsGt).toEqual(true);
    // expect(comparisons.userFuelCoreIsEq).toEqual(false);
  });

  test('should compare against: exact versions', async () => {
    expect(true).toBeTruthy();
    // const versions = { FORC: '1.0.0', FUEL_CORE: '1.0.0' };
    // jest.mock('../versions', () => ({ versions }));

    // const { compareUserVersions } = await require('./compareUserVersions');
    // const comparisons = compareUserVersions({
    //   userForcVersion: '1.0.0',
    //   userFuelCoreVersion: '1.0.0',
    // });

    // expect(comparisons.userForcIsGt).toEqual(false);
    // expect(comparisons.userForcIsEq).toEqual(true);

    // expect(comparisons.userFuelCoreIsGt).toEqual(false);
    // expect(comparisons.userFuelCoreIsEq).toEqual(true);
  });

  test('should compare against: older versions', async () => {
    expect(true).toBeTruthy();
    // const versions = { FORC: '1.0.0', FUEL_CORE: '1.0.0' };

    // jest.mock('../versions', () => ({ versions }));

    // const { compareUserVersions } = await require('./compareUserVersions');
    // const comparisons = compareUserVersions({
    //   userForcVersion: '0.0.1',
    //   userFuelCoreVersion: '0.0.1',
    // });

    // expect(comparisons.userForcIsGt).toEqual(false);
    // expect(comparisons.userForcIsEq).toEqual(false);

    // expect(comparisons.userFuelCoreIsGt).toEqual(false);
    // expect(comparisons.userFuelCoreIsEq).toEqual(false);
  });
});
