import type { BN } from 'fuels';
import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Checking balances', () => {
  it('should fetch specific balance just fine', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;

    const privateKey = testWallet.privateKey;

    // #region checking-balances-1
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    // The returned amount is a BigNumber
    const balance: BN = await myWallet.getBalance(provider.getBaseAssetId());
    // #endregion checking-balances-1

    expect(balance).toBeDefined();
  });

  it('should fetch all balances just fine', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;

    const privateKey = testWallet.privateKey;
    // #region checking-balances-2
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const { balances } = await myWallet.getBalances();
    // #endregion checking-balances-2

    expect(balances).toBeDefined();
  });
});
