import { versions } from '@fuel-ts/versions';
import * as fsMod from 'fs';

import { getPackageVersion } from './getPackageVersion';

vi.mock('fs', async () => {
  const mod = await vi.importActual('fs');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockDeps = ({ createFuelsVersion }: { createFuelsVersion: string }) => {
  vi.spyOn(fsMod, 'readFileSync').mockReturnValueOnce(
    JSON.stringify({ version: createFuelsVersion })
  );
};

/**
 * @group node
 */
describe('getPackageVersion', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should get the version from create-fuels', () => {
    mockDeps({ createFuelsVersion: '0.0.0-pr-2524-20240616051538' });
    const argv = ['node', '/path/that/does/exist/create-fuels.js'];

    const version = getPackageVersion(argv);

    expect(version).toBe('0.0.0-pr-2524-20240616051538');
  });

  it(`should default to '@fuel-ts/versions' when unable to read version`, () => {
    const argv = ['node', '/path/not/found/create-fuels.js'];

    const version = getPackageVersion(argv);

    expect(version).toBe(versions.FUELS);
  });
});
