import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';

/**
 * @group node
 */
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
    await expectToThrowFuelError(asyncThrowFn, error);
    await expectToThrowFuelError(asyncThrowFn, { code: error.code });
  });

  it('fails when passed fn doesnt throw (sync)', () => {
    expect(() => expectToThrowFuelError(() => {}, error)).toThrow("Passed-in lambda didn't throw.");
  });

  it('fails when passed fn doesnt throw (async)', async () => {
    await expect(expectToThrowFuelError(async () => {}, error)).rejects.toThrow(
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
    ).toThrow(`Expected error code 'undefined' is not a valid FuelError code.`);
  });

  it('fails when partial error object doesnt contain code (async)', async () => {
    await expect(
      expectToThrowFuelError(
        asyncThrowFn,
        // @ts-expect-error code property is required per type definition
        { message: error.message }
      )
    ).rejects.toThrow(`Expected error code 'undefined' is not a valid FuelError code.`);
  });

  it('fails with non-fuel errors (sync)', () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const nonFuelThrowFn = () => {
      throw new Error('x'); // not a FuelError
    };

    expect(() => expectToThrowFuelError(nonFuelThrowFn, expected)).toThrow(
      'Thrown error code is not a valid FuelError code.'
    );
  });

  it('fails with non-fuel errors (async)', async () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const asyncThrower = async () =>
      new Promise(() => {
        throw new Error('x'); // not a FuelError
      });

    await expect(expectToThrowFuelError(asyncThrower, expected)).rejects.toThrow(
      'Thrown error code is not a valid FuelError code.'
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
    await expect(expectToThrowFuelError(asyncThrowFn, expected as FuelError)).rejects.toThrow(
      `Expected error code '${expected.code}' is not a valid FuelError code.`
    );
  });
});
