import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { Uint8ArrayWithDynamicData } from '../utilities';

import type { SmallBytesOptions } from './abstract-coder';
import { BooleanCoder } from './boolean';
import { NumberCoder } from './number';
import { VecCoder } from './vec';

/**
 * @group node
 */
describe('VecCoder', () => {
  const sbOptions: SmallBytesOptions = {
    isSmallBytes: true,
  };

  it('should encode a Vec of Booleans', () => {
    const coder = new VecCoder(new BooleanCoder(sbOptions));
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([1, 0]),
    };

    const actual = coder.encode([true, false]);

    expect(actual).toEqual(expected);
  });

  it('should throw when encoding non array input', async () => {
    const coder = new VecCoder(new BooleanCoder(sbOptions));
    await expectToThrowFuelError(
      () => coder.encode('Nope' as never),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Expected array value.')
    );
  });

  it('should decode a u8 Vec', () => {
    const coder = new VecCoder(new NumberCoder('u8', sbOptions));
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 41, 16, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 8, 6, 7,
    ]);
    const expected = [8, 6, 7];

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });
});
