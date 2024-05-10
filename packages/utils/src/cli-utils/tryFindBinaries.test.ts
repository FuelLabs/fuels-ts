import { safeExec } from '@fuel-ts/errors/test-utils';
import * as versionsCliMod from '@fuel-ts/versions/cli';
import * as childProcessMod from 'child_process';

import { tryFindBinaries } from './tryFindBinaries';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

const mockAllDeps = (
  params: {
    forcError?: boolean;
    fuelCoreError?: boolean;
  } = {}
) => {
  const { forcError, fuelCoreError } = params;

  const version = '1.0.0';

  const execSyncError = vi.fn(() => {
    throw new Error();
  });
  const execSyncVersion = vi.fn().mockReturnValue(version);

  const getSystemForc = vi.spyOn(versionsCliMod, 'getSystemForc');
  vi.spyOn(childProcessMod, 'execSync').mockImplementationOnce(
    forcError ? execSyncError : execSyncVersion
  );

  const getSystemFuelCore = vi.spyOn(versionsCliMod, 'getSystemFuelCore');
  vi.spyOn(childProcessMod, 'execSync').mockImplementationOnce(
    fuelCoreError ? execSyncError : execSyncVersion
  );

  return {
    getSystemForc,
    getSystemFuelCore,
  };
};

/**
 * @group node
 */
describe('tryFindBinaries', () => {
  it(`should use default binaries when not paths supplied`, () => {
    const { getSystemForc, getSystemFuelCore } = mockAllDeps();

    const binaries = tryFindBinaries();

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemForc).toBeCalledWith(undefined);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toBeCalledWith(undefined);
    expect(binaries.forcPath).toEqual('forc');
    expect(binaries.fuelCorePath).toEqual('fuel-core');
  });

  it(`should use custom binaries when paths supplied`, () => {
    const { getSystemForc, getSystemFuelCore } = mockAllDeps();

    const forcPath = '/some/path/to/forc';
    const fuelCorePath = '/some/path/to/fuel-core';

    const binaries = tryFindBinaries({ forcPath, fuelCorePath });

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemForc).toBeCalledWith(forcPath);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toBeCalledWith(fuelCorePath);
    expect(binaries.forcPath).toEqual(forcPath);
    expect(binaries.fuelCorePath).toEqual(fuelCorePath);
  });

  it('should handle undefined paths', () => {
    const { getSystemForc, getSystemFuelCore } = mockAllDeps();

    const binaries = tryFindBinaries({ forcPath: undefined, fuelCorePath: undefined });

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemForc).toBeCalledWith(undefined);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toBeCalledWith(undefined);
    expect(binaries.forcPath).toEqual('forc');
    expect(binaries.fuelCorePath).toEqual('fuel-core');
  });

  it(`should throw when binaries are not found`, async () => {
    const forcPath = '/non/existent/path/to/forc';
    const fuelCorePath = '/non/existent/path/to/fuel-core';
    const { getSystemForc, getSystemFuelCore } = mockAllDeps({
      forcError: true,
      fuelCoreError: true,
    });

    const { error } = await safeExec(() => tryFindBinaries({ forcPath, fuelCorePath }));

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(error?.message).toContain(`Unable to find the following binaries on the filesystem`);
    expect(error?.message).toContain(`'forc' at path '${forcPath}'`);
    expect(error?.message).toContain(`'fuel-core' at path '${fuelCorePath}'`);
    expect(error?.message).toContain(
      'Visit https://docs.fuel.network/guides/installation/ for an installation guide.'
    );
  });
});
