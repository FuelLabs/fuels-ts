import { versions, gt, eq } from '@fuel-ts/versions';

import { getLatestFuelsVersion } from './getLatestFuelsVersion';
import { warn, log } from './logger';

export const checkForAndDisplayUpdates = async () => {
  try {
    const { FUELS: userFuelsVersion } = versions;

    const latestFuelsVersion = await getLatestFuelsVersion();

    if (!latestFuelsVersion) {
      log(`\n Unable to fetch latest fuels version. Skipping...\n`);
      return;
    }

    const isFuelsVersionOutdated = gt(latestFuelsVersion, userFuelsVersion);
    const isFuelsVersionUpToDate = eq(latestFuelsVersion, userFuelsVersion);

    if (isFuelsVersionOutdated) {
      warn(
        `\n⚠️ There is a newer version of fuels available: ${latestFuelsVersion}. Your version is: ${userFuelsVersion}\n`
      );
      return;
    }

    if (isFuelsVersionUpToDate) {
      log(`\n✅ Your fuels version is up to date: ${userFuelsVersion}\n`);
    }
  } catch {
    log(`\n Unable to fetch latest fuels version. Skipping...\n`);
  }
};
