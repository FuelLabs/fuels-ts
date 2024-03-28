import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';
import type { CoinQuantity, BN } from 'fuels';
import { BaseAssetId, FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let privateKey: string;
  const assetId = BaseAssetId;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [
      [1000, BaseAssetId],
      [1000, ASSET_A],
    ]);
    privateKey = wallet.privateKey;
  });

  it('should fetch specific balance just fine', async () => {
    // #region checking-balances-1
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    // The returned amount is a BigNumber
    const balance: BN = await myWallet.getBalance(assetId);
    // #endregion checking-balances-1

    expect(balance).toBeDefined();
  });

  it('should fetch all balances just fine', async () => {
    // #region checking-balances-2
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const balances: CoinQuantity[] = await myWallet.getBalances();
    // #endregion checking-balances-2

    expect(balances).toBeDefined();
  });
});
