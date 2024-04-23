import { execa } from 'execa';

export const checkIfFuelUpInstalled = async () => {
  try {
    const { exitCode } = await execa('fuelup', ['--version']);
    return exitCode === 0;
  } catch (error) {
    return false;
  }
};

export const installFuelUp = async () => {
  await execa(`curl https://install.fuel.network | sh`, { shell: true, stdio: 'inherit' });
};
