import { arrayify, hexlify } from '@ethersproject/bytes';

import type { Input } from './input';
import { InputCoder, InputType } from './input';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('InputCoder', () => {
  it('Can encode Coin', () => {
    const input: Input = {
      type: InputType.Coin,
      utxoID: { transactionId: B256, outputIndex: 0 },
      owner: B256,
      amount: 0n,
      assetId: B256,
      witnessIndex: 0,
      maturity: 0,
      predicateLength: 0,
      predicateDataLength: 0,
      predicate: '0x',
      predicateData: '0x',
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new InputCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(input);
  });

  it('Can encode Contract', () => {
    const input: Input = {
      type: InputType.Contract,
      utxoID: { transactionId: B256, outputIndex: 0 },
      balanceRoot: B256,
      stateRoot: B256,
      contractID: B256,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new InputCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(input);
  });
});
