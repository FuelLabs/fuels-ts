import type { BNInput } from 'fuels';

declare global {
  namespace Vitest {
    interface Assertion {
      toEqualBn(expected: BNInput): void;
    }
    interface ExpectStatic {
      toEqualBn(expected: BNInput): {
        asymmetricMatch(actual: BNInput): boolean;
        toString(): string;
      };
    }
  }
}
