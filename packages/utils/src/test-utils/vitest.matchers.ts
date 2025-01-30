import { bn } from '@fuel-ts/math';
import type { BN, BNInput } from '@fuel-ts/math';
import type { ExpectStatic as GlobalExpectStatic } from 'vitest';

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

export const setupTestMatchers = (expect: GlobalExpectStatic) => {
  expect.extend({
    toEqualBn(received: BNInput, expected: BNInput) {
      const actualBn = bn(received);
      const expectedBn = bn(expected);
      const pass = actualBn.eq(expectedBn);

      if (pass) {
        return {
          pass,
          message: () => `Expected ${actualBn} not to equal ${expectedBn}`,
          actual: actualBn,
        };
      }

      return {
        pass,
        message: () => `Expected ${actualBn} to equal ${expectedBn}`,
        actual: expectedBn,
      };
    },
  });
};
