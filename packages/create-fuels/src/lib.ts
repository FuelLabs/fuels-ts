import chalk from 'chalk';
import { execSync } from 'child_process';
import { log } from 'console';

export const checkIfFuelUpInstalled = () => {
  try {
    execSync('fuelup --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
};

export const installFuelUp = (isVerbose: boolean = false) => {
  try {
    execSync(`curl https://install.fuel.network | sh`, { stdio: 'inherit' });
  } catch (error) {
    if (isVerbose) {
      log(error);
    }
    log(
      chalk.red(
        'An error occurred while installing `fuelup`. Please try again, or try installing it manually. See https://docs.fuel.network/guides/installation/#running-fuelup-init for more information.'
      )
    );
  }
};
