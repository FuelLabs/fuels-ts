import type { WalletUnlocked } from 'fuels';
import { Provider, bn } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('wallet-setup', async () => {
    // #region wallet-setup
    // #import { Provider, WalletUnlocked, CoinQuantity, generateTestWallet };
    // #context import { generateTestWallet } from 'fuels/test-utils';

    const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

    // single asset
    const walletA: WalletUnlocked = await generateTestWallet(provider, [[42, baseAssetId]]);

    // multiple assets
    const walletB = await generateTestWallet(provider, [
      // [Amount, AssetId]
      [100, assetIdA],
      [200, assetIdB],
      [30, baseAssetId],
    ]);

    // empty wallet
    const walletC = await generateTestWallet(provider);

    // retrieve balances of wallets
    const { balances: walletABalances } = await walletA.getBalances();
    const { balances: walletBBalances } = await walletB.getBalances();
    const { balances: walletCBalances } = await walletC.getBalances();

    expect(walletABalances).toEqual([{ assetId: baseAssetId, amount: bn(42) }]);
    expect(walletBBalances).toEqual([
      { assetId: assetIdA, amount: bn(100) },
      { assetId: assetIdB, amount: bn(200) },
      { assetId: baseAssetId, amount: bn(30) },
    ]);
    expect(walletCBalances).toEqual([]);
    // #endregion wallet-setup
  });
});
