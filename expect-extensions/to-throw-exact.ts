import type { MatcherFunction } from 'expect';

const toBeWithinRange: MatcherFunction<[floor: unknown, ceiling: unknown]> =
  // `floor` and `ceiling` get types from the line above
  // it is recommended to type them as `unknown` and to validate the values
  function (actual, floor, ceiling) {
    if (typeof actual !== 'number' || typeof floor !== 'number' || typeof ceiling !== 'number') {
      throw new Error('These must be of type number!');
    }

    const pass = actual >= floor && actual <= ceiling;
    if (pass) {
      return {
        message: () =>
          // `this` context will have correct typings
          `expected ${this.utils.printReceived(
            actual
          )} not to be within range ${this.utils.printExpected(`${floor} - ${ceiling}`)}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected ${this.utils.printReceived(actual)} to be within range ${this.utils.printExpected(
          `${floor} - ${ceiling}`
        )}`,
      pass: false,
    };
  };
