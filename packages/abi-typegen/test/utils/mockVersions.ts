import * as versionsMod from '@fuel-ts/versions';

export const DEFAULT_MOCK_VERSIONS: versionsMod.Versions = {
  FUELS: '11.11.11',
  FORC: '22.22.22',
  FUEL_CORE: '33.33.33',
};

export function mockVersions(values: versionsMod.BinaryVersions = DEFAULT_MOCK_VERSIONS) {
  const mock = vi.spyOn(versionsMod, 'versions', 'get').mockReturnValue({
    FUELS: values.FUELS,
    FORC: values.FORC ?? '0.0.0',
    FUEL_CORE: values.FUEL_CORE ?? '0.0.0',
  });

  return {
    versions: values,
    restore() {
      mock.mockRestore();
    },
  };
}
