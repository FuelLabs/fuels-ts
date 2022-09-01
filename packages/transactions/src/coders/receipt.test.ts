import { arrayify, hexlify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import type { Receipt } from './receipt';
import { ReceiptCoder, ReceiptType } from './receipt';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('ReceiptCoder', () => {
  it('Can encode Call', () => {
    const receipt: Receipt = {
      type: ReceiptType.Call,
      from: B256,
      to: B256,
      amount: bn(0),
      assetId: B256,
      gas: bn(0),
      param1: bn(0),
      param2: bn(0),
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Return', () => {
    const receipt: Receipt = {
      type: ReceiptType.Return,
      id: B256,
      val: bn(0),
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode ReturnData', () => {
    const receipt: Receipt = {
      type: ReceiptType.ReturnData,
      id: B256,
      ptr: bn(0),
      len: bn(0),
      digest: B256,
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000002d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Panic', () => {
    const receipt: Receipt = {
      type: ReceiptType.Panic,
      id: B256,
      reason: bn(0),
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Revert', () => {
    const receipt: Receipt = {
      type: ReceiptType.Revert,
      id: B256,
      val: bn(0),
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000004d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Log', () => {
    const receipt: Receipt = {
      type: ReceiptType.Log,
      id: B256,
      val0: bn(0),
      val1: bn(0),
      val2: bn(0),
      val3: bn(0),
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000005d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode LogData', () => {
    const receipt: Receipt = {
      type: ReceiptType.LogData,
      id: B256,
      val0: bn(0),
      val1: bn(0),
      ptr: bn(0),
      len: bn(0),
      digest: B256,
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000006d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Transfer', () => {
    const receipt: Receipt = {
      type: ReceiptType.Transfer,
      from: B256,
      to: B256,
      amount: bn(0),
      assetId: B256,
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000007d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode TransferOut', () => {
    const receipt: Receipt = {
      type: ReceiptType.TransferOut,
      from: B256,
      to: B256,
      amount: bn(0),
      assetId: B256,
      pc: bn(0),
      is: bn(0),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000008d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });
});
