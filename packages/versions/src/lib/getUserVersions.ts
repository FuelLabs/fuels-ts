import { execSync } from '../proxies/execSync';

export function getUserVersions(params: { fuelUpLink: string }) {
  const { error } = console;

  let userForcVersion: string | undefined;
  let userFuelCoreVersion: string | undefined;

  try {
    const reg = /[^0-9.]+/g;
    userForcVersion = execSync('forc --version').toString().replace(reg, '');
    userFuelCoreVersion = execSync('fuel-core --version').toString().replace(reg, '');
  } catch (err) {
    error('Make sure you have Forc and Fuel-Core installed.');
    error(`  ${params.fuelUpLink}`);
    throw err;
  }

  return {
    userForcVersion,
    userFuelCoreVersion,
  };
}
