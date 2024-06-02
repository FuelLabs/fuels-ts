import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { PolicyType } from '@fuel-ts/transactions';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bench } from 'vitest';

import type { TransferParams } from './account';
import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';
import { ScriptTransactionRequest, Provider } from './providers';
import * as providersMod from './providers';
import type { Coin, CoinQuantity, Message, Resource } from './providers';
import { generateTestWallet, seedTestWallet } from './test-utils';
import { Wallet } from './wallet';

/**
 * @group node
 */

describe('Account', () => {
  const assets = [ASSET_A, ASSET_B];
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    assets.push(baseAssetId);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  bench('should create account using an address, with a provider', () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    expect(account.address.toB256()).toEqual(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
  });

  bench('should create account using an address, without a provider', () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    expect(account.address.toB256()).toEqual(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
  });

  bench('should get coins just fine', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const coins = await account.getCoins();
    const assetA = coins.find((c) => c.assetId === assets[0]);
    expect(assetA?.amount.gt(1)).toBeTruthy();
    const assetB = coins.find((c) => c.assetId === assets[1]);
    expect(assetB?.amount.gt(1)).toBeTruthy();
    const assetC = coins.find((c) => c.assetId === assets[2]);
    expect(assetC?.amount.gt(1)).toBeTruthy();
  });

  bench('should get messages just fine', async () => {
    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );
    const messages = await account.getMessages();
    expect(messages.length).toEqual(1);
  });

  bench('should get single asset balance just fine', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const balanceA = await account.getBalance(); // native asset
    const balanceB = await account.getBalance(assets[1]);
    expect(balanceA.gte(1)).toBeTruthy();
    expect(balanceB.gte(1)).toBeTruthy();
  });

  bench('should get multiple balances just fine', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const balances = await account.getBalances();
    expect(balances.length).toBeGreaterThanOrEqual(1);
  });

  bench('should connect with provider just fine [INSTANCE]', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const newProviderInstance = await Provider.create(FUEL_NETWORK_URL);

    expect(account.provider).not.toBe(newProviderInstance);

    account.connect(newProviderInstance);

    expect(account.provider).toBe(newProviderInstance);
    expect(account.provider).not.toBe(provider);
  });

  it('should be able to set a provider', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const newProviderInstance = await Provider.create(FUEL_NETWORK_URL);

    expect(account.provider).not.toBe(newProviderInstance);

    account.provider = newProviderInstance;

    expect(account.provider).toBe(newProviderInstance);
    expect(account.provider).not.toBe(provider);
  });

  it('should execute fund just as fine', async () => {
    const quantities: CoinQuantity[] = [
      {
        amount: bn(10),
        assetId: ASSET_A,
      },
    ];
    const fee = bn(29);

    const request = new ScriptTransactionRequest();

    request.maxFee = fee;

    const resourcesToSpend: Resource[] = [];
    const getResourcesToSpendSpy = vi
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementationOnce(() => Promise.resolve(resourcesToSpend));

    const addResourcesSpy = vi.spyOn(request, 'addResources');

    const addAmountToCoinQuantitiesSpy = vi.spyOn(providersMod, 'addAmountToCoinQuantities');

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    await account.fund(request, {
      requiredQuantities: quantities,
      estimatedPredicates: [],
      addedSignatures: 0,
    });

    expect(addAmountToCoinQuantitiesSpy).toBeCalledTimes(1);
    expect(addAmountToCoinQuantitiesSpy).toHaveBeenCalledWith({
      amount: bn(fee),
      assetId: baseAssetId,
      coinQuantities: quantities,
    });

    const expectedTotalResources = [
      { amount: bn(quantities[0].amount), assetId: quantities[0].assetId },
      { amount: bn(fee), assetId: baseAssetId },
    ];
    expect(getResourcesToSpendSpy).toHaveBeenCalled();
    expect(getResourcesToSpendSpy).toBeCalledWith(expectedTotalResources, {
      messages: [],
      utxos: [],
    });

    expect(addResourcesSpy).toHaveBeenCalled();
    expect(addResourcesSpy).toHaveBeenCalledWith(resourcesToSpend);
  });

  bench('should execute sendTransaction just fine', async () => {
    const transactionRequestLike: providersMod.TransactionRequestLike = {
      type: providersMod.TransactionType.Script,
    };
    const transactionRequest = new ScriptTransactionRequest();
    const transactionResponse =
      'transactionResponse' as unknown as providersMod.TransactionResponse;

    const transactionRequestify = vi.spyOn(providersMod, 'transactionRequestify');

    const estimateTxDependencies = vi
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() =>
        Promise.resolve({ receipts: [], missingContractIds: [], outputVariables: 0 })
      );

    const sendTransaction = vi
      .spyOn(providersMod.Provider.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const result = await account.sendTransaction(transactionRequestLike);

    expect(result).toEqual(transactionResponse);

    expect(transactionRequestify.mock.calls.length).toEqual(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(sendTransaction.mock.calls.length).toEqual(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  bench('should execute simulateTransaction just fine', async () => {
    const transactionRequestLike: providersMod.TransactionRequestLike = {
      type: providersMod.TransactionType.Script,
    };
    const transactionRequest = new ScriptTransactionRequest();
    const callResult = 'callResult' as unknown as providersMod.CallResult;

    const transactionRequestify = vi
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const estimateTxDependencies = vi
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() =>
        Promise.resolve({ receipts: [], missingContractIds: [], outputVariables: 0 })
      );

    const simulate = vi
      .spyOn(providersMod.Provider.prototype, 'simulate')
      .mockImplementation(() => Promise.resolve(callResult));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const result = await account.simulateTransaction(transactionRequestLike);

    expect(result).toEqual(callResult);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(simulate.mock.calls.length).toBe(1);
    expect(simulate.mock.calls[0][0]).toEqual(transactionRequest);
  });

  bench('can transfer a single type of coin to a single destination', async () => {
    const sender = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = await generateTestWallet(provider);

    const response = await sender.transfer(receiver.address, 1, baseAssetId, {
      gasLimit: 10_000,
    });
    await response.wait();

    const senderBalances = await sender.getBalances();
    const receiverBalances = await receiver.getBalances();

    const expectedRemaining = 442069;
    expect(senderBalances).toEqual([{ assetId: baseAssetId, amount: bn(expectedRemaining) }]);
    expect(receiverBalances).toEqual([{ assetId: baseAssetId, amount: bn(1) }]);
  });

  bench('can transfer to multiple destinations', async () => {
    const sender = await generateTestWallet(provider, [
      [900_000, baseAssetId],
      [900_000, ASSET_A],
      [900_000, ASSET_B],
    ]);

    const amounts = [100, 200, 300, 400];

    const receivers = [
      Wallet.generate({ provider }),
      Wallet.generate({ provider }),
      Wallet.generate({ provider }),
    ];

    const transferConfig: TransferParams[] = [
      { amount: amounts[0], destination: receivers[0].address, assetId: baseAssetId },
      { amount: amounts[1], destination: receivers[1].address, assetId: ASSET_A },
      { amount: amounts[2], destination: receivers[2].address, assetId: ASSET_B },
      { amount: amounts[3], destination: receivers[2].address, assetId: ASSET_A },
    ];

    const response1 = await sender.batchTransfer(transferConfig);
    const { isStatusSuccess } = await response1.waitForResult();
    expect(isStatusSuccess).toBeTruthy();

    const expectedBalances = [
      { receiver: receivers[0], assetId: baseAssetId, expectedBalance: amounts[0] },
      { receiver: receivers[1], assetId: ASSET_A, expectedBalance: amounts[1] },
      { receiver: receivers[2], assetId: ASSET_B, expectedBalance: amounts[2] },
      { receiver: receivers[2], assetId: ASSET_A, expectedBalance: amounts[3] },
    ];

    for (const { receiver, assetId, expectedBalance } of expectedBalances) {
      const balance = await receiver.getBalance(assetId);
      expect(balance.toNumber()).toBe(expectedBalance);
    }

    // Test with custom TX Params
    const gasLimit = 100_000;
    const maxFee = 120_000;
    const tip = 1_000;
    const witnessLimit = 10_000;
    const maturity = 1;

    const response = await sender.batchTransfer(transferConfig, {
      gasLimit,
      maxFee,
      tip,
      witnessLimit,
      maturity,
    });

    const {
      transaction: { policies, scriptGasLimit },
      isStatusSuccess: isStatusSuccess2,
    } = await response.waitForResult();

    expect(isStatusSuccess2).toBeTruthy();
    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(policies?.[0].data).toNumber()).toBe(tip);
    expect(bn(policies?.[1].data).toNumber()).toBe(witnessLimit);
    expect(policies?.[2].data).toBe(maturity);
    expect(bn(policies?.[3].data).toNumber()).toBe(maxFee);

    for (const { receiver, assetId, expectedBalance } of expectedBalances) {
      const balance = await receiver.getBalance(assetId);
      expect(balance.toNumber()).toBe(expectedBalance * 2);
    }
  });

  bench('can create transfer request just fine', async () => {
    const sender = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = await generateTestWallet(provider);

    const request = await sender.createTransfer(receiver.address.toB256(), 1, baseAssetId, {
      gasLimit: 10_000,
    });

    const response = await sender.sendTransaction(request);
    await response.wait();

    const senderBalances = await sender.getBalances();
    const receiverBalances = await receiver.getBalances();

    const expectedRemaining = 442069;
    expect(senderBalances).toEqual([{ assetId: baseAssetId, amount: bn(expectedRemaining) }]);
    expect(receiverBalances).toEqual([{ assetId: baseAssetId, amount: bn(1) }]);
  });

  it('can set "gasLimit" and "maxFee" when transferring amounts', async () => {
    const sender = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = Address.fromRandom();

    const gasLimit = 30_000;
    const maxFee = 60_000;

    const request = await sender.createTransfer(receiver, 1, baseAssetId, {
      gasLimit,
      maxFee,
    });

    const response = await sender.sendTransaction(request);
    const { transaction } = await response.wait();

    const { scriptGasLimit, policies } = transaction;
    const maxFeePolicy = policies?.find((policy) => policy.type === PolicyType.MaxFee);

    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(maxFeePolicy?.data).toNumber()).toBe(maxFee);
  });

  it('can transfer with custom TX Params', async () => {
    const sender = await generateTestWallet(provider, [[200_000, baseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const tx = await sender.transfer(receiver.address, 1, baseAssetId, {
      gasLimit: 1000,
      tip: 10,
      witnessLimit: 10000,
    });

    const response = await tx.wait();
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: baseAssetId, amount: bn(1) }]);
    expect(response.isStatusSuccess).toBeTruthy();
  });

  it('can exclude IDs when getResourcesToSpend is called', async () => {
    const user = await generateTestWallet(provider, [
      [500_000, ASSET_A],
      [500_000, ASSET_B],
      [500_000, baseAssetId],
    ]);

    const coins = await user.getCoins();

    // Test excludes the UTXO where the assetIdA gets added to the senders wallet
    await expect(
      user.getResourcesToSpend([[1, ASSET_A, 500_000]], { utxos: [coins[0].id] })
    ).rejects.toThrow(/not enough coins to fit the target/);
  });

  bench('can transfer multiple types of coins to multiple destinations', async () => {
    const assetIdA = ASSET_A;
    const assetIdB = ASSET_B;
    const amount = 1;

    const request = new ScriptTransactionRequest();
    const sender = await generateTestWallet(provider, [
      [500_000, assetIdA],
      [500_000, assetIdB],
      [500_000, baseAssetId],
    ]);
    const receiverA = await generateTestWallet(provider);
    const receiverB = await generateTestWallet(provider);

    request.addCoinOutputs(receiverA.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);
    request.addCoinOutputs(receiverB.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);

    const txCost = await sender.provider.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await sender.fund(request, txCost);

    const response = await sender.sendTransaction(request);

    await response.wait();

    const receiverACoins = await receiverA.getCoins();
    expect(receiverACoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount: bn(amount) }),
        expect.objectContaining({ assetId: assetIdB, amount: bn(amount) }),
      ])
    );

    const receiverBCoins = await receiverB.getCoins();
    expect(receiverBCoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount: bn(amount) }),
        expect.objectContaining({ assetId: assetIdB, amount: bn(amount) }),
      ])
    );
  });

  bench('can withdraw an amount of base asset', async () => {
    const sender = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 10;

    const tx = await sender.withdrawToBaseLayer(recipient, 10);
    const result = await tx.waitForResult();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];

    // The sender is the TX ID on the spec it says it should be the sender address
    // but is not returning the sender address instead is returning the tx id
    expect(result.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    const expectedRemaining = 441598;
    expect(senderBalances).toEqual([{ assetId: baseAssetId, amount: bn(expectedRemaining) }]);
  });
});
