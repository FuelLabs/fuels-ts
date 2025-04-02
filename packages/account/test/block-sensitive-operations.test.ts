import { hexlify, sleep } from '@fuel-ts/utils';
import type { MockInstance } from 'vitest';

import { Provider, type WalletUnlocked } from '../src';
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

  const { encodedTransaction, transactionId } = await createTransfer(wallet);

  const {
    chain: {
      latestBlock: { height: latestBlockHeight },
    },
  } = await provider.operations.getLatestBlockHeight();

  expect(Number(latestBlockHeight)).toBeGreaterThan(0);
  return {
    provider,
    wallet,
    latestBlockHeight: +latestBlockHeight,
    encodedTransaction,
    transactionId,
    [Symbol.dispose]: cleanup,
  };
}

type ExpectBlockHeightProps = { fetchSpy: MockInstance<typeof fetch> } & (
  | { included: true; latestBlockHeight: number }
  | { included: false }
);

function expectBlockHeight(props: ExpectBlockHeightProps) {
  const body = JSON.parse(props.fetchSpy.mock.calls[0][1]?.body?.toString() as string);
  const property = 'extensions.required_fuel_block_height';

  if (props.included) {
    expect(body).toHaveProperty(property, props.latestBlockHeight);
  } else {
    expect(body).not.toHaveProperty(property);
  }
}

/**
 * @group node
 * @group browser
 */
describe('Block-sensitive operations have the current block height included in request', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Provider.ENSURE_RPC_CONSISTENCY = true;
  });

  test('submit - block height included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, latestBlockHeight } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submit({ encodedTransaction });

    expectBlockHeight({ included: true, fetchSpy, latestBlockHeight });
  });

  test('submit - block height not included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    Provider.ENSURE_RPC_CONSISTENCY = false;

    await provider.operations.submit({ encodedTransaction });

    expectBlockHeight({ included: false, fetchSpy });
  });
  test('getCoinsToSpend - block height included', async () => {
    using launched = await setupTest();

    const { provider, wallet, latestBlockHeight } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    expectBlockHeight({ included: true, fetchSpy, latestBlockHeight });
  });

  test('getCoinsToSpend - block height not included', async () => {
    using launched = await setupTest();

    const { provider, wallet } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const fetchSpy = vi.spyOn(global, 'fetch');

    Provider.ENSURE_RPC_CONSISTENCY = false;

    await provider.operations.getCoinsToSpend({
      owner: wallet.address.toB256(),
      queryPerAsset: { amount: '10', assetId: baseAssetId },
    });

    expectBlockHeight({ included: false, fetchSpy });
  });

  test('statusChange - block height included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, transactionId, latestBlockHeight } = launched;

    await provider.operations.submit({ encodedTransaction });

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.statusChange({
      transactionId,
    });

    expectBlockHeight({ included: true, fetchSpy, latestBlockHeight });
  });

  test('statusChange - block height not included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, transactionId } = launched;

    await provider.operations.submit({ encodedTransaction });

    const fetchSpy = vi.spyOn(global, 'fetch');

    Provider.ENSURE_RPC_CONSISTENCY = false;

    await provider.operations.statusChange({
      transactionId,
    });

    expectBlockHeight({ included: false, fetchSpy });
  });

  test('submitAndAwaitStatus - block height included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction, latestBlockHeight } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submitAndAwaitStatus({
      encodedTransaction,
    });

    expectBlockHeight({ included: true, fetchSpy, latestBlockHeight });
  });

  test('submitAndAwaitStatus - block height not included', async () => {
    using launched = await setupTest();

    const { provider, encodedTransaction } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    Provider.ENSURE_RPC_CONSISTENCY = false;

    await provider.operations.submitAndAwaitStatus({
      encodedTransaction,
    });

    expectBlockHeight({ included: false, fetchSpy });
  });

  test('getTransactionWithReceipts - block height included', async () => {
    using launched = await setupTest();

    const { provider, transactionId, latestBlockHeight } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.getTransactionWithReceipts({
      transactionId,
    });

    expectBlockHeight({ included: true, fetchSpy, latestBlockHeight });
  });

  test('getTransactionWithReceipts - block height not included', async () => {
    using launched = await setupTest();

    const { provider, transactionId } = launched;

    const fetchSpy = vi.spyOn(global, 'fetch');

    Provider.ENSURE_RPC_CONSISTENCY = false;

    await provider.operations.getTransactionWithReceipts({
      transactionId,
    });

    expectBlockHeight({ included: false, fetchSpy });
  });
});
