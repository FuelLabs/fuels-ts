import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { TxPointer } from './tx-pointer';
import { txPointerCoder } from './tx-pointer';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

/**
 * @group node
 * @group browser
 */
describe('TxPointerCoder', () => {
  it('can encode TxPointer', () => {
    const txPointer: TxPointer = {
      blockHeight: 10,
      txIndex: 1,
    };

    const encoded = hexlify(txPointerCoder.encode(txPointer));

    expect(encoded).toEqual('0x000000000000000a0000000000000001');

    const [decoded, offset] = txPointerCoder.decode(arrayify(encoded), 0);

    expect(offset).toEqual(16);
    expect(decoded).toEqual(txPointer);
  });
  it('does not encode bad TxPointer', () => {
    const txPointer: TxPointer = {
      // @ts-expect-error: Values shouldn't be assignable
      blockHeight: B256,
      // @ts-expect-error: Values shouldn't be assignable
      txIndex: B256,
    };

    expect(() => {
      txPointerCoder.encode(txPointer);
    }).toThrow();
  });

  it('decodes gql scalar', () => {
    const result = txPointerCoder.decodeFromGqlScalar('000000010001');
    expect(result).toStrictEqual({ blockHeight: 1, txIndex: 1 });
  });
  it('throws if invalid length of gql scalar', async () => {
    await expectToThrowFuelError(
      () => txPointerCoder.decodeFromGqlScalar('0'.repeat(11)),
      new FuelError(
        ErrorCode.DECODE_ERROR,
        'Invalid TxPointer scalar string length 11. It must have length 12.'
      )
    );

    await expectToThrowFuelError(
      () => txPointerCoder.decodeFromGqlScalar('0'.repeat(13)),
      new FuelError(
        ErrorCode.DECODE_ERROR,
        'Invalid TxPointer scalar string length 13. It must have length 12.'
      )
    );
  });
});
