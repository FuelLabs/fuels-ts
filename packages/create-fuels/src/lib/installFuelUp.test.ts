import * as childProcessMod from 'child_process';
import * as oraMod from 'ora';

import { installFuelUp } from './installFuelUp';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

vi.mock('ora', async () => {
  const mod = await vi.importActual('ora');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockAllDeps = (params: { shouldThrow: boolean }) => {
  const { shouldThrow } = params;

  const oraInstance = {
    succeed: vi.fn(() => {}),
    fail: vi.fn(() => {}),
  } as unknown as oraMod.Ora;
  const ora = vi.spyOn(oraMod, 'default').mockReturnValue(oraInstance);

  const throwError = vi.fn(() => {
    throw new Error('');
  });

  const execSync = vi
    .spyOn(childProcessMod, 'execSync')
    .mockImplementation(shouldThrow ? throwError : () => '');

  return {
    execSync,
    ora,
    oraInstance,
  };
};

/**
 * @group node
 */
describe('installFuelUp', () => {
  it('should install fuelup successfully', () => {
    // Arrange
    const { execSync, ora, oraInstance } = mockAllDeps({ shouldThrow: false });

    // Act
    installFuelUp();

    // Assert
    expect(ora).toHaveBeenCalledWith({
      text: 'Installing fuelup..',
      color: 'green',
    });
    expect(execSync).toHaveBeenCalledWith('curl https://install.fuel.network | sh', {
      stdio: 'inherit',
    });
    expect(oraInstance.succeed).toBeCalledWith('Successfully installed fuelup!');
  });

  it('should gracefully fail when able to install fuelup', () => {
    // Arrange
    const { execSync, oraInstance } = mockAllDeps({ shouldThrow: true });

    // Act
    installFuelUp();

    // Assert
    expect(execSync).toBeCalledTimes(1);
    expect(oraInstance.succeed).not.toBeCalled();
    expect(oraInstance.fail).toBeCalledTimes(1);
  });
});
