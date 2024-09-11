import { Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes, randomUUID } from '@fuel-ts/crypto';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import { BN, bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { InputType, ReceiptType } from '@fuel-ts/transactions';
import { DateTime, arrayify, sleep } from '@fuel-ts/utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import { versions } from '@fuel-ts/versions';
import * as fuelTsVersionsMod from '@fuel-ts/versions';

import {
  messageStatusResponse,
  MESSAGE_PROOF_RAW_RESPONSE,
  MESSAGE_PROOF,
} from '../../test/fixtures';
import {
  MOCK_TX_UNKNOWN_RAW_PAYLOAD,
  MOCK_TX_SCRIPT_RAW_PAYLOAD,
} from '../../test/fixtures/transaction-summary';
import { setupTestProviderAndWallets, launchNode, TestMessage } from '../test-utils';

import type { Coin } from './coin';
import { coinQuantityfy } from './coin-quantity';
import type { Message } from './message';
import type { ChainInfo, CursorPaginationArgs, NodeInfo } from './provider';
import Provider, {
  BLOCKS_PAGE_SIZE_LIMIT,
  DEFAULT_RESOURCE_CACHE_TTL,
  RESOURCES_PAGE_SIZE_LIMIT,
} from './provider';
import type { ExcludeResourcesOption } from './resource';
import { isCoin } from './resource';
import type { CoinTransactionRequestInput } from './transaction-request';
import { CreateTransactionRequest, ScriptTransactionRequest } from './transaction-request';
import { TransactionResponse } from './transaction-response';
import type { SubmittedStatus } from './transaction-summary/types';
import * as gasMod from './utils/gas';

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
  it('should ensure supports basic auth', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const { urlWithAuth, expectedHeaders } = createBasicAuth(url);
    const provider = await Provider.create(urlWithAuth);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrl, request] = fetchSpy.mock.calls[0];
    expect(requestUrl).toEqual(url);
    expect(request?.headers).toMatchObject(expectedHeaders);
  });

  it('should ensure we can reuse provider URL to connect to a authenticated endpoint', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const { urlWithAuth, expectedHeaders } = createBasicAuth(url);
    const provider = await Provider.create(urlWithAuth);

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const [requestUrlA, requestA] = fetchSpy.mock.calls[0];
    expect(requestUrlA).toEqual(url);
    expect(requestA?.headers).toMatchObject(expectedHeaders);

    // Reuse the provider URL to connect to an authenticated endpoint
    const newProvider = await Provider.create(provider.url);

    fetchSpy.mockClear();

    await newProvider.operations.getChain();
    const [requestUrl, request] = fetchSpy.mock.calls[0];
    expect(requestUrl).toEqual(url);
    expect(request?.headers).toMatchObject(expectedHeaders);
  });

  it('should ensure that custom requestMiddleware is not overwritten by basic auth', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider: { url },
    } = launched;

    const { urlWithAuth } = createBasicAuth(url);

    const requestMiddleware = vi.fn().mockImplementation((options) => options);

    await Provider.create(urlWithAuth, {
      requestMiddleware,
    });

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
    const provider = await Provider.create(basicAuthA.urlWithAuth);

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

    const provider = await Provider.create(url, {
      headers: customHeaders,
    });

    const fetchSpy = vi.spyOn(global, 'fetch');
    await provider.operations.getChain();

    const [, request] = fetchSpy.mock.calls[0];
    expect(request?.headers).toMatchObject(customHeaders);
  });

  it('should throw an error when retrieving a transaction with an unknown transaction type', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const mockProvider = await Provider.create(provider.url, {
      fetch: getCustomFetch('getTransaction', {
        transaction: {
          id: '0x1234567890abcdef',
          rawPayload: MOCK_TX_UNKNOWN_RAW_PAYLOAD, // Unknown transaction type
        },
      }),
    });

    // Spy on console.warn
    const consoleWarnSpy = vi.spyOn(console, 'warn');

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

    // Create a mock provider with custom getTransactions operation
    const mockProvider = await Provider.create(nodeProvider.url, {
      fetch: getCustomFetch('getTransactions', {
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
      }),
    });

    // Spy on console.warn
    const consoleWarnSpy = vi.spyOn(console, 'warn');

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

    expect(version).toEqual('0.35.0');
  });

  it('can call()', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const baseAssetId = provider.getBaseAssetId();

    const CoinInputs: CoinTransactionRequestInput[] = [
      {
        type: InputType.Coin,
        id: '0xbc90ada45d89ec6648f8304eaf8fa2b03384d3c0efabc192b849658f4689b9c500',
        owner: baseAssetId,
        assetId: baseAssetId,
        txPointer: '0x00000000000000000000000000000000',
        amount: 500_000,
        witnessIndex: 0,
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
      witnesses: ['0x'],
    });

    const callResult = await provider.dryRun(transactionRequest);

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: bn(202),
        val1: bn(186),
        val2: bn(0),
        val3: bn(0),
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
        gasUsed: bn(159),
      },
    ];

    expect(callResult.receipts).toStrictEqual(expectedReceipts);
  });

  it('can get all chain info', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const { consensusParameters } = provider.getChain();

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

    const chainId = provider.getChainId();

    expect(chainId).toBe(0);
  });

  it('gets the base asset ID', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const baseAssetId = provider.getBaseAssetId();

    expect(baseAssetId).toBeDefined();
  });

  it('can change the provider url of the current instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const { cleanup, url } = await launchNode({ port: '0' });

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

    const provider = await Provider.create(providerUrl, {
      fetch: getCustomFetch('getVersion', { nodeInfo: { nodeVersion: '0.30.0' } }),
    });

    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can accept options override in connect method', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider: providerForUrl } = launched;

    const providerUrl = providerForUrl.url;

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

  it('can set cache ttl', async () => {
    const ttl = 10000;
    using launched = await setupTestProviderAndWallets({
      providerOptions: {
        resourceCacheTTL: ttl,
      },
    });
    const { provider } = launched;

    expect(provider.cache?.ttl).toEqual(ttl);
  });

  it('should use resource cache by default', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    expect(provider.cache?.ttl).toEqual(DEFAULT_RESOURCE_CACHE_TTL);
  });

  it('should validate resource cache value [invalid numerical]', async () => {
    const { error } = await safeExec(async () => {
      await setupTestProviderAndWallets({ providerOptions: { resourceCacheTTL: -500 } });
    });
    expect(error?.message).toMatch(/Invalid TTL: -500\. Use a value greater than zero/);
  });

  it('should be possible to disable the cache by using -1', async () => {
    using launched = await setupTestProviderAndWallets({
      providerOptions: {
        resourceCacheTTL: -1,
      },
    });
    const { provider } = launched;

    expect(provider.cache).toBeUndefined();
  });

  it('should cache resources only when TX is successfully submitted', async () => {
    const resourceAmount = 5_000;
    const utxosAmount = 2;

    const testMessage = new TestMessage({ amount: resourceAmount });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      // 3 resources with a total of 15_000
      walletsConfig: {
        coinsPerAsset: utxosAmount,
        amountPerCoin: resourceAmount,
        messages: [testMessage],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();
    const { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(utxosAmount);

    // Tx will cost 10_000 for the transfer + 1 for fee. All resources will be used
    const EXPECTED = {
      utxos: coins.map((coin) => coin.id),
      messages: [testMessage.nonce],
    };

    await wallet.transfer(receiver.address, 10_000);

    const cachedResources = provider.cache?.getActiveData();
    expect(new Set(cachedResources?.utxos)).toEqual(new Set(EXPECTED.utxos));
    expect(new Set(cachedResources?.messages)).toEqual(new Set(EXPECTED.messages));
  });

  it('should NOT cache resources when TX submission fails', async () => {
    const message = new TestMessage({ amount: 100_000 });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 2,
        amountPerCoin: 20_000,
        messages: [message],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();
    const maxFee = 100_000;
    const transferAmount = 10_000;

    const { coins } = await wallet.getCoins(baseAssetId);
    const utxos = coins.map((c) => c.id);
    const messages = [message.nonce];

    // No enough funds to pay for the TX fee
    const resources = await wallet.getResourcesToSpend([[transferAmount, baseAssetId]]);

    const request = new ScriptTransactionRequest({
      maxFee,
    });

    request.addCoinOutput(receiver.address, transferAmount, baseAssetId);
    request.addResources(resources);

    await expectToThrowFuelError(
      () => wallet.sendTransaction(request, { estimateTxDependencies: false }),
      { code: ErrorCode.INVALID_REQUEST }
    );

    // No resources were cached since the TX submission failed
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(key)).toBeFalsy();
    });
  });

  it('should unset cached resources when TX execution fails', async () => {
    const message = new TestMessage({ amount: 100_000 });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 100_000,
        messages: [message],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();
    const maxFee = 100_000;
    const transferAmount = 10_000;

    const { coins } = await wallet.getCoins(baseAssetId);
    const utxos = coins.map((c) => c.id);
    const messages = [message.nonce];

    // Should fetch resources enough to pay for the TX fee and transfer amount
    const resources = await wallet.getResourcesToSpend([[maxFee + transferAmount, baseAssetId]]);

    const request = new ScriptTransactionRequest({
      maxFee,
      // No enough gas to execute the TX
      gasLimit: 0,
    });

    request.addCoinOutput(receiver.address, transferAmount, baseAssetId);
    request.addResources(resources);

    // TX submission will succeed
    const submitted = await wallet.sendTransaction(request, { estimateTxDependencies: false });

    // Resources were cached since the TX submission succeeded
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(key)).toBeTruthy();
    });

    // TX execution will fail
    await expectToThrowFuelError(() => submitted.waitForResult(), {
      code: ErrorCode.SCRIPT_REVERTED,
    });

    // Ensure user's resouces were unset from the cache
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(key)).toBeFalsy();
    });
  });

  it('should ensure cached resources are not being queried', async () => {
    // Fund the wallet with 2 resources
    const testMessage = new TestMessage({ amount: 100_000_000_000 });
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 100_000_000_000,
        messages: [testMessage],
      },
    });

    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;
    const baseAssetId = provider.getBaseAssetId();
    const transferAmount = 10_000;

    const {
      coins: [coin],
    } = await wallet.getCoins(baseAssetId);

    const {
      messages: [message],
    } = await wallet.getMessages();

    // One of the resources will be cached as the TX submission was successful
    await wallet.transfer(receiver.address, transferAmount);

    // Determine the used and unused resource
    const cachedResource = provider.cache?.isCached(coin.id) ? coin : message;
    const uncachedResource = provider.cache?.isCached(coin.id) ? message : coin;

    expect(cachedResource).toBeDefined();
    expect(uncachedResource).toBeDefined();

    // Spy on the getCoinsToSpend method to ensure the cached resource is not being queried
    const resourcesToSpendSpy = vi.spyOn(provider.operations, 'getCoinsToSpend');
    const fetchedResources = await wallet.getResourcesToSpend([[transferAmount, baseAssetId]]);

    // Only one resource is available as the other one was cached
    expect(fetchedResources.length).toBe(1);

    // Ensure the returned resource is the non-cached one
    const excludedIds: Required<ExcludeResourcesOption> = { messages: [], utxos: [] };
    if (isCoin(fetchedResources[0])) {
      excludedIds.messages = expect.arrayContaining([(<Message>cachedResource).nonce]);
      excludedIds.utxos = expect.arrayContaining([]);
      expect(fetchedResources[0].id).toEqual((<Coin>uncachedResource).id);
    } else {
      excludedIds.utxos = expect.arrayContaining([(<Coin>cachedResource).id]);
      excludedIds.messages = expect.arrayContaining([]);
      expect(fetchedResources[0].nonce).toEqual((<Message>uncachedResource).nonce);
    }

    // Ensure the getCoinsToSpend query was called excluding the cached resource
    expect(resourcesToSpendSpy).toHaveBeenCalledWith({
      owner: wallet.address.toB256(),
      queryPerAsset: [
        {
          assetId: baseAssetId,
          amount: String(transferAmount),
          max: undefined,
        },
      ],
      excludedIds,
    });
  });

  it('should throws if max of inputs was exceeded', async () => {
    const maxInputs = 2;
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V1: {
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
        amountPerCoin: 500_000,
      },
    });

    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    const request = new ScriptTransactionRequest();

    const quantities = [coinQuantityfy([1000, ASSET_A]), coinQuantityfy([500, ASSET_B])];
    const resources = await sender.getResourcesToSpend(quantities);

    request.addCoinOutput(receiver.address, 500, provider.getBaseAssetId());

    const txCost = await sender.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    request.addResources(resources);

    await sender.fund(request, txCost);

    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(
        ErrorCode.MAX_INPUTS_EXCEEDED,
        'The transaction exceeds the maximum allowed number of inputs.'
      )
    );
  });

  it('should throws if max of ouputs was exceeded', async () => {
    const maxOutputs = 2;
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V1: {
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

    const baseAssetId = provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();
    const resources = await sender.getResourcesToSpend([[1000, baseAssetId]]);
    request.addCoinOutput(receiver1.address, 1, baseAssetId);
    request.addCoinOutput(receiver2.address, 1, baseAssetId);

    request.addResources(resources);

    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(
        ErrorCode.MAX_OUTPUTS_EXCEEDED,
        'The transaction exceeds the maximum allowed number of outputs.'
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
    const { transactions } = await provider.getTransactions({ first: 100 });
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

  it('can getMessageProof with all data', async () => {
    // Create a mock provider to return the message proof
    // It test mainly types and converstions
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const provider = await Provider.create(nodeProvider.url, {
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
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const provider = await Provider.create(nodeProvider.url, {
      fetch: async (url, options) =>
        getCustomFetch('getMessageStatus', { messageStatus: messageStatusResponse })(url, options),
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
    expect(provider.getChain()).toBeDefined();
    expect(provider.getNode()).toBeDefined();
  });

  it('should cache chain and node info', async () => {
    Provider.clearChainAndNodeCaches();

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    expect(provider.getChain()).toBeDefined();
    expect(provider.getNode()).toBeDefined();
  });

  it('should ensure getChain and getNode uses the cache and does not fetch new data', async () => {
    Provider.clearChainAndNodeCaches();

    const spyFetchChainAndNodeInfo = vi.spyOn(Provider.prototype, 'fetchChainAndNodeInfo');
    const spyFetchChain = vi.spyOn(Provider.prototype, 'fetchChain');
    const spyFetchNode = vi.spyOn(Provider.prototype, 'fetchNode');

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

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

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(1);
    expect(spyFetchChain).toHaveBeenCalledTimes(1);
    expect(spyFetchNode).toHaveBeenCalledTimes(1);

    await provider.fetchChainAndNodeInfo();

    expect(spyFetchChainAndNodeInfo).toHaveBeenCalledTimes(2);
    expect(spyFetchChain).toHaveBeenCalledTimes(2);
    expect(spyFetchNode).toHaveBeenCalledTimes(2);
  });

  it('should ensure getGasConfig return essential gas related data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const gasConfig = provider.getGasConfig();

    expect(gasConfig.gasPerByte).toBeDefined();
    expect(gasConfig.gasPriceFactor).toBeDefined();
    expect(gasConfig.maxGasPerPredicate).toBeDefined();
    expect(gasConfig.maxGasPerTx).toBeDefined();
  });

  it('should throws when using getChain or getNode and without cached data', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

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

  it('warns on difference between major client version and supported major version', async () => {
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

    const consoleWarnSpy = vi.spyOn(console, 'warn');

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await Provider.create(provider.url);

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${FUEL_CORE},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${mock.supportedVersion}.`
    );
  });

  it('warns on difference between minor client version and supported minor version', async () => {
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

    const consoleWarnSpy = vi.spyOn(console, 'warn');

    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    await Provider.create(provider.url);

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${FUEL_CORE},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${mock.supportedVersion}.`
    );
  });

  it('should ensure fuel node version warning is shown before chain incompatibility error', async () => {
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

    const consoleWarnSpy = vi.spyOn(console, 'warn');

    const graphQLDummyError = `Unknown field "height" on type "Block".
      Unknown field "version" on type "ScriptParameters".
      Unknown field "version" on type "ConsensusParameters".`;

    const fuelError = new FuelError(ErrorCode.INVALID_REQUEST, graphQLDummyError);

    const fetchChainSpy = vi
      .spyOn(Provider.prototype, 'fetchChain')
      .mockImplementationOnce(async () => Promise.reject(fuelError));

    await expectToThrowFuelError(() => setupTestProviderAndWallets(), fuelError);

    expect(consoleWarnSpy).toHaveBeenCalledOnce();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${FUEL_CORE},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${mock.supportedVersion}.`
    );

    expect(fetchChainSpy).toHaveBeenCalledOnce();
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

    const response = new TransactionResponse('invalid transaction id', provider);

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
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const { gasPerByte, maxGasPerTx } = provider.getGasConfig();

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
      maxGasPerTx,
      witnessesLength,
      witnessLimit: transactionRequest.witnessLimit,
      gasLimit: transactionRequest.gasLimit,
    });
  });

  it('should ensure calculateMaxgas does NOT considers gasLimit for CreateTransactionRequest', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const { gasPerByte, maxGasPerTx } = provider.getGasConfig();

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

    expect(gasPrice.eq(0)).toBeTruthy();
    expect(maxFee.eq(0)).not.toBeTruthy();
    expect(minFee.eq(0)).not.toBeTruthy();
  });

  it('should accept string addresses in methods that require an address', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const baseAssetId = provider.getBaseAssetId();
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

    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      expect(submitAndAwait.type).toEqual('SuccessStatus');
      expect((<SubmittedStatus>submitAndAwait).time).toEqual('data: 4611686020137152060');
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
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 0 } } })}\n\n`)
        );
        controller.enqueue(encoder.encode(':keep-alive-text\n\n'));
        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 1 } } })}\n\n`)
        );
        controller.close();
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    let numberOfEvents = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
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
          submitAndAwait: {
            type: 'SubmittedStatus',
          },
        },
      };
      const event2 = {
        data: {
          submitAndAwait: {
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

    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwait.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwait.type).toEqual('SuccessStatus');
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
          submitAndAwait: {
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

    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      expect(submitAndAwait.type).toEqual('SuccessStatus');
    }
  });

  it('subscriptions: does not throw when chunk has a full and partial event in it', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const event1 = {
        data: {
          submitAndAwait: {
            type: 'SubmittedStatus',
          },
        },
      };
      const event2 = JSON.stringify({
        data: {
          submitAndAwait: {
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

    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwait.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwait.type).toEqual('SuccessStatus');
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
          submitAndAwait: {
            type: 'SubmittedStatus',
          },
        },
      });
      const event2 = JSON.stringify({
        data: {
          submitAndAwait: {
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

    for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
      encodedTransaction: "it's mocked so doesn't matter",
    })) {
      numberOfEvents += 1;

      if (numberOfEvents === 1) {
        expect(submitAndAwait.type).toEqual('SubmittedStatus');
      }
      if (numberOfEvents === 2) {
        expect(submitAndAwait.type).toEqual('SuccessStatus');
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
        for await (const { submitAndAwait } of await provider.operations.submitAndAwait({
          encodedTransaction: "it's mocked so doesn't matter",
        })) {
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

    const fetchSpy = vi.spyOn(global, 'fetch');
    await Provider.create(provider.url, {
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
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');
    await Provider.create(provider.url, {
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
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');
    const provider = await Provider.create(nodeProvider.url, {
      requestMiddleware: (request) => {
        request.headers ??= {};
        (request.headers as Record<string, string>)['x-custom-header'] = 'custom-value';
        return request;
      },
    });

    await safeExec(async () => {
      for await (const iterator of await provider.operations.statusChange({
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
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    let requestHeaders: HeadersInit | undefined;
    await Provider.create(provider.url, {
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
    using launched = await setupTestProviderAndWallets();
    const { provider: nodeProvider } = launched;

    const timeout = 500;
    const provider = await Provider.create(nodeProvider.url, {
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
    using launched = await setupTestProviderAndWallets();
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

      const baseAssetId = provider.getBaseAssetId();

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

    describe('pagination arguments', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 100,
        },
      });
      const { provider } = launched;
      const baseAssetId = provider.getBaseAssetId();
      const address = Address.fromRandom();
      const exceededLimit = RESOURCES_PAGE_SIZE_LIMIT + 1;
      const safeLimit = BLOCKS_PAGE_SIZE_LIMIT;

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

    const baseAssetId = provider.getBaseAssetId();

    const { balances } = await provider.getBalances(wallet.address);

    expect(balances.length).toBe(3);

    balances.forEach((balance) => {
      expect(balance.amount.toNumber()).toBe(fundAmount);
      expect([baseAssetId, ASSET_A, ASSET_B].includes(balance.assetId)).toBeTruthy();
    });
  });
});
