import type { BN } from 'fuels';

export const toEqualBn = (received: BN, argument: BN) => {
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
