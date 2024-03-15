import * as childProcessMod from 'child_process';

import { getSystemVersions } from './getSystemVersions';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
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

    const error = vi.spyOn(console, 'error').mockImplementation(() => []);

    const mockedExecOk = vi.fn();
    mockedExecOk.mockReturnValueOnce(systemForcVersion); // first call (forc)
    mockedExecOk.mockReturnValueOnce(systemFuelCoreVersion); // second call (fuel-core)

    const execSyncThrow = vi.fn(() => {
      throw new Error();
    });

    const execSync = vi
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

  test('should return error if Forc or Fuel-Core is not installed', () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { error } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
      shouldThrow: true,
    });

    // executing
    const { err } = getSystemVersions();

    // validating
    expect(err).toBeTruthy();
  });
});
