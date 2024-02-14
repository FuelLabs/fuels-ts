import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { StringCoder } from './string';

/**
 * @group node
 * @group browser
 */
describe('StringCoder', () => {
  it('should encode a string', () => {
    const coder = new StringCoder(4);
    const input = 'fuel';
    const expected = new Uint8Array([102, 117, 101, 108]);
    const actual = coder.encode(input);

    expect(actual).toStrictEqual(expected);
  });

  it('throws when encoding a string that does not match coder size', async () => {
    const coder = new StringCoder(2);

    await expectToThrowFuelError(
      () => coder.encode('fuel'),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Value length mismatch during encode.')
    );
  });

  it('decodes a string', () => {
    const coder = new StringCoder(4);
    const input = new Uint8Array([102, 117, 101, 108]);
    const expected = 'fuel';
    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toBe(4);
  });

  it('throws when decoding a string with too few bytes', async () => {
    const coder = new StringCoder(4);

    await expectToThrowFuelError(
      () => coder.decode(new Uint8Array([0, 0]), 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string data size.')
    );
  });

  it('throws when decoding a string with invalid byte data', async () => {
    const coder = new StringCoder(4);

    await expectToThrowFuelError(
      () => coder.decode(new Uint8Array([0, 0, 0, 0]), 10),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string byte data size.')
    );
  });
});
