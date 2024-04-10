import { seedTestWallet } from '@fuel-ts/account/test-utils';
import {
  ContractFactory,
  Wallet,
  FUEL_NETWORK_URL,
  Provider,
  bn,
  TransactionStatus,
  ScriptTransactionRequest,
  Address,
  Predicate,
  hexlify,
  getGasUsedFromReceipts,
  BigNumberCoder,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  it('sets gas requirements (contract)', async () => {
    const wallet = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(wallet, [[500_000, baseAssetId]]);

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
        assetId: baseAssetId,
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
    const sender = Wallet.fromPrivateKey(
      '0x0f44a619bf8c19f3eb903be38d1d26d36d08a10341e1a4282ffa87214da0cea8',
      provider
    );
    await seedTestWallet(sender, [[500_000, baseAssetId]]);

    /**
     * Create a script transaction
     */
    const { binHexlified } = getFuelGaugeForcProject(FuelGaugeProjectsEnum.COMPLEX_SCRIPT);

    const request = new ScriptTransactionRequest({
      baseAssetId,
      script: binHexlified,
      scriptData: hexlify(new BigNumberCoder('u64').encode(bn(2000))),
    });
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);

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
    const { abiContents, binHexlified } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_PREDICATE
    );

    /**
     * Setup predicate
     */
    const predicate = new Predicate({
      bytecode: binHexlified,
      abi: abiContents,
      provider,
      inputData: [bn(1000)],
    });
    await seedTestWallet(predicate, [[500_000, baseAssetId]]);

    /**
     * Create a script transaction transfer
     */
    const request = new ScriptTransactionRequest({ baseAssetId });
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);
    const resources = await provider.getResourcesToSpend(predicate.address, [
      {
        amount: bn(100_000),
        assetId: baseAssetId,
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
    await seedTestWallet(wallet, [[500_000, baseAssetId]]);

    /**
     * Setup predicate
     */
    const predicate = new Predicate({
      bytecode: binHexlified,
      abi: abiContents,
      provider,
      inputData: [bn(1000)],
    });
    await seedTestWallet(predicate, [[500_000, baseAssetId]]);

    /**
     * Create a script transaction
     */
    const { binHexlified: scriptBin } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_SCRIPT
    );
    const request = new ScriptTransactionRequest({
      baseAssetId,
      script: scriptBin,
      scriptData: hexlify(new BigNumberCoder('u64').encode(bn(2000))),
    });
    // add predicate transfer
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);
    const resourcesPredicate = await provider.getResourcesToSpend(predicate.address, [
      {
        amount: bn(100_000),
        assetId: baseAssetId,
      },
    ]);
    request.addPredicateResources(resourcesPredicate, predicate);
    // add account transfer
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);
    const resourcesWallet = await provider.getResourcesToSpend(wallet.address, [
      {
        amount: bn(100_000),
        assetId: baseAssetId,
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
