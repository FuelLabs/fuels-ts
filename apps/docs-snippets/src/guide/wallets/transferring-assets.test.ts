import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { TxParams } from 'fuels';
import { Address, BN, BaseAssetId, Wallet } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  beforeAll(async (ctx) => {});

  it('should successfully transfer asset to another wallet', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter')],
    });
    const {
      wallets: [senderWallet],
      provider,
    } = launched;

    // #region transferring-assets-1
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');
    const destinationWallet = Wallet.generate({
      provider: senderWallet.provider,
    });
    const amountToTransfer = 500;
    const assetId = BaseAssetId;

    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: maxGasPerTx,
    };

    const response = await senderWallet.transfer(
      destinationWallet.address,
      amountToTransfer,
      assetId,
      txParams
    );

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destinationWallet.getBalance(assetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully transfer asset to a deployed contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter')],
    });
    const {
      wallets: [senderWallet],
      contracts: [deployedContract],
      provider,
    } = launched;

    const contractId = Address.fromAddressOrString(deployedContract.id);
    // #region transferring-assets-2
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');

    const amountToTransfer = 400;
    const assetId = BaseAssetId;
    // #context const contractId = Address.fromAddressOrString('0x123...');

    const contractBalance = await deployedContract.getBalance(assetId);

    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: maxGasPerTx,
    };

    const tx = await senderWallet.transferToContract(
      contractId,
      amountToTransfer,
      assetId,
      txParams
    );
    expect(new BN(contractBalance).toNumber()).toBe(0);

    await tx.waitForResult();

    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-2
  });
});
