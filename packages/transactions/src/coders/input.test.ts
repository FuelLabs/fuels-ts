import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';

import type { Input } from './input';
import { InputCoder, InputType } from './input';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('InputCoder', () => {
  it('Can encode Coin', () => {
    const input: Input = {
      type: InputType.Coin,
      data: {
        utxoID: B256,
        owner: B256,
        amount: BigNumber.from(0),
        color: B256,
        witnessIndex: BigNumber.from(0),
        maturity: BigNumber.from(0),
        predicateLength: BigNumber.from(0),
        predicateDataLength: BigNumber.from(0),
        predicate: '0x',
        predicateData: '0x',
      },
    };

    const encoded = hexlify(new InputCoder('input').encode(input));

    expect(encoded).toEqual(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new InputCoder('input').decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(input);
  });

  it('Can encode Contract', () => {
    const input: Input = {
      type: InputType.Contract,
      data: {
        utxoID: B256,
        balanceRoot: B256,
        stateRoot: B256,
        contractID: B256,
      },
    };

    const encoded = hexlify(new InputCoder('input').encode(input));

    expect(encoded).toEqual(
      '0x0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new InputCoder('input').decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(input);
  });
});
