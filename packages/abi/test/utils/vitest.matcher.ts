import { bn } from '@fuel-ts/math';
import type { BNInput } from '@fuel-ts/math';

export const toEqualBn = (_received: BNInput, _argument: BNInput) => {
  const received = bn(_received);
  const argument = bn(_argument);

  const pass = received.eq(argument);

  if (pass) {
    return {
      message: () => `Expected ${received.toString()} not to equal ${argument.toString()}`,
      pass: true,
    };
  }
  return {
    message: () => `expected ${received.toString()} to equal ${argument.toString()}`,
    pass: false,
  };
};
