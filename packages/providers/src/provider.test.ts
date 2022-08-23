import { arrayify } from '@ethersproject/bytes';
import { ZeroBytes32 } from '@fuel-ts/constants';
import { randomBytes } from '@fuel-ts/keystore';
import { toHex, toNumber } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';

import Provider from './provider';

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.9.6');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: toHex(0),
      gasLimit: toHex(1000000),
      bytePrice: toHex(0),
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
        val0: toHex(202),
        val1: toHex(186),
        val2: toHex(0),
        val3: toHex(0),
        pc: toHex(0x2878),
        is: toHex(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: toHex(1),
        pc: toHex(0x287c),
        is: toHex(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: toHex(0),
        gasUsed: toHex(0x2c),
      },
    ];

    expect(callResult.receipts).toEqual(expectedReceipts);
  });

  // TODO: Add tests to provider sendTransaction
  // sendTransaction can't be tested without a valid signature
  // importing and testing it here can generate cycle dependency
  // as we test this in other modules like call contract its ok to
  // skip for now
  it.skip('can sendTransaction()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: toHex(0),
      gasLimit: toHex(1000000),
      bytePrice: toHex(0),
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
        val0: toHex(202),
        val1: toHex(186),
        val2: toHex(0),
        val3: toHex(0),
        pc: toHex(0x2878),
        is: toHex(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: toHex(1),
        pc: toHex(0x287c),
        is: toHex(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: toHex(0),
        gasUsed: toHex(0x2c),
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

  it('can get chain info including gasPriceFactor', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { consensusParameters } = await provider.getChain();

    expect(toNumber(consensusParameters.gasPriceFactor)).toBeGreaterThan(0);
  });

  it('can get node info including minBytePrice and minGasPrice', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { minBytePrice, minGasPrice } = await provider.getNodeInfo();

    expect(minBytePrice).toBeDefined();
    expect(minGasPrice).toBeDefined();
  });
});
