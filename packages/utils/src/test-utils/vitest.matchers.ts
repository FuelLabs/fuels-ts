import { bn } from '@fuel-ts/math';
import type { BN, BNInput } from '@fuel-ts/math';
import type { ExpectStatic as GlobalExpectStatic } from 'vitest';

interface Matchers<R = BN> {
  toEqualBn: (expected: BNInput) => R;
  nullOrAny: (constructor: unknown) => R;
}
declare module 'vitest' {
  interface Assertion extends Matchers {}
  interface AsymmetricMatchersContaining extends Matchers {}
  interface ExpectStatic {
    toEqualBn(expected: BNInput): BN;
    nullOrAny(constructor: unknown): unknown;
  }
}

const toEqualBn = (received: BNInput, expected: BNInput) => {
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
};

const nullOrAny = (received: unknown, expected: unknown) => {
  if (received === null) {
    return {
      pass: true,
      message: () => `expected null or instance of ${expected}, but received ${received}`,
    };
  }

  return expect.any(received);
};

export const setupTestMatchers = (expect: GlobalExpectStatic) => {
  expect.extend({
    toEqualBn,
    nullOrAny,
  });
};
