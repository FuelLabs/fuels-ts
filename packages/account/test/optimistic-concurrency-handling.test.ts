import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { sleep } from '@fuel-ts/utils';
import type { MockInstance } from 'vitest';

import { Provider } from '../src/providers';
import { type LaunchNodeOptions, setupTestProviderAndWallets } from '../src/test-utils';

import { getFetchOperationsByName } from './utils/getFetchOperation';

const setupTest = async (opts: Partial<{ blockHeightTolerance: number, poaIntervalPeriod: string }> = {}) => {
  const { blockHeightTolerance = 10, poaIntervalPeriod = '50ms' } = opts;
  const defaultNodeOptions: LaunchNodeOptions = {
    args: [
      '--poa-instant',
      'false',
      '--poa-interval-period',
      poaIntervalPeriod,
      '--graphql-required-block-height-tolerance',
      String(blockHeightTolerance),
    ],
  };

  const {
    cleanup,
    provider,
    wallets: [wallet],
  } = await setupTestProviderAndWallets({
    nodeOptions: defaultNodeOptions,
  });

  const baseAssetId = await provider.getBaseAssetId();

  const {
    chain: {
      latestBlock: { height: latestBlockHeight },
    },
  } = await provider.operations.getLatestBlockHeight();

  // Clear any cache related to the height
  // @ts-expect-error - private property
  Provider.inflightFetchChainAndNodeInfoRequests = {};

  return {
    wallet,
    provider,
    providerUrl: provider.url,
    baseAssetId,
    latestBlockHeight: Number(latestBlockHeight),
    [Symbol.dispose]: () => cleanup(),
  };
};

const mockAll = () => {
  const fetchSpy = vi.spyOn(global, 'fetch');

  return {
    fetch: fetchSpy,
  }
}

const setExpectedBlockHeightToRequest = async (opts: { provider: Provider, newHeight: number }) => {
  const {
    provider,
    newHeight,
  } = opts;

  const {
    chain: {
      latestBlock: { height: latestBlockHeight },
    },
  } = await provider.operations.getLatestBlockHeight();

  // We will set the expected block height to the latest block height + the expected height
  const expectedHeight = Number(latestBlockHeight) + newHeight;

  const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce((url, request) => {
    // we're mocking it to modify the required_fuel_block_height
    // but we still want the real fetch to be called
    // hence why we reset immediately and return the real fetch call in the end
    fetchSpy.mockReset();

    const body = JSON.parse(request?.body?.toString() as string);
    body.extensions = {};
    body.extensions.required_fuel_block_height = expectedHeight;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    request!.body = JSON.stringify(body);

    return fetch(url, request);
  });

  return {
    expectedHeight,
  }
};

/**
 * @group node
 * @group browser
 */
describe('optimistic concurrency handling via block height', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it(`initial read operations don't include the required block height in request`, async () => {
    using launched = await setupTest();
    const { provider } = launched;
    const { fetch } = mockAll();

    await provider.operations.getChain();

    const [operation] = getFetchOperationsByName(fetch, 'getChain');
    expect(operation.extensions.required_fuel_block_height).toBeUndefined();
  });

  it('should set the block height cache after a write operation', async () => {
    using launched = await setupTest();
    const { provider } = launched;

    await provider.operations.produceBlocks({ blocksToProduce: "1"});

    // @ts-expect-error - private property
    const providerBlockHeight = Provider.currentBlockHeightCache[provider.url];
    expect(providerBlockHeight).toEqual(1);
  })

  it(`should clear the block height cache with clearChainAndNodeCaches`, async () => {
    using launched = await setupTest();
    const { provider } = launched;

    await provider.operations.produceBlocks({ blocksToProduce: "1"});
    // @ts-expect-error - private property
    const providerBlockHeight = Provider.currentBlockHeightCache[provider.url];
    expect(providerBlockHeight).toEqual(1);

    Provider.clearChainAndNodeCaches();

    // @ts-expect-error - private property
    const providerBlockHeightAfterClear = Provider.currentBlockHeightCache[provider.url];
    expect(providerBlockHeightAfterClear).toBeUndefined();
  });

  it('should wait for the block height to be higher than the current block height [write operation then read operation]', async () => {
    using launched = await setupTest();
    const { provider, latestBlockHeight } = launched;
    const { fetch } = mockAll();

    // Write operation
    await provider.operations.produceBlocks({ blocksToProduce: "1"});

    // Read operation
    await provider.operations.getChain();

    const [operation] = getFetchOperationsByName(fetch, 'getChain');
    expect(operation.extensions.required_fuel_block_height).toBeGreaterThan(latestBlockHeight);
  });

  it(`waits when current block height is higher than actual [within node's tolerance]`, async () => {
    using launched = await setupTest({ blockHeightTolerance: 10 });
    const { provider, wallet, baseAssetId } = launched;

    // Perform a write operation to ensure the block height is updated
    await provider.operations.produceBlocks({ blocksToProduce: "1"});

    // Set the expected block height to 8
    const { expectedHeight } = await setExpectedBlockHeightToRequest({ provider, newHeight: 8 });

    // Perform a read operation
    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(Number(newBlockHeight)).toBeGreaterThanOrEqual(expectedHeight);
  });

  // TODO: I don't understand this test...
  it(`waits when current block height is higher than actual [outside node's tolerance]`, async () => {
    using launched = await setupTest({ blockHeightTolerance: 0 });
    const { provider, wallet, baseAssetId } = launched;

    // Perform a write operation to ensure the block height is updated
    await provider.operations.produceBlocks({ blocksToProduce: "1"});

    // Set the expected block height to 20
    const { expectedHeight } = await setExpectedBlockHeightToRequest({ provider, newHeight: 20 });

    // Perform a read operation
    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(Number(newBlockHeight)).toBeGreaterThanOrEqual(expectedHeight);
  });

  it('should throw when retries are exceeded', async () => {
    using launched = await setupTest();
    const { provider, wallet, baseAssetId } = launched;

    // Perform a write operation to ensure the block height is updated
    await provider.operations.produceBlocks({ blocksToProduce: "1"});

    // Set the expected block height to 10_000
    const { expectedHeight } = await setExpectedBlockHeightToRequest({ provider, newHeight: 10_000 });

    await expectToThrowFuelError(
      () =>
        provider.operations.getCoinsToSpend({
          owner: wallet.address.toB256(),
          queryPerAsset: { amount: '10', assetId: baseAssetId },
        }),
      {
        code: ErrorCode.RPC_CONSISTENCY,
        message: expect.stringContaining(`The required fuel block height is higher than the current block height. Required: ${expectedHeight}`)
      }
    );
  }, 20_000);

  it('Current block height is tied to node url', async () => {
    using launched1 = await setupTest({ poaIntervalPeriod: '50ms' });
    using launched2 = await setupTest({ poaIntervalPeriod: '100ms' });

    const {
      provider: provider1,
      wallet: wallet1,
      baseAssetId
    } = launched1;
    const {
      provider: provider2,
      wallet: wallet2,
    } = launched2;

    // allow for block production
    await sleep(250);

    // Make a write operation to ensure the block height is updated
    await provider1.operations.produceBlocks({ blocksToProduce: "1"});
    await provider2.operations.produceBlocks({ blocksToProduce: "1"});

    const { fetch } = mockAll();

    await provider1.operations.getCoinsToSpend({
      owner: wallet1.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    await provider2.operations.getCoinsToSpend({
      owner: wallet2.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const [operation1, operation2] = getFetchOperationsByName(fetch, 'getCoinsToSpend');
    expect(operation1.extensions.required_fuel_block_height).toBeGreaterThan(operation2.extensions.required_fuel_block_height);
  });

  it(`should not update the cache with a lower block height`, async () => {
    using launched = await setupTest();
    const { provider, wallet, baseAssetId } = launched;
    const { fetch } = mockAll();

    // Perform a write operation to ensure the block height is updated
    await provider.operations.produceBlocks({ blocksToProduce: "1"});
    // @ts-expect-error - private property
    expect(Provider.currentBlockHeightCache[provider.url]).toEqual(1);

    // Set the expected block height to 100
    const expectedBlockHeight = 100;

    const mockedFuelBlockHeight = {
      value: expectedBlockHeight,
    };

    fetch.mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            data: {
              produceBlocks: [],
            },
            extensions: {
              current_fuel_block_height: mockedFuelBlockHeight.value,
            },
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    // Perform a read operation
    await provider.operations.produceBlocks({ blocksToProduce: "1"});
    // @ts-expect-error - private property
    expect(Provider.currentBlockHeightCache[provider.url]).toEqual(expectedBlockHeight);

    // Update the expected block height to 50
    mockedFuelBlockHeight.value = 50;
    await provider.operations.produceBlocks({ blocksToProduce: "1"});
    // @ts-expect-error - private property
    expect(Provider.currentBlockHeightCache[provider.url]).toEqual(expectedBlockHeight);  // Should not be updated to 50.

    // Perform a read operation
    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const [getCoinsToSpend] = getFetchOperationsByName(fetch, 'getCoinsToSpend');
    expect(getCoinsToSpend.extensions.required_fuel_block_height).toEqual(expectedBlockHeight);
  });

  it('should update block height when new subscription events are received', async () => {
    using launched = await setupTest();
    const { provider } = launched;

    const expectedBlockHeight = 150;

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      const event1 = {
        data: {
          submitAndAwaitStatus: {
            type: 'SubmittedStatus',
          },
        },
        extensions: {
          current_fuel_block_height: expectedBlockHeight - 50,
        },
      };
      const event2 = {
        data: {
          submitAndAwaitStatus: {
            type: 'SuccessStatus',
          },
        },
        extensions: {
          current_fuel_block_height: expectedBlockHeight,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const element of await provider.operations.submitAndAwaitStatus({
      encodedTransaction: '',
    })) {
      //
    }

    fetchSpy.mockClear();

    // need to mock, otherwise fuel_block_height_precondition_failed will be true
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            data: {
              coinsToSpend: [],
            },
            extensions: {
              fuel_block_height_precondition_failed: false,
            },
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    await provider.operations.getCoinsToSpend({
      owner: '0x1',
      queryPerAsset: [],
    });

    const [operation] = getFetchOperationsByName(fetchSpy, 'getCoinsToSpend');
    expect(operation.extensions.required_fuel_block_height).toEqual(expectedBlockHeight);
  });
});
