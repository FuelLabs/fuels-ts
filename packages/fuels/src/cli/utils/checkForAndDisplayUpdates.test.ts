import * as versionsMod from '@fuel-ts/versions';

import * as checkForAndDisplayUpdatesMod from './checkForAndDisplayUpdates';
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

  const mockDeps = (params: { latestVersion: string; userVersion: string }) => {
    const { latestVersion, userVersion } = params;
    vi.spyOn(Promise, 'race').mockReturnValue(Promise.resolve(latestVersion));

    vi.spyOn(versionsMod, 'versions', 'get').mockReturnValue({
      FUELS: userVersion,
      FORC: '1.0.0',
      FUEL_CORE: '1.0.0',
    });

    const log = vi.spyOn(loggerMod, 'log');
    const warn = vi.spyOn(loggerMod, 'warn');

    return { log, warn };
  };

  test('should fail gracefully if the fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Failed to fetch'))
    );
    await expect(checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates()).resolves.not.toThrow();
  });

  test('should log a warning if the version is outdated', async () => {
    const { warn } = mockDeps({ latestVersion: '1.0.1', userVersion: '1.0.0' });
    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();
    expect(warn).toHaveBeenCalledWith(
      '\n⚠️ There is a newer version of fuels available: 1.0.1. Your version is: 1.0.0\n'
    );
  });

  test('should log a success message if the version is up to date', async () => {
    const { log } = mockDeps({ latestVersion: '1.0.0', userVersion: '1.0.0' });
    await checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates();
    expect(log).toHaveBeenCalledWith('\n✅ Your fuels version is up to date: 1.0.0\n');
  });

  test('should handle fetch timing out', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 5000);
        })
    );
    await expect(checkForAndDisplayUpdatesMod.checkForAndDisplayUpdates()).resolves.not.toThrow();
  });
});
