import * as versionStoreMod from '../../src/utils/VersionStore';

vi.mock('../../src/utils/VersionStore');

export function mockVersions(
  values: {
    FUELS: string;
    FORC?: string;
    FUEL_CORE?: string;
  } = {
    FUELS: '11.11.11',
    FORC: '22.22.22',
    FUEL_CORE: '33.33.33',
  }
) {
  const mock = vi.mocked(versionStoreMod.VersionStore.get).mockReturnValue(values);

  return {
    versions: values,
    restore() {
      mock.mockRestore();
    },
  };
}
