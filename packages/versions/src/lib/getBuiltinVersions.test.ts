import { readVersionsFromFiles } from '../../scripts/rewriteVersions';

import { getBuiltinVersions } from './getBuiltinVersions';

/**
 * @group node
 */
describe('getBuiltinVersions.js', () => {
  test('should return received version of default', () => {
    const versions = getBuiltinVersions();
    const versionsFromFiles = readVersionsFromFiles();

    const workingWithGitBranch = Object.values(versionsFromFiles).some((v) => v.startsWith('git:'));
    if (workingWithGitBranch) {
      return;
    }

    expect(versions.FORC).toEqual(versionsFromFiles.FORC);
    expect(versions.FUEL_CORE).toEqual(versionsFromFiles.FUEL_CORE);
    expect(versions.FUELS).toEqual(versionsFromFiles.FUELS);
  });
});
