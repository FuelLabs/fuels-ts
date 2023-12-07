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
  U64Coder,
  hexlify,
  getGasUsedFromReceipts,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

describe(__filename, () => {
  it('sets gas requirements (contract)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(wallet, [[500_000, BaseAssetId]]);

    /**
     * Create a contract transaction
     */

    const { abiContents, binHexlified, storageSlots } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COVERAGE_CONTRACT
    );

    const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);
    const { transactionRequest: request } = contractFactory.createTransactionRequest({
      storageSlots,
    });
    const resources = await provider.getResourcesToSpend(wallet.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addResources(resources);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await provider.getTransactionCost(request);
    request.gasPrice = txCost.gasPrice;

    /**
     * Send transaction
     */
    const result = await wallet.sendTransaction(request);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it('sets gas requirements (script)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const sender = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);

    /**
     * Create a script transaction
     */
    const { binHexlified } = getFuelGaugeForcProject(FuelGaugeProjectsEnum.COMPLEX_SCRIPT);

    const request = new ScriptTransactionRequest({
      script: binHexlified,
      scriptData: hexlify(new U64Coder().encode(bn(2000))),
    });
    request.addCoinOutput(Address.fromRandom(), bn(100), BaseAssetId);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const costs = await provider.getTransactionCost(request);

    await sender.fund(request, costs.requiredQuantities, costs.maxFee);

    request.gasLimit = bn(20_000);
    request.gasPrice = costs.gasPrice;

    /**
     * Send transaction
     */
    const result = await sender.sendTransaction(request);
    const { status, gasUsed: txGasUsed } = await result.wait();

    expect(status).toBe(TransactionStatus.success);
    expect(costs.gasUsed.toString()).toBe(txGasUsed.toString());
  });

  it('sets gas requirements (predicate)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { abiContents, binHexlified } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_PREDICATE
    );

    /**
     * Setup predicate
     */
    const predicate = new Predicate(binHexlified, provider, abiContents);
    predicate.setData(bn(1000));
    await seedTestWallet(predicate, [[500_000, BaseAssetId]]);

    /**
     * Create a script transaction transfer
     */
    const request = new ScriptTransactionRequest();
    request.addCoinOutput(Address.fromRandom(), bn(100), BaseAssetId);
    const resources = await provider.getResourcesToSpend(predicate.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addResources(resources);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await provider.getTransactionCost(request);
    request.gasLimit = txCost.gasUsed;
    request.gasPrice = txCost.gasPrice;

    /**
     * Send transaction predicate
     */
    const result = await predicate.sendTransaction(request);
    const { status, receipts } = await result.waitForResult();
    const gasUsed = getGasUsedFromReceipts(receipts);

    expect(status).toBe(TransactionStatus.success);
    expect(gasUsed.toString()).toBe(txCost.gasUsed.toString());
  });

  it('sets gas requirements (account and predicate with script)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { abiContents, binHexlified } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_PREDICATE
    );
    /**
     * Setup account
     */
    const wallet = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(wallet, [[500_000, BaseAssetId]]);

    /**
     * Setup predicate
     */
    const predicate = new Predicate(binHexlified, provider, abiContents);
    predicate.setData(bn(1000));
    await seedTestWallet(predicate, [[500_000, BaseAssetId]]);

    /**
     * Create a script transaction
     */
    const { binHexlified: scriptBin } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_SCRIPT
    );
    const request = new ScriptTransactionRequest({
      script: scriptBin,
      scriptData: hexlify(new U64Coder().encode(bn(2000))),
    });
    // add predicate transfer
    request.addCoinOutput(Address.fromRandom(), bn(100), BaseAssetId);
    const resourcesPredicate = await provider.getResourcesToSpend(predicate.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addPredicateResources(resourcesPredicate, predicate);
    // add account transfer
    request.addCoinOutput(Address.fromRandom(), bn(100), BaseAssetId);
    const resourcesWallet = await provider.getResourcesToSpend(wallet.address, [
      {
        amount: bn(100_000),
        assetId: BaseAssetId,
      },
    ]);
    request.addResources(resourcesWallet);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await provider.getTransactionCost(request);
    request.gasLimit = txCost.gasUsed;
    request.gasPrice = txCost.gasPrice;

    /**
     * Send transaction predicate
     */
    predicate.populateTransactionPredicateData(request);
    await wallet.populateTransactionWitnessesSignature(request);
    const result = await predicate.sendTransaction(request);
    const { status, receipts } = await result.waitForResult();
    const gasUsed = getGasUsedFromReceipts(receipts);

    expect(status).toBe(TransactionStatus.success);
    expect(gasUsed.toString()).toBe(txCost.gasUsed.toString());
  });
});
