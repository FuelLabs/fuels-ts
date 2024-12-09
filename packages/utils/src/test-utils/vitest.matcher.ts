import { bn } from '@fuel-ts/math';
import type { BNInput } from '@fuel-ts/math';

export const setupTestMatchers = () => {
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
