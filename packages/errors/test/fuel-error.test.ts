import { ErrorCode, FuelError } from '../src/index';

describe('FuelError', () => {
  it('has properties set as expected on creation', () => {
    const message = 'whatever';
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, message);

    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.PARSE_FAILED);
    expect(error.name).toBe('FuelError');
  });

  describe('Parsing', () => {
    it('parses correctly', () => {
      const message = 'my-message';
      const error = FuelError.parse({ code: ErrorCode.INVALID_URL, message });
      expect(error).toBeInstanceOf(FuelError);
      expect(error.message).toBe(message);
      expect(error.code).toBe(ErrorCode.INVALID_URL);
    });

    it('fails when parsing an object without a code property', () => {
      expect(() => FuelError.parse({})).toThrow(
        new FuelError(ErrorCode.PARSE_FAILED, "missing 'code' property")
      );
    });

    it('fails when parsing an object with an unknown error code', () => {
      const code = 'qweqwe';
      const expectedError = new FuelError(
        ErrorCode.PARSE_FAILED,
        `provided code ${code} isn't part of the ErrorCode enum. The possible values are: ${Object.values(
          ErrorCode
        ).join(', ')}.`
      );

      expect(() => FuelError.parse({ code })).toThrowError(expectedError);
    });
  });
});
