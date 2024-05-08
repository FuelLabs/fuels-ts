import * as childProcessMod from 'child_process';

import { checkIfFuelUpInstalled } from './createIfFuelUpInstalled';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockAllDeps = (params: { version: string; shouldThrow: boolean }) => {
  const { version, shouldThrow } = params;

  const throwError = vi.fn(() => {
    throw new Error('');
  });

  const execSync = vi
    .spyOn(childProcessMod, 'execSync')
    .mockImplementation(shouldThrow ? throwError : () => version);

  return {
    execSync,
  };
};

/**
 * @group node
 */
describe('createIfFuelUpInstalled', () => {
  it('should check the version of fuelup', () => {
    const { execSync } = mockAllDeps({ version: '1.0.0', shouldThrow: false });

    const result = checkIfFuelUpInstalled();

    expect(result).toEqual(true);
    expect(execSync).toHaveBeenCalledWith('fuelup --version', { stdio: 'pipe' });
  });

  it('should return false if fuelup is not installed', () => {
    const { execSync } = mockAllDeps({ version: '1.0.0', shouldThrow: true });

    const result = checkIfFuelUpInstalled();

    expect(result).toEqual(false);
    expect(execSync).toHaveBeenCalledWith('fuelup --version', { stdio: 'pipe' });
  });
});
