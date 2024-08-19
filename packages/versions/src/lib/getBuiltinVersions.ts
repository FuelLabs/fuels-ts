import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FORC: 'git:master',
    FUEL_CORE: '0.33.0',
    FUELS: '0.93.0',
  };
}
