import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';
import type { Contract } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

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
      [200_000, baseAssetId],
      [200_000, ASSET_A],
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
