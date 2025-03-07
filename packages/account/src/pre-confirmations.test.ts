import { setupTestProviderAndWallets } from './test-utils';

describe('pre-confirmations', () => {
  test('throws on PreconfirmationSqueezedOutStatus', async () => {
    
  });
  test('asdf', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [wallet],
      provider,
    } = launched;

    const { waitForResult } = await wallet.transfer(wallet.address, 100);
    await waitForResult();
  });
});
