import { getBytesCopy, hexlify } from 'ethers';

import type { UtxoId } from './utxo-id';
import { UtxoIdCoder } from './utxo-id';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('UtxoIdCoder', () => {
  it('can encode UtxoId', () => {
    const utxoId: UtxoId = {
      transactionId: B256,
      outputIndex: 0,
    };

    const encoded = hexlify(new UtxoIdCoder().encode(utxoId));

    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000'
    );

    const [decoded, offset] = new UtxoIdCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(40);
    expect(decoded).toEqual(utxoId);
  });
  it('does not encode bad UtxoId', () => {
    const utxoId: UtxoId = {
      // @ts-expect-error: Values shouldn't be assignable
      transactionId: 0,
      // @ts-expect-error: Values shouldn't be assignable
      outputIndex: B256,
    };

    expect(() => {
      new UtxoIdCoder().encode(utxoId);
    }).toThrow();
  });
});
