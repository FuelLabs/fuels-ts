import { execSync } from 'child_process';
import ora from 'ora';

import { log, error } from '../utils/logger';

export const installFuelUp = (isVerbose: boolean = false) => {
  const installFuelUpSpinner = ora({
    text: 'Installing fuelup..',
    color: 'green',
  });
  try {
    execSync(`curl https://install.fuel.network | sh`, { stdio: 'inherit' });
    installFuelUpSpinner.succeed('Successfully installed fuelup!');
  } catch (e) {
    if (isVerbose) {
      error(e);
    }
    log(
      installFuelUpSpinner.fail(
        `An error occurred while installing 'fuelup'. Please try again, or try installing it manually. See https://docs.fuel.network/guides/installation/#running-fuelup-init for more information.`
      )
    );
  }
};
