import { seedTestWallet } from '@fuel-ts/account/test-utils';
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { Account, CoinTransactionRequestInput } from 'fuels';
import {
  FUEL_NETWORK_URL,
  Provider,
  BaseAssetId,
  ScriptTransactionRequest,
  Wallet,
  bn,
} from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let mainWallet: Account;
  let provider: Provider;
  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    mainWallet = Wallet.generate({ provider });
    await seedTestWallet(mainWallet, [[500_000, BaseAssetId]]);
  });

  const fundingTxWithMultipleUTXOs = async ({
    account,
    totalAmount,
    splitIn,
  }: {
    account: Account;
    totalAmount: number;
    splitIn: number;
  }) => {
    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
      gasPrice: bn(10),
    });

    for (let i = 0; i < splitIn; i++) {
      request.addCoinOutput(account.address, totalAmount / splitIn, BaseAssetId);
    }

    const resources = await mainWallet.getResourcesToSpend([[totalAmount + 2_000, BaseAssetId]]);
    request.addResources(resources);

    const tx = await mainWallet.sendTransaction(request);
    await tx.waitForResult();
  };

  it('should successfully fund a transaction request when it is not fully funded', async () => {
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    // 1500 splitted in 5 = 5 UTXOs of 300 each
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 1500,
      splitIn: 5,
    });

    // this will return one UTXO of 300, not enought to pay for the TX fees
    const lowResources = await sender.getResourcesToSpend([[100, BaseAssetId]]);

    // confirm we only fetched 1 UTXO from the expected amount
    expect(lowResources.length).toBe(1);
    expect(lowResources[0].amount.toNumber()).toBe(300);

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
      gasPrice: bn(10),
    });

    const amountToTransfer = 300;
    request.addCoinOutput(receiver.address, amountToTransfer, BaseAssetId);

    request.addResources(lowResources);

    const { maxFee, requiredQuantities, gasUsed } = await provider.getTransactionCost(request);

    request.gasLimit = gasUsed;

    // TX request already does NOT carries enough resources, it needs to be funded
    expect(request.inputs.length).toBe(1);
    expect(bn((<CoinTransactionRequestInput>request.inputs[0]).amount).toNumber()).toBe(300);

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    await sender.fund(request, requiredQuantities, maxFee);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund method should have been called to fetch the remaining UTXOs
    expect(getResourcesToSpendSpy).toHaveBeenCalledTimes(1);

    const receiverBalance = await receiver.getBalance(BaseAssetId);

    expect(receiverBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should not fund a transaction request when it is already funded', async () => {
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    // 2000 splitted in 2 = 2 UTXOs of 1000 each
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 2000,
      splitIn: 2,
    });

    // sender has 2 UTXOs for 1000 each, so it has enough resources to spend 1000 of BaseAssetId
    const enoughtResources = await sender.getResourcesToSpend([[100, BaseAssetId]]);

    // confirm we only fetched 1 UTXO from the expected amount
    expect(enoughtResources.length).toBe(1);
    expect(enoughtResources[0].amount.toNumber()).toBe(1000);

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
      gasPrice: bn(10),
    });

    const amountToTransfer = 100;

    request.addCoinOutput(receiver.address, amountToTransfer, BaseAssetId);
    request.addResources(enoughtResources);

    const { maxFee, requiredQuantities } = await provider.getTransactionCost(request);

    // TX request already carries enough resources, it does not need to be funded
    expect(request.inputs.length).toBe(1);
    expect(bn((<CoinTransactionRequestInput>request.inputs[0]).amount).toNumber()).toBe(1000);
    expect(maxFee.lt(1000)).toBeTruthy();

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    await sender.fund(request, requiredQuantities, maxFee);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund should not have been called since the TX request was already funded
    expect(getResourcesToSpendSpy).toHaveBeenCalledTimes(0);

    const receiverBalance = await receiver.getBalance(BaseAssetId);

    expect(receiverBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should fully fund a transaction when it is has no funds yet', async () => {
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    // 5000 splitted in 10 = 10 UTXOs of 500 each
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 5000,
      splitIn: 10,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
      gasPrice: bn(1),
    });

    const amountToTransfer = 1000;
    request.addCoinOutput(receiver.address, amountToTransfer, BaseAssetId);

    const { maxFee, requiredQuantities, gasUsed } = await provider.getTransactionCost(request);

    // TX request does NOT carry any resources, it needs to be funded
    expect(request.inputs.length).toBe(0);

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    request.gasLimit = gasUsed;

    await sender.fund(request, requiredQuantities, maxFee);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund method should have been called to fetch UTXOs
    expect(getResourcesToSpendSpy).toHaveBeenCalledTimes(1);

    const receiverBalance = await receiver.getBalance(BaseAssetId);

    expect(receiverBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should ensure proper error is thrown when user has not enough resources', async () => {
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    const splitIn = 24;

    /**
     * Splitting funds in 24 UTXOs to result in the transaction become more expensive
     * after the funds are added to it.
     */
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 1200,
      splitIn,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
      gasPrice: bn(1),
    });

    const amountToTransfer = 1000;
    request.addCoinOutput(receiver.address, amountToTransfer, BaseAssetId);

    const { maxFee, requiredQuantities, gasUsed } = await provider.getTransactionCost(request);

    expect(request.inputs.length).toBe(0);

    request.gasLimit = gasUsed;

    const getResourcesToSpend = vi.spyOn(sender, 'getResourcesToSpend');

    /**
     * When estimating with only one UTXO the TX will require in total =~ 1078 of BasetAssetId:
     * 1000 for the transfer and 78 for fees. However after funding it with 24 UTXOs the fee is
     * increased to =~ 254. This happens because the bigger the TX becomes, more gas it will use.
     *
     * The sender has only 1200 of BaseAssetId, and if we try to fund the transaction only one time,
     * apparently will be ok since the fee was not updated and 1200 can cover 1078. But the TX
     * will fail after being submitted with Error "InsufficientInputAmount". This error is
     * misleading because in reality the user has not enough coins to cover the fee. The query
     * `getResourcesToSpend` is smart enough to return way more funds than the target amount. But since
     * the user balance was only slightly above the target ( initially 1078 ), and because the user
     * has its low balance spread in many UTXOs, the fee will be higher than the user balance after
     * funding the TX. By trying to fund the TX again, we can force the proper error to be thrown.
     */
    await expectToThrowFuelError(
      () => sender.fund(request, requiredQuantities, maxFee),
      new FuelError(FuelError.CODES.INVALID_REQUEST, 'not enough coins to fit the target')
    );

    expect(getResourcesToSpend).toHaveBeenCalledTimes(2);
  });
});
