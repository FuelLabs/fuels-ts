import { B256Coder } from './b256';

/**
 * @group node
 */
describe('B256Coder', () => {
  const B256_DECODED = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
  const B256_ENCODED = new Uint8Array([
    213, 87, 156, 70, 223, 204, 127, 24, 32, 112, 19, 230, 91, 68, 228, 203, 78, 44, 34, 152, 244,
    172, 69, 123, 168, 248, 39, 67, 243, 30, 147, 11,
  ]);
  const B256_ZERO_DECODED = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const B256_ZERO_ENCODED = new Uint8Array(32);

  const coder = new B256Coder();

  it('should encode zero as a 256 bit hash string', () => {
    const expected = B256_ZERO_ENCODED;
    const actual = coder.encode(B256_ZERO_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a 256 bit hash string', () => {
    const expected = B256_ENCODED;
    const actual = coder.encode(B256_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode zero as a 256 bit hash string', () => {
    const expectedValue = B256_ZERO_DECODED;
    const expectedLength = B256_ZERO_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B256_ZERO_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a 256 bit hash string', () => {
    const expectedValue = B256_DECODED;
    const expectedLength = B256_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B256_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding a 256 bit hash string that is too short', () => {
    const invalidInput = B256_DECODED.slice(0, B256_DECODED.length - 1);

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid b256');
  });

  it('should throw an error when decoding an encoded 256 bit hash string that is too short', () => {
    const invalidInput = B256_ENCODED.slice(0, B256_ENCODED.length - 1);

    expect(() => {
      coder.decode(invalidInput, 0);
    }).toThrow();
  });

  it('should throw an error when encoding a 256 bit hash string that is too long', () => {
    const invalidInput = `${B256_DECODED}0`;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid b256');
  });

  it('should throw an error when encoding a 512 bit hash string', () => {
    const B512 =
      '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

    expect(() => {
      coder.encode(B512);
    }).toThrow('Invalid b256');
  });

  it('should throw an error when decoding an encoded 256 bit hash string that is too long', () => {
    const invalidInput = new Uint8Array(Array.from(Array(32).keys()));

    expect(() => {
      coder.decode(invalidInput, 1);
    }).toThrow('Invalid size for b256');
  });

  it('should throw an error when encoding a 256 bit hash string that is not a hex string', () => {
    const invalidInput = 'not a hex string';

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid b256');
  });
});
