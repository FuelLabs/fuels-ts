import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { CoinQuantity, WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, Provider, bn } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('wallet-setup', async () => {
    // #region wallet-setup
    // #import { FUEL_NETWORK_URL, Provider, WalletUnlocked, CoinQuantity, generateTestWallet };
    // #context import { generateTestWallet } from '@fuel-ts/wallet/test-utils';

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
    const walletABalances: CoinQuantity[] = await walletA.getBalances();
    const walletBBalances = await walletB.getBalances();
    const walletCBalances = await walletC.getBalances();

    expect(walletABalances).toEqual([{ assetId: baseAssetId, amount: bn(42) }]);
    expect(walletBBalances).toEqual([
      { assetId: baseAssetId, amount: bn(30) },
      { assetId: assetIdA, amount: bn(100) },
      { assetId: assetIdB, amount: bn(200) },
    ]);
    expect(walletCBalances).toEqual([]);
    // #endregion wallet-setup
  });
});
