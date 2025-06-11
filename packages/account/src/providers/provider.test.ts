import { Address, getRandomB256 } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes, randomUUID } from '@fuel-ts/crypto';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import { BN, bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType } from '@fuel-ts/transactions';
import { DateTime, arrayify, hexlify, sleep } from '@fuel-ts/utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import { versions } from '@fuel-ts/versions';

import type { CoinQuantity } from '..';
import { Wallet } from '..';
import {
  messageStatusResponse,
  MESSAGE_PROOF_RAW_RESPONSE,
  MESSAGE_PROOF,
} from '../../test/fixtures';
import {
  MOCK_TX_UNKNOWN_RAW_PAYLOAD,
  MOCK_TX_SCRIPT_RAW_PAYLOAD,
} from '../../test/fixtures/transaction-summary';
import { mockIncompatibleVersions } from '../../test/utils/mockIncompabileVersions';
import { setupTestProviderAndWallets, launchNode, TestMessage, TestAssetId } from '../test-utils';

import type { GqlPageInfo } from './__generated__/operations';
import { FuelGraphqlSubscriber } from './fuel-graphql-subscriber';
import type { Block, ChainInfo, CursorPaginationArgs, NodeInfo } from './provider';
import Provider, {
  BALANCES_PAGE_SIZE_LIMIT,
  BLOCKS_PAGE_SIZE_LIMIT,
  GAS_USED_MODIFIER,
  RESOURCES_PAGE_SIZE_LIMIT,
} from './provider';
import type {
  ChangeTransactionRequestOutput,
  CoinTransactionRequestInput,
} from './transaction-request';
import { CreateTransactionRequest, ScriptTransactionRequest } from './transaction-request';
import { TransactionResponse } from './transaction-response';
import type { SubmittedStatus } from './transaction-summary/types';
import * as gasMod from './utils/gas';
import { serializeChain, serializeNodeInfo, serializeProviderCache } from './utils/serialization';
import type { ProviderCacheJson } from './utils/serialization';

const getCustomFetch =
  (expectedOperationName: string, expectedBody?: BodyInit | null) =>
  async (url: string, options: RequestInit | undefined) => {
    const graphqlRequest = JSON.parse(options?.body as string);
    const { operationName } = graphqlRequest;

    if (operationName === expectedOperationName) {
      const response = Promise.resolve(new Response(expectedBody, options));

      return response;
    }
    return fetch(url, options);
  };

const createBasicAuth = (launchNodeUrl: string) => {
  const username: string = randomUUID();
  const password: string = randomUUID();
  const usernameAndPassword = `${username}:${password}`;

  const parsedUrl = new URL(launchNodeUrl);
  const hostAndPath = `${parsedUrl.host}${parsedUrl.pathname}`;
  const urlWithAuth = `http://${usernameAndPassword}@${hostAndPath}`;

  return {
    urlWithAuth,
    urlWithoutAuth: launchNodeUrl,
    usernameAndPassword,
    expectedHeaders: {
      Authorization: `Basic ${btoa(usernameAndPassword)}`,
    },
  };
};

/**
 * @group node
 */
describe('Provider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should ensure supports basic auth', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const { urlWithAuth, expectedHeaders } = createBasicAuth(url);
    const provider = new Provider(urlWithAuth);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrl, request] = fetchSpy.mock.calls[0];
    expect(requestUrl).toEqual(url);
    expect(request?.headers).toMatchObject(expectedHeaders);
  });

  it('adds source header with version on request', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;
    const provider = new Provider(url);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrl, request] = fetchSpy.mock.calls[0];
    expect(requestUrl).toEqual(url);
    expect(request?.headers).toMatchObject({ Source: `ts-sdk-${versions.FUELS}` });
  });

  it('should ensure we can reuse provider URL to connect to a authenticated endpoint', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const { urlWithAuth, expectedHeaders } = createBasicAuth(url);
    const provider = new Provider(urlWithAuth);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrlA, requestA] = fetchSpy.mock.calls[0];
    expect(requestUrlA).toEqual(url);
    expect(requestA?.headers).toMatchObject(expectedHeaders);

    // Reuse the provider URL to connect to an authenticated endpoint
    const newProvider = new Provider(provider.url);

    fetchSpy.mockClear();

    await newProvider.operations.getChain();
    const [requestUrl, request] = fetchSpy.mock.calls[0];
    expect(requestUrl).toEqual(url);
    expect(request?.headers).toMatchObject(expectedHeaders);
  });

  it('should ensure that custom requestMiddleware is not overwritten by basic auth', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    Provider.clearChainAndNodeCaches();

    const { urlWithAuth } = createBasicAuth(provider.url);

    const requestMiddleware = vi.fn().mockImplementation((options) => options);

    const temp = new Provider(urlWithAuth, { requestMiddleware });

    await temp.init();

    expect(requestMiddleware).toHaveBeenCalled();
  });

  it('should ensure that we can connect to a new entrypoint with basic auth', async () => {
    using launchedA = await setupTestProviderAndWallets();
    using launchedB = await setupTestProviderAndWallets();
    const {
      provider: { url: urlA },
    } = launchedA;
    const {
      provider: { url: urlB },
    } = launchedB;

    // Should enable connection via `create` method
    const basicAuthA = createBasicAuth(urlA);
    const provider = new Provider(basicAuthA.urlWithAuth);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrlA, requestA] = fetchSpy.mock.calls[0];
    expect(requestUrlA, 'expect to request with the unauthenticated URL').toEqual(urlA);
    expect(requestA?.headers).toMatchObject({
      Authorization: basicAuthA.expectedHeaders.Authorization,
    });
    expect(provider.url).toEqual(basicAuthA.urlWithAuth);

    fetchSpy.mockClear();

    // Should enable reconnection
    const basicAuthB = createBasicAuth(urlB);

    await provider.connect(basicAuthB.urlWithAuth);
    await provider.operations.getChain();

    const [requestUrlB, requestB] = fetchSpy.mock.calls[0];
    expect(requestUrlB, 'expect to request with the unauthenticated URL').toEqual(urlB);
    expect(requestB?.headers).toMatchObject(
      expect.objectContaining({
        Authorization: basicAuthB.expectedHeaders.Authorization,
      })
    );
    expect(provider.url).toEqual(basicAuthB.urlWithAuth);
  });

  it('should ensure that custom headers can be passed', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const customHeaders = {
      'X-Custom-Header': 'custom-value',
    };

    const provider = new Provider(url, {
      headers: customHeaders,
    });

    const fetchSpy = vi.spyOn(global, 'fetch');
    await provider.operations.getChain();

    const [, request] = fetchSpy.mock.calls[0];
    expect(request?.headers).toMatchObject(customHeaders);
  });

  it('should throw an error if the URL is no in the correct format', async () => {
    const url = 'immanotavalidurl';

    await expectToThrowFuelError(
      () => new Provider(url),
      new FuelError(ErrorCode.INVALID_URL, 'Invalid URL provided.')
    );
  });

  it('should throw an error when retrieving a transaction with an unknown transaction type', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const expectedBody = JSON.stringify({
      data: {
        transaction: {
          id: '0x1234567890abcdef',
          rawPayload: MOCK_TX_UNKNOWN_RAW_PAYLOAD, // Unknown transaction type
        },
      },
    });
    const mockProvider = new Provider(provider.url, {
      fetch: getCustomFetch('getTransaction', expectedBody),
    });

    // Spy on console.warn
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Verify that only one transaction was returned (the known type)
    const transaction = await mockProvider.getTransaction('0x1234567890abcdef');

    expect(transaction).toBeNull();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unsupported transaction type encountered')
    );

    // Clean up
    consoleWarnSpy.mockRestore();
  });

  it('should log a warning when retrieving batch transactions with an unknown transaction type', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const expectedBody = JSON.stringify({
      data: {
        transactions: {
          edges: [
            {
              node: {
                id: '0x1234567890abcdef',
                rawPayload: MOCK_TX_UNKNOWN_RAW_PAYLOAD,
              },
            },
            {
              node: {
                id: '0xabcdef1234567890',
                rawPayload: MOCK_TX_SCRIPT_RAW_PAYLOAD,
              },
            },
          ],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: null,
            endCursor: null,
          },
        },
      },
    });

    // Create a mock provider with custom getTransactions operation
    const mockProvider = new Provider(nodeProvider.url, {
      fetch: getCustomFetch('getTransactions', expectedBody),
    });

    // Spy on console.warn
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Verify that only one transaction was returned (the known type)
    const { transactions } = await mockProvider.getTransactions();
    expect(transactions.length).toBe(1);

    // Check if warning was logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unsupported transaction type encountered')
    );

    // Clean up
    consoleWarnSpy.mockRestore();
  });

  it('can getVersion()', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const version = await provider.getVersion();

    expect(version).toEqual(versions.FUEL_CORE);
  });

  it('can call()', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const owner = getRandomB256();
    const baseAssetId = await provider.getBaseAssetId();

    const CoinInputs: CoinTransactionRequestInput[] = [
      {
        type: InputType.Coin,
        id: '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c500',
        owner,
        assetId: baseAssetId,
        txPointer: '0x00000000000000000000000000000000',
        amount: 500_000,
        witnessIndex: 0,
      },
    ];
    const ChangeOutputs: ChangeTransactionRequestOutput[] = [
      {
        type: OutputType.Change,
        assetId: baseAssetId,
        to: owner,
      },
    ];
    const transactionRequest = new ScriptTransactionRequest({
      tip: 0,
      gasLimit: 100_000,
      maxFee: 120_000,
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
      outputs: ChangeOutputs,
      witnesses: ['0x'],
    });

    const callResult = await provider.dryRun(transactionRequest);

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        ra: bn(202),
        rb: bn(186),
        rc: bn(0),
        rd: bn(0),
        pc: bn(0x2888),
        is: bn(0x2880),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x288c),
        is: bn(0x2880),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(127),
      },
    ];

    expect(callResult.receipts).toStrictEqual(expectedReceipts);
  });

  it('can get all chain info', async () => {
    using launched = await setupTestProviderAndWallets();

    const { provider } = launched;

    const { consensusParameters } = await provider.getChain();

    expect(consensusParameters.version).toBeDefined();
    expect(consensusParameters.chainId).toBeDefined();
    expect(consensusParameters.baseAssetId).toBeDefined();

    expect(consensusParameters.feeParameters.version).toBeDefined();
    expect(consensusParameters.feeParameters.gasPriceFactor).toBeDefined();
    expect(consensusParameters.feeParameters.gasPerByte).toBeDefined();

    expect(consensusParameters.txParameters.version).toBeDefined();
    expect(consensusParameters.txParameters.maxSize).toBeDefined();
    expect(consensusParameters.txParameters.maxInputs).toBeDefined();
    expect(consensusParameters.txParameters.maxOutputs).toBeDefined();
    expect(consensusParameters.txParameters.maxWitnesses).toBeDefined();
    expect(consensusParameters.txParameters.maxGasPerTx).toBeDefined();
    expect(consensusParameters.txParameters.maxBytecodeSubsections).toBeDefined();

    expect(consensusParameters.scriptParameters.version).toBeDefined();
    expect(consensusParameters.scriptParameters.maxScriptLength).toBeDefined();
    expect(consensusParameters.scriptParameters.maxScriptDataLength).toBeDefined();

    expect(consensusParameters.contractParameters.version).toBeDefined();
    expect(consensusParameters.contractParameters.contractMaxSize).toBeDefined();
    expect(consensusParameters.contractParameters.maxStorageSlots).toBeDefined();

    expect(consensusParameters.predicateParameters.version).toBeDefined();
    expect(consensusParameters.predicateParameters.maxPredicateLength).toBeDefined();
    expect(consensusParameters.predicateParameters.maxPredicateDataLength).toBeDefined();
    expect(consensusParameters.predicateParameters.maxGasPerPredicate).toBeDefined();
    expect(consensusParameters.predicateParameters.maxMessageDataLength).toBeDefined();
  });

  it('gets the chain ID', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const chainId = await provider.getChainId();

    expect(chainId).toBe(0);
  });

  it('gets the base asset ID', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    expect(baseAssetId).toBeDefined();
  });

  it('can change the provider url of the current instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const { cleanup, url } = await launchNode({ port: '0', loggingEnabled: false });

    const spyFetchChainAndNodeInfo = vi.spyOn(Provider.prototype, 'fetchChainAndNodeInfo');

    await provider.connect(url);
    expect(provider.url).toBe(url);

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it('can accept a custom fetch function', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: providerForUrl } = launched;

    const providerUrl = providerForUrl.url;

    const provider = new Provider(providerUrl, {
      fetch: getCustomFetch(
        'getVersion',
        JSON.stringify({ data: { nodeInfo: { nodeVersion: '0.30.0' } } })
      ),
    });

    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can accept options override in connect method', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: providerForUrl } = launched;

    const providerUrl = providerForUrl.url;

    /**
     * Mocking and initializing Provider with an invalid fetcher just
     * to ensure it'll be properly overridden in `connect` method below
     */
    const fetchChainAndNodeInfo = vi
      .spyOn(Provider.prototype, 'fetchChainAndNodeInfo')
      .mockResolvedValue({
        chain: {} as ChainInfo,
        nodeInfo: { nodeVersion: '0.41.0' } as NodeInfo,
      });

    const provider = new Provider(providerUrl, {
      fetch: () => {
        throw new Error('This should never happen');
      },
    });

    await provider.init();

    expect(fetchChainAndNodeInfo).toHaveBeenCalledTimes(1);

    /**
     * Restore mock and call connect with a proper fetch override
     */
    fetchChainAndNodeInfo.mockRestore();

    await provider.connect(providerUrl, {
      fetch: getCustomFetch(
        'getVersion',
        JSON.stringify({ data: { nodeInfo: { nodeVersion: '0.30.0' } } })
      ),
    });

    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can force-produce blocks', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

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
  });

  it('can force-produce blocks with custom timestamps', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

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

  it('should validate max number of inputs at sendTransaction method', async () => {
    const maxInputs = 2;
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V2: {
                tx_params: {
                  V1: {
                    max_inputs: maxInputs,
                  },
                },
              },
            },
          },
        },
      },
      walletsConfig: {
        coinsPerAsset: 5,
      },
    });

    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    const request = new ScriptTransactionRequest({
      gasLimit: 1000,
      maxFee: 1000,
    });

    const { coins } = await sender.getCoins(await provider.getBaseAssetId(), {
      first: 4,
    });

    request.addCoinOutput(receiver.address, 500, await provider.getBaseAssetId());
    request.addResources(coins);

    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(
        ErrorCode.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: 4, max inputs: ${maxInputs}`
      )
    );
  });

  it('should validate max number of inputs when estimating TX', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: 100,
        coinsPerAsset: 400,
      },
    });
    const {
      wallets: [wallet],
      provider,
    } = launched;

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 40_000, await provider.getBaseAssetId());

    const { coins } = await wallet.getCoins(await provider.getBaseAssetId());
    request.addResources(coins);

    await expectToThrowFuelError(() => wallet.getTransactionCost(request), {
      code: ErrorCode.MAX_INPUTS_EXCEEDED,
    });
  });

  it('should throws if max of ouputs was exceeded', async () => {
    const maxOutputs = 2;
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V2: {
                tx_params: {
                  V1: {
                    max_outputs: maxOutputs,
                  },
                },
              },
            },
          },
        },
      },
      walletsConfig: {
        count: 3,
      },
    });

    const {
      wallets: [sender, receiver1, receiver2],
      provider,
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();
    const resources = await sender.getResourcesToSpend([[1000, baseAssetId]]);
    request.addCoinOutput(receiver1.address, 1, baseAssetId);
    request.addCoinOutput(receiver2.address, 1, baseAssetId);

    request.addResources(resources);

    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(
        ErrorCode.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${request.outputs.length}, max outputs: ${maxOutputs}`
      )
    );
  });

  it('can getBlock', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    await provider.produceBlocks(1);
    const block = await provider.getBlock('latest');
    expect(block).toStrictEqual({
      id: expect.any(String),
      height: expect.any(BN),
      time: expect.any(String),
      header: {
        applicationHash: expect.any(String),
        daHeight: expect.any(BN),
        eventInboxRoot: expect.any(String),
        messageOutboxRoot: expect.any(String),
        prevRoot: expect.any(String),
        stateTransitionBytecodeVersion: expect.any(String),
        transactionsCount: expect.any(String),
        transactionsRoot: expect.any(String),
      },
      transactionIds: expect.any(Array<string>),
    });
  });

  it('can getBlocks', async () => {
    using launched = await setupTestProviderAndWallets();
    const blocksLenght = 5;
    const { provider } = launched;
    // Force-producing some blocks to make sure that blocksLenght blocks exist
    await provider.produceBlocks(blocksLenght);
    const { blocks } = await provider.getBlocks({
      last: 5,
    });
    expect(blocks.length).toBe(blocksLenght);
    blocks.forEach((block) => {
      expect(block).toStrictEqual({
        id: expect.any(String),
        height: expect.any(BN),
        time: expect.any(String),
        header: {
          applicationHash: expect.any(String),
          daHeight: expect.any(BN),
          eventInboxRoot: expect.any(String),
          messageOutboxRoot: expect.any(String),
          prevRoot: expect.any(String),
          stateTransitionBytecodeVersion: expect.any(String),
          transactionsCount: expect.any(String),
          transactionsRoot: expect.any(String),
        },
        transactionIds: expect.any(Array<string>),
      });
    });
  });

  it('can getBlockWithTransactions', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    await provider.produceBlocks(1);
    const block = await provider.getBlockWithTransactions('latest');
    const { transactions } = await provider.getTransactions({ first: 30 });
    expect(block).toStrictEqual({
      id: expect.any(String),
      height: expect.any(BN),
      time: expect.any(String),
      header: {
        applicationHash: expect.any(String),
        daHeight: expect.any(BN),
        eventInboxRoot: expect.any(String),
        messageOutboxRoot: expect.any(String),
        prevRoot: expect.any(String),
        stateTransitionBytecodeVersion: expect.any(String),
        transactionsCount: expect.any(String),
        transactionsRoot: expect.any(String),
      },
      transactionIds: expect.any(Array<string>),
      transactions,
    });
  });

  it('should ensure getBlockWithTransactions supports different parameters types', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [sender],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const tx = await sender.transfer(sender.address, 1, baseAssetId);
    const { blockId } = await tx.waitForResult();

    expect(blockId).toBeDefined();

    const block = (await provider.getBlockWithTransactions('latest')) as Block;
    expect(block).toBeDefined();

    let sameBlock = await provider.getBlockWithTransactions(blockId as string);
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlockWithTransactions(block.height.toString());
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlockWithTransactions(block.height.toNumber());
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlockWithTransactions(block.height);
    expect(block).toStrictEqual(sameBlock);
  });

  it('should ensure getBlock supports different parameters types', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [sender],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const tx = await sender.transfer(sender.address, 1, baseAssetId);
    const { blockId } = await tx.waitForResult();

    expect(blockId).toBeDefined();

    const block = (await provider.getBlock('latest')) as Block;
    expect(block).toBeDefined();

    let sameBlock = await provider.getBlock(blockId as string);
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlock(block.height.toNumber());
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlock(block.height.toString());
    expect(block).toStrictEqual(sameBlock);

    sameBlock = await provider.getBlock(block.height);
    expect(block).toStrictEqual(sameBlock);
  });

  it('can getMessageProof with all data', async () => {
    // Create a mock provider to return the message proof
    // It test mainly types and converstions
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const provider = new Provider(nodeProvider.url, {
      fetch: async (url, options) =>
        getCustomFetch(
          'getMessageProof',
          JSON.stringify({ data: { messageProof: MESSAGE_PROOF_RAW_RESPONSE } })
        )(url, options),
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
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const provider = new Provider(nodeProvider.url, {
      fetch: async (url, options) =>
        getCustomFetch(
          'getMessageStatus',
          JSON.stringify({ data: { messageStatus: messageStatusResponse } })
        )(url, options),
    });
    const messageStatus = await provider.getMessageStatus(
      '0x0000000000000000000000000000000000000000000000000000000000000008'
    );

    expect(messageStatus).toStrictEqual(messageStatusResponse);
  });

  it('can connect', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    // check if the provider was initialized properly
    expect(provider).toBeInstanceOf(Provider);
    expect(await provider.getChain()).toBeDefined();
    expect(await provider.getNode()).toBeDefined();
  });

  it('should ensure getChain and getNode uses the cache and does not fetch new data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const { error } = await safeExec(async () => {
      await provider.getChain();
      await provider.getNode();
    });

    expect(error).toBeUndefined();
  });

  it('should ensure creating new instances should not re-fetch chain and node info', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const spyFetchChainAndNodeInfo = vi.spyOn(Provider.prototype, 'fetchChainAndNodeInfo');
    const spyGetChainAndNodeInfo = vi.spyOn(provider.operations, 'getChainAndNodeInfo');

    const INSTANCES_NUM = 5;

    const promises = Array.from({ length: INSTANCES_NUM }, () => new Provider(provider.url).init());
    await Promise.all(promises);

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(INSTANCES_NUM);

    expect(spyGetChainAndNodeInfo).not.toHaveBeenCalled();
  });

  it('should ensure fetchChainAndNodeInfo uses cached data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    Provider.clearChainAndNodeCaches();

    const spyOperation = vi.spyOn(provider.operations, 'getChainAndNodeInfo');

    await provider.fetchChainAndNodeInfo();

    expect(spyOperation).toHaveBeenCalledTimes(1);
  });

  test('clearing cache based on URL only clears the cache for that URL', async () => {
    using launched1 = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '10ms'],
        loggingEnabled: false,
      },
    });
    using launched2 = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '10ms'],
        loggingEnabled: false,
      },
    });
    const { provider: provider1 } = launched1;
    const { provider: provider2 } = launched2;

    // Clear any existing chain info cache
    Provider.clearChainAndNodeCaches();

    // Ensure the provider URLs are different, and there is not chain info cache for either
    expect(provider1.url).not.toEqual(provider2.url);
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider1.url]).not.toBeDefined();
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider2.url]).not.toBeDefined();

    // Ensure the the chain cache has been updated
    await provider1.init();
    await provider2.init();
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider1.url]).toBeDefined();
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider2.url]).toBeDefined();

    // Given: we clear the cache for provider1
    Provider.clearChainAndNodeCaches(provider1.url);
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider1.url]).not.toBeDefined();
    // @ts-expect-error - chainInfoCache is private
    expect(Provider.chainInfoCache[provider2.url]).toBeDefined();
  });

  it('should ensure getGasConfig return essential gas related data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const gasConfig = await provider.getGasConfig();

    expect(gasConfig.gasPerByte).toBeDefined();
    expect(gasConfig.gasPriceFactor).toBeDefined();
    expect(gasConfig.maxGasPerPredicate).toBeDefined();
    expect(gasConfig.maxGasPerTx).toBeDefined();
  });

  it('Prepend a warning to an error with version mismatch [major]', async () => {
    const { current, supported } = mockIncompatibleVersions({
      isMajorMismatch: true,
      isMinorMismatch: false,
    });

    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const provider = await new Provider(url).init();
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    await expectToThrowFuelError(() => sender.transfer(receiver.address, 1), {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: [
        `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
        ``,
        `The Fuel Node that you are trying to connect to is using fuel-core version ${current.FUEL_CORE}.`,
        `The TS SDK currently supports fuel-core version ${supported.FUEL_CORE}.`,
        `Things may not work as expected.`,
      ].join('\n'),
    });
  });

  it('Prepend a warning to an error with version mismatch [minor]', async () => {
    const { current, supported } = mockIncompatibleVersions({
      isMajorMismatch: false,
      isMinorMismatch: true,
    });

    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const provider = await new Provider(url).init();
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    await expectToThrowFuelError(() => sender.transfer(receiver.address, 1), {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: [
        `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
        ``,
        `The Fuel Node that you are trying to connect to is using fuel-core version ${current.FUEL_CORE}.`,
        `The TS SDK currently supports fuel-core version ${supported.FUEL_CORE}.`,
        `Things may not work as expected.`,
      ].join('\n'),
    });
  });

  it('Prepend a warning to a subscription error with version mismatch [major]', async () => {
    const { current, supported } = mockIncompatibleVersions({
      isMajorMismatch: true,
      isMinorMismatch: false,
    });

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await expectToThrowFuelError(
      async () => {
        for await (const value of await provider.operations.statusChange({
          transactionId: 'invalid transaction id',
        })) {
          // shouldn't be reached and should fail if reached
          expect(value).toBeFalsy();
        }
      },

      { code: FuelError.CODES.INVALID_REQUEST }
    );

    const chainId = await provider.getChainId();
    const response = new TransactionResponse('invalid transaction id', provider, chainId);

    await expectToThrowFuelError(() => response.waitForResult(), {
      code: FuelError.CODES.INVALID_REQUEST,
      message: [
        `Failed to parse "TransactionId": Invalid character 'i' at position 0`,
        ``,
        `The Fuel Node that you are trying to connect to is using fuel-core version ${current.FUEL_CORE}.`,
        `The TS SDK currently supports fuel-core version ${supported.FUEL_CORE}.`,
        `Things may not work as expected.`,
      ].join('\n'),
    });
  });

  it('Prepend a warning to a subscription error with version mismatch [minor]', async () => {
    const { current, supported } = mockIncompatibleVersions({
      isMajorMismatch: false,
      isMinorMismatch: true,
    });

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await expectToThrowFuelError(
      async () => {
        for await (const value of await provider.operations.statusChange({
          transactionId: 'invalid transaction id',
        })) {
          // shouldn't be reached and should fail if reached
          expect(value).toBeFalsy();
        }
      },

      { code: FuelError.CODES.INVALID_REQUEST }
    );

    const chainId = await provider.getChainId();
    const response = new TransactionResponse('invalid transaction id', provider, chainId);

    await expectToThrowFuelError(() => response.waitForResult(), {
      code: FuelError.CODES.INVALID_REQUEST,
      message: [
        `Failed to parse "TransactionId": Invalid character 'i' at position 0`,
        ``,
        `The Fuel Node that you are trying to connect to is using fuel-core version ${current.FUEL_CORE}.`,
        `The TS SDK currently supports fuel-core version ${supported.FUEL_CORE}.`,
        `Things may not work as expected.`,
      ].join('\n'),
    });
  });

  it('An invalid subscription request throws a FuelError and does not hold the test runner (closes all handles)', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await expectToThrowFuelError(
      async () => {
        for await (const value of await provider.operations.statusChange({
          transactionId: 'invalid transaction id',
        })) {
          // shouldn't be reached and should fail if reached
          expect(value).toBeFalsy();
        }
      },

      { code: FuelError.CODES.INVALID_REQUEST }
    );

    const chainId = await provider.getChainId();
    const response = new TransactionResponse('invalid transaction id', provider, chainId);

    await expectToThrowFuelError(() => response.waitForResult(), {
      code: FuelError.CODES.INVALID_REQUEST,
    });
  });

  it('default timeout is undefined', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    expect(provider.options.timeout).toBeUndefined();
  });

  it('throws TimeoutError on timeout when calling an operation', async () => {
    const timeout = 500;
    using launched = await setupTestProviderAndWallets({ providerOptions: { timeout } });
    vi.spyOn(global, 'fetch').mockImplementationOnce((...args: unknown[]) =>
      sleep(timeout).then(() =>
        fetch(args[0] as RequestInfo | URL, args[1] as RequestInit | undefined)
      )
    );
    const { provider } = launched;

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
    using launched = await setupTestProviderAndWallets({ providerOptions: { timeout } });
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce((...args: unknown[]) =>
      sleep(timeout).then(() =>
        fetch(args[0] as RequestInfo | URL, args[1] as RequestInit | undefined)
      )
    );

    const { error } = await safeExec(async () => {
      for await (const iterator of await provider.operations.statusChange({
        transactionId: "doesn't matter, will be aborted",
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
  it('should ensure calculateMaxGas considers gasLimit for ScriptTransactionRequest', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const { gasPerByte, maxGasPerTx } = await provider.getGasConfig();

    const gasLimit = bn(1000);
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit,
    });

    const maxGasSpy = vi.spyOn(gasMod, 'getMaxGas');

    const chainInfo = await provider.getChain();
    const minGas = bn(200);

    const witnessesLength = transactionRequest
      .toTransaction()
      .witnesses.reduce((acc, wit) => acc + wit.dataLength, 0);

    transactionRequest.calculateMaxGas(chainInfo, minGas);
    expect(maxGasSpy).toHaveBeenCalledWith({
      gasPerByte,
      minGas,
      maxGasPerTx,
      witnessesLength,
      witnessLimit: transactionRequest.witnessLimit,
      gasLimit: transactionRequest.gasLimit,
    });
  });

  it('should ensure calculateMaxGas does NOT considers gasLimit for CreateTransactionRequest', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const { gasPerByte, maxGasPerTx } = await provider.getGasConfig();

    const transactionRequest = new CreateTransactionRequest({
      witnesses: [ZeroBytes32],
    });

    transactionRequest.addContractCreatedOutput(ZeroBytes32, ZeroBytes32);

    const maxGasSpy = vi.spyOn(gasMod, 'getMaxGas');

    const chainInfo = await provider.getChain();
    const minGas = bn(700);

    const witnessesLength = transactionRequest
      .toTransaction()
      .witnesses.reduce((acc, wit) => acc + wit.dataLength, 0);

    transactionRequest.calculateMaxGas(chainInfo, minGas);
    expect(maxGasSpy).toHaveBeenCalledWith({
      gasPerByte,
      minGas,
      witnessesLength,
      maxGasPerTx,
      witnessLimit: transactionRequest.witnessLimit,
    });
  });

  it('should ensure estimated fee values on getTransactionCost are never 0', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: { args: ['--min-gas-price', '0'] },
    });
    const {
      wallets: [wallet],
    } = launched;

    const request = new ScriptTransactionRequest();

    const { minFee, maxFee, gasPrice } = await wallet.getTransactionCost(request);

    expect(gasPrice.eq(0)).not.toBeTruthy();
    expect(maxFee.eq(0)).not.toBeTruthy();
    expect(minFee.eq(0)).not.toBeTruthy();
  });

  it('should ensure gas used has a modifier', async () => {
    using launched = await setupTestProviderAndWallets();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 1000, await provider.getBaseAssetId());

    const spyGetGasUsedFromReceipts = vi.spyOn(gasMod, 'getGasUsedFromReceipts');
    const cost = await wallet.getTransactionCost(request);

    const pristineGasUsed = spyGetGasUsedFromReceipts.mock.results[0].value;

    expect(cost.gasUsed.toNumber()).toBe(
      bn(pristineGasUsed.toNumber() * GAS_USED_MODIFIER).toNumber()
    );
  });

  it('should accept string addresses in methods that require an address', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const b256Str = Address.fromRandom().toB256();

    const methodCalls = [
      () => provider.getBalance(b256Str, baseAssetId),
      () => provider.getCoins(b256Str),
      () => provider.getResourcesToSpend(b256Str, []),
      () => provider.getContractBalance(b256Str, baseAssetId),
      () => provider.getBalances(b256Str),
      () => provider.getMessages(b256Str),
    ];

    const promises = methodCalls.map(async (call) => {
      await expect(call()).resolves.toBeTruthy();
    });

    await Promise.all(promises);
  });

  it('subscriptions: does not throw when stream contains more than one "data:"', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const responseObject = {
        data: {
          submitAndAwaitStatus: {
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

    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      expect(submitAndAwaitStatus.type).toEqual('SuccessStatus');
      expect((<SubmittedStatus>submitAndAwaitStatus).time).toEqual('data: 4611686020137152060');
    }
  });

  test('subscriptions: ignores keep-alive messages', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    const readableStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwaitStatus: { a: 0 } } })}\n\n`)
        );
        controller.enqueue(encoder.encode(':keep-alive-text\n\n'));
        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwaitStatus: { a: 1 } } })}\n\n`)
        );
        controller.close();
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    let numberOfEvents = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;
    }

    expect(numberOfEvents).toEqual(2);
  });

  it('subscriptions: does not throw when stream has two events in the same chunk', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const event1 = {
        data: {
          submitAndAwaitStatus: {
            type: 'SubmittedStatus',
          },
        },
      };
      const event2 = {
        data: {
          submitAndAwaitStatus: {
            type: 'SuccessStatus',
          },
        },
      };
      const encoder = new TextEncoder();
      const streamedResponse = new Uint8Array([
        ...encoder.encode(`data:${JSON.stringify(event1)}\n\n`),
        ...encoder.encode(`data:${JSON.stringify(event2)}\n\n`),
      ]);
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

    let numberOfEvents = 0;

    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwaitStatus.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwaitStatus.type).toEqual('SuccessStatus');
      }
    }

    expect(numberOfEvents).toEqual(2);
  });
  it('subscriptions: does not throw when an event is streamed in multiple chunks', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const responseObject = JSON.stringify({
        data: {
          submitAndAwaitStatus: {
            type: 'SuccessStatus',
          },
        },
      });

      const encoder = new TextEncoder();

      const chunk1 = encoder.encode(`data:${responseObject.slice(0, 10)}`);
      const chunk2 = encoder.encode(`${responseObject.slice(10, 20)}`);
      const chunk3 = encoder.encode(`${responseObject.slice(20)}\n\n`);

      return Promise.resolve(
        new Response(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(chunk1);
              controller.enqueue(chunk2);
              controller.enqueue(chunk3);
              controller.close();
            },
          })
        )
      );
    });

    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      expect(submitAndAwaitStatus.type).toEqual('SuccessStatus');
    }
  });

  it('subscriptions: does not throw when chunk has a full and partial event in it', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const event1 = {
        data: {
          submitAndAwaitStatus: {
            type: 'SubmittedStatus',
          },
        },
      };
      const event2 = JSON.stringify({
        data: {
          submitAndAwaitStatus: {
            type: 'SuccessStatus',
          },
        },
      });

      const encoder = new TextEncoder();
      const chunk1 = new Uint8Array([
        ...encoder.encode(`data:${JSON.stringify(event1)}\n\n`),
        ...encoder.encode(`data:${event2.slice(0, 25)}`),
      ]);
      const chunk2 = encoder.encode(`${event2.slice(25)}\n\n`);
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(chunk1);
              controller.enqueue(chunk2);
              controller.close();
            },
          })
        )
      );
    });

    let numberOfEvents = 0;

    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwaitStatus.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwaitStatus.type).toEqual('SuccessStatus');
      }
    }

    expect(numberOfEvents).toEqual(2);
  });

  it('subscriptions: does not throw when multiple chunks contain multiple events with a keep-alive message in-between', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const event1 = JSON.stringify({
        data: {
          submitAndAwaitStatus: {
            type: 'SubmittedStatus',
          },
        },
      });
      const event2 = JSON.stringify({
        data: {
          submitAndAwaitStatus: {
            type: 'SuccessStatus',
          },
        },
      });

      const encoder = new TextEncoder();
      return Promise.resolve(
        new Response(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(encoder.encode(`data:${event1.slice(0, 25)}`));
              controller.enqueue(encoder.encode(':keep-alive-text\n\n'));

              controller.enqueue(
                encoder.encode(
                  `${event1.slice(25)}\n\ndata:${event2.slice(0, 30)}:keep-alive-text\n\n`
                )
              );
              controller.enqueue(encoder.encode(`${event2.slice(30)}\n\n`));
              controller.close();
            },
          })
        )
      );
    });

    let numberOfEvents = 0;

    for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwaitStatus.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwaitStatus.type).toEqual('SuccessStatus');
      }
    }

    expect(numberOfEvents).toEqual(2);
  });

  it('subscriptions: throws if the stream data string parsing fails for some reason', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const badResponse = 'data: {f: {}\n\n';
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
        for await (const { submitAndAwaitStatus } of await provider.operations.submitAndAwaitStatus(
          {
            encodedTransaction: "it's mocked so doesn't matter",
          }
        )) {
          // shouldn't be reached!
          expect(true).toBeFalsy();
        }
      },
      {
        code: FuelError.CODES.STREAM_PARSING_ERROR,
      }
    );
  });

  test('requestMiddleware modifies the request before being sent to the node [sync]', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    Provider.clearChainAndNodeCaches();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await new Provider(provider.url, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    }).init();

    const requestObject = fetchSpy.mock.calls[0][1];

    expect(requestObject?.headers).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('requestMiddleware modifies the request before being sent to the node [async]', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    Provider.clearChainAndNodeCaches();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await new Provider(provider.url, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return Promise.resolve(request);
      },
    }).init();

    const requestObject = fetchSpy.mock.calls[0][1];

    expect(requestObject?.headers).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('requestMiddleware works for subscriptions', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider = new Provider(nodeProvider.url, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    });

    await safeExec(async () => {
      for await (const iterator of await provider.operations.statusChange({
        transactionId: "doesn't matter, will be aborted",
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
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    Provider.clearChainAndNodeCaches();

    let requestHeaders: HeadersInit | undefined;

    await new Provider(provider.url, {
      fetch: async (url, requestInit) => {
        requestHeaders = requestInit?.headers;
        return fetch(url, requestInit);
      },
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    }).init();

    expect(requestHeaders).toMatchObject({
      'x-custom-header': 'custom-value',
    });
  });

  test('custom fetch works with timeout', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const timeout = 500;
    const provider = new Provider(nodeProvider.url, {
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

  test('getMessageByNonce', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        snapshotConfig: {
          stateConfig: {
            messages: [
              new TestMessage({
                nonce: '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0',
              }).toChainMessage(),
            ],
          },
        },
      },
    });
    const { provider } = launched;

    const nonce = '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
    const message = await provider.getMessageByNonce(nonce);

    expect(message).toStrictEqual({
      messageId: expect.any(String),
      sender: expect.any(Address),
      recipient: expect.any(Address),
      nonce: expect.any(String),
      amount: expect.any(BN),
      data: expect.any(Uint8Array),
      daHeight: expect.any(BN),
    });
  });

  it('ensures getTransactions does not fetch unused data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await provider.produceBlocks(1);

    const { transactions } = await provider.operations.getTransactions({
      first: 1,
    });

    expect(transactions.edges.length).toBe(1);

    const expectedData = {
      rawPayload: expect.any(String),
    };

    expect(transactions.edges[0].node).toStrictEqual(expectedData);
  });

  it('ensures getBlockWithTransactions does not fetch unused transaction data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await provider.produceBlocks(1);

    const blockNumber = await provider.getBlockNumber();

    const { block } = await provider.operations.getBlockWithTransactions({
      blockHeight: blockNumber.toString(),
    });

    expect(block).toBeDefined();
    expect(block?.transactions.length).toBe(1);

    const expectedData = {
      id: expect.any(String),
      rawPayload: expect.any(String),
    };

    expect(block?.transactions?.[0]).toStrictEqual(expectedData);
  });

  describe('paginated methods', () => {
    test('can properly use getCoins', async () => {
      const totalCoins = RESOURCES_PAGE_SIZE_LIMIT + 1;

      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: totalCoins,
          amountPerCoin: totalCoins,
        },
      });

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const baseAssetId = await provider.getBaseAssetId();

      // can fetch 1000 coins
      let { coins, pageInfo } = await provider.getCoins(wallet.address, baseAssetId, {
        first: totalCoins - 1,
      });

      expect(coins.length).toBe(totalCoins - 1);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeFalsy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      // can list next page with 1 coin
      ({ coins, pageInfo } = await provider.getCoins(wallet.address, baseAssetId, {
        after: pageInfo.endCursor,
        first: 100,
      }));

      expect(coins.length).toBe(1);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      // can show previous page with less coins
      const last = 50;
      ({ coins, pageInfo } = await provider.getCoins(wallet.address, baseAssetId, {
        before: pageInfo.startCursor,
        last,
      }));

      expect(coins.length).toBe(last);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      // can fetch default 1000 items
      ({ coins, pageInfo } = await provider.getCoins(wallet.address, baseAssetId));

      expect(coins.length).toBe(RESOURCES_PAGE_SIZE_LIMIT);
    });

    test('can properly use getMessages', async () => {
      const totalMessages = RESOURCES_PAGE_SIZE_LIMIT + 1;
      const fakeMessages = Array.from({ length: totalMessages }, (_) => new TestMessage());
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          messages: fakeMessages,
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      let { messages, pageInfo } = await provider.getMessages(wallet.address, {
        first: totalMessages - 1,
      });

      expect(messages.length).toBe(totalMessages - 1);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeFalsy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ messages, pageInfo } = await provider.getMessages(wallet.address, {
        after: pageInfo.endCursor,
      }));

      expect(messages.length).toBe(1);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      // can show previous page with less messages
      const last = 50;
      ({ messages, pageInfo } = await provider.getMessages(wallet.address, {
        before: pageInfo.startCursor,
        last,
      }));

      expect(messages.length).toBe(last);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ messages, pageInfo } = await provider.getMessages(wallet.address));

      // can fetch default 100 items
      expect(messages.length).toBe(RESOURCES_PAGE_SIZE_LIMIT);
    });

    test('can properly use getBlocks', async () => {
      const blocksToProduce = 5;
      // one is produced when the node starts
      const totalBlocksProduced = blocksToProduce + 1;

      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      await provider.produceBlocks(blocksToProduce);

      let { blocks, pageInfo } = await provider.getBlocks({
        first: totalBlocksProduced - 1,
      });

      expect(blocks.length).toBe(totalBlocksProduced - 1);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeFalsy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ blocks, pageInfo } = await provider.getBlocks({
        after: pageInfo.endCursor,
      }));

      expect(blocks.length).toBe(1);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      // can show previous page with less blocks
      const last = 2;
      ({ blocks, pageInfo } = await provider.getBlocks({
        before: pageInfo.startCursor,
        last,
      }));

      expect(blocks.length).toBe(last);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();
    });

    it('can get transactions', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      await provider.produceBlocks(70);

      await expectToThrowFuelError(
        () => provider.getTransactions({ first: 80 }),
        new FuelError(
          ErrorCode.INVALID_INPUT_PARAMETERS,
          'Pagination limit for this query cannot exceed 60 items'
        )
      );

      let { transactions, pageInfo } = await provider.getTransactions({
        first: 60,
      });

      expect(transactions.length).toBe(60);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeFalsy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ transactions, pageInfo } = await provider.getTransactions({
        after: pageInfo.endCursor,
      }));

      expect(transactions.length).toBe(10);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ transactions, pageInfo } = await provider.getTransactions({
        before: pageInfo.startCursor,
        last: 10,
      }));

      expect(transactions.length).toBe(10);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();
    });

    it('can get balances', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          assets: 110,
        },
      });
      const {
        provider,
        wallets: [wallet],
      } = launched;

      let { balances, pageInfo } = await provider.getBalances(wallet.address, { first: 10 });

      pageInfo = pageInfo as GqlPageInfo;

      expect(balances.length).toBe(10);
      expect(pageInfo.hasNextPage).toBeTruthy();
      expect(pageInfo.hasPreviousPage).toBeFalsy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ balances, pageInfo } = await provider.getBalances(wallet.address, {
        after: pageInfo.endCursor,
      }));

      pageInfo = pageInfo as GqlPageInfo;

      expect(balances.length).toBe(100);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();

      ({ balances, pageInfo } = await provider.getBalances(wallet.address, {
        before: pageInfo.startCursor,
        last: 10,
      }));

      pageInfo = pageInfo as GqlPageInfo;

      expect(balances.length).toBe(10);
      expect(pageInfo.hasNextPage).toBeFalsy();
      expect(pageInfo.hasPreviousPage).toBeTruthy();
      expect(pageInfo.startCursor).toBeDefined();
      expect(pageInfo.endCursor).toBeDefined();
    });

    it('can get balances [NO PAGINATION SUPPORT]', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const node = await provider.getNode();
      const chain = await provider.getChain();

      const spy = vi.spyOn(provider.operations, 'getBalancesV2');
      vi.spyOn(provider.operations, 'getChainAndNodeInfo').mockImplementation(async () =>
        Promise.resolve({
          nodeInfo: {
            ...serializeNodeInfo(node),
            indexation: { assetMetadata: false, balances: false, coinsToSpend: false },
          },
          chain: serializeChain(chain),
        })
      );

      Provider.clearChainAndNodeCaches();

      const { pageInfo } = await wallet.getBalances();

      expect(spy).toHaveBeenCalledWith({
        first: 10000,
        filter: { owner: wallet.address.toB256() },
        supportsPagination: false,
      });

      expect(pageInfo).not.toBeDefined();

      vi.restoreAllMocks();
    });

    it('can get balances [PAGINATION SUPPORT]', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const spy = vi.spyOn(provider.operations, 'getBalancesV2');

      const { balances, pageInfo } = await wallet.getBalances();

      expect(spy).toHaveBeenCalledWith({
        first: BALANCES_PAGE_SIZE_LIMIT,
        filter: { owner: wallet.address.toB256() },
        supportsPagination: true,
      });

      expect(balances).toBeDefined();
      expect(pageInfo).toBeDefined();
    });

    describe('pagination arguments', async () => {
      const launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 100,
        },
      });

      const provider = launched.provider;
      const baseAssetId = await provider.getBaseAssetId();
      const address = Address.fromRandom();
      const exceededLimit = RESOURCES_PAGE_SIZE_LIMIT + 1;
      const safeLimit = BLOCKS_PAGE_SIZE_LIMIT;

      afterAll(() => {
        launched.cleanup();
      });

      function getInvocations(args: CursorPaginationArgs) {
        return [
          {
            name: 'getCoins',
            invocation: () => provider.getCoins(address, baseAssetId, args),
            limit: RESOURCES_PAGE_SIZE_LIMIT,
          },
          {
            name: 'getMessages',
            invocation: () => provider.getMessages(address, args),
            limit: RESOURCES_PAGE_SIZE_LIMIT,
          },
          {
            name: 'getBlocks',
            invocation: () => provider.getBlocks(args),
            limit: BLOCKS_PAGE_SIZE_LIMIT,
          },
          {
            name: 'getBalances',
            invocation: () => provider.getBalances(address, args),
            limit: BALANCES_PAGE_SIZE_LIMIT,
          },
        ];
      }

      const args1: CursorPaginationArgs = { first: exceededLimit };
      const invocations1 = getInvocations(args1);
      it.each(invocations1)('validate max items on $name', async ({ invocation, limit }) => {
        await expectToThrowFuelError(
          () => invocation(),
          new FuelError(
            ErrorCode.INVALID_INPUT_PARAMETERS,
            `Pagination limit for this query cannot exceed ${limit} items`
          )
        );
      });

      const args2: CursorPaginationArgs = { after: 'after', before: 'before' };
      const invocations2 = getInvocations(args2);
      it.each(invocations2)(
        "validate use of 'after' with 'before' on $name",
        async ({ invocation }) => {
          await expectToThrowFuelError(
            () => invocation(),
            new FuelError(
              ErrorCode.INVALID_INPUT_PARAMETERS,
              'Pagination arguments "after" and "before" cannot be used together'
            )
          );
        }
      );

      const args3: CursorPaginationArgs = { before: 'before', first: safeLimit };
      const invocations3 = getInvocations(args3);
      it.each(invocations3)(
        "validate use of 'after' with 'last' on $name",
        async ({ invocation }) => {
          await expectToThrowFuelError(
            () => invocation(),
            new FuelError(
              ErrorCode.INVALID_INPUT_PARAMETERS,
              'The use of pagination argument "first" with "before" is not supported'
            )
          );
        }
      );

      const args4: CursorPaginationArgs = { after: 'after', last: safeLimit };
      const invocations4 = getInvocations(args4);
      it.each(invocations4)(
        "validate use of 'before' with 'first' on $name",
        async ({ invocation }) => {
          await expectToThrowFuelError(
            () => invocation(),
            new FuelError(
              ErrorCode.INVALID_INPUT_PARAMETERS,
              'The use of pagination argument "last" with "after" is not supported'
            )
          );
        }
      );
    });
  });

  test('can properly use getBalances', async () => {
    const fundAmount = 10_000;

    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: fundAmount,
      },
    });
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const { balances } = await provider.getBalances(wallet.address);

    expect(balances.length).toBe(3);

    balances.forEach((balance) => {
      expect(balance.amount.toNumber()).toBe(fundAmount);
      expect([baseAssetId, ASSET_A, ASSET_B].includes(balance.assetId)).toBeTruthy();
    });
  });

  test('should ensure getBalance and getBalances can return u128 amounts ', async () => {
    const fundingAmount = bn(2).pow(63);
    const maxU64 = bn('0xFFFFFFFFFFFFFFFF');

    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: fundingAmount,
        count: 3,
      },
    });
    const {
      provider,
      wallets: [wallet1, wallet2, recipient],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const tx1 = await wallet1.transfer(recipient.address, bn(String(fundingAmount)).sub(1000));
    await tx1.waitForResult();

    const tx2 = await wallet2.transfer(recipient.address, bn(String(fundingAmount)).sub(1000));
    await tx2.waitForResult();

    const balance = await recipient.getBalance();

    expect(balance.gt(maxU64)).toBeTruthy();

    const { balances } = await recipient.getBalances();
    const baseAssetBalance = balances.find((b) => b.assetId === baseAssetId) as CoinQuantity;

    expect(baseAssetBalance).toBeDefined();
    expect(baseAssetBalance.amount.gt(maxU64)).toBeTruthy();
  });

  test('should not refetch consensus params in less than 1min', async () => {
    using launched = await setupTestProviderAndWallets();

    const provider = new Provider(launched.provider.url);
    const fetchChainAndNodeInfo = vi.spyOn(provider, 'fetchChainAndNodeInfo');

    // calling twice
    await provider.autoRefetchConfigs();
    await provider.autoRefetchConfigs();

    expect(fetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
  });

  test('should refetch consensus params if >1 min has passed', async () => {
    using launched = await setupTestProviderAndWallets();

    const provider = new Provider(launched.provider.url);
    const fetchChainAndNodeInfo = vi.spyOn(provider, 'fetchChainAndNodeInfo');

    // calling once to perform the first fetch
    await provider.autoRefetchConfigs();

    // reset timestamp to force a refetch
    provider.consensusParametersTimestamp = 0;

    // mock the `getConsensusParametersVersion` to return a different value,
    // thus forcing a refetch (the first value will be zero)
    vi.spyOn(provider.operations, 'getConsensusParametersVersion').mockResolvedValue({
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: '1' },
        },
      },
    });

    // calling again to perform the second fetch
    await provider.autoRefetchConfigs();

    expect(fetchChainAndNodeInfo).toHaveBeenCalledTimes(2);
  });

  it('should throw error if asset burn is detected', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [sender],
    } = launched;

    const {
      coins: [coin],
    } = await sender.getCoins(ASSET_A);

    const request = new ScriptTransactionRequest();

    // Add the coin as an input, without a change output
    request.inputs.push({
      id: coin.id,
      type: InputType.Coin,
      owner: coin.owner.toB256(),
      amount: coin.amount,
      assetId: coin.assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex:
        request.getCoinInputWitnessIndexByOwner(coin.owner) ?? request.addEmptyWitness(),
    });

    const expectedErrorMessage = [
      'Asset burn detected.',
      'Add the relevant change outputs to the transaction to avoid burning assets.',
      'Or enable asset burn, upon sending the transaction.',
    ].join('\n');
    await expectToThrowFuelError(
      () => provider.sendTransaction(request),
      new FuelError(ErrorCode.ASSET_BURN_DETECTED, expectedErrorMessage)
    );
  });

  it('should allow asset burn if enabled', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [sender],
    } = launched;
    const {
      coins: [coin],
    } = await sender.getCoins(ASSET_A);

    const request = new ScriptTransactionRequest();

    // Add the coin as an input, without a change output
    request.inputs.push({
      id: coin.id,
      type: InputType.Coin,
      owner: coin.owner.toB256(),
      amount: coin.amount,
      assetId: coin.assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex: request.getCoinInputWitnessIndexByOwner(sender) ?? request.addEmptyWitness(),
    });

    // Fund the transaction
    await request.estimateAndFund(sender);

    const signedTransaction = await sender.signTransaction(request);
    request.updateWitnessByOwner(sender.address, signedTransaction);

    const response = await provider.sendTransaction(request, {
      enableAssetBurn: true,
    });
    const { isStatusSuccess } = await response.waitForResult();
    expect(isStatusSuccess).toBe(true);
  });

  it('submits transaction and awaits status [success]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    // Create the transaction
    const transactionRequest = await wallet.createTransfer(wallet.address, 100_000);

    // Sign the transaction
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    transactionRequest.updateWitnessByOwner(wallet.address, signedTransaction);

    // Send the transaction
    const response = await provider.sendTransaction(transactionRequest, {
      estimateTxDependencies: false,
    });

    const result = await response.waitForResult();
    expect(result.status).toBe('success');
    expect(result.receipts.length).not.toBe(0);
    const transactionId = transactionRequest.getTransactionId(await provider.getChainId());
    expect(result.id).toBe(transactionId);
  });

  it('submits transaction and awaits status [success with estimation]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const transactionRequest = await wallet.createTransfer(wallet.address, 100_000);
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    transactionRequest.updateWitnessByOwner(wallet.address, signedTransaction);
    const transactionId = transactionRequest.getTransactionId(await provider.getChainId());
    const response = await provider.sendTransaction(transactionRequest);
    const result = await response.waitForResult();
    expect(result.status).toBe('success');
    expect(result.receipts.length).not.toBe(0);
    expect(result.id).toBe(transactionId);
  });

  it('submits transaction and awaits status [failure]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const transactionRequest = await wallet.createTransfer(wallet.address, 100_000);
    transactionRequest.gasLimit = bn(0); // force fail
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    transactionRequest.updateWitnessByOwner(wallet.address, signedTransaction);
    const response = await provider.sendTransaction(transactionRequest, {
      estimateTxDependencies: false,
    });
    await expectToThrowFuelError(() => response.waitForResult(), {
      code: ErrorCode.SCRIPT_REVERTED,
    });
  });

  it('can get compressed block bytes', async () => {
    const bytes = hexlify(randomBytes(32));

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    // Should return null when block is not found
    let compressed = await provider.daCompressedBlock('1');

    expect(compressed).toBeNull();

    vi.spyOn(provider, 'daCompressedBlock').mockImplementationOnce(async () =>
      Promise.resolve({
        bytes,
      })
    );

    const block = await provider.getBlock('latest');
    compressed = await provider.daCompressedBlock(String(block?.height));

    expect(compressed).toStrictEqual({ bytes });

    vi.restoreAllMocks();
  });

  it('should ensures getBalances query does not returns pageInfo', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const { balances } = await provider.operations.getBalances({
      first: 100,
      filter: { owner: wallet.address.toB256() },
    });

    const keys = Object.keys(balances);

    expect(keys.includes('edges')).toBeTruthy();

    expect(keys.includes('pageInfo')).toBeFalsy();
  });

  it('should fetch chain or node info if the cache is not provided', async () => {
    // Given: we clear any pre-existing cache
    using launched = await setupTestProviderAndWallets();
    const { provider: sourceProvider } = launched;

    Provider.clearChainAndNodeCaches();

    // When: we create a new provider with the same url
    const fetch = vi.spyOn(global, 'fetch');
    await new Provider(sourceProvider.url, { cache: undefined }).init();

    // Then: we should fetch the chain and node info
    expect(fetch).toHaveBeenCalled();
  });

  it('should not refetch chain or node info if cache is provided', async () => {
    // Given: we clear any pre-existing cache
    using launched = await setupTestProviderAndWallets();
    const { provider: sourceProvider } = launched;

    const cache: ProviderCacheJson = await serializeProviderCache(sourceProvider);
    Provider.clearChainAndNodeCaches();

    // When: we create a new provider with the same url, but with a cache
    const fetch = vi.spyOn(global, 'fetch');
    await new Provider(launched.provider.url, { cache }).init();

    // Then: we should not perform any fetch requests
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should make a single request for chain or node info across multiple instances', async () => {
    // Given: three provider instances, connected to the same node
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;
    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider1 = new Provider(url);
    const provider2 = new Provider(url);
    const provider3 = new Provider(url);
    Provider.clearChainAndNodeCaches();

    // When: we initialize all three provider instances
    await Promise.all([provider1.init(), provider2.init(), provider3.init()]);

    // Then: we should only perform a single fetch request for the chain and node info
    expect(fetchSpy.mock.calls).toEqual([
      [
        url,
        expect.objectContaining({
          method: 'POST',
          body: expect.stringMatching(/query getChainAndNodeInfo/),
        }),
      ],
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  // We expect a small timeout
  it('should fail early if the node is not reachable', { timeout: 200 }, async () => {
    const invalidUrl = 'http://something-that-does-not-exist.com';
    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider = new Provider(invalidUrl);

    const expectedError = new FuelError(
      FuelError.CODES.CONNECTION_REFUSED,
      'Unable to fetch chain and node info from the network',
      {
        url: invalidUrl,
      },
      expect.any(Error)
    );
    expectedError.cause = { code: 'ECONNREFUSED' };

    await expectToThrowFuelError(() => provider.init(), expectedError);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should fail early and across multiple instances', async () => {
    const invalidUrl = 'http://something-that-does-not-exist.com';
    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider1 = new Provider(invalidUrl);
    const provider2 = new Provider(invalidUrl);

    const [result1, result2] = await Promise.allSettled([provider1.init(), provider2.init()]);

    const expectedFailure = {
      status: 'rejected',
      reason: expect.objectContaining({
        code: FuelError.CODES.CONNECTION_REFUSED,
        message: 'Unable to fetch chain and node info from the network',
        metadata: {
          url: invalidUrl,
        },
        cause: {
          code: 'ECONNREFUSED',
        },
      }),
    };
    expect(result1).toMatchObject(expectedFailure);
    expect(result2).toMatchObject(expectedFailure);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw error of asset metadata is not supported', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const node = await provider.getNode();
    const chain = await provider.getChain();

    vi.spyOn(provider.operations, 'getChainAndNodeInfo').mockImplementation(async () =>
      Promise.resolve({
        nodeInfo: {
          ...serializeNodeInfo(node),
          indexation: { assetMetadata: false, balances: false, coinsToSpend: false },
        },
        chain: serializeChain(chain),
      })
    );

    Provider.clearChainAndNodeCaches();

    await expectToThrowFuelError(
      () => provider.getAssetDetails(TestAssetId.A.value),
      new FuelError(
        ErrorCode.UNSUPPORTED_FEATURE,
        'The current node does not supports fetching asset details'
      )
    );

    vi.restoreAllMocks();
  });

  describe('Non-populated response body', () => {
    // Reset back to default
    afterAll(() => {
      Provider.ENABLE_RPC_CONSISTENCY = true;
    });

    describe('ENABLE_RPC_CONSISTENCY = false', () => {
      beforeAll(() => {
        Provider.ENABLE_RPC_CONSISTENCY = false;
      });

      it(
        'should not fall over if the response body is null [non-subscription]',
        { timeout: 20000 },
        async () => {
          using launched = await setupTestProviderAndWallets();
          const {
            provider: { url },
          } = launched;
          const provider = new Provider(url, {
            fetch: getCustomFetch('estimateGasPrice', null),
          });

          await expectToThrowFuelError(() => provider.estimateGasPrice(10), {
            code: ErrorCode.RESPONSE_BODY_EMPTY,
            message: 'The response from the server is missing the body',
            metadata: {
              timestamp: expect.any(String),
              request: expect.any(Object),
              response: expect.any(Object),
            },
          });
        }
      );

      it(
        'should not fall over if the response body is null [subscription]',
        { timeout: 20000 },
        async () => {
          using launched = await setupTestProviderAndWallets();
          const {
            provider: { url },
          } = launched;
          const provider = new Provider(url, {
            fetch: getCustomFetch('submitAndAwaitStatus', null),
          });

          const request = new ScriptTransactionRequest();

          await expectToThrowFuelError(
            () =>
              provider.operations.submitAndAwaitStatus({
                encodedTransaction: hexlify(request.toTransactionBytes()),
              }),
            {
              code: ErrorCode.RESPONSE_BODY_EMPTY,
              message: 'The response from the server is missing the body',
              metadata: {
                timestamp: expect.any(String),
                request: expect.any(Object),
                response: expect.any(Object),
              },
            }
          );
        }
      );
    });

    describe('ENABLE_RPC_CONSISTENCY = true', () => {
      beforeAll(() => {
        Provider.ENABLE_RPC_CONSISTENCY = true;
      });

      it(
        'should not fall over if the response body is null [non-subscription]',
        { timeout: 20000 },
        async () => {
          using launched = await setupTestProviderAndWallets();
          const {
            provider: { url },
          } = launched;
          const provider = new Provider(url, {
            fetch: getCustomFetch('estimateGasPrice', null),
          });

          await expectToThrowFuelError(() => provider.estimateGasPrice(10), {
            code: ErrorCode.RESPONSE_BODY_EMPTY,
            message: 'The response from the server is missing the body',
            metadata: {
              timestamp: expect.any(String),
              request: expect.any(Object),
              response: expect.any(Object),
            },
          });
        }
      );

      it(
        'should not fall over if the response body is null [subscription]',
        { timeout: 20000 },
        async () => {
          using launched = await setupTestProviderAndWallets();
          const {
            provider: { url },
          } = launched;
          const provider = new Provider(url, {
            fetch: getCustomFetch('submitAndAwaitStatus', null),
          });

          const request = new ScriptTransactionRequest();

          await expectToThrowFuelError(
            () =>
              provider.operations.submitAndAwaitStatus({
                encodedTransaction: hexlify(request.toTransactionBytes()),
              }),
            {
              code: ErrorCode.RESPONSE_BODY_EMPTY,
              message: 'The response from the server is missing the body',
              metadata: {
                timestamp: expect.any(String),
                request: expect.any(Object),
                response: expect.any(Object),
              },
            }
          );
        }
      );
    });
  });

  describe('Waiting for transaction statuses', () => {
    const PreconfirmationSuccessStatus = 'PreconfirmationSuccessStatus';
    const SuccessStatus = 'SuccessStatus';

    it('should wait only for Preconfirmation status and close subscription', async () => {
      using launched = await setupTestProviderAndWallets({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });
      const {
        wallets: [wallet],
      } = launched;

      const readEventSpy = vi.spyOn(FuelGraphqlSubscriber, 'readEvent');

      const res = await wallet.transfer(wallet.address, 100_000);
      await res.waitForPreConfirmation();

      expect(readEventSpy.mock.results.length).toBeGreaterThan(0);

      let readSuccessStatus = false;
      let readPreconfirmationStatus = false;

      // Loop through all the read events and ensure SuccessStatus was never read
      for (let i = 0; i < readEventSpy.mock.results.length; i += 1) {
        const {
          event: {
            data: { submitAndAwaitStatus },
          },
        } = await readEventSpy.mock.results[i].value;
        if (submitAndAwaitStatus.type === SuccessStatus) {
          readSuccessStatus = true;
        }

        if (submitAndAwaitStatus.type === PreconfirmationSuccessStatus) {
          readPreconfirmationStatus = true;
        }

        expect(submitAndAwaitStatus.type).not.toBe(SuccessStatus);
      }

      expect(readSuccessStatus).toBeFalsy();
      expect(readPreconfirmationStatus).toBeTruthy();
    });

    it('should wait for both preconfirmation and confirmation statuses', async () => {
      using launched = await setupTestProviderAndWallets({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });
      const {
        wallets: [wallet],
      } = launched;

      const readEventSpy = vi.spyOn(FuelGraphqlSubscriber, 'readEvent');

      const { waitForResult, waitForPreConfirmation } = await wallet.transfer(
        wallet.address,
        100_000
      );

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      waitForResult();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      waitForPreConfirmation();

      await sleep(2500);

      expect(readEventSpy.mock.results.length).toBeGreaterThan(0);

      let readSuccessStatus = false;
      let readPreconfirmationStatus = false;

      // Loop through all the read events and ensure SuccessStatus was never read
      for (let i = 0; i < readEventSpy.mock.results.length; i += 1) {
        const {
          event: {
            data: { submitAndAwaitStatus },
          },
        } = await readEventSpy.mock.results[i].value;

        if (submitAndAwaitStatus.type === PreconfirmationSuccessStatus) {
          readPreconfirmationStatus = true;
        }

        if (submitAndAwaitStatus.type === SuccessStatus) {
          readSuccessStatus = true;
        }
      }

      expect(readPreconfirmationStatus).toBeTruthy();
      expect(readSuccessStatus).toBeTruthy();
    });

    it('should wait for confirmation statuses', async () => {
      using launched = await setupTestProviderAndWallets({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });
      const {
        wallets: [wallet],
      } = launched;

      const readEventSpy = vi.spyOn(FuelGraphqlSubscriber, 'readEvent');

      const { waitForResult } = await wallet.transfer(wallet.address, 100_000);

      await waitForResult();

      expect(readEventSpy.mock.results.length).toBeGreaterThan(0);

      let readSuccessStatus = false;
      let readPreconfirmationStatus = false;

      // Loop through all the read events and ensure SuccessStatus was never read
      for (let i = 0; i < readEventSpy.mock.results.length; i += 1) {
        const {
          event: {
            data: { submitAndAwaitStatus },
          },
        } = await readEventSpy.mock.results[i].value;

        if (submitAndAwaitStatus.type === PreconfirmationSuccessStatus) {
          readPreconfirmationStatus = true;
        }

        if (submitAndAwaitStatus.type === SuccessStatus) {
          readSuccessStatus = true;
        }
      }

      expect(readPreconfirmationStatus).toBeTruthy();
      expect(readSuccessStatus).toBeTruthy();
    });
  });
});
