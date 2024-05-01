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

const defaultBinaryPaths = { forcPath: 'forc', fuelCorePath: 'fuel-core' };
const scenarioBinaryPaths = [
  { message: 'Using default "forc" and "fuel-core"' },
  { message: 'Using custom "forc" path', forcPath: 'fuels-forc' },
  { message: 'Using custom "fuel-core" path', fuelCorePath: 'fuels-core' },
  {
    message: 'Using custom "forc" and "fuel-core" path',
    forcPath: 'fuels-forc',
    fuelCorePath: 'fuels-core',
  },
];

/**
 * @group node
 */
describe('getSystemVersions', () => {
  describe.each(scenarioBinaryPaths)('$message', ({ message: _, ...params }) => {
    const { forcPath: expectedForcCommand, fuelCorePath: expectedFuelCoreCommand } = {
      ...defaultBinaryPaths,
      ...params,
    };

    test('should get user versions just fine', () => {
      // mocking
      const systemForcVersion = '1.0.0';
      const systemFuelCoreVersion = '2.0.0';
      const { execSync } = mockAllDeps({
        systemForcVersion,
        systemFuelCoreVersion,
      });

      // executing
      const versions = getSystemVersions(params);

      // validating
      expect(execSync).toHaveBeenCalledTimes(2);
      expect(execSync).toBeCalledWith(`${expectedForcCommand} --version`);
      expect(execSync).toBeCalledWith(`${expectedFuelCoreCommand} --version`);
      expect(versions.systemForcVersion).toEqual(systemForcVersion);
      expect(versions.systemFuelCoreVersion).toEqual(systemFuelCoreVersion);
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
      const { error: systemError } = getSystemVersions(params);

      // validating
      expect(execSync).toHaveBeenCalledTimes(2);
      expect(execSync).toBeCalledWith(`${expectedForcCommand} --version`);
      expect(execSync).toBeCalledWith(`${expectedFuelCoreCommand} --version`);
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
      const versions = getSystemVersions(params);

      // validating
      expect(execSync).toHaveBeenCalledTimes(2);
      expect(execSync).toBeCalledWith(`${expectedForcCommand} --version`);
      expect(execSync).toBeCalledWith(`${expectedFuelCoreCommand} --version`);
      expect(versions.error?.toString()).toEqual(`Error: ${systemForcVersion}`);
      expect(versions.systemForcVersion).toEqual(null);
      expect(versions.systemFuelCoreVersion).toEqual(null);
    });
  });
});
