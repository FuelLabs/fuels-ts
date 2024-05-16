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
  test('should get user versions just fine', async () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = await getSystemVersions();

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(versions.systemForcVersion).toEqual(systemForcVersion);
    expect(versions.systemFuelCoreVersion).toEqual(systemFuelCoreVersion);
  });

  test('should return error if Forc or Fuel-Core is not installed', async () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';

    mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
      shouldThrow: true,
    });

    // executing
    const { error: systemError } = await getSystemVersions();

    // validating
    expect(systemError).toBeTruthy();
  });

  test('should throw for fuelup exception', async () => {
    // mocking
    const systemForcVersion = 'fuelup exception';
    const systemFuelCoreVersion = 'fuelup exception';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = await getSystemVersions();

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(versions.error?.toString()).toEqual(`Error: ${systemForcVersion}`);
    expect(versions.systemForcVersion).toEqual(null);
    expect(versions.systemFuelCoreVersion).toEqual(null);
  });
});
