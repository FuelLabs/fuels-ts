/* eslint-disable global-require */
describe('getUserVersions.js', () => {
  /*
    Test (mocking) utility
  */
  function mockAllDeps(params: {
    userForcVersion: string;
    userFuelCoreVersion: string;
    shouldThrow?: boolean;
  }) {
    const { userForcVersion, userFuelCoreVersion, shouldThrow } = params;

    const error = jest.spyOn(console, 'error').mockImplementation();
    const info = jest.spyOn(console, 'info').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    const execSync = jest.fn();
    execSync.mockReturnValueOnce(userForcVersion);
    execSync.mockReturnValueOnce(userFuelCoreVersion);

    const execSyncThrow = jest.fn(() => {
      throw new Error();
    });

    jest.mock('child_process', () => ({ execSync: shouldThrow ? execSyncThrow : execSync }));

    const versionsDefault = {
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
      FUELS: '1.0.0',
    };

    jest.mock('../index', () => ({ versions: versionsDefault }));

    return {
      error,
      info,
      exit,
      execSync,
    };
  }

  /*
    Tests
  */
  test('should get user versions just fine', async () => {
    // mocking
    const userForcVersion = '1.0.0';
    const userFuelCoreVersion = '2.0.0';
    const { error } = mockAllDeps({ userForcVersion, userFuelCoreVersion });

    // executing
    const { getUserVersions } = await require('./getUserVersions');
    const fuelUpLink = 'url-goes-here';
    const versions = getUserVersions({ fuelUpLink });

    // validating
    expect(error).toHaveBeenCalledTimes(0);
    expect(versions.userForcVersion).toEqual(userForcVersion);
    expect(versions.userFuelCoreVersion).toEqual(userFuelCoreVersion);
  });

  test('should throw if Forc or Fuel-Core is not installed', async () => {
    // mocking
    const userForcVersion = '1.0.0';
    const userFuelCoreVersion = '2.0.0';
    const { error } = mockAllDeps({
      userForcVersion,
      userFuelCoreVersion,
      shouldThrow: true,
    });

    // executing
    let errorMsg: Error | undefined;

    try {
      const fuelUpLink = 'url-goes-here';
      const { getUserVersions } = await require('./getUserVersions');
      getUserVersions({ fuelUpLink });
    } catch (err) {
      errorMsg = err as unknown as Error;
    }

    // validating
    expect(error).toHaveBeenCalledTimes(2);
    expect(errorMsg).toBeTruthy();
  });
});
