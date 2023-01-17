import { bold, green } from 'chalk';
import CliTable from 'cli-table';

import { colorizeUserVersion } from './lib/colorizeUserVersion';
import { compareUserVersions } from './lib/compareUserVersions';
import { getSupportedVersions } from './lib/getSupportedVersions';
import { getUserVersions } from './lib/getUserVersions';

export function run() {
  const { error, info } = console;

  const supportedVersions = getSupportedVersions();

  const cliTable = new CliTable({
    head: ['', bold('Supported'), bold(`Yours / System`)],
  });

  const fuelUpLink = green('https://github.com/fuellabs/fuelup');

  const { userForcVersion, userFuelCoreVersion } = getUserVersions({ fuelUpLink });

  const comparisons = compareUserVersions({
    userForcVersion,
    userFuelCoreVersion,
  });

  const userForcColorized = colorizeUserVersion({
    version: userForcVersion,
    isGt: comparisons.userForcIsGt,
    isOk: comparisons.userForcIsEq,
  });

  const userFuelCoreColorized = colorizeUserVersion({
    version: userFuelCoreVersion,
    isGt: comparisons.userFuelCoreIsGt,
    isOk: comparisons.userFuelCoreIsEq,
  });

  cliTable.push(['Forc', supportedVersions.FORC, userForcColorized]);
  cliTable.push(['Fuel-Core', supportedVersions.FUEL_CORE, userFuelCoreColorized]);

  const someIsGt = comparisons.userForcIsGt || comparisons.userFuelCoreIsGt;
  const bothAreExact = comparisons.userForcIsEq && comparisons.userFuelCoreIsEq;

  if (someIsGt) {
    info(`Your system's components are newer than the ones supported!`);
    info(cliTable.toString());
    process.exit(0);
  } else if (bothAreExact) {
    info(`You have all the right versions! ⚡`);
    info(cliTable.toString());
    process.exit(0);
  } else {
    error(`You're using outdated versions — update them with:`);
    error(`  ${fuelUpLink}`);
    error(cliTable.toString());
    process.exit(1);
  }
}
