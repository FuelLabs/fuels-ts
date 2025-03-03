import { hexlify, sleep } from '@fuel-ts/utils';
import type { MockInstance } from 'vitest';

import type { WalletUnlocked } from '../src';
import { setupTestProviderAndWallets } from '../src/test-utils';

async function createTransfer(wallet: WalletUnlocked) {
  const baseAssetId = await wallet.provider.getBaseAssetId();

  const tx = await wallet.createTransfer(wallet.address, '10', baseAssetId);
  const signature = await wallet.signTransaction(tx);
  tx.updateWitnessByOwner(wallet.address, signature);

  const encodedTransaction = hexlify(tx.toTransactionBytes());
  const transactionId = tx.getTransactionId(await wallet.provider.getChainId());
  return {
    encodedTransaction,
    transactionId,
  };
}

async function setupTest() {
  const {
    provider,
    wallets: [wallet],
    cleanup,
  } = await setupTestProviderAndWallets({
    nodeOptions: {
      /**
       * selected 500ms interval and not something lower
       * because of the flakiness experienced
       * where the getLatestBlockHeight query would return
       * a block height that is lower than the one returned in the extensions object.
       */
      args: ['--poa-instant', 'false', '--poa-interval-period', '500ms'],
    },
  });

  // allow for block production
  await sleep(550);

  const {
    chain: {
      latestBlock: { height: latestBlockHeight },
    },
  } = await provider.operations.getLatestBlockHeight();

  const { encodedTransaction, transactionId } = await createTransfer(wallet);

  return {
    provider,
    wallet,
    latestBlockHeight: +latestBlockHeight,
    encodedTransaction,
    transactionId,
    [Symbol.dispose]: cleanup,
  };
}

function expectBlockHeightIncluded(
  fetchSpy: MockInstance<typeof fetch>,
  latestBlockHeight: number
) {
  const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body?.toString() as string);

  expect(body).toMatchObject({
    extensions: { required_fuel_block_height: latestBlockHeight },
  });
}
/**
 * @group node
 * @group browser
 */
describe('Block-sensitive operations have the current block height included in request', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('submit', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, latestBlockHeight } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submit({ encodedTransaction });

    expectBlockHeightIncluded(fetchSpy, latestBlockHeight);
  });
  test('getCoinsToSpend', async () => {
    using launched = await setupTest();

    const { provider, wallet, latestBlockHeight } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    expectBlockHeightIncluded(fetchSpy, latestBlockHeight);
  });

  test('statusChange', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, transactionId, latestBlockHeight } = launched;

    await provider.operations.submit({ encodedTransaction });

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.statusChange({
      transactionId,
    });

    expectBlockHeightIncluded(fetchSpy, latestBlockHeight);
  });

  test('submitAndAwaitStatus', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, latestBlockHeight } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submitAndAwaitStatus({
      encodedTransaction,
    });

    expectBlockHeightIncluded(fetchSpy, latestBlockHeight);
  });
});
