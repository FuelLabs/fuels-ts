import type { BigNumberish, WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Checking balances and coins', () => {
  it('wallet-check-balance', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balance
    // #import { BigNumberish };

    const balance: BigNumberish = await myWallet.getBalance(provider.getBaseAssetId());
    // #endregion wallet-check-balance

    expect(balance.toNumber()).toEqual(0);
  });

  it('wallet-check-balances', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balances
    // #context import { CoinQuantity } from 'fuels';

    const { balances } = await myWallet.getBalances();
    // #endregion wallet-check-balances

    expect(balances).toEqual([]);
  });
});
