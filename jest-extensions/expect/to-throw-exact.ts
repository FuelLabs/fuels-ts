import { isDeepStrictEqual } from 'util';

export function toThrowExact(
  fn: () => never,
  expectedError: Error
): { pass: boolean; message: () => string } {
  if (typeof fn !== 'function') {
    return {
      pass: false,
      message: () => `Value passed to 'expect' must be function, but instead "${fn}" was found`,
    };
  }

  if (!(expectedError instanceof Error)) {
    return {
      pass: false,
      message: () =>
        `Value passed to 'toThrowExact' must be an Error, but instead "${expectedError}" was found`,
    };
  }

  try {
    fn();
  } catch (actualError) {
    const actualPrototype = Object.getPrototypeOf(actualError);
    const expectedPrototype = Object.getPrototypeOf(expectedError);
    if (actualPrototype !== expectedPrototype)
      return {
        pass: false,
        message: () =>
          `Instance mismatch:\nreceived: ${actualPrototype.constructor.name},\nexpected: ${expectedPrototype.constructor.name}`,
      };

    const areEqual = isDeepStrictEqual(actualError, expectedError);
    if (!areEqual) {
      return {
        pass: false,
        message: () =>
          `Errors are not strictly equal:\nreceived:${JSON.stringify(
            actualError,
            Object.getOwnPropertyNames(actualError).filter((p) => p !== 'stack')
          )},\nexpected: ${JSON.stringify(
            expectedError,
            Object.getOwnPropertyNames(expectedError).filter((p) => p !== 'stack')
          )} `,
      };
    }

    return {
      pass: true,
      message: () => 'Pass!',
    };
  }

  return {
    pass: false,
    message: () => "Callback passed to 'expect' did not throw",
  };
}
