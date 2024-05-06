import ora from 'ora';

import { promptFuelUpInstall } from '../prompts';
import { warn } from '../utils/logger';

import { checkIfFuelUpInstalled } from './createIfFuelUpInstalled';
import { installFuelUp } from './installFuelUp';

export const tryInstallFuelUp = async (isVerbose: boolean = false) => {
  const fuelUpSpinner = ora({
    text: 'Checking if fuelup is installed..',
    color: 'green',
  }).start();

  if (checkIfFuelUpInstalled()) {
    fuelUpSpinner.succeed('fuelup is already installed.');
    return;
  }

  fuelUpSpinner.fail('fuelup not found.');

  const shouldInstall = await promptFuelUpInstall();
  if (!shouldInstall) {
    warn(
      'Warning: You will need to install fuelup manually. See https://docs.fuel.network/guides/installation/#running-fuelup-init'
    );
    return;
  }

  installFuelUp(isVerbose);
};
