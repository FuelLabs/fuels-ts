import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Transactions', () => {
  it('transfers assets', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [sender],
      provider,
    } = launched;
    const assetIdToTransfer = provider.getBaseAssetId();
    const receiver = Wallet.generate({ provider });

    const initialBalance = await receiver.getBalance(assetIdToTransfer);
    expect(initialBalance.toNumber()).toBe(0);

    // #region transactions-1
    const tx = await sender.transfer(receiver.address, 100, assetIdToTransfer);
    await tx.waitForResult();

    const newBalance = await receiver.getBalance(provider.getBaseAssetId());
    // 100
    // #endregion transactions-1

    expect(newBalance.toNumber()).toBe(100);
  });
});
