import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { expect } from 'chai';

import Provider from './provider';
import { getContractId } from './util';

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).to.equal('0.1.0');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script: Uint8Array.from(
        // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
        [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
      ),
      scriptData: Uint8Array.from([]),
      inputs: [],
      outputs: [],
      witnesses: [],
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        data: {
          id: '0x0000000000000000000000000000000000000000000000000000000000000000',
          val0: BigNumber.from(202),
          val1: BigNumber.from(186),
          val2: BigNumber.from(0),
          val3: BigNumber.from(0),
          pc: BigNumber.from(472),
          is: BigNumber.from(464),
        },
      },
      {
        type: ReceiptType.Return,
        data: {
          id: '0x0000000000000000000000000000000000000000000000000000000000000000',
          val: BigNumber.from(1),
          pc: BigNumber.from(476),
          is: BigNumber.from(464),
        },
      },
    ];

    expect(callResult.receipts).to.deep.equal(expectedReceipts);
  });

  it('can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const { startSession: id } = await provider.operations.startSession();

    const { reset: resetSuccess } = await provider.operations.reset({ sessionId: id });
    expect(resetSuccess).to.equal(true);

    const { endSession: endSessionSuccess } = await provider.operations.endSession({
      sessionId: id,
    });
    expect(endSessionSuccess).to.equal(true);
  });

  const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

  it('can upload a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Submit contract
    const bytecode = arrayify('0x114000111144002a104904405941148034480000');
    const salt = genSalt();
    const transaction = await provider.submitContract(bytecode, salt);

    expect(transaction.contractId).to.equal(getContractId(bytecode, salt));
  });

  /**
   * This test is a port of:
   * https://github.com/FuelLabs/fuel-vm/blob/9cf81834a33e4a7cb808924bb10ab9ff7878e330/tests/flow.rs#L102-L185
   */
  it('can call a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Submit contract
    const bytecode =
      /*
        Opcode::ADDI(0x10, REG_ZERO, 0x11)
        Opcode::ADDI(0x11, REG_ZERO, 0x2a)
        Opcode::ADD(0x12, 0x10, 0x11)
        Opcode::LOG(0x10, 0x11, 0x12, 0x00)
        Opcode::RET(0x12)
      */
      arrayify('0x504000115044002a104904403341148024480000');
    const salt = genSalt();
    const transaction = await provider.submitContract(bytecode, salt);

    // Call contract
    const script =
      /*
          Opcode::ADDI(0x10, REG_ZERO, VM_TX_MEMORY + tx.script_data_offset())
          Opcode::ADDI(0x11, 0x10, ContractId::LEN)
          Opcode::CALL(0x10, REG_ZERO, 0x10, 0x10)
          Opcode::RET(0x30)
      */
      '0x504001e0504500202d40041024c00000';
    const scriptData = hexlify(
      concat([transaction.contractId, '0x00000000000000000000000000000000'])
    );
    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      maturity: 0,
      script,
      scriptData,
      inputs: [
        {
          type: InputType.Contract,
          contractId: transaction.contractId,
        },
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
      ],
      witnesses: [],
    });

    const result = await response.wait();

    const receipt = result.receipts[1] as Receipt;
    expect(receipt.type).to.equal(ReceiptType.Log);
    expect((receipt.data as any).val0.toNumber()).to.equal(0x11);
    expect((receipt.data as any).val1.toNumber()).to.equal(0x2a);
    expect((receipt.data as any).val2.toNumber()).to.equal(0x3b);
  });
});
