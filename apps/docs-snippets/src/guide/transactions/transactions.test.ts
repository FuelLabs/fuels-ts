import type { Provider, WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Transactions', () => {
  let provider: Provider;
  let sender: WalletUnlocked;
  let receiver: WalletUnlocked;
  let baseAssetId: string;

  beforeAll(async () => {
    sender = await getTestWallet();
    provider = sender.provider;
    baseAssetId = await provider.getBaseAssetId();
    receiver = Wallet.generate({ provider });
  });

  it('transfers assets', async () => {
    const assetIdToTransfer = baseAssetId;

    const initialBalance = await receiver.getBalance(assetIdToTransfer);
    expect(initialBalance.toNumber()).toBe(0);

    // #region transactions-1
    await sender.transfer(receiver.address, 100, assetIdToTransfer);

    const newBalance = await receiver.getBalance(baseAssetId);
    // 100
    // #endregion transactions-1

    expect(newBalance.toNumber()).toBe(100);
  });
});
