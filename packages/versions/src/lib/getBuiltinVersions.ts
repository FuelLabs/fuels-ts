import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FORC: '0.64.0',
    FUEL_CORE: 'git:feature/predicate-ldc',
    FUELS: '0.94.8',
  };
}
