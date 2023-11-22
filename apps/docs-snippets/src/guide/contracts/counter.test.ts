import { seedTestWallet } from '@fuel-ts/wallet/test-utils';
import {
  ContractFactory,
  Wallet,
  FUEL_NETWORK_URL,
  Provider,
  BaseAssetId,
  bn,
  TransactionStatus,
  ScriptTransactionRequest,
  Address,
} from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

describe(__filename, () => {
  it('test min_gas contract', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(wallet, [[500_000, BaseAssetId]]);
    const { minGasPrice, maxGasPerTx } = await provider.getGasConfig();
    const { abiContents, binHexlified, storageSlots } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.COUNTER
    );

    const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);
    const { transactionRequest } = contractFactory.createTransactionRequest({
      gasPrice: minGasPrice,
      gasLimit: maxGasPerTx,
      storageSlots,
    });
    const resources = await provider.getResourcesToSpend(wallet.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    transactionRequest.addResources(resources);

    const {
      chain: { consensusParameters },
    } = await provider.operations.getChain();
    const transactionSigned =
      await wallet.populateTransactionWitnessesSignature(transactionRequest);
    const minGas = await transactionSigned.calculateMinGas(consensusParameters);
    transactionSigned.gasLimit = maxGasPerTx.sub(minGas);

    const result = await provider.sendTransaction(transactionSigned);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it.only('test min_gas script', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const sender = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    const { minGasPrice, maxGasPerTx } = await provider.getGasConfig();
    const destination = Address.fromRandom();
    const amount = bn(100);
    const request = new ScriptTransactionRequest({
      gasPrice: minGasPrice,
      gasLimit: maxGasPerTx,
      script: '0x',
    });
    request.addCoinOutput(destination, amount, BaseAssetId);
    const resources = await provider.getResourcesToSpend(sender.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addResources(resources);
    const {
      chain: { consensusParameters },
    } = await provider.operations.getChain();
    const transactionSigned = await sender.populateTransactionWitnessesSignature(request);
    const minGas = await transactionSigned.calculateMinGas(consensusParameters);
    transactionSigned.gasLimit = maxGasPerTx.sub(minGas);

    console.log(transactionSigned);

    const result = await provider.sendTransaction(transactionSigned);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });
});
