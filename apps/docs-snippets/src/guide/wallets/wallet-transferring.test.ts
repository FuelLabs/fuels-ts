import type { Contract, TransferParams } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';
import { generateTestWallet, ASSET_A } from 'fuels/test-utils';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  let privateKey: string;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    const wallet = await generateTestWallet(provider, [
      [1_000_000, baseAssetId],
      [1_000_000, ASSET_A],
    ]);
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
    privateKey = wallet.privateKey;
  });

  it('should transfer assets between wallets just fine', async () => {
    // #region wallet-transferring-1
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const recipient = Wallet.generate({ provider });

    const txResponse = await myWallet.transfer(recipient.address, 100, baseAssetId);

    await txResponse.waitForResult();
    // #endregion wallet-transferring-1

    const newBalance = await recipient.getBalance(baseAssetId);

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer assets to a recipient informing only the address string', async () => {
    // #region wallet-transferring-2
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const address = 'fuel1zc7r2rwuzl3uskfc0w737780uqd8sn6lfm3wgqf9wa767gs3sems5d6kxj';

    const txResponse = await myWallet.transfer(address, 100, baseAssetId);
    // #endregion wallet-transferring-2

    await txResponse.waitForResult();

    const newBalance = await Wallet.fromAddress(address, provider).getBalance(baseAssetId);

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer base asset just fine', async () => {
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
    const someOtherAssetId = ASSET_A;

    // #region wallet-transferring-6
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const recipient1 = Wallet.generate({ provider });
    const recipient2 = Wallet.generate({ provider });

    const transfersToMake: TransferParams[] = [
      { amount: 100, destination: recipient1.address, assetId: baseAssetId },
      { amount: 200, destination: recipient2.address, assetId: baseAssetId },
      { amount: 300, destination: recipient2.address, assetId: someOtherAssetId },
    ];

    const tx = await myWallet.batchTransfer(transfersToMake);
    const { isStatusSuccess } = await tx.waitForResult();
    // #endregion wallet-transferring-6

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should transfer assets to a deployed contract instance just fine', async () => {
    // #region wallet-transferring-4
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const txResponse = await myWallet.transferToContract(contract.id, 100, baseAssetId);

    await txResponse.waitForResult();
    // #endregion wallet-transferring-4

    const newBalance = await contract.getBalance(baseAssetId);

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });

  it('should transfer assets to a deployed contract string addess just fine', async () => {
    // #region wallet-transferring-5
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const contractAddress = contract.id.toString();

    const txResponse = await myWallet.transferToContract(contractAddress, 100, baseAssetId);

    await txResponse.waitForResult();
    // #endregion wallet-transferring-5

    const newBalance = await contract.getBalance(baseAssetId);

    expect(newBalance.toNumber()).toBeGreaterThan(0);
  });
});
