import { toThrowExact } from './to-throw-exact';

it("fails when value passed to 'expect' isn't a function", () => {
  // @ts-expect-error we're passing in an invalid value to 'toThrowExact'
  const result = toThrowExact('asd', new Error());

  expect(result.pass).toBe(false);
  expect(result.message()).toBe(
    `Value passed to 'expect' must be function, but instead "asd" was found`
  );
});

it("fails when value passed to '.toThrowExact' isn't an Error", () => {
  // @ts-expect-error we're passing in an invalid value to 'toThrowExact'
  const result = toThrowExact(() => {}, 1234);

  expect(result.pass).toBe(false);
  expect(result.message()).toBe(
    `Value passed to 'toThrowExact' must be an Error, but instead "1234" was found`
  );
});

it("fails when callback passed to 'expect' doesn't throw", () => {
  // @ts-expect-error we're passing in an invalid value to 'toThrowExact'
  const result = toThrowExact(() => {}, new Error());

  expect(result.pass).toBe(false);
  expect(result.message()).toBe("Callback passed to 'expect' did not throw");
});

it('fails when expected and actual errors do not have same instance', () => {
  class ValidationError extends Error {}
  const result = toThrowExact(() => {
    throw new ValidationError('message');
  }, new Error('message'));

  expect(result.pass).toBe(false);
  expect(result.message()).toBe(`Instance mismatch:\nreceived: ValidationError,\nexpected: Error`);
});

it("fails when expected and actual errors aren't strictly equal", () => {
  const thrownError = new Error('m1');
  const expectedError = new Error('m2');
  const result = toThrowExact(() => {
    throw thrownError;
  }, expectedError);

  expect(result.pass).toBe(false);
  expect(result.message()).toBe(
    `Errors are not strictly equal:\nreceived:${JSON.stringify(
      thrownError,
      Object.getOwnPropertyNames(thrownError).filter((p) => p !== 'stack')
    )},\nexpected: ${JSON.stringify(
      expectedError,
      Object.getOwnPropertyNames(expectedError).filter((p) => p !== 'stack')
    )} `
  );
});

it('succeeds when instances and content are equal', () => {
  const thrownError = new Error('m1');
  const expectedError = new Error('m1');
  const result = toThrowExact(() => {
    throw thrownError;
  }, expectedError);

  expect(result.pass).toBe(true);
});
