import type { BN, BNInput } from '@fuel-ts/math';

interface Matchers<R = BN> {
  toEqualBn: (expected: BNInput) => R;
}

declare module 'vitest' {
  interface Assertion extends Matchers {}
  interface AsymmetricMatchersContaining extends Matchers {}
  interface ExpectStatic {
    toEqualBn(expected: BNInput): BN;
  }
}
