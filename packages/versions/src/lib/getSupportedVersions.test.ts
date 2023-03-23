import { readVersionsFromFiles } from '../../scripts/injectVersions';

import { getSupportedVersions } from './getSupportedVersions';

describe('getSupportedVersions.js', () => {
  test('should return received version of default', async () => {
    const versions = getSupportedVersions();
    const versionsFromFiles = readVersionsFromFiles();

    expect(versions.FORC).toEqual(versionsFromFiles.FORC);
    expect(versions.FUEL_CORE).toEqual(versionsFromFiles.FUEL_CORE);
    expect(versions.FUELS).toEqual(versionsFromFiles.FUELS);
  });
});
