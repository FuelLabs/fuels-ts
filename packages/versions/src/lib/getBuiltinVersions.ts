import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FORC: 'git:esdrubal/abi_changes',
    FUEL_CORE: '0.32.1',
    FUELS: '0.93.0',
  };
}
