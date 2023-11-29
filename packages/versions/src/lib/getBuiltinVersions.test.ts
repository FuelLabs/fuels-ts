import { readVersionsFromFiles } from '../../scripts/rewriteVersions';

import { getBuiltinVersions } from './getBuiltinVersions';

// TODO: unskip test after Forc release
describe.skip('getBuiltinVersions.js', () => {
  test('should return received version of default', () => {
    const versions = getBuiltinVersions();
    const versionsFromFiles = readVersionsFromFiles();

    expect(versions.FORC).toEqual(versionsFromFiles.FORC);
    expect(versions.FUEL_CORE).toEqual(versionsFromFiles.FUEL_CORE);
    expect(versions.FUELS).toEqual(versionsFromFiles.FUELS);
  });
});
