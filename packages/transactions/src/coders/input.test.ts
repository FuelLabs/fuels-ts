import { arrayify, hexlify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import type { Input, InputMessage } from './input';
import { InputMessageCoder, InputCoder, InputType } from './input';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('InputCoder', () => {
  it('Can encode Coin', () => {
    const input: Input = {
      type: InputType.Coin,
      utxoID: { transactionId: B256, outputIndex: 0 },
      owner: B256,
      amount: bn(0),
      assetId: B256,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
      witnessIndex: 0,
      maturity: 0,
      predicateLength: 0,
      predicateDataLength: 0,
      predicate: '0x',
      predicateData: '0x',
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new InputCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(input));
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

  it('Can encode Message Id', () => {
    const input: InputMessage = {
      type: InputType.Message,
      amount: bn(1000),
      sender: '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e',
      recipient: '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
      data: [12, 13, 14],
      nonce: bn(1234),
      witnessIndex: 0,
      dataLength: 3,
      predicateLength: 0,
      predicateDataLength: 0,
      predicate: '0x',
      predicateData: '0x',
    };

    const EXPECTED = '0xc2675161a5856e25fe3b526f65461030d2909694582b2c39d2396b409148d6ff';
    const result = InputMessageCoder.getMessageId(input);

    expect(result).toEqual(EXPECTED);
  });

  it('Can encode Message', () => {
    const input: Input = {
      type: InputType.Message,
      amount: bn(1000),
      sender: '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e',
      recipient: '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
      data: [12, 13, 14],
      nonce: bn(1234),
      witnessIndex: 0,
      dataLength: 3,
      predicateLength: 0,
      predicateDataLength: 0,
      predicate: '0x',
      predicateData: '0x',
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000002c2675161a5856e25fe3b526f65461030d2909694582b2c39d2396b409148d6fff1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6eef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a00000000000003e800000000000004d20000000000000000000000000000001800000000000000000000000000000000000000000000000c000000000000000d000000000000000e'
    );
  });
});
