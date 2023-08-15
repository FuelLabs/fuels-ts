import { versions } from '@fuel-ts/versions';

import { FuelError, ErrorCode } from '.';
import { expectToThrowFuelError } from './test-utils/expect-to-throw-fuel-error';

describe('Parsing', () => {
  it('has properties set as expected on creation', () => {
    const message = 'whatever';
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, message);

    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.PARSE_FAILED);
    expect(error.name).toBe('FuelError');
    expect(error.VERSIONS).toStrictEqual(versions);
  });

  it('parses correctly', () => {
    const message = 'my-message';
    const error = FuelError.parse({ code: ErrorCode.INVALID_URL, message });
    expect(error).toBeInstanceOf(FuelError);
    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.INVALID_URL);
  });

  it('fails when parsing an object without a code property', () => {
    const expectedError = new FuelError(FuelError.CODES.PARSE_FAILED, "missing 'code' property");
    expectToThrowFuelError(() => FuelError.parse({}), expectedError);
  });

  it('fails when parsing an object with an unknown error code', () => {
    const code = 'qweqwe';
    const expectedError = new FuelError(
      ErrorCode.PARSE_FAILED,
      `Unknown error code: ${code}. Accepted codes: ${Object.values(ErrorCode).join(', ')}.`
    );
    expectToThrowFuelError(() => FuelError.parse({ code }), expectedError);
  });

  it('converts error to plain object', () => {
    const code = FuelError.CODES.PARSE_FAILED;
    const name = 'FuelError';
    const message = 'It happens';
    const err = new FuelError(code, message);
    expect(err.toObject()).toEqual({ code, name, message, VERSIONS: err.VERSIONS });
  });
});
