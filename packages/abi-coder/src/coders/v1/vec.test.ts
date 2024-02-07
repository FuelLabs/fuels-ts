import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { U32_MAX } from '../../../test/utils/constants';

import { BooleanCoder } from './boolean';
import { NumberCoder } from './number';
import { VecCoder } from './vec';

/**
 * @group node
 */
describe('VecCoder', () => {
  it('throws when encoding a struct', async () => {
    const coder = new VecCoder(new BooleanCoder());
    await expectToThrowFuelError(
      () => coder.encode([true]),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Vec encode unsupported in v1')
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

  it('throws when decoding empty vec bytes', async () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid vec data size.')
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
