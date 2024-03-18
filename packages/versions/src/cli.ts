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

export const eitherOr = (val1: string | null, val2: string) => val1 ?? val2;

export function runVersions() {
  const { error, info } = console;

  const supportedVersions = getBuiltinVersions();

  const cliTable = new CliTable({
    head: ['', bold('Supported'), bold(`Yours / System`)],
  });

  const { error: systemError, systemForcVersion, systemFuelCoreVersion } = getSystemVersions();

  const comparisons = compareSystemVersions({
    systemForcVersion: eitherOr(systemForcVersion, '0'),
    systemFuelCoreVersion: eitherOr(systemFuelCoreVersion, '0'),
  });

  const userForcColorized = colorizeUserVersion({
    version: eitherOr(systemForcVersion, '—'),
    isGt: comparisons.systemForcIsGt,
    isOk: comparisons.systemForcIsEq,
  });

  const userFuelCoreColorized = colorizeUserVersion({
    version: eitherOr(systemFuelCoreVersion, '—'),
    isGt: comparisons.systemFuelCoreIsGt,
    isOk: comparisons.systemFuelCoreIsEq,
  });

  cliTable.push(['Forc', supportedVersions.FORC, userForcColorized]);
  cliTable.push(['Fuel-Core', supportedVersions.FUEL_CORE, userFuelCoreColorized]);

  const someIsGt = comparisons.systemForcIsGt || comparisons.systemFuelCoreIsGt;
  const bothAreExact = comparisons.systemForcIsEq && comparisons.systemFuelCoreIsEq;

  let exitCode: number;

  if (someIsGt) {
    info(cliTable.toString());
    info(`\nYour system's components are newer than the ones supported!`);

    exitCode = 0;
  } else if (bothAreExact) {
    info(`\nYou have all the right versions! ⚡`);
    info(cliTable.toString());

    exitCode = 0;
  } else {
    error(cliTable.toString());
    error(`\n - You're using outdated versions`);

    exitCode = 1;
  }

  if (systemError) {
    error(' - Make sure you have Forc and Fuel-Core installed');
    error('   >> Error: ', systemError.message);
  }

  if (systemError || exitCode === 1) {
    error(`  ${green(fuelUpLink)}`);
  }

  process.exit(exitCode);
}
