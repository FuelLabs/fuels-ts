import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FUEL_CORE: 'git:feature/assemble-tx',
    FORC: '0.66.7',
    FUELS: '0.99.0',
  };
}
