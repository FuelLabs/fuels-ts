import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import type { Account, CoinTransactionRequestInput } from 'fuels';
import { DEFAULT_RESOURCE_CACHE_TTL, ScriptTransactionRequest, Wallet, bn, sleep } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Funding Transactions', () => {
  const assetA = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetB = '0x0202020202020202020202020202020202020202020202020202020202020202';

  const fundingTxWithMultipleUTXOs = async ({
    account,
    totalAmount,
    splitIn,
    baseAssetId,
    mainWallet,
  }: {
    account: Account;
    totalAmount: number;
    splitIn: number;
    baseAssetId: string;
    mainWallet: Account;
  }) => {
    const request = new ScriptTransactionRequest();

    for (let i = 0; i < splitIn; i++) {
      request.addCoinOutput(account.address, totalAmount / splitIn, baseAssetId);
    }

    const resources = await mainWallet.getResourcesToSpend([[totalAmount + 2_000, baseAssetId]]);
    request.addResources(resources);

    const txCost = await mainWallet.getTransactionCost(request);

    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;

    await mainWallet.fund(request, txCost);

    const tx = await mainWallet.sendTransaction(request);
    await tx.waitForResult();
  };

  it('should successfully fund a transaction request when it is not fully funded', async () => {
    const initialAmount = 500_000;
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: initialAmount,
      },
    });

    const {
      provider,
      wallets: [sender, receiver],
    } = launched;

    // 1500 splitted in 5 = 5 UTXOs of 30 each
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 400_000,
      splitIn: 5,
      baseAssetId: await provider.getBaseAssetId(),
      mainWallet: sender,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
    });

    const amountToTransfer = 300;

    request.addCoinOutput(receiver.address, amountToTransfer, await provider.getBaseAssetId());

    const txCost = await sender.getTransactionCost(request);

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;

    await sender.fund(request, txCost);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund method should have been called to fetch the remaining UTXOs
    expect(getResourcesToSpendSpy).toHaveBeenCalled();

    const receiverBalance = await receiver.getBalance(await provider.getBaseAssetId());

    expect(receiverBalance.toNumber()).toBe(amountToTransfer + initialAmount);
  });

  it('should not fund a transaction request when it is already funded', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [mainWallet],
    } = launched;

    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    // 2000 splitted in 2 = 2 UTXOs of 1000 each
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 400_000,
      splitIn: 2,
      baseAssetId: await provider.getBaseAssetId(),
      mainWallet,
    });

    // sender has 2 UTXOs for 200_000 each, so it has enough resources to spend 1000 of baseAssetId
    const enoughtResources = await sender.getResourcesToSpend([
      [100, await provider.getBaseAssetId()],
    ]);

    // confirm we only fetched 1 UTXO from the expected amount
    expect(enoughtResources.length).toBe(1);
    expect(enoughtResources[0].amount.toNumber()).toBe(200_000);

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
    });

    const amountToTransfer = 100;

    request.addCoinOutput(receiver.address, amountToTransfer, await provider.getBaseAssetId());
    request.addResources(enoughtResources);

    const txCost = await sender.getTransactionCost(request);

    // TX request already carries enough resources, it does not need to be funded
    expect(request.inputs.length).toBe(1);
    expect(bn((<CoinTransactionRequestInput>request.inputs[0]).amount).toNumber()).toBe(200_000);
    expect(txCost.maxFee.lt(200_000)).toBeTruthy();

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;

    await sender.fund(request, txCost);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund should not have been called since the TX request was already funded
    expect(getResourcesToSpendSpy).toHaveBeenCalledTimes(0);

    const receiverBalance = await receiver.getBalance(await provider.getBaseAssetId());

    expect(receiverBalance.toNumber()).toBe(amountToTransfer);
  });

  it('should fully fund a transaction when it is has no funds yet', async () => {
    const initialAmount = 500_000;
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: initialAmount,
      },
    });

    const {
      provider,
      wallets: [sender, receiver],
    } = launched;

    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 200_000,
      splitIn: 1,
      baseAssetId: await provider.getBaseAssetId(),
      mainWallet: sender,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1_000,
    });

    const amountToTransfer = 1000;
    request.addCoinOutput(receiver.address, amountToTransfer, await provider.getBaseAssetId());

    const txCost = await sender.getTransactionCost(request);

    // TX request does NOT carry any resources, it needs to be funded
    expect(request.inputs.length).toBe(0);

    const getResourcesToSpendSpy = vi.spyOn(sender, 'getResourcesToSpend');

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await sender.fund(request, txCost);

    const tx = await sender.sendTransaction(request);

    await tx.waitForResult();

    // fund method should have been called to fetch UTXOs
    expect(getResourcesToSpendSpy).toHaveBeenCalledTimes(1);

    const receiverBalance = await receiver.getBalance(await provider.getBaseAssetId());

    expect(receiverBalance.toNumber()).toBe(amountToTransfer + initialAmount);
  });

  it('should ensure proper error is thrown when user has not enough resources', async () => {
    const initialAmount = 100_000;
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: initialAmount,
      },
    });

    const {
      provider,
      wallets: [funded],
    } = launched;

    const splitIn = 254;
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    /**
     * Splitting funds in 254 UTXOs to result in the transaction become more expensive
     * after the funds are added to it.
     */
    await fundingTxWithMultipleUTXOs({
      account: sender,
      totalAmount: 1524,
      splitIn,
      baseAssetId: await provider.getBaseAssetId(),
      mainWallet: funded,
    });

    const request = new ScriptTransactionRequest();

    const amountToTransfer = 1522;
    request.addCoinOutput(receiver.address, amountToTransfer, await provider.getBaseAssetId());

    const txCost = await sender.getTransactionCost(request);

    expect(request.inputs.length).toBe(0);

    request.gasLimit = txCost.gasUsed;

    const getResourcesToSpend = vi.spyOn(sender, 'getResourcesToSpend');

    /**
     * When estimating with only one UTXO, the transaction will require a total of 1523 of `baseAssetId`:
     * 1522 for the transfer and 1 for fees. However, after funding it with 254 UTXOs, the fee increases
     * to 3, bringing the total to 1525. This happens because as the transaction size grows, more gas is required.
     */
    await expectToThrowFuelError(
      () => sender.fund(request, txCost),
      new FuelError(
        FuelError.CODES.NOT_ENOUGH_FUNDS,
        `The account(s) sending the transaction don't have enough funds to cover the transaction.`,
        {},
        {
          locations: [
            {
              column: 3,
              line: 2,
            },
          ],
          message: 'not enough coins to fit the target',
          path: ['coinsToSpend'],
        }
      )
    );

    expect(getResourcesToSpend).toHaveBeenCalled();
  });

  it('should ensure a partially funded Transaction will require only missing funds', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const receiver = Wallet.generate({ provider });
    const wallet1 = Wallet.generate({ provider });
    const wallet2 = Wallet.generate({ provider });

    // Define funding requirements and allocations
    const totalInBaseAsset = 200_000;
    const totalInAssetA = 50_000;
    const partiallyInAssetA = totalInAssetA / 2;

    /**
     * Funding wallet1 with only half of the required amount in Asset A and with enough amount
     * in the Base Asset to pay the fee
     */
    const submitted1 = await wallet.transfer(
      wallet1.address,
      totalInBaseAsset,
      await provider.getBaseAssetId()
    );
    await submitted1.waitForResult();

    const submitted2 = await wallet.transfer(wallet1.address, partiallyInAssetA, assetA);
    await submitted2.waitForResult();

    /**
     * Funding wallet2 with the remaining amount needed in Asset A.
     * Note: This wallet does not have any additional funds to pay for the transaction fee.
     */
    const submitted3 = await wallet.transfer(
      wallet2.address,
      totalInAssetA - partiallyInAssetA,
      assetA
    );
    await submitted3.waitForResult();

    let transactionRequest = new ScriptTransactionRequest();

    // Adding CoinOutput for Asset A using the totalInAssetA amount
    transactionRequest.addCoinOutput(receiver.address, totalInAssetA, assetA);

    // Executing getTransactionCost to proper estimate maxFee and gasLimit
    const txCost = await wallet1.getTransactionCost(transactionRequest);

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    // Manually fetching resources from wallet1 to be added to transactionRequest
    const partiallyResources = await wallet1.getResourcesToSpend([
      [partiallyInAssetA, assetA],
      [totalInBaseAsset, baseAssetId],
    ]);

    const baseAssetResource = partiallyResources.find((r) => r.assetId === baseAssetId);
    const assetAResource = partiallyResources.find((r) => r.assetId === assetA);

    // Expect to have the correct amount of resources, not enough to cover the required amount in Asset A
    expect(baseAssetResource?.amount.toString()).toBe(totalInBaseAsset.toString());
    expect(assetAResource?.amount.toString()).toBe(partiallyInAssetA.toString());

    transactionRequest.addResources(partiallyResources);

    /**
     * Using fund to add the missing required funds for the transactionRequest. The wallet2 was funded
     * only with half of the required amount in Asset A, so we validate that the fund method will fetch
     * only the remaining amount needed to complete the transaction. If attempts to fetch more funds
     * than needed, the transaction will fail with an error.
     */
    await wallet2.fund(transactionRequest, txCost);

    transactionRequest = (await wallet2.populateTransactionWitnessesSignature(
      transactionRequest
    )) as ScriptTransactionRequest;

    const tx = await wallet1.sendTransaction(transactionRequest);

    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should ensure a funded Transaction will not require more funds from another user', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    let transactionRequest = new ScriptTransactionRequest();

    /**
     * Adding CoinOutputs for the receiver address. All required amounts can be
     * covered by the fundedWallet.
     */
    transactionRequest.addCoinOutput(receiver.address, 1500, await provider.getBaseAssetId());
    transactionRequest.addCoinOutput(receiver.address, 3000, assetA);
    transactionRequest.addCoinOutput(receiver.address, 4500, assetB);

    const txCost = await fundedWallet.getTransactionCost(transactionRequest);

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    /**
     * Funding the TX request with the fundedWallet. The wallet has enough funds to
     * cover all required amounts
     */
    await fundedWallet.fund(transactionRequest, txCost);

    const { balances } = await unfundedWallet.getBalances();

    // expect balance to be empty since the wallet was not funded
    expect(balances.length).toBe(0);

    /**
     * Calling fund again with the unfunded wallet. Any attempt to fetch resources from any asset will
     * result in an error since this wallet carry not funds.
     */
    await unfundedWallet.fund(transactionRequest, txCost);

    transactionRequest = (await fundedWallet.populateTransactionWitnessesSignature(
      transactionRequest
    )) as ScriptTransactionRequest;

    const tx = await unfundedWallet.sendTransaction(transactionRequest);

    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should cache UTXOs by default upon TX submission', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        // A new block will be generated every 5 seconds
        args: ['--poa-instant', 'false', '--poa-interval-period', '5s'],
      },
      walletsConfig: {
        coinsPerAsset: 2,
      },
    });

    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const transferAmount = 100_000;

    // Submitting TX 1
    const submission1 = await fundedWallet.transfer(
      receiver.address,
      transferAmount,
      await provider.getBaseAssetId()
    );

    // Submitting TX 2 before TX 1 finished to process.
    const submission2 = await fundedWallet.transfer(
      receiver.address,
      transferAmount,
      await provider.getBaseAssetId()
    );

    const result1 = await submission1.waitForResult();
    const result2 = await submission2.waitForResult();

    expect(result1.isStatusSuccess).toBeTruthy();
    expect(result2.isStatusSuccess).toBeTruthy();

    expect(result1.blockId).toBe(result2.blockId);

    expect(provider.cache).toBeTruthy();
    expect(provider.cache?.ttl).toBe(DEFAULT_RESOURCE_CACHE_TTL);
  }, 15_000);

  it('should fail when trying to use the same UTXO in multiple TXs without cache', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        // A new block will be generated every 5 seconds
        args: ['--poa-instant', 'false', '--poa-interval-period', '5s'],
      },
      providerOptions: {
        // Cache will last for 1 millisecond
        resourceCacheTTL: 1,
      },
      walletsConfig: {
        coinsPerAsset: 1,
      },
    });

    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const transferAmount = 100_000;

    // Submitting TX 1
    await fundedWallet.transfer(receiver.address, transferAmount, await provider.getBaseAssetId());

    // ensure cache is cleared
    await sleep(100);

    // Submitting TX 2 before TX 1 finished to process.
    await expect(async () =>
      fundedWallet.transfer(receiver.address, transferAmount, await provider.getBaseAssetId())
    ).rejects.toThrowError(
      /Transaction input validation failed: Transaction id already exists \(id: .*\)/
    );

    const { error: e } = await safeExec(async () => {
      await fundedWallet.transfer(
        receiver.address,
        transferAmount,
        await provider.getBaseAssetId()
      );
    });

    const error = <FuelError>e;
    expect(error.code).toEqual(FuelError.CODES.INVALID_REQUEST);
    expect(error.message).toMatch(
      /Transaction input validation failed: Transaction id already exists \(id: .*\)/
    );
  }, 15_000);

  it('funds a script transaction using estimateAndFund', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [sender, receiver],
    } = launched;

    const request = new ScriptTransactionRequest().addCoinOutput(
      receiver.address,
      1000,
      await provider.getBaseAssetId()
    );

    expect(request.inputs.length).toBe(0);
    expect(request.maxFee.toNumber()).toBe(0);
    expect(request.gasLimit.toNumber()).toBe(0);

    await request.estimateAndFund(sender);

    expect(request.inputs.length).toBe(1);
    expect(request.maxFee.toNumber()).toBeGreaterThan(0);
    expect(request.gasLimit.toNumber()).toBeGreaterThan(0);

    const tx = await sender.sendTransaction(request);
    const result = await tx.waitForResult();

    expect(result.isStatusSuccess).toBeTruthy();
  });

  it('funds a script tx from contract call using estimateAndFund', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const {
      wallets: [sender],
      contracts: [contract],
    } = launched;

    const request = await contract.functions.no_params().getTransactionRequest();

    expect(request.inputs.length).toBe(1);
    expect(request.maxFee.toNumber()).toBe(0);
    expect(request.gasLimit.toNumber()).toBe(0);

    await request.estimateAndFund(sender);

    expect(request.inputs.length).toBe(2);
    expect(request.maxFee.toNumber()).toBeGreaterThan(0);
    expect(request.gasLimit.toNumber()).toBeGreaterThan(0);

    const tx = await sender.sendTransaction(request);
    const result = await tx.waitForResult();

    expect(result.isStatusSuccess).toBeTruthy();
  });

  it('funds a contract call using fundWithRequiredCoins', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const {
      wallets: [sender],
      contracts: [contract],
    } = launched;

    const scope = await contract.functions.no_params();
    const request = await scope.fundWithRequiredCoins();

    expect(request.inputs.length).toBe(2);
    expect(request.maxFee.toNumber()).toBeGreaterThan(0);
    expect(request.gasLimit.toNumber()).toBeGreaterThan(0);

    const tx = await sender.sendTransaction(request);
    const result = await tx.waitForResult();

    expect(result.isStatusSuccess).toBeTruthy();
  });
});
