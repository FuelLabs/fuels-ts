import { bold, green } from 'chalk';
import CliTable from 'cli-table';

import { colorizeUserVersion } from './lib/colorizeUserVersion';
import { compareSystemVersions } from './lib/compareSystemVersions';
import { fuelUpLink } from './lib/fuelUpLink';
import { getBuiltinVersions } from './lib/getBuiltinVersions';
import { getSystemVersions } from './lib/getSystemVersions';

export * from './lib/compareSystemVersions';
export * from './lib/fuelUpLink';
export * from './lib/getSystemVersions';

export function runVersions() {
  const { error, info } = console;

  const supportedVersions = getBuiltinVersions();

  const cliTable = new CliTable({
    head: ['', bold('Supported'), bold(`Yours / System`)],
  });

  const { systemForcVersion, systemFuelCoreVersion } = getSystemVersions();

  const comparisons = compareSystemVersions({
    systemForcVersion,
    systemFuelCoreVersion,
  });

  const userForcColorized = colorizeUserVersion({
    version: systemForcVersion,
    isGt: comparisons.systemForcIsGt,
    isOk: comparisons.systemForcIsEq,
  });

  const userFuelCoreColorized = colorizeUserVersion({
    version: systemFuelCoreVersion,
    isGt: comparisons.systemFuelCoreIsGt,
    isOk: comparisons.systemFuelCoreIsEq,
  });

  cliTable.push(['Forc', supportedVersions.FORC, userForcColorized]);
  cliTable.push(['Fuel-Core', supportedVersions.FUEL_CORE, userFuelCoreColorized]);

  const someIsGt = comparisons.systemForcIsGt || comparisons.systemFuelCoreIsGt;
  const bothAreExact = comparisons.systemForcIsEq && comparisons.systemFuelCoreIsEq;

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
    error(`  ${green(fuelUpLink)}`);
    error(cliTable.toString());
    process.exit(1);
  }
}
