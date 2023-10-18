import type { Contract, WalletUnlocked } from 'fuels';
import { Address, BN, ContractFactory, BaseAssetId, Wallet } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let senderWallet: WalletUnlocked;
  let deployedContract: Contract;
  let gasPrice: BN;

  beforeAll(async () => {
    senderWallet = await getTestWallet();

    const { abiContents, binHexlified } = getSnippetProjectArtifacts(SnippetProjectEnum.COUNTER);
    const factory = new ContractFactory(binHexlified, abiContents, senderWallet);
    ({ minGasPrice: gasPrice } = senderWallet.provider.getGasConfig());
    deployedContract = await factory.deployContract({ gasPrice });
  });

  it('should successfully transfer asset to another wallet', async () => {
    // #region transferring-assets-1
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');
    const destinationWallet = Wallet.generate({
      provider: senderWallet.provider,
    });
    const amountToTransfer = 500;
    const assetId = BaseAssetId;

    const response = await senderWallet.transfer(
      destinationWallet.address,
      amountToTransfer,
      assetId,
      { gasPrice }
    );

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destinationWallet.getBalance(assetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully transfer asset to a deployed contract', async () => {
    const contractId = Address.fromAddressOrString(deployedContract.id);
    // #region transferring-assets-2
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');

    const amountToTransfer = 400;
    const assetId = BaseAssetId;
    // #context const contractId = Address.fromAddressOrString('0x123...');

    const contractBalance = await deployedContract.getBalance(assetId);

    const tx = await senderWallet.transferToContract(contractId, amountToTransfer, assetId, {
      gasPrice,
    });
    expect(new BN(contractBalance).toNumber()).toBe(0);

    await tx.waitForResult();

    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-2
  });
});
