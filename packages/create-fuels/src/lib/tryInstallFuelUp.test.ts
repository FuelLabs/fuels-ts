import * as oraMod from 'ora';

import { mockLogger } from '../../test/utils/mockLogger';
import * as promptFuelUpInstallMod from '../prompts/promptFuelUpInstall';

import * as checkIfFuelUpInstalledMod from './createIfFuelUpInstalled';
import * as installFuelUpMod from './installFuelUp';
import { tryInstallFuelUp } from './tryInstallFuelUp';

vi.mock('ora', async () => {
  const mod = await vi.importActual('ora');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockAllDeps = (params: { isFuelUpInstalled?: boolean; shouldInstallFuelUp?: boolean }) => {
  const { isFuelUpInstalled, shouldInstallFuelUp } = params;

  const oraInstance = {
    start: vi.fn(() => oraInstance),
    succeed: vi.fn(() => {}),
    fail: vi.fn(() => {}),
  } as unknown as oraMod.Ora;
  const ora = vi.spyOn(oraMod, 'default').mockReturnValue(oraInstance);

  const checkIfFuelUpInstalled = vi
    .spyOn(checkIfFuelUpInstalledMod, 'checkIfFuelUpInstalled')
    .mockReturnValue(isFuelUpInstalled ?? false);

  const promptFuelUpInstall = vi
    .spyOn(promptFuelUpInstallMod, 'promptFuelUpInstall')
    .mockResolvedValue(shouldInstallFuelUp ?? false);

  const installFuelUp = vi
    .spyOn(installFuelUpMod, 'installFuelUp')
    .mockImplementation(() => undefined);

  return {
    ora,
    oraInstance,
    checkIfFuelUpInstalled,
    promptFuelUpInstall,
    installFuelUp,
  };
};

/**
 * @group node
 */
describe('tryInstallFuelup', () => {
  it('should display a message of installation to the user', async () => {
    // Arrange
    const { ora, oraInstance } = mockAllDeps({
      isFuelUpInstalled: false,
      shouldInstallFuelUp: false,
    });

    // Act
    await tryInstallFuelUp();

    // Assert
    expect(ora).toBeCalledWith({
      text: 'Checking if fuelup is installed..',
      color: 'green',
    });
    expect(oraInstance.start).toBeCalled();
  });

  it('should display success message if fuelup installed', async () => {
    // Arrange
    const { oraInstance, checkIfFuelUpInstalled } = mockAllDeps({
      isFuelUpInstalled: true,
    });

    // Act
    await tryInstallFuelUp();

    // Assert
    expect(checkIfFuelUpInstalled).toBeCalledTimes(1);
    expect(oraInstance.succeed).toBeCalledWith('fuelup is already installed.');
  });

  it('should prompt install if fuelup not installed', async () => {
    // Arrange
    const { oraInstance, checkIfFuelUpInstalled, promptFuelUpInstall } = mockAllDeps({
      isFuelUpInstalled: false,
    });

    // Act
    await tryInstallFuelUp();

    // Assert
    expect(checkIfFuelUpInstalled).toBeCalledTimes(1);
    expect(oraInstance.fail).toBeCalledWith('fuelup not found.');
    expect(promptFuelUpInstall).toBeCalledTimes(1);
  });

  it('should warn the user to install manually', async () => {
    // Arrange
    const { warn } = mockLogger();
    const { oraInstance, promptFuelUpInstall, installFuelUp } = mockAllDeps({
      isFuelUpInstalled: false,
      shouldInstallFuelUp: false,
    });

    // Act
    await tryInstallFuelUp();

    // Assert
    expect(oraInstance.fail).toBeCalledWith('fuelup not found.');
    expect(promptFuelUpInstall).toBeCalledTimes(1);
    expect(warn.mock.calls[0][0]).toMatch(/You will need to install fuelup manually./g);
    expect(installFuelUp).not.toBeCalled();
  });

  it('should install fuelup if user wants to install', async () => {
    // Arrange
    const isVerbose = true;
    const { promptFuelUpInstall, installFuelUp } = mockAllDeps({
      isFuelUpInstalled: false,
      shouldInstallFuelUp: true,
    });

    // Act
    await tryInstallFuelUp(isVerbose);

    // Assert
    expect(promptFuelUpInstall).toBeCalledTimes(1);
    expect(installFuelUp).toBeCalledWith(isVerbose);
  });
});
