import * as childProcessMod from 'child_process';

import { getUserVersions } from './getUserVersions';

// https://stackoverflow.com/a/72885576
jest.mock('child_process', () => ({
  __esModule: true,
  ...jest.requireActual('child_process'),
}));

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

    const mockedExecOk = jest.fn();
    mockedExecOk.mockReturnValueOnce(userForcVersion); // first call (forc)
    mockedExecOk.mockReturnValueOnce(userFuelCoreVersion); // second call (fuel-core)

    const execSyncThrow = jest.fn(() => {
      throw new Error();
    });

    const execSync = jest
      .spyOn(childProcessMod, 'execSync')
      .mockImplementation(shouldThrow ? execSyncThrow : mockedExecOk);

    return {
      error,
      execSync,
    };
  }

  /*
    Tests
  */
  test('should get user versions just fine', () => {
    // mocking
    const userForcVersion = '1.0.0';
    const userFuelCoreVersion = '2.0.0';
    const { error, execSync } = mockAllDeps({
      userForcVersion,
      userFuelCoreVersion,
    });

    // executing
    const fuelUpLink = 'url-goes-here';
    const versions = getUserVersions({ fuelUpLink });

    // validating
    expect(error).toHaveBeenCalledTimes(0);
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(versions.userForcVersion).toEqual(userForcVersion);
    expect(versions.userFuelCoreVersion).toEqual(userFuelCoreVersion);
  });

  test('should throw if Forc or Fuel-Core is not installed', () => {
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
      getUserVersions({ fuelUpLink });
    } catch (err) {
      errorMsg = err as unknown as Error;
    }

    // validating
    expect(error).toHaveBeenCalledTimes(2);
    expect(errorMsg).toBeTruthy();
  });
});
