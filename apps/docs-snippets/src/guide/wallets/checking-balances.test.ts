import type { CoinQuantity, BN } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';
import { generateTestWallet, ASSET_A } from 'fuels/test-utils';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let privateKey: string;
  let baseAssetId: string;
  let assetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    assetId = baseAssetId;
    const wallet = await generateTestWallet(provider, [
      [1000, baseAssetId],
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
