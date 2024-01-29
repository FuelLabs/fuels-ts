import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { B512Coder } from './b512';

/**
 * @group node
 * @group browser
 */
describe('B512Coder', () => {
  const B512_DECODED =
    '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';
  const B512_ENCODED = new Uint8Array([
    142, 157, 218, 111, 119, 147, 116, 90, 197, 170, 207, 158, 144, 124, 174, 48, 178, 160, 31, 223,
    13, 35, 183, 117, 10, 133, 198, 164, 79, 202, 12, 41, 240, 144, 111, 157, 31, 30, 146, 230, 161,
    251, 60, 61, 206, 243, 204, 59, 60, 219, 170, 226, 126, 71, 185, 217, 164, 198, 164, 252, 228,
    207, 22, 178,
  ]);
  const B512_ZERO_DECODED =
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
  const B512_ZERO_ENCODED = new Uint8Array(64);

  const coder = new B512Coder();

  it('should encode zero as a 512 bit hash string', () => {
    const expected = B512_ZERO_ENCODED;
    const actual = coder.encode(B512_ZERO_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a 512 bit hash string', () => {
    const expected = B512_ENCODED;
    const actual = coder.encode(B512_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode zero as a 512 bit hash string', () => {
    const expectedValue = B512_ZERO_DECODED;
    const expectedLength = B512_ZERO_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B512_ZERO_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a 512 bit hash string', () => {
    const expectedValue = B512_DECODED;
    const expectedLength = B512_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B512_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding a 512 bit hash string that is too short', () => {
    const invalidInput = B512_DECODED.slice(0, B512_DECODED.length - 1);

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow(/Invalid struct B512/);
  });

  it('should throw an error when encoding a 512 bit hash string that is too long', () => {
    const invalidInput = `${B512_DECODED}0`;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow(/Invalid struct B512/);
  });

  it('should throw an error when encoding a 256 bit hash string', () => {
    const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

    expect(() => {
      coder.encode(B256);
    }).toThrow(/Invalid struct B512/);
  });

  it('should throw an error when encoding a 512 bit hash string that is not a hex string', () => {
    const invalidInput = 'not a hex string';

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow(/Invalid struct B512/);
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 data size.')
    );
  });

  it('should throw an error when decoding an encoded 512 bit hash string that is too short', async () => {
    const invalidInput = B512_ENCODED.slice(0, B512_ENCODED.length - 1);

    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 data size.')
    );
  });

  it('should throw an error when decoding an encoded 512 bit hash string that is too long', async () => {
    const invalidInput = new Uint8Array(Array.from(Array(65).keys()));

    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 byte data size.')
    );
  });
});
