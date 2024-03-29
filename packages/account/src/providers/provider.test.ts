import { Address } from '@fuel-ts/address';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import type { BytesLike } from '@fuel-ts/interfaces';
import { BN, bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { DateTime, arrayify, hexlify } from '@fuel-ts/utils';
import { versions } from '@fuel-ts/versions';
import * as fuelTsVersionsMod from '@fuel-ts/versions';

import {
  messageStatusResponse,
  MESSAGE_PROOF_RAW_RESPONSE,
  MESSAGE_PROOF,
} from '../../test/fixtures';

import type { ChainInfo, NodeInfo } from './provider';
import Provider from './provider';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './transaction-request';
import { ScriptTransactionRequest, CreateTransactionRequest } from './transaction-request';
import { TransactionResponse } from './transaction-response';
import type { SubmittedStatus } from './transaction-summary/types';
import { sleep } from './utils';
import * as gasMod from './utils/gas';

afterEach(() => {
  vi.restoreAllMocks();
});

const getCustomFetch =
  (expectedOperationName: string, expectedResponse: object) =>
  async (url: string, options: RequestInit | undefined) => {
    const graphqlRequest = JSON.parse(options?.body as string);
    const { operationName } = graphqlRequest;

    if (operationName === expectedOperationName) {
      const responseText = JSON.stringify({
        data: expectedResponse,
      });
      const response = Promise.resolve(new Response(responseText, options));

      return response;
    }
    return fetch(url, options);
  };

// TODO: Figure out a way to import this constant from `@fuel-ts/account/configs`
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';

/**
 * @group node
 */
describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const version = await provider.getVersion();

    expect(version).toEqual('0.22.1');
  });

  it('can call()', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

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
      tip: 0,
      gasLimit: 100,
      maxFee: 100,
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
        pc: bn(0x2868),
        is: bn(0x2860),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x286c),
        is: bn(0x2860),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(0x18),
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
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      tip: 0,
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { consensusParameters } = provider.getChain();

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

  it('can change the provider url of the current instance', async () => {
    const providerUrl1 = FUEL_NETWORK_URL;
    const providerUrl2 = 'http://127.0.0.1:8080/graphql';

    const provider = await Provider.create(providerUrl1, {
      fetch: (url: string, options?: RequestInit) =>
        getCustomFetch('getVersion', { nodeInfo: { nodeVersion: url } })(url, options),
    });

    expect(provider.url).toBe(providerUrl1);
    expect(await provider.getVersion()).toEqual(providerUrl1);

    const spyFetchChainAndNodeInfo = vi
      .spyOn(Provider.prototype, 'fetchChainAndNodeInfo')
      .mockResolvedValue({
        chain: {} as ChainInfo,
        nodeInfo: {} as NodeInfo,
      });

    await provider.connect(providerUrl2);
    expect(provider.url).toBe(providerUrl2);

    expect(await provider.getVersion()).toEqual(providerUrl2);

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
  });

  it('can accept a custom fetch function', async () => {
    const providerUrl = FUEL_NETWORK_URL;

    const provider = await Provider.create(providerUrl, {
      fetch: getCustomFetch('getVersion', { nodeInfo: { nodeVersion: '0.30.0' } }),
    });

    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can accept options override in connect method', async () => {
    const providerUrl = FUEL_NETWORK_URL;

    /**
     * Mocking and initializing Provider with an invalid fetcher just
     * to ensure it'll be properly overriden in `connect` method below
     */
    const fetchChainAndNodeInfo = vi
      .spyOn(Provider.prototype, 'fetchChainAndNodeInfo')
      .mockResolvedValue({
        chain: {} as ChainInfo,
        nodeInfo: {} as NodeInfo,
      });

    const provider = await Provider.create(providerUrl, {
      fetch: () => {
        throw new Error('This should never happen');
      },
    });

    expect(fetchChainAndNodeInfo).toHaveBeenCalledTimes(1);

    /**
     * Restore mock and call connect with a proper fetch override
     */
    fetchChainAndNodeInfo.mockRestore();

    await provider.connect(providerUrl, {
      fetch: getCustomFetch('getVersion', { nodeInfo: { nodeVersion: '0.30.0' } }),
    });

    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can force-produce blocks', async () => {
    // #region Provider-produce-blocks
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { time: timeLastBlockProduced } = block;

    const amountOfBlocksToProduce = 3;
    const producedBlockHeigh = await provider.produceBlocks(amountOfBlocksToProduce);

    const producedBlock = await provider.getBlock(producedBlockHeigh.toNumber());

    expect(producedBlock).toBeDefined();

    const oldest: Date = DateTime.fromTai64(timeLastBlockProduced);
    const newest: Date = DateTime.fromTai64(producedBlock?.time || DateTime.TAI64_NULL);

    expect(newest >= oldest).toBeTruthy();
    // #endregion Provider-produce-blocks
  });

  // TODO: Add back support for producing blocks with intervals by supporting the new
  // `block_production` config option for `fuel_core`.
  // See: https://github.com/FuelLabs/fuel-core/blob/def8878b986aedad8434f2d1abf059c8cbdbb8e2/crates/services/consensus_module/poa/src/config.rs#L20
  it.skip('can force-produce blocks with custom timestamps', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { time: latestBlockTimestampBeforeProduce, height: latestBlockNumberBeforeProduce } =
      block;
    const latestBlockUnixTimestampBeforeProduce = DateTime.fromTai64(
      latestBlockTimestampBeforeProduce
    ).toUnixMilliseconds();

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
      time: DateTime.fromUnixMilliseconds(startTime + i * blockTimeInterval).toTai64(),
    }));
    expect(producedBlocks).toEqual(expectedBlocks);
  });

  it('can cacheUtxo [undefined]', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    expect(provider.cache).toEqual(undefined);
  });

  it('can cacheUtxo [numerical]', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      cacheUtxo: 2500,
    });

    expect(provider.cache).toBeTruthy();
    expect(provider.cache?.ttl).toEqual(2_500);
  });

  it('can cacheUtxo [invalid numerical]', async () => {
    const { error } = await safeExec(() => Provider.create(FUEL_NETWORK_URL, { cacheUtxo: -500 }));
    expect(error?.message).toMatch(/Invalid TTL: -500\. Use a value greater than zero/);
  });

  it('can cacheUtxo [will not cache inputs if no cache]', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const transactionRequest = new ScriptTransactionRequest({});

    const { error } = await safeExec(() => provider.sendTransaction(transactionRequest));

    expect(error).toBeTruthy();
    expect(provider.cache).toEqual(undefined);
  });

  it('can cacheUtxo [will not cache inputs cache enabled + no coins]', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL, {
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
    const provider = await Provider.create(FUEL_NETWORK_URL, {
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
    const provider = await Provider.create(FUEL_NETWORK_URL, {
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
    const resourcesToSpendMock = vi.fn(() =>
      Promise.resolve({ coinsToSpend: [] })
    ) as unknown as typeof provider.operations.getCoinsToSpend;
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
    const provider = await Provider.create(FUEL_NETWORK_URL, {
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
    const provider = await Provider.create(FUEL_NETWORK_URL, {
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
    const resourcesToSpendMock = vi.fn(() =>
      Promise.resolve({ coinsToSpend: [] })
    ) as unknown as typeof provider.operations.getCoinsToSpend;
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
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
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url, options) =>
        getCustomFetch('getMessageProof', { messageProof: MESSAGE_PROOF_RAW_RESPONSE })(
          url,
          options
        ),
    });

    const transactionId = '0x79c54219a5c910979e5e4c2728df163fa654a1fe03843e6af59daa2c3fcd42ea';
    const nonce = '0xb33895e6fdf23b5a62c92a1d45c71a11579027f9e5c4dda73c26cf140bcd6895';
    const commitBlockId = '0xe4dfe8fc1b5de2c669efbcc5e4c0a61db175d1b2f03e3cd46ed4396e76695c5b';

    const messageProof = await provider.getMessageProof(transactionId, nonce, commitBlockId);

    expect(messageProof).toStrictEqual({ ...MESSAGE_PROOF, nonce });
  });

  it('can getMessageStatus', async () => {
    // Create a mock provider to return the message proof
    // It test mainly types and converstions
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url, options) =>
        getCustomFetch('getMessageStatus', { messageStatus: messageStatusResponse })(url, options),
    });
    const messageStatus = await provider.getMessageStatus(
      '0x0000000000000000000000000000000000000000000000000000000000000008'
    );

    expect(messageStatus).toStrictEqual(messageStatusResponse);
  });

  it('can connect', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    // check if the provider was initialized properly
    expect(provider).toBeInstanceOf(Provider);
    expect(provider.url).toEqual(FUEL_NETWORK_URL);
    expect(provider.getChain()).toBeDefined();
    expect(provider.getNode()).toBeDefined();
  });

  it('should cache chain and node info', async () => {
    Provider.clearChainAndNodeCaches();

    const provider = await Provider.create(FUEL_NETWORK_URL);

    expect(provider.getChain()).toBeDefined();
    expect(provider.getNode()).toBeDefined();
  });

  it('should ensure getChain and getNode uses the cache and does not fetch new data', async () => {
    Provider.clearChainAndNodeCaches();

    const spyFetchChainAndNodeInfo = vi.spyOn(Provider.prototype, 'fetchChainAndNodeInfo');
    const spyFetchChain = vi.spyOn(Provider.prototype, 'fetchChain');
    const spyFetchNode = vi.spyOn(Provider.prototype, 'fetchNode');

    const provider = await Provider.create(FUEL_NETWORK_URL);

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
    expect(spyFetchChain).toHaveBeenCalledTimes(1);
    expect(spyFetchNode).toHaveBeenCalledTimes(1);

    provider.getChain();
    provider.getNode();

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
    expect(spyFetchChain).toHaveBeenCalledTimes(1);
    expect(spyFetchNode).toHaveBeenCalledTimes(1);
  });

  it('should ensure fetchChainAndNodeInfo always fetch new data', async () => {
    Provider.clearChainAndNodeCaches();

    const spyFetchChainAndNodeInfo = vi.spyOn(Provider.prototype, 'fetchChainAndNodeInfo');
    const spyFetchChain = vi.spyOn(Provider.prototype, 'fetchChain');
    const spyFetchNode = vi.spyOn(Provider.prototype, 'fetchNode');

    const provider = await Provider.create(FUEL_NETWORK_URL);

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
    expect(spyFetchChain).toHaveBeenCalledTimes(1);
    expect(spyFetchNode).toHaveBeenCalledTimes(1);

    await provider.fetchChainAndNodeInfo();

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(2);
    expect(spyFetchChain).toHaveBeenCalledTimes(2);
    expect(spyFetchNode).toHaveBeenCalledTimes(2);
  });

  it('should ensure getGasConfig return essential gas related data', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const gasConfig = provider.getGasConfig();

    expect(gasConfig.gasPerByte).toBeDefined();
    expect(gasConfig.gasPriceFactor).toBeDefined();
    expect(gasConfig.maxGasPerPredicate).toBeDefined();
    expect(gasConfig.maxGasPerTx).toBeDefined();
    expect(gasConfig.minGasPrice).toBeDefined();
  });

  it('should throws when using getChain or getNode and without cached data', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    Provider.clearChainAndNodeCaches();

    await expectToThrowFuelError(
      () => provider.getChain(),
      new FuelError(
        ErrorCode.CHAIN_INFO_CACHE_EMPTY,
        'Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider.'
      )
    );

    await expectToThrowFuelError(
      () => provider.getNode(),
      new FuelError(
        ErrorCode.NODE_INFO_CACHE_EMPTY,
        'Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider.'
      )
    );
  });

  it.skip('throws on difference between major client version and supported major version', async () => {
    const { FUEL_CORE } = versions;
    const [major, minor, patch] = FUEL_CORE.split('.');
    const majorMismatch = major === '0' ? 1 : parseInt(patch, 10) - 1;

    const mock = {
      isMajorSupported: false,
      isMinorSupported: true,
      isPatchSupported: true,
      supportedVersion: `${majorMismatch}.${minor}.${patch}`,
    };

    if (mock.supportedVersion === FUEL_CORE) {
      throw new Error();
    }

    const spy = vi.spyOn(fuelTsVersionsMod, 'checkFuelCoreVersionCompatibility');
    spy.mockImplementationOnce(() => mock);

    await expectToThrowFuelError(() => Provider.create(FUEL_NETWORK_URL), {
      code: ErrorCode.UNSUPPORTED_FUEL_CLIENT_VERSION,
      message: `Fuel client version: ${FUEL_CORE}, Supported version: ${mock.supportedVersion}`,
    });
  });

  it.skip('throws on difference between minor client version and supported minor version', async () => {
    const { FUEL_CORE } = versions;
    const [major, minor, patch] = FUEL_CORE.split('.');
    const minorMismatch = minor === '0' ? 1 : parseInt(patch, 10) - 1;

    const mock = {
      isMajorSupported: true,
      isMinorSupported: false,
      isPatchSupported: true,
      supportedVersion: `${major}.${minorMismatch}.${patch}`,
    };

    if (mock.supportedVersion === FUEL_CORE) {
      throw new Error();
    }

    const spy = vi.spyOn(fuelTsVersionsMod, 'checkFuelCoreVersionCompatibility');
    spy.mockImplementationOnce(() => mock);

    await expectToThrowFuelError(() => Provider.create(FUEL_NETWORK_URL), {
      code: ErrorCode.UNSUPPORTED_FUEL_CLIENT_VERSION,
      message: `Fuel client version: ${FUEL_CORE}, Supported version: ${mock.supportedVersion}`,
    });
  });

  it('An invalid subscription request throws a FuelError and does not hold the test runner (closes all handles)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    await expectToThrowFuelError(
      async () => {
        for await (const value of provider.operations.statusChange({
          transactionId: 'invalid transaction id',
        })) {
          // shouldn't be reached and should fail if reached
          expect(value).toBeFalsy();
        }
      },

      { code: FuelError.CODES.INVALID_REQUEST }
    );

    const response = new TransactionResponse('invalid transaction id', provider);

    await expectToThrowFuelError(() => response.waitForResult(), {
      code: FuelError.CODES.INVALID_REQUEST,
    });
  });

  it('default timeout is undefined', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    expect(provider.options.timeout).toBeUndefined();
  });

  it('throws TimeoutError on timeout when calling an operation', async () => {
    const timeout = 500;
    const provider = await Provider.create(FUEL_NETWORK_URL, { timeout });
    vi.spyOn(global, 'fetch').mockImplementationOnce((...args: unknown[]) =>
      sleep(timeout).then(() =>
        fetch(args[0] as RequestInfo | URL, args[1] as RequestInit | undefined)
      )
    );

    const { error } = await safeExec(async () => {
      await provider.getBlocks({});
    });

    expect(error).toMatchObject({
      code: 23,
      name: 'TimeoutError',
      message: 'The operation was aborted due to timeout',
    });
  });

  it('throws TimeoutError on timeout when calling a subscription', async () => {
    const timeout = 500;
    const provider = await Provider.create(FUEL_NETWORK_URL, { timeout });

    vi.spyOn(global, 'fetch').mockImplementationOnce((...args: unknown[]) =>
      sleep(timeout).then(() =>
        fetch(args[0] as RequestInfo | URL, args[1] as RequestInit | undefined)
      )
    );

    const { error } = await safeExec(async () => {
      for await (const iterator of provider.operations.statusChange({
        transactionId: 'doesnt matter, will be aborted',
      })) {
        // shouldn't be reached and should fail if reached
        expect(iterator).toBeFalsy();
      }
    });
    expect(error).toMatchObject({
      code: 23,
      name: 'TimeoutError',
      message: 'The operation was aborted due to timeout',
    });
  });
  it('should ensure calculateMaxgas considers gasLimit for ScriptTransactionRequest', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { gasPerByte } = provider.getGasConfig();

    const gasLimit = bn(1000);
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit,
    });

    const maxGasSpy = vi.spyOn(gasMod, 'getMaxGas');

    const chainInfo = provider.getChain();
    const minGas = bn(200);

    const witnessesLength = transactionRequest
      .toTransaction()
      .witnesses.reduce((acc, wit) => acc + wit.dataLength, 0);

    transactionRequest.calculateMaxGas(chainInfo, minGas);
    expect(maxGasSpy).toHaveBeenCalledWith({
      gasPerByte,
      minGas,
      witnessesLength,
      witnessLimit: transactionRequest.witnessLimit,
      gasLimit: transactionRequest.gasLimit,
    });
  });

  it('should ensure calculateMaxgas does NOT considers gasLimit for CreateTransactionRequest', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { gasPerByte } = provider.getGasConfig();

    const transactionRequest = new CreateTransactionRequest({
      witnesses: [ZeroBytes32],
    });

    transactionRequest.addContractCreatedOutput(ZeroBytes32, ZeroBytes32);

    const maxGasSpy = vi.spyOn(gasMod, 'getMaxGas');

    const chainInfo = provider.getChain();
    const minGas = bn(700);

    const witnessesLength = transactionRequest
      .toTransaction()
      .witnesses.reduce((acc, wit) => acc + wit.dataLength, 0);

    transactionRequest.calculateMaxGas(chainInfo, minGas);
    expect(maxGasSpy).toHaveBeenCalledWith({
      gasPerByte,
      minGas,
      witnessesLength,
      witnessLimit: transactionRequest.witnessLimit,
    });
  });

  it('should ensure estimated fee values on getTransactionCost are never 0', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const request = new ScriptTransactionRequest();

    // forcing calculatePriceWithFactor to return 0
    const calculatePriceWithFactorMock = vi
      .spyOn(gasMod, 'calculatePriceWithFactor')
      .mockReturnValue(bn(0));

    const { minFee, maxFee, usedFee } = await provider.getTransactionCost(request);

    expect(calculatePriceWithFactorMock).toHaveBeenCalledTimes(3);

    expect(maxFee.eq(0)).not.toBeTruthy();
    expect(usedFee.eq(0)).not.toBeTruthy();
    expect(minFee.eq(0)).not.toBeTruthy();
  });

  it('should accept string addresses in methods that require an address', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const b256Str = Address.fromRandom().toB256();

    const methodCalls = [
      () => provider.getBalance(b256Str, BaseAssetId),
      () => provider.getCoins(b256Str),
      () => provider.getResourcesForTransaction(b256Str, new ScriptTransactionRequest()),
      () => provider.getResourcesToSpend(b256Str, []),
      () => provider.getContractBalance(b256Str, BaseAssetId),
      () => provider.getBalances(b256Str),
      () => provider.getMessages(b256Str),
    ];

    const promises = methodCalls.map(async (call) => {
      await expect(call()).resolves.toBeTruthy();
    });

    await Promise.all(promises);
  });

  it('should not throw if the subscription stream data string contains more than one "data:"', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const responseObject = {
        data: {
          submitAndAwait: {
            type: 'SuccessStatus',
            time: 'data: 4611686020137152060',
          },
        },
      };
      const streamedResponse = new TextEncoder().encode(
        `data:${JSON.stringify(responseObject)}\n\n`
      );
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(streamedResponse);
              controller.close();
            },
          })
        )
      );
    });

    for await (const { submitAndAwait } of provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      expect(submitAndAwait.type).toEqual('SuccessStatus');
      expect((<SubmittedStatus>submitAndAwait).time).toEqual('data: 4611686020137152060');
    }
  });

  it('should throw if the subscription stream data string parsing fails for some reason', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const badResponse = 'data: whatever';
    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const streamResponse = new TextEncoder().encode(badResponse);
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(streamResponse);
              controller.close();
            },
          })
        )
      );
    });

    await expectToThrowFuelError(
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const { submitAndAwait } of provider.operations.submitAndAwait({
          encodedTransaction: "it's mocked so doesn't matter",
        })) {
          // shouldn't be reached!
          expect(true).toBeFalsy();
        }
      },
      {
        code: FuelError.CODES.STREAM_PARSING_ERROR,
        message: `Error while parsing stream data response: ${badResponse}`,
      }
    );
  });

  test('requestMiddleware modifies the request before being sent to the node [sync]', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    });

    const requestObject = fetchSpy.mock.calls[0][1];

    expect(requestObject?.headers).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('requestMiddleware modifies the request before being sent to the node [async]', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return Promise.resolve(request);
      },
    });

    const requestObject = fetchSpy.mock.calls[0][1];

    expect(requestObject?.headers).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('requestMiddleware works for subscriptions', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    });

    await safeExec(async () => {
      for await (const iterator of provider.operations.statusChange({
        transactionId: 'doesnt matter, will be aborted',
      })) {
        // Just running a subscription to trigger the middleware
        // shouldn't be reached and should fail if reached
        expect(iterator).toBeFalsy();
      }
    });

    const subscriptionCall = fetchSpy.mock.calls.find((call) => call[0] === `${provider.url}-sub`);
    const requestObject = subscriptionCall?.[1];

    expect(requestObject?.headers).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('custom fetch works with requestMiddleware', async () => {
    let requestHeaders: HeadersInit | undefined;
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url, requestInit) => {
        requestHeaders = requestInit?.headers;
        return fetch(url, requestInit);
      },
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    });

    expect(requestHeaders).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('custom fetch works with timeout', async () => {
    const timeout = 500;
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url, requestInit) => fetch(url, requestInit),
      timeout,
    });
    vi.spyOn(global, 'fetch').mockImplementationOnce((...args: unknown[]) =>
      sleep(timeout).then(() =>
        fetch(args[0] as RequestInfo | URL, args[1] as RequestInit | undefined)
      )
    );

    const { error } = await safeExec(async () => {
      await provider.getBlocks({});
    });

    expect(error).toMatchObject({
      code: 23,
      name: 'TimeoutError',
      message: 'The operation was aborted due to timeout',
    });
  });
});
