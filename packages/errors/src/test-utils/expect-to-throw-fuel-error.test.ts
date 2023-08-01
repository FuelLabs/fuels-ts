import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';

describe('FuelError', () => {
  it('compares whole or partial error objects', () => {
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');
    expectToThrowFuelError(() => {
      throw error;
    }, error);
    expectToThrowFuelError(
      () => {
        throw error;
      },
      { code: FuelError.CODES.PARSE_FAILED }
    );
  });

  it('fails when passed fn doesnt throw', () => {
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');
    expectToThrowFuelError(() => {}, error);
  });
  it('fails when partial error object doesnt contain code', () => {
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens');
    expectToThrowFuelError(
      () => {
        throw error;
      },
      // @ts-expect-error code property is required per type definition
      { message: error.message }
    );
  });
  it('should fail with non-fuel errors', () => {
    const expected = { code: FuelError.CODES.PARSE_FAILED };
    const fnThrower = () => {
      throw new Error('x'); // not a FuelError
    };
    expect(expectToThrowFuelError(fnThrower, expected)).rejects.toThrow(
      /Expected constructor:.+FuelError/
    );
  });
});
