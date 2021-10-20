import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { expect } from 'chai';

import type { Output } from './output';
import { OutputCoder, OutputType } from './output';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('OutputCoder', () => {
  it('Can encode Coin', () => {
    const output: Output = {
      type: OutputType.Coin,
      data: {
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });

  it('Can encode Contract', () => {
    const output: Output = {
      type: OutputType.Contract,
      data: {
        inputIndex: BigNumber.from(0),
        balanceRoot: B256,
        stateRoot: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x00000000000000010000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });

  it('Can encode Withdrawal', () => {
    const output: Output = {
      type: OutputType.Withdrawal,
      data: {
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x0000000000000002d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });

  it('Can encode Change', () => {
    const output: Output = {
      type: OutputType.Change,
      data: {
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x0000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });

  it('Can encode Variable', () => {
    const output: Output = {
      type: OutputType.Variable,
      data: {
        to: B256,
        amount: BigNumber.from(0),
        color: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x0000000000000004d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });

  it('Can encode ContractCreated', () => {
    const output: Output = {
      type: OutputType.ContractCreated,
      data: {
        contractId: B256,
      },
    };

    const encoded = hexlify(new OutputCoder('output').encode(output));

    expect(encoded).to.equal(
      '0x0000000000000005d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new OutputCoder('output').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(output);
  });
});
