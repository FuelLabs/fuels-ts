import * as versionsCliMod from '@fuel-ts/versions/cli';

import { tryFindBinaries } from './tryFindBinaries';
import { safeExec } from '@fuel-ts/errors/test-utils';

const mockAllDeps = (
  params: {
    forcError?: Error;
    fuelCoreError?: Error;
  } = {}
) => {
  const { forcError, fuelCoreError } = params;

  const version = '1.0.0';

  const getSystemForc = vi
    .spyOn(versionsCliMod, 'getSystemForc')
    .mockImplementation(() => ({ error: forcError ?? null, systemForcVersion: version }));

  const getSystemFuelCore = vi
    .spyOn(versionsCliMod, 'getSystemFuelCore')
    .mockImplementation(() => ({ error: fuelCoreError ?? null, systemFuelCoreVersion: version }));

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
    expect(getSystemForc).toBeCalledWith('forc');
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toBeCalledWith('fuel-core');
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
    expect(getSystemForc).toBeCalledWith('forc');
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toBeCalledWith('fuel-core');
    expect(binaries.forcPath).toEqual('forc');
    expect(binaries.fuelCorePath).toEqual('fuel-core');
  });

  it(`should throw when binaries are not found`, async() => {
    const forcPath = '/non/existent/path/to/forc';
    const fuelCorePath = '/non/existent/path/to/fuel-core';
    const { getSystemForc, getSystemFuelCore } = mockAllDeps({
      forcError: new Error('forc not found'),
      fuelCoreError: new Error('fuel-core not found'),
    });

    const { error, result } = await safeExec(() => tryFindBinaries({ forcPath, fuelCorePath }));

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(error?.message).toMatch(/Unable to find the following binaries on the filesystem/g);
    expect(error?.message).toMatch(/\/non\/existent\/forc/g);
    expect(error?.message).toMatch(/\/non\/existent\/fuel-core/g);
    expect(error?.message).toMatch(/Visit https:\/\/docs.fuel.network\/guides\/installation\//g);
  });
});
