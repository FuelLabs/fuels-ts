import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FUEL_CORE: 'git:master',
    FORC: '0.66.7',
    FUELS: '0.99.0',
  };
}
