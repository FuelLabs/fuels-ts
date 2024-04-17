import type { BigNumberish, CoinQuantity, Provider, WalletUnlocked } from 'fuels';
import { BaseAssetId, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('wallet-check-balance', async () => {
    const provider: Provider | undefined = undefined;
    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balance
    // #import { BigNumberish, BaseAssetId };

    const balance: BigNumberish = await myWallet.getBalance(BaseAssetId);
    // #endregion wallet-check-balance

    expect(balance).toEqual(0);
  });

  it('wallet-check-balances', async () => {
    const provider: Provider | undefined = undefined;
    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balances
    // #context import { CoinQuantity } from 'fuels';

    const balances: CoinQuantity[] = await myWallet.getBalances();
    // #endregion wallet-check-balances

    expect(balances).toEqual([]);
  });
});
