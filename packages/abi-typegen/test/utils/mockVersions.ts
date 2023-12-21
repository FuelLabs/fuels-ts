import * as versionsMod from '@fuel-ts/versions';

// TODO: Check if there's a better alternative to this
/**
 * This makes it possible to mock modules that are exported
 * from package's index files, using exports syntax such as:
 *
 *  export * from '...'
 *
 * https://stackoverflow.com/a/72885576
 */
vi.mock('@fuel-ts/versions', async () => {
  const mod = await vi.importActual('@fuel-ts/versions');
  return {
    __esModule: true,
    ...mod,
  };
});

export function mockVersions(
  values: {
    FUELS: string;
    FORC: string;
    FUEL_CORE: string;
  } = {
    FUELS: '11.11.11',
    FORC: '22.22.22',
    FUEL_CORE: '33.33.33',
  }
) {
  const mock = vi.spyOn(versionsMod, 'versions', 'get').mockReturnValue(values);

  return {
    versions: values,
    restore() {
      mock.mockRestore();
    },
  };
}
