import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { expect } from 'chai';
import { Receipt, ReceiptCoder, ReceiptType } from './receipt';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('ReceiptCoder', () => {
  it('Can encode Call', () => {
    const receipt: Receipt = {
      type: ReceiptType.Call,
      data: {
        from: B256,
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
        gas: BigNumber.from(0),
        param1: BigNumber.from(0),
        param2: BigNumber.from(0),
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode Return', () => {
    const receipt: Receipt = {
      type: ReceiptType.Return,
      data: {
        id: B256,
        val: BigNumber.from(0),
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode ReturnData', () => {
    const receipt: Receipt = {
      type: ReceiptType.ReturnData,
      data: {
        id: B256,
        ptr: BigNumber.from(0),
        len: BigNumber.from(0),
        digest: B256,
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000002d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode Panic', () => {
    const receipt: Receipt = {
      type: ReceiptType.Panic,
      data: {
        id: B256,
        reason: BigNumber.from(0),
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode Revert', () => {
    const receipt: Receipt = {
      type: ReceiptType.Revert,
      data: {
        id: B256,
        val: BigNumber.from(0),
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000004d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode Log', () => {
    const receipt: Receipt = {
      type: ReceiptType.Log,
      data: {
        id: B256,
        val0: BigNumber.from(0),
        val1: BigNumber.from(0),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000005d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode LogData', () => {
    const receipt: Receipt = {
      type: ReceiptType.LogData,
      data: {
        id: B256,
        val0: BigNumber.from(0),
        val1: BigNumber.from(0),
        ptr: BigNumber.from(0),
        len: BigNumber.from(0),
        digest: B256,
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000006d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode Transfer', () => {
    const receipt: Receipt = {
      type: ReceiptType.Transfer,
      data: {
        from: B256,
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000007d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });

  it('Can encode TransferOut', () => {
    const receipt: Receipt = {
      type: ReceiptType.TransferOut,
      data: {
        from: B256,
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
        pc: BigNumber.from(0),
        is: BigNumber.from(0),
      },
    };

    const encoded = hexlify(new ReceiptCoder('receipt').encode(receipt));

    expect(encoded).to.equal(
      '0x0000000000000008d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000'
    );

    const [decoded, offset] = new ReceiptCoder('receipt').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(receipt);
  });
});
