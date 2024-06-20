import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { arrayify } from '@fuel-ts/utils';

import { U32_MAX } from '../../../test/utils/constants';

import { BooleanCoder } from './BooleanCoder';
import { NumberCoder } from './NumberCoder';
import { VecCoder } from './VecCoder';

/**
 * @group node
 */
describe('VecCoder', () => {
  it('should decode an empty Vec', () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const expected: number[] = [];
    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(8);
  });

  it('should encode a Vec of Booleans', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 1, 0, 1, 1]);
    const actual = coder.encode([true, false, true, false, true, true]);

    expect(actual).toEqual(expected);
  });

  it('should throw when encoding non array input', async () => {
    const coder = new VecCoder(new BooleanCoder());
    await expectToThrowFuelError(
      () => coder.encode('Nope' as never),
      new FuelError(
        ErrorCode.ENCODE_ERROR,
        'Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array.'
      )
    );
  });

  it('should decode a u8 Vec', () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 8, 6, 7]);
    const expected = [8, 6, 7];
    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(11);
  });

  it('should encode a u8 Vec (UInt8Array)', () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 8, 6, 7]);
    const actual = coder.encode(arrayify(Uint8Array.from([8, 6, 7])));

    expect(actual).toEqual(expected);
  });

  it('throws when decoding empty vec bytes', async () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid vec data size.')
    );
  });

  it('throws when decoding empty vec byte data', async () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid vec byte data size.')
    );
  });

  it('throws when decoding vec larger than max size', async () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array(U32_MAX + 1);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid vec data size.')
    );
  });
});
