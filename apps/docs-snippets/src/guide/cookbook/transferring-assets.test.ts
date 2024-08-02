import type { Contract, Provider, WalletUnlocked } from 'fuels';
import { Address, BN, ContractFactory, Wallet } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let sender: WalletUnlocked;
  let deployedContract: Contract;
  let provider: Provider;

  beforeAll(async () => {
    sender = await getTestWallet();

    const { abiContents, binHexlified } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.COUNTER
    );
    provider = sender.provider;
    const factory = new ContractFactory(binHexlified, abiContents, sender);
    const { waitForResult } = await factory.deploy();
    ({ contract: deployedContract } = await waitForResult());
  });

  it('should successfully transfer asset to another account', async () => {
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

  it('should validate that modifying the transaction request will result in another TX ID', async () => {
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
