import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';

describe('expect-to-throw-fuel-error', () => {
  const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');

  const throwFn = () => {
    throw error;
  };

  const asyncThrowFn = async () => new Promise(throwFn);

  it('compares whole or partial error objects (sync)', () => {
    expectToThrowFuelError(throwFn, error);
    expectToThrowFuelError(throwFn, { code: error.code });
  });

  it('compares whole or partial error objects (async)', async () => {
    await expectToThrowFuelError(asyncThrowFn, error);
    await expectToThrowFuelError(asyncThrowFn, { code: error.code });
  });

  it('fails when passed fn doesnt throw (sync)', () => {
    const fn = expectToThrowFuelError(() => {}, error);
    expect(fn).rejects.toThrow(/Passed-in lambda didn't throw./);
  });

  it('fails when passed fn doesnt throw (async)', () => {
    const fn = expectToThrowFuelError(async () => {}, error);
    expect(fn).rejects.toThrow(/Passed-in lambda didn't throw./);
  });

  it('fails when expected error object doesnt contain code (sync)', () => {
    const expectedError = { message: error.message }; // no code here
    const fn = () => expectToThrowFuelError(throwFn, expectedError as FuelError);
    expect(fn).rejects.toThrow('Expected error must contain a code.');
  });

  it('fails when partial error object doesnt contain code (async)', () => {
    const expectedError = { message: error.message }; // no `code` here
    const fn = () => expectToThrowFuelError(asyncThrowFn, expectedError as FuelError);
    expect(fn).rejects.toThrow('Expected error must contain a code.');
  });

  it('fails with non-fuel errors (sync)', () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const nonFuelThrowFn = () => {
      throw new Error('x'); // not a FuelError
    };
    expect(expectToThrowFuelError(nonFuelThrowFn, expected)).rejects.toThrow(
      'Thrown error code is not a valid FuelError code.'
    );
  });

  it('fails with non-fuel errors (async)', () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const promise = new Promise(() => {
      throw new Error('x'); // not a FuelError
    });
    const nonFuelAsyncThrowFn = () => promise;
    expect(expectToThrowFuelError(nonFuelAsyncThrowFn, expected)).rejects.toThrow(
      'Thrown error code is not a valid FuelError code.'
    );
  });

  it('expectedError must contain a valid FuelError code', () => {
    const expected = { code: 'invalid-error-code' };
    expect(expectToThrowFuelError(throwFn, expected as FuelError)).rejects.toThrow(
      'Expected error code is not a valid FuelError code.'
    );
  });
});
