import { execSync } from 'child_process';
import { log } from 'console';
import ora from 'ora';

export const checkIfFuelUpInstalled = () => {
  try {
    execSync('fuelup --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
};

export const installFuelUp = (isVerbose: boolean = false) => {
  const installFuelUpSpinner = ora({
    text: 'Installing fuelup..',
    color: 'green',
  });
  try {
    execSync(`curl https://install.fuel.network | sh`, { stdio: 'inherit' });
    installFuelUpSpinner.succeed('Successfully installed fuelup!');
  } catch (error) {
    if (isVerbose) {
      log(error);
    }
    log(
      installFuelUpSpinner.fail(
        'An error occurred while installing `fuelup`. Please try again, or try installing it manually. See https://docs.fuel.network/guides/installation/#running-fuelup-init for more information.'
      )
    );
  }
};
