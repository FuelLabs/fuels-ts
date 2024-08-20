import {
  bn,
  TransactionStatus,
  ScriptTransactionRequest,
  Address,
  hexlify,
  getGasUsedFromReceipts,
  BigNumberCoder,
  ContractFactory,
} from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ComplexPredicate,
  ComplexScript,
  CoverageContract,
  CoverageContractFactory,
} from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Minimum gas tests', () => {
  it('sets gas requirements (contract)', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    /**
     * Create a contract transaction
     */

    const contractFactory = new ContractFactory(
      CoverageContractFactory.bytecode,
      CoverageContract.abi,
      wallet
    );

    const { transactionRequest: request } = contractFactory.createTransactionRequest({
      storageSlots: CoverageContract.storageSlots,
    });

    const resources = await provider.getResourcesToSpend(wallet.address, [
      {
        amount: bn(100_000),
        assetId: provider.getBaseAssetId(),
      },
    ]);
    request.addResources(resources);

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const { maxFee } = await wallet.getTransactionCost(request);

    request.maxFee = maxFee;

    /**
     * Send transaction
     */
    const result = await wallet.sendTransaction(request);
    const { status } = await result.waitForResult();

    expect(status).toBe(TransactionStatus.success);
  });

  it('sets gas requirements (script)', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender],
    } = launched;

    /**
     * Create a script transaction
     */

    const request = new ScriptTransactionRequest({
      script: ComplexScript.bytecode,
      scriptData: hexlify(new BigNumberCoder('u64').encode(bn(2000))),
    });
    request.addCoinOutput(Address.fromRandom(), bn(100), provider.getBaseAssetId());

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await sender.getTransactionCost(request);

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
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    /**
     * Setup predicate
     */
    const predicate = new ComplexPredicate({
      provider,
      data: [bn(1000)],
    });

    /**
     * Fund the predicate
     */
    const tx = await wallet.transfer(predicate.address, 1_000_000, provider.getBaseAssetId());
    await tx.wait();

    /**
     * Create a script transaction transfer
     */
    const request = new ScriptTransactionRequest();
    request.addCoinOutput(Address.fromRandom(), bn(100), provider.getBaseAssetId());

    /**
     * Get the transaction cost to set a strict gasLimit and min gasPrice
     */
    const txCost = await predicate.getTransactionCost(request);

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
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();

    /**
     * Setup predicate
     */
    const predicate = new ComplexPredicate({
      provider,
      data: [bn(1000)],
    });

    /**
     * Fund the predicate
     */
    const tx = await wallet.transfer(predicate.address, 1_000_000, baseAssetId);
    await tx.wait();

    /**
     * Create a script transaction
     */
    const request = new ScriptTransactionRequest({
      script: ComplexScript.bytecode,
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

    const txCost = await predicate.getTransactionCost(request);
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
