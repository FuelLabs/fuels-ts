import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { BN, bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { safeExec } from '@fuel-ts/utils/test-utils';
import * as GraphQL from 'graphql-request';

import Provider from '../src/provider';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from '../src/transaction-request';
import { ScriptTransactionRequest } from '../src/transaction-request';
import { fromTai64ToUnix, fromUnixToTai64 } from '../src/utils';

import { messageProofResponse } from './fixtures';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.20.2');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const CoinInputs: CoinTransactionRequestInput[] = [
      {
        type: InputType.Coin,
        id: '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c500',
        owner: BaseAssetId,
        assetId: BaseAssetId,
        txPointer: '0x00000000000000000000000000000000',
        amount: 100,
        witnessIndex: 0,
      },
    ];

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
      inputs: CoinInputs,
      witnesses: ['0x'],
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: bn(202),
        val1: bn(186),
        val2: bn(0),
        val3: bn(0),
        pc: bn(0x2870),
        is: bn(0x2868),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x2874),
        is: bn(0x2868),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(0x67),
      },
    ];

    expect(callResult.receipts).toStrictEqual(expectedReceipts);
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
      gasPrice: 0,
      gasLimit: 1000000,
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
        val0: bn(202),
        val1: bn(186),
        val2: bn(0),
        val3: bn(0),
        pc: bn(0x2878),
        is: bn(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x287c),
        is: bn(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(0x2c),
      },
    ]);
  });

  it('can get all chain info', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { consensusParameters } = await provider.getChain();

    expect(consensusParameters.contractMaxSize).toBeDefined();
    expect(consensusParameters.maxInputs).toBeDefined();
    expect(consensusParameters.maxOutputs).toBeDefined();
    expect(consensusParameters.maxWitnesses).toBeDefined();
    expect(consensusParameters.maxGasPerTx).toBeDefined();
    expect(consensusParameters.maxScriptLength).toBeDefined();
    expect(consensusParameters.maxScriptDataLength).toBeDefined();
    expect(consensusParameters.maxStorageSlots).toBeDefined();
    expect(consensusParameters.maxPredicateLength).toBeDefined();
    expect(consensusParameters.maxPredicateDataLength).toBeDefined();
    expect(consensusParameters.maxGasPerPredicate).toBeDefined();
    expect(consensusParameters.gasPriceFactor).toBeDefined();
    expect(consensusParameters.gasPerByte).toBeDefined();
    expect(consensusParameters.maxMessageDataLength).toBeDefined();
  });

  it('can get node info including some consensus parameters properties', async () => {
    // #region provider-definition
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { minGasPrice, gasPerByte, gasPriceFactor, maxGasPerTx, nodeVersion } =
      await provider.getNodeInfo();
    // #endregion provider-definition

    expect(minGasPrice).toBeDefined();
    expect(gasPerByte).toBeDefined();
    expect(gasPriceFactor).toBeDefined();
    expect(maxGasPerTx).toBeDefined();
    expect(nodeVersion).toBeDefined();
  });

  it('can change the provider url of the current instance', () => {
    const providerUrl1 = 'http://127.0.0.1:4000/graphql';
    const providerUrl2 = 'http://127.0.0.1:8080/graphql';
    const provider = new Provider(providerUrl1);
    const spyGraphQLClient = jest.spyOn(GraphQL, 'GraphQLClient');

    expect(provider.url).toBe(providerUrl1);
    provider.connect(providerUrl2);
    expect(provider.url).toBe(providerUrl2);
    expect(spyGraphQLClient).toBeCalledWith(providerUrl2, undefined);
  });

  it('can accept a custom fetch function', async () => {
    const providerUrl = 'http://127.0.0.1:4000/graphql';

    const customFetch = async (
      url: string,
      options: {
        body: string;
        headers: { [key: string]: string };
        [key: string]: unknown;
      }
    ) => {
      const graphqlRequest = JSON.parse(options.body);
      const { operationName } = graphqlRequest;
      if (operationName === 'getVersion') {
        const responseText = JSON.stringify({
          data: { nodeInfo: { nodeVersion: '0.30.0' } },
        });
        const response = Promise.resolve(new Response(responseText, options));

        return response;
      }
      return fetch(url, options);
    };

    const provider = new Provider(providerUrl, { fetch: customFetch });
    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can force-produce blocks', async () => {
    // #region Provider-produce-blocks
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { height: latestBlockNumberBeforeProduce } = block;

    const amountOfBlocksToProduce = 3;
    const latestBlockNumber = await provider.produceBlocks(amountOfBlocksToProduce);

    expect(latestBlockNumber.toHex()).toEqual(
      latestBlockNumberBeforeProduce.add(amountOfBlocksToProduce).toHex()
    );
    // #endregion Provider-produce-blocks
  });

  // TODO: Add back support for producing blocks with intervals by supporting the new
  // `block_production` config option for `fuel_core`.
  // See: https://github.com/FuelLabs/fuel-core/blob/def8878b986aedad8434f2d1abf059c8cbdbb8e2/crates/services/consensus_module/poa/src/config.rs#L20
  it.skip('can force-produce blocks with custom timestamps', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { time: latestBlockTimestampBeforeProduce, height: latestBlockNumberBeforeProduce } =
      block;
    const latestBlockUnixTimestampBeforeProduce = fromTai64ToUnix(
      latestBlockTimestampBeforeProduce
    );

    const amountOfBlocksToProduce = 3;
    const blockTimeInterval = 100; // 100ms
    const startTime = new Date(latestBlockUnixTimestampBeforeProduce).getTime() + 1000; // 1s after the latest block

    const latestBlockNumber = await provider.produceBlocks(amountOfBlocksToProduce, startTime);

    // Verify that the latest block number is the expected one
    expect(latestBlockNumber.toString(10)).toEqual(
      latestBlockNumberBeforeProduce.add(amountOfBlocksToProduce).toString(10)
    );

    // Verify that the produced blocks have the expected timestamps and block numbers
    const producedBlocks = (
      await Promise.all(
        Array.from({ length: amountOfBlocksToProduce }, (_, i) =>
          provider.getBlock(latestBlockNumberBeforeProduce.add(i + 1).toNumber())
        )
      )
    ).map((producedBlock) => ({
      height: producedBlock?.height.toString(10),
      time: producedBlock?.time,
    }));
    const expectedBlocks = Array.from({ length: amountOfBlocksToProduce }, (_, i) => ({
      height: latestBlockNumberBeforeProduce.add(i + 1).toString(10),
      time: fromUnixToTai64(startTime + i * blockTimeInterval),
    }));
    expect(producedBlocks).toEqual(expectedBlocks);
  });

  it('can cacheUtxo [undefined]', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    expect(provider.cache).toEqual(undefined);
  });

  it('can cacheUtxo [numerical]', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 2500,
    });

    expect(provider.cache).toBeTruthy();
    expect(provider.cache?.ttl).toEqual(2_500);
  });

  it('can cacheUtxo [invalid numerical]', () => {
    expect(() => new Provider('http://127.0.0.1:4000/graphql', { cacheUtxo: -500 })).toThrow(
      'Invalid TTL: -500. Use a value greater than zero.'
    );
  });

  it('can cacheUtxo [will not cache inputs if no cache]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const transactionRequest = new ScriptTransactionRequest({});

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    expect(provider.cache).toEqual(undefined);
  });

  it('can cacheUtxo [will not cache inputs cache enabled + no coins]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 1,
    });
    const MessageInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: 100,
      sender: BaseAssetId,
      recipient: BaseAssetId,
      witnessIndex: 1,
      nonce: BaseAssetId,
    };
    const transactionRequest = new ScriptTransactionRequest({
      inputs: [MessageInput],
    });

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    expect(provider.cache).toBeTruthy();
    expect(provider.cache?.getActiveData()).toStrictEqual([]);
  });

  it('can cacheUtxo [will cache inputs cache enabled + coins]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 10000,
    });
    const EXPECTED: BytesLike[] = [
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c500',
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c501',
      '0xda5d131c490db3868be9f8e228cf279bd98ef1de97129682777ed93fa088bc3f02',
    ];
    const MessageInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: 100,
      sender: BaseAssetId,
      recipient: BaseAssetId,
      witnessIndex: 1,
      nonce: BaseAssetId,
    };
    const CoinInputA: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[0],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputB: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: arrayify(EXPECTED[1]),
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputC: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[2],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const transactionRequest = new ScriptTransactionRequest({
      inputs: [MessageInput, CoinInputA, CoinInputB, CoinInputC],
    });

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    const EXCLUDED = provider.cache?.getActiveData() || [];
    expect(EXCLUDED.length).toEqual(3);
    expect(EXCLUDED.map((value) => hexlify(value))).toStrictEqual(EXPECTED);

    // clear cache
    EXCLUDED.forEach((value) => provider.cache?.del(value));
  });

  it('can cacheUtxo [will cache inputs and also use in exclude list]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 10000,
    });
    const EXPECTED: BytesLike[] = [
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c503',
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c504',
      '0xda5d131c490db3868be9f8e228cf279bd98ef1de97129682777ed93fa088bc3505',
    ];
    const MessageInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: 100,
      sender: BaseAssetId,
      recipient: BaseAssetId,
      witnessIndex: 1,
      nonce: BaseAssetId,
    };
    const CoinInputA: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[0],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputB: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: arrayify(EXPECTED[1]),
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputC: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[2],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const transactionRequest = new ScriptTransactionRequest({
      inputs: [MessageInput, CoinInputA, CoinInputB, CoinInputC],
    });

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    const EXCLUDED = provider.cache?.getActiveData() || [];
    expect(EXCLUDED.length).toEqual(3);
    expect(EXCLUDED.map((value) => hexlify(value))).toStrictEqual(EXPECTED);

    const owner = Address.fromRandom();
    const resourcesToSpendMock = jest.fn(() => Promise.resolve({ coinsToSpend: [] }));
    // @ts-expect-error mock
    provider.operations.getCoinsToSpend = resourcesToSpendMock;
    await provider.getResourcesToSpend(owner, []);

    expect(resourcesToSpendMock).toHaveBeenCalledWith({
      owner: owner.toB256(),
      queryPerAsset: [],
      excludedIds: {
        messages: [],
        utxos: EXPECTED,
      },
    });

    // clear cache
    EXCLUDED.forEach((value) => provider.cache?.del(value));
  });

  it('can cacheUtxo [will cache inputs cache enabled + coins]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 10000,
    });
    const EXPECTED: BytesLike[] = [
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c500',
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c501',
      '0xda5d131c490db3868be9f8e228cf279bd98ef1de97129682777ed93fa088bc3f02',
    ];
    const MessageInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: 100,
      sender: BaseAssetId,
      recipient: BaseAssetId,
      witnessIndex: 1,
      nonce: BaseAssetId,
    };
    const CoinInputA: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[0],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputB: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: arrayify(EXPECTED[1]),
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputC: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[2],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const transactionRequest = new ScriptTransactionRequest({
      inputs: [MessageInput, CoinInputA, CoinInputB, CoinInputC],
    });

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    const EXCLUDED = provider.cache?.getActiveData() || [];
    expect(EXCLUDED.length).toEqual(3);
    expect(EXCLUDED.map((value) => hexlify(value))).toStrictEqual(EXPECTED);

    // clear cache
    EXCLUDED.forEach((value) => provider.cache?.del(value));
  });

  it('can cacheUtxo [will cache inputs and also merge/de-dupe in exclude list]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      cacheUtxo: 10000,
    });
    const EXPECTED: BytesLike[] = [
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c503',
      '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c504',
      '0xda5d131c490db3868be9f8e228cf279bd98ef1de97129682777ed93fa088bc3505',
    ];
    const MessageInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: 100,
      sender: BaseAssetId,
      recipient: BaseAssetId,
      witnessIndex: 1,
      nonce: BaseAssetId,
    };
    const CoinInputA: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[0],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputB: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: arrayify(EXPECTED[1]),
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const CoinInputC: CoinTransactionRequestInput = {
      type: InputType.Coin,
      id: EXPECTED[2],
      owner: BaseAssetId,
      assetId: BaseAssetId,
      txPointer: BaseAssetId,
      witnessIndex: 1,
      amount: 100,
    };
    const transactionRequest = new ScriptTransactionRequest({
      inputs: [MessageInput, CoinInputA, CoinInputB, CoinInputC],
    });

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    const EXCLUDED = provider.cache?.getActiveData() || [];
    expect(EXCLUDED.length).toEqual(3);
    expect(EXCLUDED.map((value) => hexlify(value))).toStrictEqual(EXPECTED);

    const owner = Address.fromRandom();
    const resourcesToSpendMock = jest.fn(() => Promise.resolve({ coinsToSpend: [] }));
    // @ts-expect-error mock
    provider.operations.getCoinsToSpend = resourcesToSpendMock;
    await provider.getResourcesToSpend(owner, [], {
      utxos: [
        '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c503',
        '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c507',
        '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c508',
      ],
    });

    expect(resourcesToSpendMock).toHaveBeenCalledWith({
      owner: owner.toB256(),
      queryPerAsset: [],
      excludedIds: {
        messages: [],
        utxos: [
          '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c503',
          '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c507',
          '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c508',
          EXPECTED[1],
          EXPECTED[2],
        ],
      },
    });

    // clear cache
    EXCLUDED.forEach((value) => provider.cache?.del(value));
  });

  it('can getBlocks', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    // Force-producing some blocks to make sure that 10 blocks exist
    await provider.produceBlocks(10);
    // #region Provider-get-blocks
    const blocks = await provider.getBlocks({
      last: 10,
    });
    // #endregion Provider-get-blocks
    expect(blocks.length).toBe(10);
    blocks.forEach((block) => {
      expect(block).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          height: expect.any(BN),
          time: expect.any(String),
          transactionIds: expect.any(Array<string>),
        })
      );
    });
  });

  it('can getMessageProof with all data', async () => {
    // Create a mock provider to return the message proof
    // It test mainly types and converstions
    const provider = new Provider('http://127.0.0.1:4000/graphql', {
      fetch: async (url, options) => {
        const messageProof = JSON.stringify(messageProofResponse);
        return Promise.resolve(new Response(messageProof, options));
      },
    });
    const messageProof = await provider.getMessageProof(
      '0x79c54219a5c910979e5e4c2728df163fa654a1fe03843e6af59daa2c3fcd42ea',
      '0xb33895e6fdf23b5a62c92a1d45c71a11579027f9e5c4dda73c26cf140bcd6895',
      '0xe4dfe8fc1b5de2c669efbcc5e4c0a61db175d1b2f03e3cd46ed4396e76695c5b'
    );
    expect(messageProof).toMatchSnapshot();
  });

  it('estimatePredicates should correctly assign gas to input message', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const inputMessage: MessageTransactionRequestInput = {
      type: InputType.Message,
      amount: bn(0),
      sender: '0x00000000000000000000000059f2f1fcfe2474fd5f0b9ba1e73ca90b143eb8d0',
      recipient: '0x74d9101b542a935ba4151379eaab1aba50a40bb0b960e1b8fe919c547d9f1467',
      witnessIndex: 0,
      data: '0x',
      nonce: '0x0000000000000000000000000000000000000000000000000000000000000002',
      // Predicate that returns true
      predicate: '0x9000000447000000000000000000001c5dfcc00110fff30024040000',
      // Assign zero to gas to ensure that the gas is calculated
      predicateGasUsed: bn(0),
      predicateData: '0x',
    };
    const tx = new ScriptTransactionRequest();
    tx.inputs.push(inputMessage);

    const txEstimated = await provider.estimatePredicates(tx);
    const predicateMessageInput = <MessageTransactionRequestInput>txEstimated.inputs[0];
    expect(Number(predicateMessageInput.predicateGasUsed)).toBeGreaterThan(1);
  });
});
