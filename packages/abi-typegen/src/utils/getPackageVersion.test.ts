import packageJson from '../../package.json';

import { getPackageVersion } from './getPackageVersion';

describe('getPackageVersion.ts', () => {
  test('should get package version just fine', () => {
    const expectedVersion = packageJson.version;
    expect(getPackageVersion().version).toEqual(expectedVersion);
  });
});
