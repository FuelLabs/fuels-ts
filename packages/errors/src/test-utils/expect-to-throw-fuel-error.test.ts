import { FuelError } from '..';

import { expectToThrowFuelError, expectToThrowFuelErrorAsync } from './expect-to-throw-fuel-error';

describe('expect-to-throw-fuel-error', () => {
  const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');
  const throwFn = () => {
    throw FuelError.parse(error);
  };
  const asyncThrowFn = async () => new Promise(throwFn);

  it('compares whole or partial error objects (sync)', () => {
    expectToThrowFuelError(throwFn, error);
    expectToThrowFuelError(throwFn, { code: error.code });
  });

  it('compares whole or partial error objects (async)', async () => {
    await expectToThrowFuelErrorAsync(asyncThrowFn, error);
    await expectToThrowFuelErrorAsync(asyncThrowFn, { code: error.code });
  });

  it('fails when passed fn doesnt throw (sync)', () => {
    expect(() => expectToThrowFuelError(() => {}, error)).toThrow("Passed-in lambda didn't throw.");
  });

  it('fails when passed fn doesnt throw (async)', async () => {
    await expect(expectToThrowFuelErrorAsync(async () => {}, error)).rejects.toThrow(
      "Passed-in lambda didn't throw."
    );
  });

  it('fails when partial error object doesnt contain code (sync)', () => {
    expect(() =>
      expectToThrowFuelError(
        throwFn,
        // @ts-expect-error code property is required per type definition
        { message: error.message }
      )
    ).toThrow('Expected error must contain a code.');
  });

  it('fails when partial error object doesnt contain code (async)', async () => {
    await expect(
      expectToThrowFuelErrorAsync(
        asyncThrowFn,
        // @ts-expect-error code property is required per type definition
        { message: error.message }
      )
    ).rejects.toThrow('Expected error must contain a code.');
  });

  it('fails with non-fuel errors (sync)', () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const nonFuelThrowFn = () => {
      throw new Error('x'); // not a FuelError, no `code` property
    };

    expect(() => expectToThrowFuelError(nonFuelThrowFn, expected)).toThrow(
      'Thrown error must contain a code.'
    );
  });

  it('fails with non-fuel errors (async)', async () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const asyncThrower = async () =>
      new Promise(() => {
        throw new Error('x'); // not a FuelError, no `code` property
      });

    await expect(expectToThrowFuelErrorAsync(asyncThrower, expected)).rejects.toThrow(
      'Thrown error must contain a code.'
    );
  });

  it('expected error must contain a valid FuelError code (sync)', () => {
    const expected = { code: 'invalid-error-code' };
    expect(() => expectToThrowFuelError(throwFn, expected as FuelError)).toThrow(
      `Expected error code '${expected.code}' is not a valid FuelError code.`
    );
  });

  it('expected error must contain a valid FuelError code (async)', async () => {
    const expected = { code: 'invalid-error-code' };
    await expect(expectToThrowFuelErrorAsync(asyncThrowFn, expected as FuelError)).rejects.toThrow(
      `Expected error code '${expected.code}' is not a valid FuelError code.`
    );
  });

  it('fails when throw error with invalid error code', () => {
    const expected = { code: 'non-existent' };
    const throwInvalidErrorCode = () => {
      // @ts-expect-error Constructing FuelError with invalid `code`
      throw new FuelError(expected.code, 'Error msg');
    };

    // @ts-expect-error `expected.code` is not a valid FuelError code
    expect(() => expectToThrowFuelError(throwInvalidErrorCode, expected)).toThrow(
      'Thrown error code is not a valid FuelError code.'
    );
  });
});
