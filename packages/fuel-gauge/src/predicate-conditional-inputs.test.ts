import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import { Provider, FUEL_NETWORK_URL, Predicate, Wallet, ScriptTransactionRequest, bn } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

/**
 * @group node
 */
describe('PredicateConditionalInputs', () => {
  let baseAssetId: string;

  const { binHexlified: predicateBytecode, abiContents: abiJSON } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_CONDITIONAL_INPUTS
  );

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  it('should execute custom transaction where predicate transfers to Alice (ALICE PAYS FEES)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const aliceWallet = Wallet.generate({
      provider,
    });

    const amountToTransfer = 1000;

    const adminWallet = await generateTestWallet(provider, [
      [500_000, baseAssetId],
      [500_000, ASSET_A],
    ]);

    const predicate = new Predicate({
      bytecode: predicateBytecode,
      abi: abiJSON,
      provider,
      configurableConstants: { MAKER: aliceWallet.address.toB256() },
    });

    // transfer asset A to predicate so it can transfer to alice
    const tx1 = await adminWallet.transfer(predicate.address, 10_000, ASSET_A);

    await tx1.waitForResult();

    // transfer base asset to Alice so she can pay the fees
    const tx2 = await adminWallet.transfer(aliceWallet.address, 2_000, baseAssetId);

    await tx2.waitForResult();

    const request = new ScriptTransactionRequest();

    // fetch predicate resources to spend
    const predicateResoruces = await predicate.getResourcesToSpend([[amountToTransfer, ASSET_A]]);

    request
      .addResources(predicateResoruces)
      .addCoinOutput(aliceWallet.address, amountToTransfer, ASSET_A);

    const txCost = await aliceWallet.provider.getTransactionCost(request, {
      resourcesOwner: aliceWallet,
    });

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await aliceWallet.fund(request, { ...txCost, requiredQuantities: [] });

    const aliceBaseAssetBefore = await aliceWallet.getBalance();
    const aliceAssetABefore = await aliceWallet.getBalance(ASSET_A);
    const predicateAssetABefore = await predicate.getBalance(ASSET_A);

    const tx3 = await aliceWallet.sendTransaction(request);

    await tx3.waitForResult();

    const aliceBaseAssetAfter = await aliceWallet.getBalance();
    const aliceAssetAAfter = await aliceWallet.getBalance(ASSET_A);
    const predicateAssetAAfter = await predicate.getBalance(ASSET_A);

    // ensure Alice received the expected amount of asset
    expect(bn(aliceAssetAAfter).toNumber()).toBe(
      bn(aliceAssetABefore).add(bn(amountToTransfer)).toNumber()
    );

    // ensure Alice paid the fees
    expect(bn(aliceBaseAssetBefore).toNumber()).toBeGreaterThan(bn(aliceBaseAssetAfter).toNumber());

    // ensure predicate balance has decreased
    expect(bn(predicateAssetAAfter).toNumber()).toBe(
      bn(predicateAssetABefore).sub(bn(amountToTransfer)).toNumber()
    );
  });

  it('should execute custom transaction where predicate transfer to Alice (PREDICATE PAYS FEES)', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const aliceWallet = Wallet.generate({
      provider,
    });

    const amountToTransfer = 1000;

    const adminWallet = await generateTestWallet(provider, [
      [500_000, baseAssetId],
      [500_000, ASSET_A],
      [500_000, ASSET_B],
    ]);

    const predicate = new Predicate({
      bytecode: predicateBytecode,
      abi: abiJSON,
      provider,
      configurableConstants: { MAKER: aliceWallet.address.toB256() },
    });

    // transfer asset A to predicate so it can transfer to alice
    const tx1 = await adminWallet.transfer(predicate.address, 10_000, ASSET_A);

    await tx1.waitForResult();

    // transfer base asset to predicate so it can pay the fees
    const tx2 = await adminWallet.transfer(predicate.address, 10_000, baseAssetId);

    await tx2.waitForResult();

    // transfer asset B to Alice so it can add symbolic UTXOs to the transaction
    // inputs in order to the predicate validate her inputs in the transaction.
    const tx3 = await adminWallet.transfer(aliceWallet.address, 10_000, ASSET_B);

    await tx3.waitForResult();

    const request = new ScriptTransactionRequest();

    // predicate will pay the fee so it will need the base asset
    const predicateResources = await predicate.getResourcesToSpend([[amountToTransfer, ASSET_A]]);

    /**
     * we need to add Alice resources in order to the predicate validates that she have inputs
     * in the transaction and returns true. These resources will be returned to alice.
     */
    const aliceResources = await aliceWallet.getResourcesToSpend([[1, ASSET_B]]);

    request
      .addResources(aliceResources)
      .addResources(predicateResources)
      .addCoinOutput(aliceWallet.address, amountToTransfer, ASSET_A);

    const txCost = await aliceWallet.provider.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    // predicate will pay for the transaction fee
    await predicate.fund(request, txCost);

    predicate.populateTransactionPredicateData(request);

    await aliceWallet.populateTransactionWitnessesSignature(request);

    const aliceAssetABefore = await aliceWallet.getBalance(ASSET_A);
    const predicateAssetABefore = await predicate.getBalance(ASSET_A);

    const aliceBaseAssetBefore = await aliceWallet.getBalance();
    const aliceAssetBBefore = await aliceWallet.getBalance(ASSET_B);

    const tx4 = await aliceWallet.sendTransaction(request);

    await tx4.waitForResult();

    const aliceAssetAAfter = await aliceWallet.getBalance(ASSET_A);
    const predicateAssetAAfter = await predicate.getBalance(ASSET_A);

    const aliceBaseAssetAfter = await aliceWallet.getBalance();
    const aliceAssetBAfter = await aliceWallet.getBalance(ASSET_B);

    expect(bn(aliceAssetAAfter).toNumber()).toBe(
      bn(aliceAssetABefore).add(bn(amountToTransfer)).toNumber()
    );

    // predicate transferred the asset to alice
    expect(bn(predicateAssetAAfter).toNumber()).toBe(
      bn(predicateAssetABefore).sub(bn(amountToTransfer)).toNumber()
    );

    //  alice did not pay the fee
    expect(bn(aliceBaseAssetBefore).toNumber()).toBe(bn(aliceBaseAssetAfter).toNumber());

    // alice balance for asset B did not change
    expect(bn(aliceAssetBBefore).toNumber()).toBe(bn(aliceAssetBAfter).toNumber());
  });
});
