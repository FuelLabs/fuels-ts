import type { TransferParams } from 'fuels';
import { Wallet } from 'fuels';
import { ASSET_A, launchTestNode } from 'fuels/test-utils';

import { CounterFactory } from '../../../test/typegen';

/**
 * @group node
 */
describe('Wallet transferring', () => {
  it('should transfer assets between wallets just fine', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    // #region wallet-transferring-1
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const recipient = Wallet.generate({ provider });

    const txResponse = await myWallet.transfer(recipient.address, 100, provider.getBaseAssetId());

    await txResponse.waitForResult();
    // #endregion wallet-transferring-1

    const newBalance = await recipient.getBalance(provider.getBaseAssetId());

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer assets to a recipient informing only the address string', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    // #region wallet-transferring-2
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const address = 'fuel1zc7r2rwuzl3uskfc0w737780uqd8sn6lfm3wgqf9wa767gs3sems5d6kxj';

    const txResponse = await myWallet.transfer(address, 100, provider.getBaseAssetId());
    // #endregion wallet-transferring-2

    await txResponse.waitForResult();

    const newBalance = await Wallet.fromAddress(address, provider).getBalance(
      provider.getBaseAssetId()
    );

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer base asset just fine', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    // #region wallet-transferring-3
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const recipient = Wallet.generate({ provider });

    const txResponse = await myWallet.transfer(recipient.address, 100);
    // #endregion wallet-transferring-3

    await txResponse.waitForResult();

    const newBalance = await recipient.getBalance();

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should successfully multi transfer to more than one receiver', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    const someOtherAssetId = ASSET_A;

    // #region wallet-transferring-6
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const recipient1 = Wallet.generate({ provider });
    const recipient2 = Wallet.generate({ provider });

    const transfersToMake: TransferParams[] = [
      { amount: 100, destination: recipient1.address, assetId: provider.getBaseAssetId() },
      { amount: 200, destination: recipient2.address, assetId: provider.getBaseAssetId() },
      { amount: 300, destination: recipient2.address, assetId: someOtherAssetId },
    ];

    const tx = await myWallet.batchTransfer(transfersToMake);
    const { isStatusSuccess } = await tx.waitForResult();
    // #endregion wallet-transferring-6

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should transfer assets to a deployed contract instance just fine', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });
    const {
      contracts: [contract],
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    // #region wallet-transferring-4
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const txResponse = await myWallet.transferToContract(
      contract.id,
      100,
      provider.getBaseAssetId()
    );

    await txResponse.waitForResult();
    // #endregion wallet-transferring-4

    const newBalance = await contract.getBalance(provider.getBaseAssetId());

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer assets to a deployed contract string address just fine', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });
    const {
      contracts: [contract],
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    // #region wallet-transferring-5
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const contractAddress = contract.id.toString();

    const txResponse = await myWallet.transferToContract(
      contractAddress,
      100,
      provider.getBaseAssetId()
    );

    await txResponse.waitForResult();
    // #endregion wallet-transferring-5

    const newBalance = await contract.getBalance(provider.getBaseAssetId());

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });
});
