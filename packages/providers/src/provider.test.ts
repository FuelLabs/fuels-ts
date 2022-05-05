import { BigNumber } from '@ethersproject/bignumber';
import { arrayify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import { ZeroBytes32 } from '@fuel-ts/constants';
import type { Receipt } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';

import Provider from './provider';

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.6.3');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(0x2878),
        is: BigNumber.from(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: BigNumber.from(1),
        pc: BigNumber.from(0x287c),
        is: BigNumber.from(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0x2c),
      },
    ];

    expect(callResult.receipts).toEqual(expectedReceipts);
  });

  it('can sendTransaction()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const result = await response.wait();

    expect(result.receipts).toEqual([
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(0x2878),
        is: BigNumber.from(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: BigNumber.from(1),
        pc: BigNumber.from(0x287c),
        is: BigNumber.from(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0x2c),
      },
    ]);
  });

  it('can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const { startSession: id } = await provider.operations.startSession();

    const { reset: resetSuccess } = await provider.operations.reset({ sessionId: id });
    expect(resetSuccess).toEqual(true);

    const { endSession: endSessionSuccess } = await provider.operations.endSession({
      sessionId: id,
    });
    expect(endSessionSuccess).toEqual(true);
  });
});
