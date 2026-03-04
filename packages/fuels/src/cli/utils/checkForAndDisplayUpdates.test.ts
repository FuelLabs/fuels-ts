import * as versionsMod from '@fuel-ts/versions';

import * as checkForAndDisplayUpdatesMod from './checkForAndDisplayUpdates';
import * as getLatestFuelsVersionMod from './getLatestFuelsVersion';
import * as loggerMod from './logger';

/**
 * @group node
 */
describe('checkForAndDisplayUpdates', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockDeps = (params: { latestVersion?: string; userVersion: string }) => {
    const { latestVersion, userVersion } = params;
    vi.spyOn(getLatestFuelsVersionMod, 'getLatestFuelsVersion').mockResolvedValue(latestVersion);

    vi.spyOn(versionsMod, 'versions', 'get').mockReturnValue({
      FUELS: userVersion,
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
    });

    const log = vi.spyOn(loggerMod, 'log').mockImplementation(() => {});
    const warn = vi.spyOn(loggerMod, 'warn').mockImplementation(() => {});

    return { log, warn };
  };

  test('unable to fetch latest fuels version', async () => {
    const { log } = mockDeps({ latestVersion: undefined, userVersion: '0.1.0' });

    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();

    expect(log).toHaveBeenCalledWith(`\n Unable to fetch latest fuels version. Skipping...\n`);
  });

  test('user fuels version outdated', async () => {
    const latestVersion = '1.0.1';
    const userVersion = '1.0.0';
    const { warn } = mockDeps({ latestVersion, userVersion });

    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();

    expect(warn).toHaveBeenCalledWith(
      `\n⚠️ There is a newer version of fuels available: ${latestVersion}. Your version is: ${userVersion}\n`
    );
  });

  test('user fuels version up to date', async () => {
    const latestVersion = '1.0.0';
    const userVersion = '1.0.0';
    const { log } = mockDeps({ latestVersion, userVersion });

    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();

    expect(log).toHaveBeenCalledWith(`\n✅ Your fuels version is up to date: ${userVersion}\n`);
  });

  test('getLatestFuelsVersion throws', async () => {
    vi.spyOn(getLatestFuelsVersionMod, 'getLatestFuelsVersion').mockRejectedValue(
      new Error('Failed to fetch')
    );

    const log = vi.spyOn(loggerMod, 'log').mockImplementation(() => {});

    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();

    expect(log).toHaveBeenCalledWith(`\n Unable to fetch latest fuels version. Skipping...\n`);
  });
});
