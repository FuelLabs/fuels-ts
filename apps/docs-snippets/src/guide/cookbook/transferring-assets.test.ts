import type { Contract, Provider, TxParams, WalletUnlocked } from 'fuels';
import { Address, BN, ContractFactory, BaseAssetId, Wallet } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

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
    const { minGasPrice } = sender.provider.getGasConfig();
    deployedContract = await factory.deployContract({ gasPrice: minGasPrice });
  });

  it('should successfully transfer asset to another account', async () => {
    // #region transferring-assets-1
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const sender = Wallet.fromPrivateKey('...');
    const destination = Wallet.generate({
      provider: sender.provider,
    });
    const amountToTransfer = 500;
    const assetId = BaseAssetId;

    const { minGasPrice } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: 1_000,
    };

    const response = await sender.transfer(
      destination.address,
      amountToTransfer,
      assetId,
      txParams
    );

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destination.getBalance(assetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully prepare transfer to another account', async () => {
    const destination = Wallet.generate({
      provider: sender.provider,
    });

    const amountToTransfer = 200;
    const assetId = BaseAssetId;

    const { minGasPrice } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: 1_000,
    };

    // #region transferring-assets-2
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId,
      txParams
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
    const assetId = BaseAssetId;

    const { minGasPrice } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: 1_000,
    };

    // #region transferring-assets-3
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId,
      txParams
    );

    const chainId = provider.getChainId();

    const transactionId = transactionRequest.getTransactionId(chainId);

    transactionRequest.maturity = 1;

    const response = await sender.sendTransaction(transactionRequest);

    const { id } = await response.wait();

    expect(id).not.toEqual(transactionId);
    // #endregion transferring-assets-3
  });

  it('should successfully prepare transfer transaction request', async () => {
    const contractId = Address.fromAddressOrString(deployedContract.id);
    // #region transferring-assets-4
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    // #context const senderWallet = Wallet.fromPrivateKey('...');

    const amountToTransfer = 400;
    const assetId = BaseAssetId;
    // #context const contractId = Address.fromAddressOrString('0x123...');

    const contractBalance = await deployedContract.getBalance(assetId);

    const { minGasPrice } = provider.getGasConfig();

    const txParams: TxParams = {
      gasPrice: minGasPrice,
      gasLimit: 1_000,
    };

    const tx = await sender.transferToContract(contractId, amountToTransfer, assetId, txParams);
    expect(new BN(contractBalance).toNumber()).toBe(0);

    await tx.waitForResult();

    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-4
  });
});
