import { arrayify, hexlify } from '@fuel-ts/utils';

import type { UtxoId } from './utxo-id';
import { utxoIdCoder } from './utxo-id';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

/**
 * @group node
 * @group browser
 */
describe('UtxoIdCoder', () => {
  it('can encode UtxoId [u8 output]', () => {
    const utxoId: UtxoId = {
      transactionId: B256,
      outputIndex: 0,
    };

    const encoded = hexlify(utxoIdCoder.encode(utxoId));

    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000'
    );

    const [decoded, offset] = utxoIdCoder.decode(arrayify(encoded), 0);

    expect(offset).toEqual(40);
    expect(decoded).toEqual(utxoId);
  });

  it('can encode UtxoId [u16 output]', () => {
    const utxoId: UtxoId = {
      transactionId: B256,
      outputIndex: 256,
    };

    const encoded = hexlify(utxoIdCoder.encode(utxoId));

    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000100'
    );
  });

  it('does not encode bad UtxoId', () => {
    const utxoId: UtxoId = {
      // @ts-expect-error: Values shouldn't be assignable
      transactionId: 0,
      // @ts-expect-error: Values shouldn't be assignable
      outputIndex: B256,
    };

    expect(() => {
      utxoIdCoder.encode(utxoId);
    }).toThrow();
  });
});
