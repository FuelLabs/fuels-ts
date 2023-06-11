import type { Contract, WalletUnlocked } from 'fuels';
import { BN, ContractFactory, NativeAssetId, Wallet } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let senderWallet: WalletUnlocked;
  let deployedContract: Contract;

  beforeAll(async () => {
    senderWallet = await getTestWallet();

    const { abiContents, binHelixfied } = getSnippetProjectArtifacts(SnippetProjectEnum.COUNTER);

    const factory = new ContractFactory(binHelixfied, abiContents, senderWallet);

    deployedContract = await factory.deployContract();
  });

  it('should successfully transfer asset to another wallet', async () => {
    // #region transferring-assets-1
    // #context import { Wallet, BN, NativeAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');
    const destinationWallet = Wallet.generate();
    const amountToTransfer = 500;
    const assetId = NativeAssetId;

    const response = await senderWallet.transfer(
      destinationWallet.address,
      amountToTransfer,
      assetId
    );

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destinationWallet.getBalance(assetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully transfer asset to a deployed contract', async () => {
    // #region transferring-assets-2
    // #context import { Wallet, BN, NativeAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');

    const amountToTransfer = 700;
    const assetId = NativeAssetId;

    const contractBalance = await deployedContract.getBalance(assetId);

    expect(new BN(contractBalance).toNumber()).toBe(0);

    const tx = await senderWallet.transferToContract(
      deployedContract.id,
      amountToTransfer,
      assetId
    );

    await tx.waitForResult();

    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-2
  });
});
