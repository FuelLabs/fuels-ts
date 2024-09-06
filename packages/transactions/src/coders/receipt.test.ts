import { sha256 } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';
import { arrayify, hexlify, concat } from '@fuel-ts/utils';

import type { Receipt } from './receipt';
import { ReceiptCoder, ReceiptMessageOutCoder, ReceiptType } from './receipt';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const B256_ALT1 = '0x750f560d912ec02d826af8ba3be90a9481fb6d3bc6b4e7f01a89f245cf0a7059';
const B256_ALT2 = '0x68b401b682ba0c9018150cca596358a6b98576337ea10b9cfb0d02441b3bc61a';
const B256_ALT3 = '0xeb03488970d05ea240c788a0ea2e07176cc5317b7c7c89f26ac5282bbcd445bd';
const B256_ALT4 = '0x2f6d40e3ac1a172fb9445f9843440a0fc383bea238a7a35a77a3c73d36902992';

/**
 * @group node
 * @group browser
 */
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
      contractId: B256,
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x0000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
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

  it('Can encode MessageOut', () => {
    const receipt: Receipt = {
      type: ReceiptType.MessageOut,
      messageId: '',
      sender: B256_ALT1,
      recipient: B256_ALT2,
      amount: bn(4000),
      nonce: B256_ALT3,
      digest: B256_ALT4,
      data: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    };
    receipt.messageId = ReceiptMessageOutCoder.getMessageId(receipt);

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x000000000000000a750f560d912ec02d826af8ba3be90a9481fb6d3bc6b4e7f01a89f245cf0a705968b401b682ba0c9018150cca596358a6b98576337ea10b9cfb0d02441b3bc61a0000000000000fa0eb03488970d05ea240c788a0ea2e07176cc5317b7c7c89f26ac5282bbcd445bd000000000000000c2f6d40e3ac1a172fb9445f9843440a0fc383bea238a7a35a77a3c73d369029920102030405060708090a0b0c00000000'
    );

    expect(arrayify(encoded).length).toEqual((encoded.length - 2) / 2);

    const [decoded] = new ReceiptCoder().decode(arrayify(encoded), 0);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Mint', () => {
    const receipt: Receipt = {
      type: ReceiptType.Mint,
      subId: B256_ALT3,
      contractId: B256_ALT1,
      val: bn(4000),
      pc: bn(30),
      is: bn(20),
      assetId: sha256(concat([B256_ALT1, B256_ALT3])),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x000000000000000beb03488970d05ea240c788a0ea2e07176cc5317b7c7c89f26ac5282bbcd445bd750f560d912ec02d826af8ba3be90a9481fb6d3bc6b4e7f01a89f245cf0a70590000000000000fa0000000000000001e0000000000000014'
    );

    expect(arrayify(encoded).length).toEqual((encoded.length - 2) / 2);

    const [decoded] = new ReceiptCoder().decode(arrayify(encoded), 0);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });

  it('Can encode Burn', () => {
    const receipt: Receipt = {
      type: ReceiptType.Burn,
      subId: B256_ALT1,
      contractId: B256_ALT3,
      val: bn(300),
      pc: bn(90),
      is: bn(10),
      assetId: sha256(concat([B256_ALT3, B256_ALT1])),
    };

    const encoded = hexlify(new ReceiptCoder().encode(receipt));

    expect(encoded).toEqual(
      '0x000000000000000c750f560d912ec02d826af8ba3be90a9481fb6d3bc6b4e7f01a89f245cf0a7059eb03488970d05ea240c788a0ea2e07176cc5317b7c7c89f26ac5282bbcd445bd000000000000012c000000000000005a000000000000000a'
    );

    expect(arrayify(encoded).length).toEqual((encoded.length - 2) / 2);

    const [decoded] = new ReceiptCoder().decode(arrayify(encoded), 0);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(receipt));
  });
});
