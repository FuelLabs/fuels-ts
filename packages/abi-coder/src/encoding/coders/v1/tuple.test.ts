import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U64_MAX } from '../../../../test/utils/constants';
import { U64Coder } from '../v0/u64';

import { BooleanCoder } from './boolean';
import { TupleCoder } from './tuple';

/**
 * @group node
 * @group browser
 */
describe('Tuple Coder', () => {
  const coder = new TupleCoder<[BooleanCoder, U64Coder]>([new BooleanCoder(), new U64Coder()]);

  it('throws when encoding', async () => {
    await expectToThrowFuelError(
      () => coder.encode([true, 82]),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Tuple encode unsupported in v1')
    );
  });

  it('throws with mismatched inputs', async () => {
    await expectToThrowFuelError(
      // @ts-expect-error mismatch test
      () => coder.encode([true]),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Types/values length mismatch.')
    );
  });

  it('should decode a tuple containing a boolean and u64', () => {
    const expectedValue = [true, bn(U64_MAX)];
    const expectedLength = 9;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255, 255]),
      0
    );

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid tuple data size.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid tuple data size.')
    );
  });
});
