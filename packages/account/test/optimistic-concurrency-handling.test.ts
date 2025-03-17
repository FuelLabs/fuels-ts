import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { sleep } from '@fuel-ts/utils';

import { Provider } from '../src/providers';
import { setupTestProviderAndWallets } from '../src/test-utils';

/**
 * @group node
 * @group browser
 */
describe('optimistic concurrency handling via block height', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test(`operations that aren't block-sensitive don't include the required block height in request`, async () => {
    using launched = await setupTestProviderAndWallets();

    const { provider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getChain();

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(body.extensions?.required_fuel_block_height).toBeUndefined();
  });

  test(`waits when current block height is higher than actual and within node's tolerance`, async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: [
          '--poa-instant',
          'false',
          '--poa-interval-period',
          '50ms',
          '--graphql-required-block-height-tolerance',
          '10', // this is the default value but we're setting it explicitly for clarity
        ],
      },
    });

    const {
      provider: launchedProvider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await launchedProvider.getBaseAssetId();

    Provider.clearChainAndNodeCaches();

    const provider = new Provider(launchedProvider.url);

    const {
      chain: {
        latestBlock: { height },
      },
    } = await provider.operations.getLatestBlockHeight();

    const expectedHeight = +height + 8;

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce((url, request) => {
      // we're mocking it to modify the required_fuel_block_height
      // but we still want the real fetch to be called
      // hence why we reset immediately and return the real fetch call in the end
      fetchSpy.mockReset();

      const body = JSON.parse(request?.body?.toString() as string);
      body.extensions.required_fuel_block_height = expectedHeight;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      request!.body = JSON.stringify(body);

      return fetch(url, request);
    });

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(+newBlockHeight).toBeGreaterThanOrEqual(expectedHeight);
  });

  test(`waits when current block height is higher than actual and outside node's tolerance`, async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: [
          '--poa-instant',
          'false',
          '--poa-interval-period',
          '50ms',
          '--graphql-required-block-height-tolerance',
          '0',
        ],
      },
    });

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const {
      chain: {
        latestBlock: { height },
      },
    } = await provider.operations.getLatestBlockHeight();

    const expectedHeight = +height + 20;

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce((url, request) => {
      // we're mocking it to modify the required_fuel_block_height
      // but we still want the real fetch to be called
      // hence why we reset immediately and return the real fetch call in the end
      fetchSpy.mockReset();

      const body = JSON.parse(request?.body?.toString() as string);
      body.extensions.required_fuel_block_height = expectedHeight;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      request!.body = JSON.stringify(body);

      return fetch(url, request);
    });

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(+newBlockHeight).toBeGreaterThanOrEqual(expectedHeight);
  });

  test('throws when retries are exceeded', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: [
          '--poa-instant',
          'false',
          '--poa-interval-period',
          `100s`,
          '--graphql-required-block-height-tolerance',
          '0',
        ],
      },
    });

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const {
      chain: {
        latestBlock: { height },
      },
    } = await provider.operations.getLatestBlockHeight();

    const expectedHeight = +height + 10_000;

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce((url, request) => {
      // we're mocking it to modify the required_fuel_block_height
      // but we still want the real fetch to be called
      // hence why we reset immediately and return the real fetch call in the end
      fetchSpy.mockReset();

      const body = JSON.parse(request?.body?.toString() as string);
      body.extensions.required_fuel_block_height = expectedHeight;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      request!.body = JSON.stringify(body);

      return fetch(url, request);
    });

    await expectToThrowFuelError(
      () =>
        provider.operations.getCoinsToSpend({
          owner: wallet.address.toB256(),
          queryPerAsset: { amount: '10', assetId: baseAssetId },
        }),
      new FuelError(
        ErrorCode.RPC_CONSISTENCY,
        `The required fuel block height is higher than the current block height. Required: ${expectedHeight}, Current: 0`
      )
    );
  }, 20_000);

  test('new subscription events update block height', async () => {
    using launched = await setupTestProviderAndWallets();

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

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(body).toMatchObject({
      extensions: { required_fuel_block_height: expectedBlockHeight },
    });
  });

  test(`Clearing cache sets block height to 0`, async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '100ms'],
      },
    });

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    // allow for block production
    await sleep(210);

    const {
      chain: {
        latestBlock: { height },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(+height).toBeGreaterThan(0);

    Provider.clearChainAndNodeCaches();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(body).toMatchObject({
      extensions: { required_fuel_block_height: 0 },
    });
  });

  test('Current block height is tied to node url', async () => {
    using launched1 = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '50ms'],
      },
    });
    using launched2 = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '100ms'],
      },
    });

    const {
      provider: provider1,
      wallets: [wallet1],
    } = launched1;
    const {
      provider: provider2,
      wallets: [wallet2],
    } = launched2;

    const baseAssetId = await provider1.getBaseAssetId();

    // allow for block production
    await sleep(250);

    // update internal cache of currentBlockHeight for both urls
    await provider1.getLatestGasPrice();
    await provider2.getLatestGasPrice();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider1.operations.getCoinsToSpend({
      owner: wallet1.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    await provider2.operations.getCoinsToSpend({
      owner: wallet2.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    const {
      extensions: { required_fuel_block_height: height1 },
    } = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);
    const {
      extensions: { required_fuel_block_height: height2 },
    } = JSON.parse(fetchSpy.mock.calls[1][1]?.body?.toString() as string);

    expect(height1).toBeGreaterThan(height2);
  });

  test(`lower block height doesn't override higher block height`, async () => {
    using launched = await setupTestProviderAndWallets();

    const { provider } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    const expectedBlockHeight = 100;

    const mockedFuelBlockHeight = {
      value: expectedBlockHeight,
    };

    fetchSpy.mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            data: {
              coinsToSpend: [],
            },
            extensions: {
              current_fuel_block_height: mockedFuelBlockHeight.value,
            },
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    // call to set internal cache of block height to 100
    await provider.operations.getCoinsToSpend({
      owner: '0x1',
      queryPerAsset: [],
    });

    mockedFuelBlockHeight.value = 50;

    // call which shouldn't set block height to 50
    // because it's lower than the current block height
    await provider.operations.getCoinsToSpend({
      owner: '0x1',
      queryPerAsset: [],
    });

    await provider.operations.getCoinsToSpend({
      owner: '0x1',
      queryPerAsset: [],
    });

    const {
      extensions: { required_fuel_block_height: height },
    } = JSON.parse(fetchSpy.mock.calls[2][1]?.body?.toString() as string);

    expect(+height).toEqual(expectedBlockHeight);
  });
});
