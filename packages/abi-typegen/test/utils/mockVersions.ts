import * as versionsMod from '@fuel-ts/versions';

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
