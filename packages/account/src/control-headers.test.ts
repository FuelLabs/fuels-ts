import { sleep } from '@fuel-ts/utils';

import { Provider } from './providers';
import { setupTestProviderAndWallets } from './test-utils';

/**
 * @group node
 * @group browser
 */
describe('control headers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('Block-sensitive operations have the current block height included in request', () => {
    test('getCoinsToSpend', async () => {
      using launched = await setupTestProviderAndWallets({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '50ms'],
        },
      });

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const baseAssetId = await provider.getBaseAssetId();

      // allow for block production
      await sleep(250);

      const {
        chain: {
          latestBlock: { height },
        },
      } = await provider.operations.getLatestBlockHeight();

      const fetchSpy = vi.spyOn(global, 'fetch');

      await provider.operations.getCoinsToSpend({
        owner: wallet.address.toB256(),
        queryPerAsset: { amount: '10', assetId: baseAssetId },
      });

      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

      expect(body).toMatchObject({
        extensions: { required_fuel_block_height: +height },
      });
    });

    test('submitAndAwaitStatus', async () => {
      using launched = await setupTestProviderAndWallets({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '100ms'],
        },
      });

      const { provider } = launched;

      // allow for block production
      await sleep(200);

      const {
        chain: {
          latestBlock: { height },
        },
      } = await provider.operations.getLatestBlockHeight();

      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
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
        return Promise.resolve(new Response(streamedResponse));
      });

      await provider.operations.submitAndAwaitStatus({ encodedTransaction: '' });

      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

      expect(body).toMatchObject({
        extensions: { required_fuel_block_height: +height },
      });
    });
  });

  test('waits when current block height is higher than actual', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '50ms'],
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

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(body).toMatchObject({
      extensions: { required_fuel_block_height: expectedHeight },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(+newBlockHeight).toBeGreaterThanOrEqual(expectedHeight);
  });

  test('waits when current block height is higher than actual and node rejects block height', async () => {
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

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(body).toMatchObject({
      extensions: { required_fuel_block_height: expectedHeight },
    });

    const {
      chain: {
        latestBlock: { height: newBlockHeight },
      },
    } = await provider.operations.getLatestBlockHeight();

    expect(+newBlockHeight).toBeGreaterThanOrEqual(expectedHeight);
  });

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

    await provider.operations.submitAndAwaitStatus({ encodedTransaction: '' });

    // allow for background processing
    await sleep(250);

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
        args: ['--poa-instant', 'false', '--poa-interval-period', '50ms'],
      },
    });

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    // allow for block height to increase
    await sleep(250);

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

    const mockedFuelBlockHeight = {
      value: 100,
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

    // we're not interested in the first two calls so we clear them
    fetchSpy.mockClear();

    await provider.operations.getCoinsToSpend({
      owner: '0x1',
      queryPerAsset: [],
    });

    const {
      extensions: { required_fuel_block_height: height },
    } = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

    expect(+height).toEqual(100);
  });
});
