import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FUEL_CORE: 'git:master',
    FORC: '0.67.0',
    FUELS: '0.99.0',
  };
}
