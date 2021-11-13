import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Receipt, Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { expect } from 'chai';

import { getCoinUtxoId, getContractId } from '.';
import Provider from './provider';
import type { TransactionRequest } from './transaction-request';

const emptyTreeRoot = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

describe('Provider', () => {
  it('Can get client version', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).to.equal('0.1.0');
  });

  it('Can call', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const script = Uint8Array.from(
      // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
      [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
    );
    const scriptData = Uint8Array.from([]);
    const inputs = [] as any[];
    const outputs = [] as any[];
    const witnesses = [] as any[];

    const transactionRequest: TransactionRequest = {
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script,
      scriptData,
      inputs,
      outputs,
      witnesses,
    };

    const response = await provider.call(transactionRequest);

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

    expect(response.receipts).to.deep.equal(expectedReceipts);
  });

  it('Can dryRun', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const script = Uint8Array.from(
      // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
      [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
    );
    const scriptData = Uint8Array.from([]);
    const inputs = [] as any[];
    const outputs = [] as any[];
    const witnesses = [] as any[];

    const transaction: Transaction = {
      type: TransactionType.Script,
      data: {
        gasPrice: BigNumber.from(0),
        gasLimit: BigNumber.from(1000000),
        maturity: BigNumber.from(0),
        scriptLength: BigNumber.from(script.length),
        scriptDataLength: BigNumber.from(scriptData.length),
        inputsCount: BigNumber.from(inputs.length),
        outputsCount: BigNumber.from(outputs.length),
        witnessesCount: BigNumber.from(witnesses.length),
        receiptsRoot: emptyTreeRoot,
        script: hexlify(script),
        scriptData: hexlify(scriptData),
        inputs,
        outputs,
        witnesses,
      },
    };

    const receipts = await provider.dryRun(transaction);

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

    expect(receipts).to.deep.equal(expectedReceipts);
  });

  it('Can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const id = await provider.startSession();

    const resetSuccess = await provider.reset(id);
    expect(resetSuccess).to.equal(true);

    const endSessionSuccess = await provider.endSession(id);
    expect(endSessionSuccess).to.equal(true);
  });

  it('Can upload and call a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const bytecode = arrayify(
      '0x900000044700000000000000000003f45db8c00110bae3005d42e00c104103005d46e00d104513005d4ae00d104923005d4ae00d104923005d4860495d4ee00a135124c05b0140165d4ee00b135124c05b01406c240000005d48604a5d4ca0005d4cb0005d4c60051a4d2000505130001a4d00001a5540001a513000504c0020295955131a4d60005b4c106a1a4d10001a5100005d42e0081a54500091000010705400025f5500001a4150001a5500005d42e0091a58500091000010705800025f5900001a4160001a5950001a55000050400008295d65501a4170005b4010481a4130001a5540001a585000910000201a5c50009100004050600020285d06005041702028415600506180203f597600920000401a4160001a550000900000571a4130001a4d40001a505000910000201a58500091000040505c0020285905c050416020284135c0505d7020405165c0920000401a4140001a5500001a4150001a4d0000384130001a4d00001a4130001a5120005d4940041a5100001a412000104905001a4120001a4d00001a4150001a4930001a4d00001a4120003a4d00001a4900009000006b1a490000240000005d40604a5d48a0005d48b0005d4860051a4910001a4d0000505130005d4ee0081a54500091000010705400025f5530001a4d50001a5530005d4ee0091a58500091000010705800025f5930001a4d60001a5950001a553000504c0008295d65531a4d70005b4c10961a4d20001a5540001a585000910000201a5c50009100004050600020285d3600504d7020284d5600506180203f597600920000401a4d60001a553000900000a51a4d20001a4940001a505000910000201a58500091000040505c0020285935c0504d6020284d25c0505d7020405165c0920000401a4940001a5520001a4950001a4d2000384930001a4d20001a4930001a5100005d5940081a5120001a496000205944801a4960001a4d20001a4950001a5130001a4d20001a4940003a4d20001a4910001a450000504d10205d46e0081a50500091000010705000025f5110001a4540001a5110005d46e0091a54500091000010705400025f5510001a4550001a5540001a51100050440008295955111a4560005b4410dc1a4520001a5130001a545000910000201a58500091000040505c0020285915c050456020284545c0505d70203f5565c0920000401a4550001a511000900000eb1a4520001a4930001a4c5000910000201a545000910000405058002028551580504550202845258050596020404d5580920000401a4530001a5110001a4540001a491000384520001a4910001a4520001a4d00005d4130081a4d10001a450000104114c01a4500001a4910001a4140001a4520001a4900001a4110003a490000240000009299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000b35da7e00000000063af323e00000000000003f40000000000000414'
    );
    const transaction = await provider.submitContract(bytecode);
    const contractUtxoId = getCoinUtxoId(transaction.transactionId, 0);

    // Call the contract
    await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      maturity: 0,
      script: hexlify([17, 64, 0, 0, 17, 68, 66, 64, 89, 20, 0, 0, 83, 64, 4, 17, 52, 4, 0, 0]),
      scriptData: '0x',
      inputs: [
        {
          type: InputType.Contract,
          data: {
            utxoID: contractUtxoId,
            balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
            stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
            contractID: transaction.contractId,
          },
        },
      ],
      outputs: [],
      witnesses: [],
    });
  });
});
