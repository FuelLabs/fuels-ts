import { getBinaryVersions } from './getBinaryVersions';
import * as getSystemVersionsMod from './getSystemVersions';
import type { getSystemVersions } from './getSystemVersions';

type SystemVersions = Pick<
  ReturnType<typeof getSystemVersions>,
  'systemForcVersion' | 'systemFuelCoreVersion'
>;

const mockAll = (params: SystemVersions) => {
  const getSystemVersions = vi.spyOn(getSystemVersionsMod, 'getSystemVersions').mockReturnValue({
    ...params,
    error: null,
    systemForcPath: 'forc',
    systemFuelCorePath: 'fuel-core',
  });

  return {
    getSystemVersions,
  };
};

/**
 * @group node
 */
describe('getBinaryVersions', () => {
  it('should return the versions of the binaries', () => {
    const { getSystemVersions } = mockAll({
      systemForcVersion: '1.1.1',
      systemFuelCoreVersion: '2.2.2',
    });

    const versions = getBinaryVersions();

    expect(getSystemVersions).toHaveBeenCalledTimes(1);
    expect(versions).toEqual({
      FORC: '1.1.1',
      FUEL_CORE: '2.2.2',
    });
  });

  it('should return undefined when unable to get system versions', () => {
    const { getSystemVersions } = mockAll({
      systemForcVersion: null,
      systemFuelCoreVersion: null,
    });

    const versions = getBinaryVersions();

    expect(getSystemVersions).toHaveBeenCalledTimes(1);
    expect(versions).toEqual({
      FORC: undefined,
      FUEL_CORE: undefined,
    });
  });
});
