import { DEVNET_NETWORK_URL, Provider, Wallet, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('transferRepro', () => {
  const amount = bn(2788617);

  it('transfers locally', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [sender, receiver],
    } = launched;

    const assetId = sender.provider.getBaseAssetId();
    const initialBalance = await receiver.getBalance();

    const tx = await sender.transfer(receiver.address, amount, assetId);
    await tx.waitForResult();

    const finalBalance = await receiver.getBalance();

    expect(finalBalance.sub(initialBalance).eq(amount)).toBeTruthy();
  });

  it('transfers devnet', async () => {
    const privateKey = process.env.DEVNET_WALLET_PVT_KEY;
    if (!privateKey) {
      throw new Error('DEVNET_WALLET_PVT_KEY not set');
    }
    const provider = await Provider.create(DEVNET_NETWORK_URL);
    const receiver = Wallet.fromAddress(
      '0x5502f46f90c3c68c85489b1f57ae6146c81e8549daf408574e3a9a0bb80c4ba0',
      provider
    );
    const sender = Wallet.fromPrivateKey(privateKey, provider);
    const assetId = provider.getBaseAssetId();
    const initialBalance = await receiver.getBalance();

    const tx = await sender.transfer(receiver.address, amount, assetId);
    await tx.waitForResult();

    const finalBalance = await receiver.getBalance();

    expect(finalBalance.sub(initialBalance).eq(amount)).toBeTruthy();
  });
});
