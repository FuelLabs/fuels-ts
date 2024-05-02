import * as versionsCliMod from '@fuel-ts/versions/cli';

import { tryFindBinaries } from './tryFindBinaries';

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

  it(`should throw when binaries are not found`, () => {
    const forcPath = '/non/existent/path/to/forc';
    const fuelCorePath = '/non/existent/path/to/fuel-core';
    const { getSystemForc, getSystemFuelCore } = mockAllDeps({
      forcError: new Error('forc not found'),
      fuelCoreError: new Error('fuel-core not found'),
    });

    const expectedErrors = [
      `Binary for 'forc' not found at path '${forcPath}'`,
      `Binary for 'fuel-core' not found at path '${fuelCorePath}'`,
    ];
    expect(() => tryFindBinaries({ forcPath, fuelCorePath })).toThrowError(
      expectedErrors.join('\n')
    );
    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
  });
});
