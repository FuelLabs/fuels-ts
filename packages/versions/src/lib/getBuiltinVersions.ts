import type { Versions } from './types';

const FUEL_CORE = `0.41.9`;
export function getBuiltinVersions(): Versions {
  return {
    FUEL_CORE: 'git:master',
    FORC: '0.67.0',
    FUELS: '0.99.0',
    // @ts-expect-error - overriding until 0.42.0 is released
    // because a lot of tests are failing
    // given that the mismatch warning is appended to errors
    FUEL_CORE,
  };
}
