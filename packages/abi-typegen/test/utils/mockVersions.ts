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
jest.mock('@fuel-ts/versions', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/versions'),
}));

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
  const mock = jest.replaceProperty(versionsMod, 'versions', values);

  return {
    versions: values,
    restore() {
      mock.restore();
    },
  };
}
