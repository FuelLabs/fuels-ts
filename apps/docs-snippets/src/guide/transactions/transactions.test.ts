import type { Provider, WalletUnlocked } from 'fuels';
import { BaseAssetId, Wallet } from 'fuels';

import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Transactions', () => {
  let provider: Provider;
  let sender: WalletUnlocked;
  let receiver: WalletUnlocked;

  beforeAll(async () => {
    sender = await getTestWallet();
    provider = sender.provider;
    receiver = Wallet.generate({ provider });
  });

  it('transfers assets', async () => {
    const assetIdToTransfer = BaseAssetId;

    const initialBalance = await receiver.getBalance(assetIdToTransfer);
    expect(initialBalance.toNumber()).toBe(0);

    // #region transactions-1
    await sender.transfer(receiver.address, 100, assetIdToTransfer);

    const newBalance = await receiver.getBalance(BaseAssetId);
    // 100
    // #endregion transactions-1

    expect(newBalance.toNumber()).toBe(100);
  });
});
