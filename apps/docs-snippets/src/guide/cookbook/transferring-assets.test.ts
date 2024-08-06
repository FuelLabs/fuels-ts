import { Address, BN, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CounterAbi__factory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transferring Assets', () => {
  it('should successfully transfer asset to another account', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [sender],
    } = launched;
    // #region transferring-assets-1
    // #import { Wallet, BN };

    // #context const sender = Wallet.fromPrivateKey('...');
    const destination = Wallet.generate({
      provider: sender.provider,
    });
    const amountToTransfer = 500;

    const baseAssetId = sender.provider.getBaseAssetId();

    const response = await sender.transfer(destination.address, amountToTransfer, baseAssetId);

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destination.getBalance(baseAssetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully prepare transfer to another account', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender],
    } = launched;
    const destination = Wallet.generate({
      provider: sender.provider,
    });

    const assetId = provider.getBaseAssetId();
    const amountToTransfer = 200;

    // #region transferring-assets-2
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId
    );

    const chainId = provider.getChainId();

    const transactionId = transactionRequest.getTransactionId(chainId);

    const response = await sender.sendTransaction(transactionRequest);

    const { id } = await response.wait();

    // The transaction id should is the same as the one returned by the transaction request
    expect(id).toEqual(transactionId);
    // #endregion transferring-assets-2
  });

  it.skip('should validate that modifying the transaction request will result in another TX ID', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '10ms'],
      },
    });
    const {
      provider,
      wallets: [sender],
    } = launched;
    const destination = Wallet.generate({
      provider: sender.provider,
    });

    const amountToTransfer = 200;
    const assetId = provider.getBaseAssetId();

    // #region transferring-assets-3
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId
    );

    const chainId = provider.getChainId();

    const transactionId = transactionRequest.getTransactionId(chainId);

    transactionRequest.maturity = 1;

    const { maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

    transactionRequest.maxFee = maxFee;

    const response = await sender.sendTransaction(transactionRequest);

    const { id } = await response.wait();

    expect(id).not.toEqual(transactionId);
    // #endregion transferring-assets-3
  });

  it('should successfully prepare transfer transaction request', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterAbi__factory,
        },
      ],
    });
    const {
      provider,
      wallets: [sender],
      contracts: [deployedContract],
    } = launched;
    const contractId = Address.fromAddressOrString(deployedContract.id);
    // #region transferring-assets-4
    // #import { Wallet, BN };

    // #context const senderWallet = Wallet.fromPrivateKey('...');

    const amountToTransfer = 400;
    const assetId = provider.getBaseAssetId();
    // #context const contractId = Address.fromAddressOrString('0x123...');

    const contractBalance = await deployedContract.getBalance(assetId);

    const tx = await sender.transferToContract(contractId, amountToTransfer, assetId);
    await tx.waitForResult();
    expect(new BN(contractBalance).toNumber()).toBe(0);

    await tx.waitForResult();

    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-4
  });
});
