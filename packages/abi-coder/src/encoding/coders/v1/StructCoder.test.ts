import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U32_MAX } from '../../../../test/utils/constants';
import { U64Coder } from '../v0/U64Coder';

import { BooleanCoder } from './BooleanCoder';
import { StructCoder } from './StructCoder';

/**
 * @group node
 * @group browser
 */
describe('StructCoder', () => {
  const STRUCT_NAME = 'TestStruct';
  const coder = new StructCoder(STRUCT_NAME, { a: new BooleanCoder(), b: new U64Coder() });

  it('should encode a struct containing a boolean and number', () => {
    const expected = new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]);
    const actual = coder.encode({ a: true, b: U32_MAX });

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a struct containing a boolean and number', () => {
    const expectedValue = { a: true, b: bn(U32_MAX) };
    const expectedLength = 9;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]),
      0
    );

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid struct data size.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid struct data size.')
    );
  });
});
