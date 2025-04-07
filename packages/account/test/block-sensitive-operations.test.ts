import { hexlify, sleep } from '@fuel-ts/utils';

import { Provider, type WalletUnlocked } from '../src';
import { setupTestProviderAndWallets } from '../src/test-utils';

import { getFetchOperationsByName } from './utils/getFetchOperation';

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

/**
 * @group node
 * @group browser
 */
describe('Block-sensitive operations have the current block height included in request', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Provider.ENABLE_RPC_CONSISTENCY = true;
  });

  it('should not apply a required block height for a [single non-write operation]', async () => {
    using launched = await setupTest();
    const { provider, wallet } = launched;
    const fetchSpy = vi.spyOn(global, 'fetch');

    const balances = await provider.getBalances(wallet.address.toB256());

    expect(balances).toBeDefined();
    const [getBalancesV2] = getFetchOperationsByName(fetchSpy, 'getBalancesV2');
    expect(getBalancesV2).not.toHaveProperty('required_fuel_block_height');
  });

  it('should not apply a required block height for a [single write operation]', async () => {
    using launched = await setupTest();
    const { provider, encodedTransaction } = launched;
    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submit({ encodedTransaction });

    const [getBalancesV2] = getFetchOperationsByName(fetchSpy, 'submit');
    expect(getBalancesV2).not.toHaveProperty('required_fuel_block_height');
  });

  it('should apply a required block height for all operations after a [single write operation]', async () => {
    using launched = await setupTest();
    const { provider, encodedTransaction, wallet, latestBlockHeight } = launched;
    const fetchSpy = vi.spyOn(global, 'fetch');

    await provider.operations.submit({ encodedTransaction });
    const [submitOperation] = getFetchOperationsByName(fetchSpy, 'submit');
    expect(submitOperation?.extensions).not.toHaveProperty('required_fuel_block_height');

    const balances = await provider.getBalances(wallet.address.toB256());
    expect(balances).toBeDefined();

    const [getBalancesV2] = getFetchOperationsByName(fetchSpy, 'getBalancesV2');
    expect(getBalancesV2?.extensions).toHaveProperty('required_fuel_block_height');
    expect(getBalancesV2?.extensions.required_fuel_block_height).toBe(latestBlockHeight);
  });
});
