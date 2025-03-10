import * as fsMod from 'fs';

import {
  readVersions,
  readVersionsFromEnv,
  readVersionsFromFiles,
  rewriteVersions,
} from './rewriteVersions';

vi.mock('fs', async () => {
  const mod = await vi.importActual('fs');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('rewriteVersions.js', () => {
  function modifyEnv() {
    const envBackup = { ...process.env };

    const BUILD_VERSION = '9.9.9';
    const FORC_VERSION = '8.8.8';
    const FUEL_CORE_VERSION = '7.7.7';

    process.env.BUILD_VERSION = BUILD_VERSION;
    process.env.FORC_VERSION = FORC_VERSION;
    process.env.FUEL_CORE_VERSION = FUEL_CORE_VERSION;

    return {
      BUILD_VERSION,
      FORC_VERSION,
      FUEL_CORE_VERSION,
      restoreEnv() {
        process.env = envBackup;
      },
    };
  }

  test('should read versions from files', () => {
    const versionsFromFiles = readVersionsFromFiles();

    expect(versionsFromFiles.FORC).toBeTruthy();
    expect(versionsFromFiles.FUEL_CORE).toBeTruthy();
    expect(versionsFromFiles.FUELS).toBeTruthy();
  });

  test('should read versions from env', () => {
    // mocking
    const { BUILD_VERSION, FORC_VERSION, FUEL_CORE_VERSION, restoreEnv } = modifyEnv();

    // executing
    const versions = readVersionsFromEnv();

    // restoring
    restoreEnv();

    // validating
    expect(versions.FORC).toEqual(FORC_VERSION);
    expect(versions.FUEL_CORE).toEqual(FUEL_CORE_VERSION);
    expect(versions.FUELS).toEqual(BUILD_VERSION);
  });

  test('should prioritize versions from env', () => {
    // mocking
    const { BUILD_VERSION, FORC_VERSION, FUEL_CORE_VERSION, restoreEnv } = modifyEnv();

    // executing
    const versions = readVersions();

    // restoring
    restoreEnv();

    // validating
    expect(versions.FORC).toEqual(FORC_VERSION);
    expect(versions.FUEL_CORE).toEqual(FUEL_CORE_VERSION);
    expect(versions.FUELS).toEqual(BUILD_VERSION);
  });

  test('should fallback to versions from files', () => {
    // executing
    const versions = readVersions();
    const versionsFromFiles = readVersionsFromFiles();

    // validating
    expect(versions.FORC).toEqual(versionsFromFiles.FORC);
    expect(versions.FUEL_CORE).toEqual(versionsFromFiles.FUEL_CORE);
    expect(versions.FUELS).toEqual(versionsFromFiles.FUELS);
  });

  test('should rewrite files', () => {
    // mocking
    const writeFileSync = vi.spyOn(fsMod, 'writeFileSync').mockImplementation(() => []);

    // executing
    rewriteVersions();

    // validating
    const versions = readVersions();
    const { lastCall } = writeFileSync.mock;

    expect(writeFileSync).toHaveBeenCalledTimes(1);

    expect(lastCall?.[0]).toMatch(/packages\/versions\/src\/lib\/getBuiltinVersions\.ts/);
    expect(lastCall?.[1]).toMatch(new RegExp(`FORC: '${versions.FORC}'`));
    expect(lastCall?.[1]).toMatch(new RegExp(`FUEL_CORE: '${versions.FUEL_CORE}'`));
    expect(lastCall?.[1]).toMatch(new RegExp(`FUELS: '${versions.FUELS}'`));
  });
});
