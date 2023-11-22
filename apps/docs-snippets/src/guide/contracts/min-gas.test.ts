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
  Predicate,
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

    // TODO: need to fix it to fake witness signature for calculateMinGas
    // to avoid doing populate signature twice
    const txSigned1 = await wallet.populateTransactionWitnessesSignature(transactionRequest);
    const minGas = await txSigned1.calculateMinGas(consensusParameters);
    txSigned1.gasLimit = maxGasPerTx.sub(minGas);
    const txSigned2 = await wallet.populateTransactionWitnessesSignature(txSigned1);

    const result = await provider.sendTransaction(txSigned2);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it('test min_gas script', async () => {
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

    // TODO: need to fix it to fake witness signature for calculateMinGas
    // to avoid doing populate signature twice
    const txSigned1 = await sender.populateTransactionWitnessesSignature(request);
    const minGas = await txSigned1.calculateMinGas(consensusParameters);
    txSigned1.gasLimit = maxGasPerTx.sub(minGas);
    const txSigned2 = await sender.populateTransactionWitnessesSignature(txSigned1);

    const result = await provider.sendTransaction(txSigned2);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it('test min_gas predicate', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { abiContents, binHexlified } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.COMPLEX_PREDICATE
    );
    const predicate = new Predicate(binHexlified, provider, abiContents);
    await seedTestWallet(predicate, [[500_000, BaseAssetId]]);
    const { minGasPrice, maxGasPerTx } = await provider.getGasConfig();
    const destination = Address.fromRandom();
    const amount = bn(100);
    const request = new ScriptTransactionRequest({
      gasPrice: minGasPrice,
      gasLimit: maxGasPerTx,
      script: '0x',
    });
    request.addCoinOutput(destination, amount, BaseAssetId);
    const resources = await provider.getResourcesToSpend(predicate.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addResources(resources);
    request.witnesses = [];
    predicate.setData(bn(1000));
    const {
      chain: { consensusParameters },
    } = await provider.operations.getChain();

    const txSigned = await predicate.populateTransactionPredicateData(request);
    // Here we need to verify if we can always use gasLimit to 0, because transactions
    // that include predicates that verify the transaction hash will need to have a gasLimit
    // equal to the one to be submitted.
    txSigned.gasLimit = bn(0);
    const txEstimated = await provider.estimatePredicates(txSigned);

    const minGas = await txEstimated.calculateMinGas(consensusParameters);
    txEstimated.gasLimit = maxGasPerTx.sub(minGas);

    const result = await provider.sendTransaction(txEstimated);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });
});
