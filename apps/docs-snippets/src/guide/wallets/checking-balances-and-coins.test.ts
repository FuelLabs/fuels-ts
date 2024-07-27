import type { BigNumberish, WalletUnlocked } from 'fuels';
import { Provider, Wallet, FUEL_NETWORK_URL } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider | undefined;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
  });

  it('wallet-check-balance', async () => {
    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balance
    // #import { BigNumberish };

    const balance: BigNumberish = await myWallet.getBalance(baseAssetId);
    // #endregion wallet-check-balance

    expect(balance.toNumber()).toEqual(0);
  });

  it('wallet-check-balances', async () => {
    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-check-balances
    // #context import { CoinQuantity } from 'fuels';

    const { balances } = await myWallet.getBalances();
    // #endregion wallet-check-balances

    expect(balances).toEqual([]);
  });
});
