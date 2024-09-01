import { versions } from '@fuel-ts/versions';
import * as fsMod from 'fs';
import * as pathMod from 'path';

import { getPackageVersion } from './getPackageVersion';

vi.mock('fs', async () => {
  const mod = await vi.importActual('fs');
  return {
    __esModule: true,
    ...mod,
  };
});

vi.mock('path', async () => {
  const mod = await vi.importActual('path');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockDeps = ({
  createFuelsVersion,
  binDir,
}: {
  createFuelsVersion?: string;
  binDir: string;
}) => {
  vi.spyOn(pathMod, 'dirname').mockReturnValueOnce(binDir);
  const existsSync = vi.spyOn(fsMod, 'existsSync');
  const readFileSync = vi
    .spyOn(fsMod, 'readFileSync')
    .mockReturnValueOnce(JSON.stringify({ version: createFuelsVersion }));

  return {
    existsSync,
    readFileSync,
  };
};

/**
 * @group node
 */
describe('getPackageVersion', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const prVersion = '0.0.0-pr-2524-20240616051538';

  it('should get the version from an inline create-fuels binary', () => {
    const binDir = 'node_modules/create-fuels';
    const expectedPackageJsonPath = `${binDir}/package.json`;
    const argv = ['node', `${binDir}/create-fuels.js`];
    const { readFileSync, existsSync } = mockDeps({
      binDir,
      createFuelsVersion: prVersion,
    });
    existsSync.mockReturnValueOnce(true);

    const version = getPackageVersion(argv);

    expect(readFileSync).toBeCalledWith(expectedPackageJsonPath, 'utf8');
    expect(version).toBe(prVersion);
  });

  it('should get the version from a .bin relative create-fuels binary', () => {
    const binDir = 'node_modules/.bin';
    const expectedPackageJsonPath = `node_modules/create-fuels/package.json`;
    const argv = ['node', `${binDir}/create-fuels`];
    const { readFileSync, existsSync } = mockDeps({
      binDir,
      createFuelsVersion: prVersion,
    });
    existsSync.mockReturnValueOnce(false);
    existsSync.mockReturnValueOnce(true);

    const version = getPackageVersion(argv);

    expect(readFileSync).toBeCalledWith(expectedPackageJsonPath, 'utf8');
    expect(version).toBe(prVersion);
  });

  it(`should default to '@fuel-ts/versions' when unable to read version`, () => {
    const { existsSync } = mockDeps({
      binDir: '/path/not/found',
    });
    existsSync.mockReturnValue(false);
    const argv = ['node', '/path/not/found/create-fuels.js'];

    const version = getPackageVersion(argv);

    expect(version).toBe(versions.FUELS);
  });
});
