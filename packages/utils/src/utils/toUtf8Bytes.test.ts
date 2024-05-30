import { FuelError, ErrorCode } from '@fuel-ts/errors';

import { toUtf8Bytes } from './toUtf8Bytes';

/**
 * @group node
 * @group browser
 */
describe('toUtf8Bytes', () => {
  it('should convert a simple ASCII string to UTF-8 bytes', () => {
    const input = 'Hello, world!';
    const expectedOutput = new Uint8Array([
      72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33,
    ]);
    expect(toUtf8Bytes(input)).toEqual(expectedOutput);
  });

  it('should convert a string with non-ASCII characters to UTF-8 bytes', () => {
    const input = 'Héllö, wórld!';
    const expectedOutput = new Uint8Array([
      72, 195, 169, 108, 108, 195, 182, 44, 32, 119, 195, 179, 114, 108, 100, 33,
    ]);
    expect(toUtf8Bytes(input)).toEqual(expectedOutput);
  });

  it('should handle surrogate pairs correctly', () => {
    const input = '😀';
    const expectedOutput = new Uint8Array([240, 159, 152, 128]);
    expect(toUtf8Bytes(input)).toEqual(expectedOutput);
  });

  it('should throw an error for invalid surrogate pairs', () => {
    const input = '\uD800';
    expect(() => toUtf8Bytes(input)).toThrowError(
      new FuelError(ErrorCode.INVALID_INPUT_PARAMETERS, 'Invalid UTF-8 in the input string.')
    );
  });

  it('should normalize the input string', () => {
    const input = 'e\u0301';
    const expectedOutput = new Uint8Array([195, 169]);
    expect(toUtf8Bytes(input)).toEqual(expectedOutput);
  });
});
