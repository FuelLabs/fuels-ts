import { bn } from 'fuels';
import type { BNInput } from 'fuels';

type MatcherResult = {
  message: () => string;
  pass: boolean;
};

type BNAsymmetricMatcher = {
  asymmetricMatch(actual: BNInput): boolean;
  toString(): string;
};

declare module 'vitest' {
  interface Expect {
    toEqualBn(expected: BNInput): void;
  }
  interface ExpectStatic {
    toEqualBn(expected: BNInput): BNAsymmetricMatcher;
  }
  interface AsymmetricMatchersContaining {
    toEqualBn(expected: BNInput): BNAsymmetricMatcher;
  }
}

const createMatcher = (expected: BNInput): BNAsymmetricMatcher => ({
  asymmetricMatch: (actual: BNInput) => bn(actual).eq(bn(expected)),
  toString: () => `BNMatcher(${expected})`,
});

export const setupTestMatchers = () => {
  expect.extend({
    toEqualBn(received: BNInput, expected: BNInput): MatcherResult {
      const actualBn = bn(received);
      const expectedBn = bn(expected);
      const pass = actualBn.eq(expectedBn);

      return {
        pass,
        message: () =>
          pass
            ? `Expected ${actualBn.toString()} not to equal ${expectedBn.toString()}`
            : `Expected ${actualBn.toString()} to equal ${expectedBn.toString()}`,
      };
    },
  });

  expect.toEqualBn = createMatcher;
};
