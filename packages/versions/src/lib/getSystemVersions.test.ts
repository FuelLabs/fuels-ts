import * as childProcessMod from 'child_process';

import { getSystemVersions } from './getSystemVersions';

// https://stackoverflow.com/a/72885576
jest.mock('child_process', () => ({
  __esModule: true,
  ...jest.requireActual('child_process'),
}));

describe('getSystemVersions.js', () => {
  /*
    Test (mocking) utility
  */
  function mockAllDeps(params: {
    systemForcVersion: string;
    systemFuelCoreVersion: string;
    shouldThrow?: boolean;
  }) {
    const { systemForcVersion, systemFuelCoreVersion, shouldThrow } = params;

    const error = jest.spyOn(console, 'error').mockImplementation();

    const mockedExecOk = jest.fn();
    mockedExecOk.mockReturnValueOnce(systemForcVersion); // first call (forc)
    mockedExecOk.mockReturnValueOnce(systemFuelCoreVersion); // second call (fuel-core)

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
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { error, execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = getSystemVersions();

    // validating
    expect(error).toHaveBeenCalledTimes(0);
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(versions.systemForcVersion).toEqual(systemForcVersion);
    expect(versions.systemFuelCoreVersion).toEqual(systemFuelCoreVersion);
  });

  test('should throw if Forc or Fuel-Core is not installed', () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { error } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
      shouldThrow: true,
    });

    // executing
    let errorMsg: Error | undefined;

    try {
      getSystemVersions();
    } catch (err) {
      errorMsg = err as unknown as Error;
    }

    // validating
    expect(error).toHaveBeenCalledTimes(2);
    expect(errorMsg).toBeTruthy();
  });
});
