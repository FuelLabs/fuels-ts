import type {
  TransactionResultReceipt,
  Operation,
  TransactionSummary,
  TransactionResult,
  OutputChange,
  BigNumberish,
} from 'fuels';
import {
  Address,
  BN,
  getTransactionsSummaries,
  getTransactionSummary,
  getTransactionSummaryFromRequest,
  ScriptTransactionRequest,
  TransactionTypeName,
  Wallet,
  AddressType,
  OperationName,
  ChainName,
  bn,
  OutputType,
  TRANSACTIONS_PAGE_SIZE_LIMIT,
  FuelError,
  ErrorCode,
  sha256,
  concat,
  ZeroBytes32,
} from 'fuels';
import {
  ASSET_A,
  ASSET_B,
  expectToThrowFuelError,
  launchTestNode,
  TestAssetId,
  TestMessage,
} from 'fuels/test-utils';

import {
  MultiTokenContractFactory,
  TokenContractFactory,
  TokenContract,
  AbiContractFactory,
  OptionsFactory,
  AdvancedLoggingFactory,
  AdvancedLoggingOtherContractFactory,
  ScriptCallLoggingContracts,
  CallTestContractFactory,
} from '../test/typegen';
import type { StructDoubleGenericInput } from '../test/typegen/contracts/AbiContract';
import type { ContractIdInput, TransferParamsInput } from '../test/typegen/contracts/TokenContract';

import { U8_MAX, U32_MAX } from './abi/constants';

function convertBnsToHex(value: unknown): unknown {
  if (value instanceof BN) {
    return value.toHex();
  }

  if (Array.isArray(value)) {
    return value.map((v) => convertBnsToHex(v));
  }

  if (typeof value === 'object') {
    // imagine, typeof null returns 'object'...
    if (value === null) {
      return value;
    }
    const entries = Object.entries(value).map(([key, v]) => [key, convertBnsToHex(v)]);
    return Object.fromEntries(entries);
  }

  return value;
}

/**
 * @group node
 * @group browser
 */
describe('TransactionSummary', () => {
  const validateTxSummary = (params: {
    transaction: TransactionResult | TransactionSummary;
    isRequest?: boolean;
  }) => {
    const { transaction, isRequest } = params;

    expect(transaction.fee).toStrictEqual(expect.any(BN));
    expect(transaction.gasUsed).toStrictEqual(expect.any(BN));
    expect(transaction.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transaction.type).toEqual(TransactionTypeName.Script);
    expect(transaction.receipts).toStrictEqual(expect.any(Array<TransactionResultReceipt>));
    expect(transaction.isTypeMint).toBe(false);
    expect(transaction.isTypeCreate).toBe(false);
    expect(transaction.isTypeScript).toBe(true);
    expect(transaction.isTypeBlob).toBe(false);
    expect(transaction.isStatusFailure).toBe(false);
    expect(transaction.isStatusSuccess).toBe(!isRequest);
    expect(transaction.isStatusPending).toBe(false);
    if (!isRequest) {
      expect(transaction.time).toEqual(expect.any(String));
      expect(transaction.status).toEqual(expect.any(String));
      expect(transaction.date).toEqual(expect.any(Date));
    }
  };

  it('should ensure getTransactionSummary executes just fine', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender, destination],
    } = launched;

    const tx = await sender.transfer(destination.address, 1000, await provider.getBaseAssetId());
    const submittedTxResult = await tx.waitForResult();

    const laterFetchedResult = await getTransactionSummary({
      id: tx.id,
      provider,
    });

    validateTxSummary({
      transaction: submittedTxResult,
    });

    validateTxSummary({
      transaction: laterFetchedResult,
    });

    /**
     * Ensure both the original response and the subsequently fetched singular response
     * contain the blockId
     */
    expect(submittedTxResult.blockId).toBeDefined();
    expect(laterFetchedResult.blockId).toBeDefined();

    // Ensure the two responses are the same
    expect(convertBnsToHex(submittedTxResult)).toStrictEqual(convertBnsToHex(laterFetchedResult));
  });

  it('should ensure getTransactionsSummaries executes just fine', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender, destination],
    } = launched;

    const amountToTransfer = 100;

    const tx1 = await sender.transfer(
      sender.address,
      amountToTransfer,
      await provider.getBaseAssetId()
    );
    const txResult1 = await tx1.waitForResult();

    const tx2 = await sender.transfer(
      destination.address,
      amountToTransfer * 2,
      await provider.getBaseAssetId()
    );
    const txResult2 = await tx2.waitForResult();

    const { transactions: submittedTxResult } = await getTransactionsSummaries({
      provider,
      filters: {
        first: 2,
        owner: sender.address.toB256(),
      },
    });

    expect(submittedTxResult.length).toBe(2);

    submittedTxResult.forEach((transactionSummary) => {
      validateTxSummary({
        transaction: transactionSummary,
      });
    });

    expect(txResult1.blockId).toBeDefined();
    expect(txResult2.blockId).toBeDefined();

    /**
     * When fetching list of transactions, the blockId is not returned
     */
    expect(convertBnsToHex(submittedTxResult[0])).toStrictEqual({
      ...(convertBnsToHex(txResult1) as TransactionResult),
      blockId: undefined,
    });
    expect(convertBnsToHex(submittedTxResult[1])).toStrictEqual({
      ...(convertBnsToHex(txResult2) as TransactionResult),
      blockId: undefined,
    });
  });

  it('should ensure getTransactionsSummaries limits TX pagination number', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender],
    } = launched;

    await expectToThrowFuelError(
      () =>
        getTransactionsSummaries({
          provider,
          filters: {
            first: TRANSACTIONS_PAGE_SIZE_LIMIT + 1,
            owner: sender.address.toB256(),
          },
        }),
      new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'Pagination limit for this query cannot exceed 60 items'
      )
    );

    await expectToThrowFuelError(
      () =>
        getTransactionsSummaries({
          provider,
          filters: {
            last: TRANSACTIONS_PAGE_SIZE_LIMIT + 1,
            owner: sender.address.toB256(),
          },
        }),
      new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'Pagination limit for this query cannot exceed 60 items'
      )
    );

    // When using limit it should work
    await expect(
      getTransactionsSummaries({
        provider,
        filters: {
          last: TRANSACTIONS_PAGE_SIZE_LIMIT,
          owner: sender.address.toB256(),
        },
      })
    ).resolves.toBeDefined();
  });

  it('should ensure getTransactionSummaryFromRequest executes just fine [TX REQUEST]', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender],
    } = launched;

    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
    });

    await request.estimateAndFund(sender);

    const transactionRequest = await sender.populateTransactionWitnessesSignature(request);

    const transactionSummary = await getTransactionSummaryFromRequest({
      provider,
      transactionRequest,
    });

    validateTxSummary({
      transaction: transactionSummary,
      isRequest: true,
    });

    expect(transactionSummary.transaction).toStrictEqual(transactionRequest.toTransaction());
  });

  it('should ensure submitted transaction returns block ID', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [adminWallet, receiver],
    } = launched;

    const submitted = await adminWallet.transfer(receiver.address, 1000, ASSET_A);
    const response = await submitted.waitForResult();

    validateTxSummary({
      transaction: response,
    });

    expect(response.blockId).toBeDefined();
    expect(response.blockId).toEqual(expect.any(String));
  });

  it('should ensure listed TX summaries do not include block ID', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender, receiver],
    } = launched;

    const length = 5;

    for (let i = 0; i < length; i++) {
      const submitted = await sender.transfer(receiver.address, 1000, ASSET_A);
      await submitted.waitForResult();
    }

    const { transactions } = await getTransactionsSummaries({
      provider,
      filters: {
        owner: sender.address.toB256(),
        first: 50,
      },
    });

    expect(transactions).toHaveLength(length);
    transactions.forEach((transaction) => {
      expect(transaction.blockId).toBeUndefined();
    });
  });

  it('should ensure getTransactionsSummaries executes just fine [w/ ABI map]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    const contractId = contract.id.toB256();

    const call = await contract.functions.mint_coins(bn(100_000)).call();
    const res = await call.waitForResult();

    const summary = await res.transactionResponse.getTransactionSummary({
      [contractId]: TokenContract.abi,
    });

    validateTxSummary({
      transaction: summary,
    });
  });

  it('should ensure getTransactionsSummaries executes just fine [w/ ABI & call op]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    const contractId = contract.id.toB256();

    const call = await contract.functions.mint_coins(bn(100_000)).call();
    const res = await call.waitForResult();

    const summary = await res.transactionResponse.getTransactionSummary({
      [contractId]: TokenContract.abi,
    });

    validateTxSummary({
      transaction: summary,
    });

    const { operations } = summary;
    const callOperation = operations[0];

    expect(callOperation.name).toBe(OperationName.contractCall);
    expect(callOperation.to?.address).toBe(contractId);
    expect(callOperation.calls?.[0].functionName).toBe('mint_coins');
    expect(callOperation.calls?.[0].functionSignature).toBe('mint_coins(u64)');
    expect(callOperation.calls?.[0].argumentsProvided).toStrictEqual({
      mint_amount: bn(100_000).toHex(),
    });
  });

  it('should ensure getTransactionsSummaries executes just fine [w/ ABI & call w/ transfer op]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    const contractId = contract.id.toB256();
    const recipient = Wallet.generate({ provider });

    const setupCall = await contract.functions.mint_coins(100000).call();
    const setupRes = await setupCall.waitForResult();
    const { assetId } = setupRes.transactionResult.mintedAssets[0];

    const call = await contract.functions
      .transfer_to_address({ bits: recipient.address.toB256() }, { bits: assetId }, 1000)
      .call();
    const res = await call.waitForResult();

    const summary = await res.transactionResponse.getTransactionSummary({
      [contractId]: TokenContract.abi,
    });

    validateTxSummary({
      transaction: summary,
    });

    const { operations } = summary;
    const transferOperation = operations[0];
    const callOperation = operations[1];

    expect(transferOperation.name).toBe(OperationName.transfer);
    expect(transferOperation.to?.address).toBe(recipient.address.toB256());
    expect(transferOperation.assetsSent?.[0].assetId).toBe(assetId);
    expect(transferOperation.assetsSent?.[0].amount).toStrictEqual(bn(1000));

    expect(callOperation.name).toBe(OperationName.contractCall);
    expect(callOperation.to?.address).toBe(contractId);
    expect(callOperation.calls?.[0].functionName).toBe('transfer_to_address');
    expect(callOperation.calls?.[0].functionSignature).toBe(
      'transfer_to_address(s(b256),s(b256),u64)'
    );
    expect(callOperation.calls?.[0].argumentsProvided).toStrictEqual({
      recipient: { bits: recipient.address.toB256() },
      asset_id: { bits: assetId },
      amount: bn(1000).toHex(),
    });
  });

  it('should ensure getTransactionSummary fn executes just fine [w/ ABI & call op]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    const contractId = contract.id.toB256();

    const call = await contract.functions.mint_coins(bn(100_000)).call();
    const res = await call.waitForResult();

    const summary = await getTransactionSummary({
      id: res.transactionResponse.id,
      provider,
      abiMap: {
        [contractId]: TokenContract.abi,
      },
    });

    validateTxSummary({
      transaction: summary,
    });

    const { operations } = summary;
    const callOperation = operations[0];

    expect(callOperation.name).toBe(OperationName.contractCall);
    expect(callOperation.to?.address).toBe(contractId);
    expect(callOperation.calls?.[0].functionName).toBe('mint_coins');
    expect(callOperation.calls?.[0].functionSignature).toBe('mint_coins(u64)');
    expect(callOperation.calls?.[0].argumentsProvided).toStrictEqual({
      mint_amount: bn(100_000).toHex(),
    });

    const responseSummary = await res.transactionResponse.getTransactionSummary({
      [contractId]: TokenContract.abi,
    });

    expect(summary.operations).toStrictEqual(responseSummary.operations);
  });

  it('should ensure getTransactionSummary fn executes just fine [w/ ABI & call w/ transfer op]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    const contractId = contract.id.toB256();
    const recipient = Wallet.generate({ provider });

    const setupCall = await contract.functions.mint_coins(100000).call();
    const setupRes = await setupCall.waitForResult();
    const { assetId } = setupRes.transactionResult.mintedAssets[0];

    const call = await contract.functions
      .transfer_to_address({ bits: recipient.address.toB256() }, { bits: assetId }, 1000)
      .call();
    const res = await call.waitForResult();

    const summary = await getTransactionSummary({
      id: res.transactionResponse.id,
      provider,
      abiMap: {
        [contractId]: TokenContract.abi,
      },
    });

    validateTxSummary({
      transaction: summary,
    });

    const { operations } = summary;
    const transferOperation = operations[0];
    const callOperation = operations[1];

    expect(transferOperation.name).toBe(OperationName.transfer);
    expect(transferOperation.to?.address).toBe(recipient.address.toB256());
    expect(transferOperation.assetsSent?.[0].assetId).toBe(assetId);
    expect(transferOperation.assetsSent?.[0].amount).toStrictEqual(bn(1000));

    expect(callOperation.name).toBe(OperationName.contractCall);
    expect(callOperation.to?.address).toBe(contractId);
    expect(callOperation.calls?.[0].functionName).toBe('transfer_to_address');
    expect(callOperation.calls?.[0].functionSignature).toBe(
      'transfer_to_address(s(b256),s(b256),u64)'
    );
    expect(callOperation.calls?.[0].argumentsProvided).toStrictEqual({
      recipient: { bits: recipient.address.toB256() },
      asset_id: { bits: assetId },
      amount: bn(1000).toHex(),
    });

    const responseSummary = await res.transactionResponse.getTransactionSummary({
      [contractId]: TokenContract.abi,
    });

    expect(summary.operations).toStrictEqual(responseSummary.operations);
  });

  it('should ensure getTransactionsSummaries executes just fine [w/ ABI & multicall]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenContractFactory,
        },
        {
          factory: AbiContractFactory,
        },
        {
          factory: OptionsFactory,
        },
        {
          factory: CallTestContractFactory,
        },
      ],
    });

    const {
      contracts: [tokenContract, abiContract, optionsContract, callTestContract],
      provider,
    } = launched;

    // Call 3 Parameters
    const inputX: StructDoubleGenericInput<[string, string, string], number> = {
      a: [
        '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        '0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
      ],
      b: 10,
    };

    const inputY: [
      StructDoubleGenericInput<BigNumberish, boolean>,
      StructDoubleGenericInput<BigNumberish, boolean>,
      StructDoubleGenericInput<BigNumberish, boolean>,
      StructDoubleGenericInput<BigNumberish, boolean>,
    ] = [
      { a: '0x63', b: false },
      { a: '0xc7', b: false },
      { a: '0x7d0', b: false },
      { a: '0x1f', b: true },
    ];

    const inputZ: [string, boolean] = ['Input', true];

    const inputA = { a: true, b: 10 };

    // Call 4 Parameters
    const someInput = {
      one: {
        a: U8_MAX,
      },
      two: U32_MAX,
    };

    const recipient = Wallet.generate({ provider });

    // Asset Sub ID used by the contract is a zeroed out b256
    const assetId = sha256(concat([tokenContract.id.toB256(), ZeroBytes32]));

    const calls = [
      tokenContract.functions.mint_coins(100000), // Call 1
      tokenContract.functions.transfer_to_address(
        { bits: recipient.address.toB256() },
        { bits: assetId },
        1000
      ), // Call 2
      abiContract.functions.multi_arg_complex(inputX, inputY, inputZ, inputA), // Call 3
      optionsContract.functions.echo_struct_enum_option(someInput), // Call 4
      callTestContract.functions.return_context_amount().callParams({
        forward: { amount: bn(100000), assetId: TestAssetId.A.value },
      }), // Call 5
    ];

    const multiCall = await tokenContract.multiCall(calls).call();
    const res = await multiCall.waitForResult();

    const tokenId = tokenContract.id.toB256();
    const abiId = abiContract.id.toB256();
    const optionId = optionsContract.id.toB256();
    const callTestId = callTestContract.id.toB256();

    const summary = await res.transactionResponse.getTransactionSummary({
      [tokenId]: tokenContract.interface.jsonAbi,
      [abiId]: abiContract.interface.jsonAbi,
      [optionId]: optionsContract.interface.jsonAbi,
      [callTestId]: callTestContract.interface.jsonAbi,
    });

    validateTxSummary({
      transaction: summary,
    });

    const { operations } = summary;
    const transferOperation = operations[0]; // Exists because contract fn performs a transfer
    const callOperation1 = operations[1];
    const callOperation2 = operations[2];
    const callOperation3 = operations[3];
    const callOperation4 = operations[4];
    const callOperation5 = operations[5];

    expect(transferOperation.name).toBe(OperationName.transfer);
    expect(transferOperation.to?.address).toBe(recipient.address.toB256());
    expect(transferOperation.assetsSent?.[0].assetId).toBe(assetId);
    expect(transferOperation.assetsSent?.[0].amount).toStrictEqual(bn(1000));

    // Contract Call 1
    expect(callOperation1.name).toBe(OperationName.contractCall);
    expect(callOperation1.to?.address).toBe(tokenId);
    expect(callOperation1.calls?.[0].functionName).toBe('mint_coins');
    expect(callOperation1.calls?.[0].functionSignature).toBe('mint_coins(u64)');
    expect(callOperation1.calls?.[0].argumentsProvided).toStrictEqual({
      mint_amount: bn(100000).toHex(),
    });
    expect(callOperation1.calls?.[0].amount).toBeUndefined();
    expect(callOperation1.calls?.[0].assetId).toBeUndefined();

    // Contract Call 2
    expect(callOperation2.name).toBe(OperationName.contractCall);
    expect(callOperation2.to?.address).toBe(tokenId);
    expect(callOperation2.calls?.[0].functionName).toBe('transfer_to_address');
    expect(callOperation2.calls?.[0].functionSignature).toBe(
      'transfer_to_address(s(b256),s(b256),u64)'
    );
    expect(callOperation2.calls?.[0].argumentsProvided).toStrictEqual({
      recipient: { bits: recipient.address.toB256() },
      asset_id: { bits: assetId },
      amount: bn(1000).toHex(),
    });
    expect(callOperation2.calls?.[0].amount).toBeUndefined();
    expect(callOperation2.calls?.[0].assetId).toBeUndefined();

    // Contract Call 3
    expect(callOperation3.name).toBe(OperationName.contractCall);
    expect(callOperation3.to?.address).toBe(abiId);
    expect(callOperation3.calls?.[0].functionName).toBe('multi_arg_complex');
    expect(callOperation3.calls?.[0].functionSignature).toBe(
      'multi_arg_complex(s<a[b256;3],u8>(a[b256;3],u8),a[s<u64,bool>(u64,bool);4],(str[5],bool),s(bool,u32))'
    );
    expect(callOperation3.calls?.[0].argumentsProvided).toStrictEqual({
      x: inputX,
      y: inputY,
      z: inputZ,
      a: inputA,
    });
    expect(callOperation3.calls?.[0].amount).toBeUndefined();
    expect(callOperation3.calls?.[0].assetId).toBeUndefined();

    // Contract Call 4
    expect(callOperation4.name).toBe(OperationName.contractCall);
    expect(callOperation4.to?.address).toBe(optionId);
    expect(callOperation4.calls?.[0].functionName).toBe('echo_struct_enum_option');
    expect(callOperation4.calls?.[0].functionSignature).toBe(
      'echo_struct_enum_option(s(e(e<u8>((),u8),e<u16>((),u16)),e<u32>((),u32)))'
    );
    expect(callOperation4.calls?.[0].argumentsProvided).toStrictEqual({
      arg: someInput,
    });
    expect(callOperation4.calls?.[0].amount).toBeUndefined();
    expect(callOperation4.calls?.[0].assetId).toBeUndefined();

    // Contract Call 5
    expect(callOperation5.name).toBe(OperationName.contractCall);
    expect(callOperation5.to?.address).toBe(callTestId);
    expect(callOperation5.calls?.[0].functionName).toBe('return_context_amount');
    expect(callOperation5.calls?.[0].functionSignature).toBe('return_context_amount()');
    expect(callOperation5.calls?.[0].argumentsProvided).toBeUndefined();
    expect(callOperation5.calls?.[0].amount?.toString()).equal('100000');
    expect(callOperation5.calls?.[0].assetId).equal(TestAssetId.A.value);
  });

  it('should ensure getTransactionsSummaries does not attempt to decode external call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        { factory: AdvancedLoggingFactory },
        { factory: AdvancedLoggingOtherContractFactory },
      ],
    });

    const {
      provider,
      contracts: [advancedLogContract, otherAdvancedLogContract],
      wallets: [wallet],
    } = launched;

    const script = new ScriptCallLoggingContracts(wallet);

    const call = await script.functions
      .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256())
      .addContracts([advancedLogContract, otherAdvancedLogContract])
      .call();

    const {
      transactionId,
      transactionResult: { operations },
    } = await call.waitForResult();

    /**
     * Attempting to decode call receipt from an external contract call made by the Sway
     * built-in fn `abi` will result in error
     */
    const summary = await getTransactionSummary({
      id: transactionId,
      provider,
      abiMap: {
        [advancedLogContract.id.toB256()]: advancedLogContract.interface.jsonAbi,
      },
    });

    expect(summary.operations).toHaveLength(2);
    expect(summary.operations[0].calls?.length).toBe(0);
    expect(summary.operations[1].calls?.length).toBe(0);

    expect(operations).toStrictEqual(summary.operations);
  });

  describe('Transfer Operations', () => {
    const validateTransferOperation = (params: {
      operations: Operation[];
      sender: Address;
      recipients: { address: Address; quantities: { amount: number; assetId: string }[] }[];
      fromType: AddressType;
      toType: AddressType;
    }) => {
      const { operations, recipients, sender, fromType, toType } = params;

      recipients.forEach(({ address, quantities }, index) => {
        expect(operations[index].name).toBe(OperationName.transfer);
        expect(operations[index].from?.type).toBe(fromType);
        expect(operations[index].from?.address).toBe(sender.toB256());
        expect(operations[index].to?.type).toBe(toType);
        expect(operations[index].to?.address).toBe(address.toB256());
        expect(operations[index].assetsSent).toHaveLength(quantities.length);

        quantities.forEach(({ amount, assetId }, quantitiesIndex) => {
          expect(Number(operations[index].assetsSent?.[quantitiesIndex].amount)).toBe(amount);
          expect(operations[index].assetsSent?.[quantitiesIndex].assetId).toBe(assetId);
        });
      });
    };

    it('should ensure transfer operation is assembled (ACCOUNT TRANSFER)', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const recipient = Wallet.generate({ provider });

      const amount = 1233;

      const tx1 = await wallet.transfer(recipient.address, amount, await provider.getBaseAssetId());

      const { operations } = await tx1.waitForResult();

      expect(operations).toHaveLength(1);

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.account,
        recipients: [
          {
            address: recipient.address,
            quantities: [{ amount, assetId: await provider.getBaseAssetId() }],
          },
        ],
      });
    });

    it('should ensure transfer operation is assembled (CUSTOM ACCOUNT TRANSFER)', async () => {
      const transferAmount = 1233;
      const minorAmount = 1000;
      const majorAmount = 100_000_000_000;
      const transferBackAmount = majorAmount - 10_000;

      using launched = await launchTestNode({
        walletsConfig: {
          coinsPerAsset: 2,
          amountPerCoin: majorAmount,
        },
      });

      const {
        provider,
        wallets: [majorWallet],
      } = launched;

      const baseAssetId = await provider.getBaseAssetId();
      const recipient = Wallet.generate({ provider });
      const minorWallet = Wallet.generate({ provider });

      // Adding small funds to the semi funded wallet
      const submitted = await majorWallet.transfer(
        minorWallet.address,
        minorAmount,
        await provider.getBaseAssetId()
      );
      await submitted.waitForResult();

      const majorResources = await majorWallet.getResourcesToSpend([[majorAmount, baseAssetId]]);
      const minorResources = await minorWallet.getResourcesToSpend([[minorAmount, baseAssetId]]);

      let request = new ScriptTransactionRequest({
        gasLimit: 100_000,
        maxFee: 120_000,
      });
      request.addResources([...majorResources, ...minorResources]);

      // Add transfer to recipient
      request.addCoinOutput(recipient.address, transferAmount, await provider.getBaseAssetId());

      // Add transfer to self
      request.addCoinOutput(
        majorWallet.address,
        transferBackAmount,
        await provider.getBaseAssetId()
      );

      // Explicitly setting the Output Change address to the recipient
      const index = request.outputs.findIndex((output) => output.type === OutputType.Change);
      (<OutputChange>request.outputs[index]).to = recipient.address.toB256();

      request = await majorWallet.populateTransactionWitnessesSignature(request);
      request = await minorWallet.populateTransactionWitnessesSignature(request);

      const tx = await majorWallet.sendTransaction(request);
      const { operations } = await tx.waitForResult();

      validateTransferOperation({
        operations,
        sender: majorWallet.address,
        fromType: AddressType.account,
        toType: AddressType.account,
        recipients: [
          {
            address: recipient.address,
            quantities: [{ amount: transferAmount, assetId: await provider.getBaseAssetId() }],
          },
          {
            address: majorWallet.address,
            quantities: [{ amount: transferBackAmount, assetId: await provider.getBaseAssetId() }],
          },
        ],
      });
    });

    it('should ensure transfer operation is assembled (ACCOUNT TRANSFER TO CONTRACT)', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: MultiTokenContractFactory,
          },
        ],
      });

      const {
        contracts: [contract],
        wallets: [wallet],
      } = launched;

      const amount = 234;

      const tx1 = await wallet.transferToContract(contract.id, amount, ASSET_A);

      const { operations } = await tx1.waitForResult();

      expect(operations).toHaveLength(1);

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.contract,
        recipients: [{ address: contract.id, quantities: [{ amount, assetId: ASSET_A }] }],
      });
    });

    it('should ensure transfer operation is assembled (CONTRACT TRANSFER TO ACCOUNT)', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: TokenContractFactory,
          },
        ],
      });

      const {
        provider,
        contracts: [contract],
      } = launched;

      const recipient = Wallet.generate({ provider });
      const amount = 1055;

      const call1 = await contract.functions.mint_coins(100000).call();
      const res1 = await call1.waitForResult();

      const { assetId } = res1.transactionResult.mintedAssets[0];

      const call2 = await contract.functions
        .transfer_to_address({ bits: recipient.address.toB256() }, { bits: assetId }, amount)
        .call();

      const {
        transactionResult: { operations },
      } = await call2.waitForResult();

      validateTransferOperation({
        operations,
        sender: contract.id,
        fromType: AddressType.contract,
        toType: AddressType.account,
        recipients: [{ address: recipient.address, quantities: [{ amount, assetId }] }],
      });
    });

    it(
      'should ensure transfer operations are assembled (CONTRACT TRANSFER TO ACCOUNTS)',
      async () => {
        using launched = await launchTestNode({
          contractsConfigs: [
            {
              factory: TokenContractFactory,
            },
          ],
        });

        const {
          contracts: [senderContract],
          provider,
          wallets: [wallet],
        } = launched;

        const walletA = Wallet.generate({ provider });
        const walletB = Wallet.generate({ provider });

        const submitted1 = await wallet.transfer(walletA.address, 50_000, ASSET_A);
        await submitted1.waitForResult();

        const submitted2 = await wallet.transfer(walletB.address, 50_000, ASSET_B);
        await submitted2.waitForResult();

        senderContract.account = wallet;
        const fundAmount = 5_000;

        const assets = [provider.getBaseAssetId(), ASSET_A, ASSET_B];
        for await (const asset of assets) {
          const tx = await wallet.transferToContract(senderContract.id, fundAmount, asset);
          await tx.waitForResult();
        }

        const transferData1 = {
          address: Wallet.generate({ provider }).address,
          quantities: [
            { amount: 543, assetId: ASSET_A },
            { amount: 40, assetId: ASSET_B },
            { amount: 123, assetId: await provider.getBaseAssetId() },
          ],
        };
        const transferData2 = {
          address: Wallet.generate({ provider }).address,
          quantities: [
            { amount: 12, assetId: await provider.getBaseAssetId() },
            { amount: 612, assetId: ASSET_B },
          ],
        };

        const { waitForResult } = await senderContract.functions
          .multi_address_transfer([
            // 3 Transfers for recipient contract 1
            ...transferData1.quantities.map(({ amount, assetId }) => ({
              recipient: { bits: transferData1.address.toB256() },
              asset_id: { bits: assetId },
              amount,
            })),
            // 2 Transfers for recipient contract 2
            ...transferData2.quantities.map(({ amount, assetId }) => ({
              recipient: { bits: transferData2.address.toB256() },
              asset_id: { bits: assetId },
              amount,
            })),
          ] as [
            TransferParamsInput<ContractIdInput>,
            TransferParamsInput<ContractIdInput>,
            TransferParamsInput<ContractIdInput>,
            TransferParamsInput<ContractIdInput>,
            TransferParamsInput<ContractIdInput>,
          ])
          .call();

        const {
          transactionResult: { operations },
        } = await waitForResult();

        validateTransferOperation({
          operations,
          sender: senderContract.id,
          fromType: AddressType.contract,
          toType: AddressType.account,
          recipients: [transferData1, transferData2],
        });
      },
      { timeout: 10_000 }
    );

    it('should ensure transfer operation is assembled (CONTRACT TRANSFER TO CONTRACT)', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: TokenContractFactory,
          },
          {
            factory: TokenContractFactory,
          },
        ],
      });

      const {
        wallets: [wallet],
        contracts: [contractSender, contractRecipient],
      } = launched;

      contractSender.account = wallet;

      const call1 = await contractSender.functions.mint_coins(100000).call();
      const {
        transactionResult: { mintedAssets },
      } = await call1.waitForResult();

      const amount = 2345;
      const { assetId } = mintedAssets[0];
      const call2 = await contractSender.functions
        .transfer_to_contract(
          { bits: contractRecipient.id.toB256() },
          { bits: mintedAssets[0].assetId },
          amount
        )
        .call();

      const {
        transactionResult: { operations },
      } = await call2.waitForResult();

      validateTransferOperation({
        operations,
        sender: contractSender.id,
        fromType: AddressType.contract,
        toType: AddressType.contract,
        recipients: [{ address: contractRecipient.id, quantities: [{ amount, assetId }] }],
      });
    });

    it('should ensure transfer operations are assembled (CONTRACT TRANSFER TO CONTRACTS)', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: TokenContractFactory,
          },
          {
            factory: TokenContractFactory,
          },
          {
            factory: TokenContractFactory,
          },
        ],
      });

      const {
        provider,
        wallets: [wallet],
        contracts: [senderContract, contractRecipient1, contractRecipient2],
      } = launched;

      senderContract.account = wallet;
      const fundAmount = 5_000;

      const assets = [provider.getBaseAssetId(), ASSET_A, ASSET_B];
      for await (const asset of assets) {
        const tx = await wallet.transferToContract(senderContract.id, fundAmount, asset);
        await tx.waitForResult();
      }

      const transferData1 = {
        address: contractRecipient1.id,
        quantities: [
          { amount: 300, assetId: ASSET_A },
          { amount: 400, assetId: ASSET_B },
        ],
      };
      const transferData2 = {
        address: contractRecipient2.id,
        quantities: [
          { amount: 500, assetId: ASSET_A },
          { amount: 700, assetId: ASSET_B },
          { amount: 100, assetId: await provider.getBaseAssetId() },
        ],
      };

      const { waitForResult } = await senderContract.functions
        .multi_contract_transfer([
          // 2 Transfers for recipient contract 1
          ...transferData1.quantities.map(({ amount, assetId }) => ({
            recipient: { bits: transferData1.address.toB256() },
            asset_id: { bits: assetId },
            amount,
          })),
          // 3 Transfers for recipient contract 2
          ...transferData2.quantities.map(({ amount, assetId }) => ({
            recipient: { bits: transferData2.address.toB256() },
            asset_id: { bits: assetId },
            amount,
          })),
        ] as [
          TransferParamsInput<ContractIdInput>,
          TransferParamsInput<ContractIdInput>,
          TransferParamsInput<ContractIdInput>,
          TransferParamsInput<ContractIdInput>,
          TransferParamsInput<ContractIdInput>,
        ])
        .call();

      const {
        transactionResult: { operations },
      } = await waitForResult();

      validateTransferOperation({
        operations,
        sender: senderContract.id,
        fromType: AddressType.contract,
        toType: AddressType.contract,
        recipients: [transferData1, transferData2],
      });
    });

    it('should ensure transfer operations are assembled (CUSTOM SCRIPT TRANSFER)', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const walletA = Wallet.generate({ provider });
      const walletB = Wallet.generate({ provider });

      const submitted1 = await wallet.transfer(walletA.address, 10_000, ASSET_A);
      await submitted1.waitForResult();

      const submitted2 = await wallet.transfer(walletB.address, 10_000, ASSET_B);
      await submitted2.waitForResult();

      const recipient1Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [{ amount: 250, assetId: ASSET_A }],
      };

      const recipient2Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 300, assetId: ASSET_A },
          { amount: 400, assetId: ASSET_B },
        ],
      };
      const recipient3Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 500, assetId: ASSET_A },
          { amount: 700, assetId: ASSET_B },
          { amount: 100, assetId: await provider.getBaseAssetId() },
        ],
      };

      const allRecipients = [recipient1Data, recipient2Data, recipient3Data];

      const request = new ScriptTransactionRequest();

      allRecipients.forEach(({ address, quantities }) => {
        quantities.forEach(({ amount, assetId }) => {
          request.addCoinOutput(address, amount, assetId);
        });
      });

      await request.estimateAndFund(wallet);

      const tx = await wallet.sendTransaction(request);

      const { operations } = await tx.waitForResult();

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.account,
        recipients: allRecipients,
      });
    });

    it('should ensure that transfer operations are assembled correctly if only seeded with a MessageInput (SPENDABLE MESSAGE)', async () => {
      const testMessage = new TestMessage({ amount: 1000000 });

      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: MultiTokenContractFactory,
          },
        ],
        walletsConfig: {
          amountPerCoin: 0,
          messages: [testMessage],
        },
      });
      const {
        contracts: [contract],
        provider,
        wallets: [wallet],
      } = launched;

      const amount = 100;

      const baseAssetId = await provider.getBaseAssetId();
      const tx1 = await wallet.transferToContract(contract.id, amount, baseAssetId);

      const { operations } = await tx1.waitForResult();

      expect(operations).toHaveLength(1);

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.contract,
        recipients: [
          {
            address: contract.id,
            quantities: [{ amount, assetId: baseAssetId }],
          },
        ],
      });
    });

    it('should ensure contract call operations are correctly assembled [WITHDRAW TO BASE LAYER]', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [sender],
      } = launched;

      const baseAssetId = await provider.getBaseAssetId();

      const recipient = Address.fromB256(
        '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
      );

      const amountToWithdraw = 10;

      const tx = await sender.withdrawToBaseLayer(recipient, amountToWithdraw);
      const result = await tx.waitForResult();

      const { operations } = result;

      expect(operations[0].name).toEqual(OperationName.withdrawFromFuel);
      expect(operations[0].from?.type).toEqual(AddressType.account);
      expect(operations[0].from?.address).toEqual(sender.address.toB256());
      expect(operations[0].to?.type).toEqual(AddressType.account);
      expect(operations[0].to?.address).toEqual(recipient.toB256());
      expect(operations[0].to?.chain).toEqual(ChainName.ethereum);
      expect(operations[0].assetsSent).toHaveLength(1);
      expect(operations[0].assetsSent?.[0].amount).toEqual(bn(amountToWithdraw));
      expect(operations[0].assetsSent?.[0].assetId).toEqual(baseAssetId);
    });

    it('Should return contract created operations', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
      } = launched;

      const tx = await MultiTokenContractFactory.deploy(wallet);
      const result = await tx.waitForResult();

      expect(result.transactionResult.operations).toHaveLength(1);
      expect(result.transactionResult.operations[0].name).toEqual(OperationName.contractCreated);
      expect(result.transactionResult.operations[0].from?.type).toEqual(AddressType.account);
      expect(result.transactionResult.operations[0].from?.address).toEqual(wallet.address.toB256());
      expect(result.transactionResult.operations[0].to?.type).toEqual(AddressType.contract);
      expect(result.transactionResult.isTypeCreate).toEqual(true);
    });

    it('should have no assets returned for contract call operations', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: TokenContractFactory,
          },
        ],
      });

      const {
        wallets: [wallet],
        contracts: [contract],
      } = launched;

      const tx = await contract.functions.mint_coins(100).call();
      const result = await tx.waitForResult();

      expect(result.transactionResult.operations).toHaveLength(1);
      expect(result.transactionResult.operations[0].name).toEqual(OperationName.contractCall);
      expect(result.transactionResult.operations[0].from?.type).toEqual(AddressType.account);
      expect(result.transactionResult.operations[0].from?.address).toEqual(wallet.address.toB256());
      expect(result.transactionResult.operations[0].to?.address).toEqual(contract.id.toB256());
      expect(result.transactionResult.operations[0].to?.type).toEqual(AddressType.contract);
      expect(result.transactionResult.operations[0].assetsSent).toBeUndefined();
    });
  });
});
