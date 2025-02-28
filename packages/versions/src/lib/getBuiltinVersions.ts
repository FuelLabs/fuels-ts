import type { Versions } from './types';

const FUEL_CORE = '0.41.7';

export function getBuiltinVersions(): Versions {
  return {
    FUEL_CORE: 'git:master',
    FORC: '0.66.7',
    FUELS: '0.99.0',
    // @ts-expect-error asdf
    FUEL_CORE,
  };
}
