import { versions } from '@fuel-ts/versions';

import { FuelError, ErrorCode } from '.';
import { expectToThrowFuelError } from './test-utils/expect-to-throw-fuel-error';

/**
 * @group node
 * @group browser
 */
it('has properties set as expected on creation', () => {
  const message = 'whatever';
  const error = new FuelError(FuelError.CODES.PARSE_FAILED, message);

  expect(error.message).toBe(message);
  expect(error.code).toBe(ErrorCode.PARSE_FAILED);
  expect(error.name).toBe('FuelError');
  expect(error.VERSIONS).toStrictEqual(versions);
});

describe('Parsing', () => {
  it('parses correctly', () => {
    const message = 'my-message';
    const error = FuelError.parse({ code: ErrorCode.INVALID_DATA, message });
    expect(error).toBeInstanceOf(FuelError);
    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.INVALID_DATA);
  });

  it('fails when parsing an object without a code property', async () => {
    const expectedError = new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Failed to parse the error object. The required 'code' property is missing.`
    );
    await expectToThrowFuelError(() => FuelError.parse({}), expectedError);
  });

  it('fails when parsing an object with an unknown error code', async () => {
    const code = 'qweqwe';
    const expectedError = new FuelError(
      ErrorCode.PARSE_FAILED,
      `Unknown error code: ${code}. Accepted codes: ${Object.values(ErrorCode).join(', ')}.`
    );

    await expectToThrowFuelError(() => FuelError.parse({ code }), expectedError);
  });
});

it('converts error to plain object', () => {
  const code = FuelError.CODES.PARSE_FAILED;
  const name = 'FuelError';
  const message = 'It happens';
  const metadata = { name: 'FuelLabs' };
  const err = new FuelError(code, message, metadata);
  expect(err.toObject()).toEqual({
    code,
    name,
    message,
    VERSIONS: err.VERSIONS,
    metadata,
    rawError: null,
  });
});
