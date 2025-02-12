import type { Versions } from './types';

export function getBuiltinVersions(): Versions {
  return {
    FORC: '0.66.7',
    FUEL_CORE: 'git:1897-rpc-consistency-proposal',
    FUELS: '0.99.0',
  };
}
