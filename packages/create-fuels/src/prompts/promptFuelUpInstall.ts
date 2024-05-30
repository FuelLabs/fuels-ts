import prompts from 'prompts';

export const promptFuelUpInstall = async () => {
  const shouldInstallFuelUp = await prompts(
    {
      type: 'confirm',
      name: 'shouldInstallFuelUp',
      message: `It seems you don't have 'fuelup' installed. 'fuelup' is required to manage the Fuel toolchain and is a prerequisite for using this template app. Do you want to install it now?`,
      initial: true,
    },
    {
      onCancel: () => process.exit(0),
    }
  );
  return shouldInstallFuelUp.shouldInstallFuelUp as boolean;
};
