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
import { seedTestWallet } from 'fuels/test-utils';

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
    const wallet = Wallet.generate({ provider });
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
    const { maxFee } = await provider.getTransactionCost(request);

    request.maxFee = maxFee;

    /**
     * Send transaction
     */
    const result = await wallet.sendTransaction(request);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it('sets gas requirements (script)', async () => {
    const sender = Wallet.generate({ provider });
    await seedTestWallet(sender, [[500_000, baseAssetId]]);

    /**
     * Create a script transaction
     */
    const { binHexlified } = getFuelGaugeForcProject(FuelGaugeProjectsEnum.COMPLEX_SCRIPT);

    const request = new ScriptTransactionRequest({
      script: binHexlified,
      scriptData: hexlify(new BigNumberCoder('u64').encode(bn(2000))),
    });
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await provider.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await sender.fund(request, txCost);

    /**
     * Send transaction
     */
    const result = await sender.sendTransaction(request);
    const { status, gasUsed: txGasUsed } = await result.wait();

    expect(status).toBe(TransactionStatus.success);
    expect(txCost.gasUsed.toString()).toBe(txGasUsed.toString());
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
    const request = new ScriptTransactionRequest();
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await provider.getTransactionCost(request, { resourcesOwner: predicate });

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await predicate.fund(request, txCost);

    /**
     * Send transaction predicate
     */
    const result = await predicate.sendTransaction(request);
    const { status, receipts } = await result.waitForResult();
    const gasUsedFromReceipts = getGasUsedFromReceipts(receipts);

    expect(status).toBe(TransactionStatus.success);
    expect(txCost.gasUsed.toString()).toBe(gasUsedFromReceipts.toString());
  });

  it('sets gas requirements (account and predicate with script)', async () => {
    const { abiContents, binHexlified } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.COMPLEX_PREDICATE
    );
    /**
     * Setup account
     */
    const wallet = Wallet.generate({ provider });
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
      script: scriptBin,
      scriptData: hexlify(new BigNumberCoder('u64').encode(bn(2000))),
    });
    // add predicate transfer
    const resourcesPredicate = await predicate.getResourcesToSpend([
      {
        amount: bn(100_000),
        assetId: baseAssetId,
      },
    ]);
    request.addResources(resourcesPredicate);

    // add account transfer
    request.addCoinOutput(Address.fromRandom(), bn(100), baseAssetId);

    const txCost = await provider.getTransactionCost(request, {
      resourcesOwner: predicate,
    });
    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await wallet.provider.estimatePredicates(request);

    await wallet.fund(request, txCost);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */

    /**
     * Send transaction predicate
     */
    predicate.populateTransactionPredicateData(request);
    await wallet.populateTransactionWitnessesSignature(request);
    const result = await predicate.sendTransaction(request);
    const { status, receipts } = await result.wait();
    const txGasUsed = getGasUsedFromReceipts(receipts);

    expect(status).toBe(TransactionStatus.success);
    expect(txCost.gasUsed.toString()).toBe(txGasUsed.toString());
  });
});
