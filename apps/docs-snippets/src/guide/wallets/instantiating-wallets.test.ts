import type { WalletLocked, WalletUnlocked } from 'fuels';
import { HDWallet, Wallet } from 'fuels';
import { TestAssetId, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Instantiating wallets', () => {
  it('should instantiate multiple wallets with different configurations', async () => {
    // #region multiple-wallets
    using launched = await launchTestNode({
      walletsConfig: {
        count: 3,
        assets: [TestAssetId.A, TestAssetId.B],
        coinsPerAsset: 5,
        amountPerCoin: 100_000,
      },
    });

    const {
      wallets: [wallet1, wallet2, wallet3],
    } = launched;
    // #endregion multiple-wallets

    expect(wallet1).toBeDefined();
    expect(wallet2).toBeDefined();
    expect(wallet3).toBeDefined();
  });
});
