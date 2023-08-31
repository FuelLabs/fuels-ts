import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';

describe('expect-to-throw-fuel-error', () => {
  const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');

  const throwFn = () => {
    throw FuelError.parse(error);
  };
  const asyncThrowFn = async () => new Promise(throwFn);

  it('compares whole or partial error objects (sync lambda fn)', async () => {
    await expectToThrowFuelError(throwFn, error);
    await expectToThrowFuelError(throwFn, { code: error.code });
  });

  it('compares whole or partial error objects (async lambda fn)', async () => {
    await expectToThrowFuelError(asyncThrowFn, error);
    await expectToThrowFuelError(asyncThrowFn, { code: error.code });
  });

  it('fails when passed fn doesnt throw (sync lambda fn)', async () => {
    await expect(() => expectToThrowFuelError(() => {}, error)).rejects.toThrow(
      "Passed-in lambda didn't throw."
    );
  });

  it('fails when passed fn doesnt throw (async lambda fn)', async () => {
    await expect(expectToThrowFuelError(async () => {}, error)).rejects.toThrow(
      "Passed-in lambda didn't throw."
    );
  });

  it('fails when partial error object doesnt contain code (sync lambda fn)', async () => {
    await expect(() =>
      expectToThrowFuelError(
        throwFn,
        // @ts-expect-error code property is required per type definition
        { message: error.message }
      )
    ).rejects.toThrow(`Expected error must contain a code.`);
  });

  it('fails when partial error object doesnt contain code (async lambda fn)', async () => {
    await expect(
      expectToThrowFuelError(
        asyncThrowFn,
        // @ts-expect-error code property is required per type definition
        { message: error.message }
      )
    ).rejects.toThrow(`Expected error must contain a code.`);
  });

  it('fails with non-fuel errors (sync lambda fn)', async () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const nonFuelThrowFn = () => {
      throw new Error('x'); // not a FuelError
    };

    await expect(() => expectToThrowFuelError(nonFuelThrowFn, expected)).rejects.toThrow(
      'Thrown error must contain a code.'
    );
  });

  it('fails with non-fuel errors (async lambda fn)', async () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const asyncThrower = async () =>
      new Promise(() => {
        throw new Error('x'); // not a FuelError
      });

    await expect(expectToThrowFuelError(asyncThrower, expected)).rejects.toThrow(
      'Thrown error must contain a code.'
    );
  });

  it('expected error must contain a valid FuelError code (sync lambda fn)', async () => {
    const expected = { code: 'invalid-error-code' };
    await expect(() => expectToThrowFuelError(throwFn, expected as FuelError)).rejects.toThrow(
      `Expected error code '${expected.code}' is not a valid FuelError code.`
    );
  });

  it('expected error must contain a valid FuelError code (async lambda fn)', async () => {
    const expected = { code: 'invalid-error-code' };
    await expect(expectToThrowFuelError(asyncThrowFn, expected as FuelError)).rejects.toThrow(
      `Expected error code '${expected.code}' is not a valid FuelError code.`
    );
  });
});
