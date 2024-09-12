import chalk from 'chalk';
import CliTable from 'cli-table';

import { colorizeUserVersion } from './lib/colorizeUserVersion';
import { compareSystemVersions } from './lib/compareSystemVersions';
import { fuelUpLink } from './lib/fuelUpLink';
import { getBuiltinVersions } from './lib/getBuiltinVersions';
import { getLatestFuelsVersion } from './lib/getLatestFuelsVersion';
import { getSystemVersions } from './lib/getSystemVersions';
import { gt } from './lib/semver';

export * from './lib/compareSystemVersions';
export * from './lib/fuelUpLink';
export * from './lib/getBinaryVersions';
export * from './lib/getSystemVersions';
export * from './lib/getBuiltinVersions';

export const eitherOr = (val1: string | null, val2: string) => val1 ?? val2;

export async function runVersions(params: { forcPath?: string; fuelCorePath?: string } = {}) {
  const { error, info } = console;

  const { FUELS: userFuelsVersion } = getBuiltinVersions();
  const latestFuelsVersion = await getLatestFuelsVersion();
  const isFuelsVersionOutdated = gt(latestFuelsVersion, userFuelsVersion);

  if (isFuelsVersionOutdated) {
    info(
      `\nThere is a newer version of fuels available: ${latestFuelsVersion}. Your version is: ${userFuelsVersion}`
    );
  } else {
    info(`\nYour fuels version is up to date: ${userFuelsVersion}`);
  }

  const supportedVersions = getBuiltinVersions();

  const cliTable = new CliTable({
    head: ['', chalk.bold('Supported'), chalk.bold(`Yours / System`), chalk.bold('System Path')],
  });

  const {
    error: systemError,
    systemForcVersion,
    systemFuelCoreVersion,
    systemForcPath,
    systemFuelCorePath,
  } = getSystemVersions(params);

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

  cliTable.push(['Forc', supportedVersions.FORC, userForcColorized, systemForcPath]);
  cliTable.push([
    'Fuel-Core',
    supportedVersions.FUEL_CORE,
    userFuelCoreColorized,
    systemFuelCorePath,
  ]);

  const someIsGt = comparisons.systemForcIsGt || comparisons.systemFuelCoreIsGt;
  const bothAreExact = comparisons.systemForcIsEq && comparisons.systemFuelCoreIsEq;

  let exitCode: number;

  if (someIsGt) {
    exitCode = 0;
    info(cliTable.toString());
    info(`\nYour system's components are newer than the ones supported!`);
  } else if (bothAreExact) {
    exitCode = 0;
    info(cliTable.toString());
    info(`\nYou have all the right versions! ⚡`);
  } else if (systemError) {
    exitCode = 1;
    error(cliTable.toString());
    error('\n - Make sure you have Forc and Fuel-Core installed');
    error('   >> Error: ', systemError.message);
  } else {
    exitCode = 1;
    error(cliTable.toString());
    error(`\n - You're using outdated versions`);
  }

  if (exitCode === 1) {
    error(`  ${chalk.green(fuelUpLink)}`);
  }

  process.exit(exitCode);
}
