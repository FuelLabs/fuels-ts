import { arrayify, hexlify } from '@ethersproject/bytes';

import type { UtxoId } from './utxo-id';
import { UtxoIdCoder } from './utxo-id';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('UtxoIdCoder', () => {
  it('Can encode UtxoId', () => {
    const utxoId: UtxoId = {
      transactionId: B256,
      outputIndex: 0,
    };

    const encoded = hexlify(new UtxoIdCoder('utxoId').encode(utxoId));

    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000'
    );

    const [decoded, offset] = new UtxoIdCoder('utxoId').decode(arrayify(encoded), 0);

    expect(offset).toEqual(40);
    expect(decoded).toEqual(utxoId);
  });
});
