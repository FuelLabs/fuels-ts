import { getBinaryVersions } from './getBinaryVersions';
import * as getBuiltinVersionsMod from './getBuiltinVersions';
import * as getSystemVersionsMod from './getSystemVersions';
import type { getSystemVersions } from './getSystemVersions';
import type { Versions } from './types';

type SystemVersions = Pick<
  ReturnType<typeof getSystemVersions>,
  'systemForcVersion' | 'systemFuelCoreVersion'
>;

const mockAll = (params: SystemVersions) => {
  const { systemForcVersion, systemFuelCoreVersion } = params;

  const expectedVersions = {
    FUELS: '11.22.33',
    FORC: systemForcVersion,
    FUEL_CORE: systemFuelCoreVersion,
  };

  const buildInVersions = { FUELS: expectedVersions.FUELS } as Versions;
  vi.spyOn(getBuiltinVersionsMod, 'getBuiltinVersions').mockReturnValue(buildInVersions);

  const getSystemVersions = vi.spyOn(getSystemVersionsMod, 'getSystemVersions').mockReturnValue({
    systemForcVersion,
    systemFuelCoreVersion,
    error: null,
    systemForcPath: 'forc',
    systemFuelCorePath: 'fuel-core',
  });

  return {
    expectedVersions,
    getSystemVersions,
  };
};

/**
 * @group node
 */
describe('getBinaryVersions', () => {
  it('should return the versions of the binaries', () => {
    const { expectedVersions, getSystemVersions } = mockAll({
      systemForcVersion: '1.1.1',
      systemFuelCoreVersion: '2.2.2',
    });

    const versions = getBinaryVersions();

    expect(getSystemVersions).toHaveBeenCalledTimes(1);
    expect(versions).toEqual({
      FUELS: expectedVersions.FUELS,
      FORC: '1.1.1',
      FUEL_CORE: '2.2.2',
    });
  });

  it('should return undefined when unable to get system versions', () => {
    const { expectedVersions, getSystemVersions } = mockAll({
      systemForcVersion: null,
      systemFuelCoreVersion: null,
    });

    const versions = getBinaryVersions();

    expect(getSystemVersions).toHaveBeenCalledTimes(1);
    expect(versions).toEqual({
      FUELS: expectedVersions.FUELS,
      FORC: undefined,
      FUEL_CORE: undefined,
    });
  });
});
