import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { Input, InputMessage } from './input';
import { InputMessageCoder, InputCoder, InputType } from './input';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const MAX_U32 = 2 ** 32 - 1;
const MAX_U64 = bn(2).pow(64).sub(1);

/**
 * @group node
 * @group browser
 */
describe('InputCoder', () => {
  it('Can encode Coin', () => {
    const input: Input = {
      type: InputType.Coin,
      txID: B256,
      outputIndex: 0,
      owner: B256,
      amount: bn(0),
      assetId: B256,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
      witnessIndex: 0,
      predicateGasUsed: bn(0),
      predicateLength: bn(0),
      predicateDataLength: bn(0),
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

  it('Can encode Coin with max predicate length', () => {
    const input: Input = {
      type: InputType.Coin,
      txID: B256,
      outputIndex: 0,
      owner: B256,
      amount: bn(0),
      assetId: B256,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
      witnessIndex: 0,
      predicateGasUsed: bn(0),
      predicateLength: bn(MAX_U32),
      predicateDataLength: bn(MAX_U32),
      predicate: '0x',
      predicateData: '0x',
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000000000000000000000000000ffffffff00000000ffffffff0000'
    );
  });

  it('will throw encoding a coin with larger than max predicate length', async () => {
    const input: Input = {
      type: InputType.Coin,
      txID: B256,
      outputIndex: 0,
      owner: B256,
      amount: bn(0),
      assetId: B256,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
      witnessIndex: 0,
      predicateGasUsed: bn(0),
      predicateLength: MAX_U64.add(1),
      predicateDataLength: MAX_U64.add(1),
      predicate: '0x',
      predicateData: '0x',
    };

    await expectToThrowFuelError(
      () => new InputCoder().encode(input),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u64 value - value exceeds maximum.')
    );
  });

  it('Can encode Contract', () => {
    const input: Input = {
      type: InputType.Contract,
      txID: B256,
      outputIndex: 0,
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
      nonce: '0x0000000000000000000000000000000000000000000000000000000000001234',
      witnessIndex: 0,
      predicateGasUsed: bn(0),
      predicateLength: bn(0),
      predicateDataLength: bn(0),
      predicate: '0x',
      predicateData: '0x',
    };

    const EXPECTED = '0x5ce72c9a844bb00483d5fb5987c33c1fe4a107323ae012620b51c76f8044b704';
    const result = InputMessageCoder.getMessageId(input);

    expect(result).toEqual(EXPECTED);
  });

  it('Can encode Message', () => {
    const input: Input = {
      type: InputType.Message,
      amount: bn(1000),
      sender: '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e',
      recipient: '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
      nonce: '0x0000000000000000000000000000000000000000000000000000000000001234',
      witnessIndex: 0,
      predicateGasUsed: bn(0),
      predicateLength: bn(0),
      predicateDataLength: bn(0),
      predicate: '0x',
      predicateData: '0x',
    };

    const encoded = hexlify(new InputCoder().encode(input));

    expect(encoded).toEqual(
      '0x0000000000000002f1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6eef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a00000000000003e8000000000000000000000000000000000000000000000000000000000000123400000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );
  });
});
