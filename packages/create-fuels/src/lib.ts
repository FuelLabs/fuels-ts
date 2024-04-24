import { execSync } from 'child_process';

export const checkIfFuelUpInstalled = () => {
  try {
    execSync('fuelup --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
};

export const installFuelUp = () => {
  execSync(`curl https://install.fuel.network | sh`, { stdio: 'inherit' });
};
