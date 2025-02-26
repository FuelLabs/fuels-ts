import { sleep } from '@fuel-ts/utils';

import { Provider } from './providers';
import { setupTestProviderAndWallets } from './test-utils';

describe('control headers', () => {
  describe('Block-sensitive operations have the current block height included in request', () => {
    test('getCoinsToSpend', async () => {
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

      // allow for block production
      await sleep(250);

      const provider = new Provider(launchedProvider.url);

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
          args: ['--poa-instant', 'false', '--poa-interval-period', '50ms'],
        },
      });

      const { provider: launchedProvider } = launched;

      Provider.clearChainAndNodeCaches();

      // allow for block production
      await sleep(250);

      const provider = new Provider(launchedProvider.url);

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
        return Promise.resolve(new Response(JSON.stringify(responseObject)));
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

  test('subscriptions set current block height', async () => {});

  test('Current block height is tied to node url', async () => {});

  test(`Node with lower block height doesn't override higher block height`, async () => {});
  test(`Clearing cache sets block height to 0`, async () => {});

  test('subscriptions update current block height after they are done (a successful sub changes block height)', async () => {});
});
