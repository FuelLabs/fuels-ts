import * as childProcessMod from 'child_process';

import { getSystemVersions } from './getSystemVersions';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

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

/**
 * @group node
 */
describe('getSystemVersions', () => {
  test('should get user versions just fine', () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = getSystemVersions();

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toBeCalledWith(`forc --version`, expect.any(Object));
    expect(execSync).toBeCalledWith(`fuel-core --version`, expect.any(Object));
    expect(versions.systemForcVersion).toEqual(systemForcVersion);
    expect(versions.systemFuelCoreVersion).toEqual(systemFuelCoreVersion);
    expect(versions.systemForcPath).toEqual('forc');
    expect(versions.systemFuelCorePath).toEqual('fuel-core');
  });

  test('should return error if Forc or Fuel-Core is not installed', () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
      shouldThrow: true,
    });

    // executing
    const { error: systemError } = getSystemVersions();

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toBeCalledWith(`forc --version`, expect.any(Object));
    expect(execSync).toBeCalledWith(`fuel-core --version`, expect.any(Object));
    expect(systemError).toBeTruthy();
  });

  test('should throw for fuelup exception', () => {
    // mocking
    const systemForcVersion = 'fuelup exception';
    const systemFuelCoreVersion = 'fuelup exception';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = getSystemVersions();

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toBeCalledWith(`forc --version`, expect.any(Object));
    expect(execSync).toBeCalledWith(`fuel-core --version`, expect.any(Object));
    expect(versions.error?.toString()).toEqual(`Error: ${systemForcVersion}`);
    expect(versions.systemForcVersion).toEqual(null);
    expect(versions.systemFuelCoreVersion).toEqual(null);
  });

  it('should be able to use custom binary paths', () => {
    // mocking
    const systemForcVersion = '1.0.0';
    const systemFuelCoreVersion = '2.0.0';
    const { execSync } = mockAllDeps({
      systemForcVersion,
      systemFuelCoreVersion,
    });

    // executing
    const versions = getSystemVersions({
      forcPath: '/path/to/custom/forc',
      fuelCorePath: '/path/to/custom/fuel-core',
    });

    // validating
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toBeCalledWith(`/path/to/custom/forc --version`, expect.any(Object));
    expect(execSync).toBeCalledWith(`/path/to/custom/fuel-core --version`, expect.any(Object));
    expect(versions.systemForcVersion).toEqual(systemForcVersion);
    expect(versions.systemFuelCoreVersion).toEqual(systemFuelCoreVersion);
    expect(versions.systemForcPath).toEqual('/path/to/custom/forc');
    expect(versions.systemFuelCorePath).toEqual('/path/to/custom/fuel-core');
  });
});
