import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { B256Address, Coin, WalletUnlocked} from 'fuels';
import { Address, BaseAssetId, FUEL_NETWORK_URL, Provider, bn } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('wallet-query', async () => {
    // #region wallet-query-initialization
    // #import { Provider, BaseAssetId, FUEL_NETWORK_URL, WalletUnlocked, B256Address, Coin };
    // #context import { generateTestWallet } from '@fuel-ts/account/test-utils';
    
    const assetIdA: B256Address = BaseAssetId; // '0x0000...'
    const assetIdB: B256Address = '0x0101010101010101010101010101010101010101010101010101010101010101';

    const provider: Provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet: WalletUnlocked = await generateTestWallet(provider, [
      [42, assetIdA],
      [100, assetIdB],
    ]);

    const coin: Coin[] = await wallet.getCoins(assetIdA);
    // #context // [{ assetId: '0x0000...', amount: 42 }]
    const coins: Coin[] = await wallet.getCoins();
    // #context // [{ assetId: '0x0000...', amount: 42 }, { assetId: '0x0101...', amount: 100 }]
    // #endregion wallet-query-initialization

    expect(coin.length).toEqual(1);
    expect(coin).toEqual([
      expect.objectContaining({
        assetId: assetIdA,
        amount: bn(42),
      }),
    ]);
    expect(coins).toEqual([
      expect.objectContaining({
        assetId: assetIdA,
        amount: bn(42),
      }),
      expect.objectContaining({
        assetId: assetIdB,
        amount: bn(100),
      }),
    ]);

    // #region wallet-get-balances
    const balances = await wallet.getBalances();
    // #context // [{ assetId: '0x0000...', amount: 42 }, { assetId: '0x0101...', amount: 100 }]
    // #endregion wallet-get-balances

    expect(balances).toEqual([
      { assetId: BaseAssetId, amount: bn(42) },
      { assetId: assetIdA, amount: bn(100) },
    ]);

    // #region wallet-get-spendable-resources
    const spendableResources = await wallet.getResourcesToSpend([
      { amount: 32, assetId: BaseAssetId, max: 42 },
      { amount: 50, assetId: assetIdA },
    ]);
    // #context // [{ assetId: '0x0000...', amount: 42 }, { assetId: '0x0101...', amount: 100 }]
    // #endregion wallet-get-spendable-resources
    expect(spendableResources[0].amount).toEqual(bn(42));
    expect(spendableResources[1].amount).toEqual(bn(100));
  })
})