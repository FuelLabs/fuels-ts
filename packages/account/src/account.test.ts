import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';
import { ScriptTransactionRequest, Provider } from './providers';
import * as providersMod from './providers';
import type { Coin, CoinQuantity, Message, Resource } from './providers';
import { generateTestWallet, seedTestWallet } from './test-utils';
import { Wallet } from './wallet';

let provider: Provider;

afterEach(() => {
  vi.restoreAllMocks();
});

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
});

/**
 * @group node
 */
describe('Account', () => {
  const assets = [ASSET_A, ASSET_B, BaseAssetId];

  it('should create account using an address, with a provider', () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    expect(account.address.toB256()).toEqual(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
  });

  it('should create account using an address, without a provider', () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    expect(account.address.toB256()).toEqual(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
  });

  it('should throw an error when using a provider dependent method, without a provider', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    await expect(() => account.getBalance()).rejects.toThrow(/Provider not set/);
  });

  it('should get coins just fine', async () => {
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

  it('should throw if coins length is higher than 9999', async () => {
    const dummyCoins: Coin[] = new Array(10000);

    vi.spyOn(Provider.prototype, 'getCoins').mockImplementation(async () =>
      Promise.resolve(dummyCoins)
    );

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    let result;
    let error;

    try {
      result = await account.getCoins();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets containing more than 9999 coins exceed the current supported limit.'
    );
  });

  it('should execute getResourcesToSpend just fine', async () => {
    // #region Message-getResourcesToSpend
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const resourcesToSpend = await account.getResourcesToSpend([
      {
        amount: bn(2),
        assetId: ASSET_A,
      },
    ]);
    expect(resourcesToSpend[0].amount.gt(2)).toBeTruthy();
    // #endregion Message-getResourcesToSpend
  });

  it('getResourcesToSpend should work with <1 amount', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const resourcesToSpend = await account.getResourcesToSpend([
      {
        amount: 0.9,
        assetId: ASSET_A,
      },
    ]);
    expect(resourcesToSpend[0].amount.gte(1)).toBeTruthy();
  });

  it('should get messages just fine', async () => {
    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );
    const messages = await account.getMessages();
    expect(messages.length).toEqual(1);
  });

  it('should throw if messages length is higher than 9999', async () => {
    const dummyMessages: Message[] = new Array(10000);

    vi.spyOn(Provider.prototype, 'getMessages').mockImplementation(async () =>
      Promise.resolve(dummyMessages)
    );

    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );

    let result;
    let error;

    try {
      result = await account.getMessages();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets containing more than 9999 messages exceed the current supported limit.'
    );
  });

  it('should get single asset balance just fine', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const balanceA = await account.getBalance(); // native asset
    const balanceB = await account.getBalance(assets[1]);
    expect(balanceA.gte(1)).toBeTruthy();
    expect(balanceB.gte(1)).toBeTruthy();
  });

  it('should get multiple balances just fine', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const balances = await account.getBalances();
    expect(balances.length).toBeGreaterThanOrEqual(1);
  });

  it('should throw if balances length is higher than 9999', async () => {
    const dummyBalances: CoinQuantity[] = new Array(10000);

    vi.spyOn(Provider.prototype, 'getBalances').mockImplementation(async () =>
      Promise.resolve(dummyBalances)
    );

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    let result;
    let error;
    try {
      result = await account.getBalances();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets containing more than 9999 balances exceed the current supported limit.'
    );
  });

  it('should connect with provider just fine [INSTANCE]', async () => {
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

    const resourcesToSpend: Resource[] = [];
    const getResourcesToSpendSpy = vi
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementationOnce(() => Promise.resolve(resourcesToSpend));

    const addResourcesSpy = vi.spyOn(request, 'addResources');

    const addAmountToAssetSpy = vi.spyOn(providersMod, 'addAmountToAsset');

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    await account.fund(request, {
      requiredQuantities: quantities,
      maxFee: fee,
      inputsWithEstimatedPredicates: [],
      addedSignatures: 0,
    });

    expect(addAmountToAssetSpy).toBeCalledTimes(1);
    expect(addAmountToAssetSpy).toHaveBeenCalledWith({
      amount: bn(fee),
      assetId: BaseAssetId,
      coinQuantities: quantities,
    });

    const expectedTotalResources = [
      { amount: bn(quantities[0].amount), assetId: quantities[0].assetId },
      { amount: bn(fee), assetId: BaseAssetId },
    ];
    expect(getResourcesToSpendSpy).toBeCalledTimes(1);
    expect(getResourcesToSpendSpy).toBeCalledWith(expectedTotalResources, {
      messages: [],
      utxos: [],
    });

    expect(addResourcesSpy).toBeCalledTimes(1);
    expect(addResourcesSpy).toHaveBeenCalledWith(resourcesToSpend);
  });

  it('should execute sendTransaction just fine', async () => {
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

  it('should execute simulateTransaction just fine', async () => {
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

  it('can transfer a single type of coin to a single destination', async () => {
    const sender = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
    const receiver = await generateTestWallet(provider);

    const response = await sender.transfer(receiver.address, 1, BaseAssetId, {
      gasLimit: 10_000,
    });
    await response.wait();

    const senderBalances = await sender.getBalances();
    const receiverBalances = await receiver.getBalances();

    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(499921) }]);
    expect(receiverBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1) }]);
  });

  it('can create transfer request just fine', async () => {
    const sender = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
    const receiver = await generateTestWallet(provider);

    const request = await sender.createTransfer(receiver.address.toB256(), 1, BaseAssetId, {
      gasLimit: 10_000,
    });

    const response = await sender.sendTransaction(request);
    await response.wait();

    const senderBalances = await sender.getBalances();
    const receiverBalances = await receiver.getBalances();

    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(499921) }]);
    expect(receiverBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1) }]);
  });

  it('can transfer with custom TX Params', async () => {
    const sender = await generateTestWallet(provider, [[1000, BaseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const response = await sender.transfer(receiver.address, 1, BaseAssetId, {
      gasLimit: 600,
    });

    await response.wait();
    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(921) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1) }]);
  });

  it('can exclude IDs when getResourcesToSpend is called', async () => {
    const user = await generateTestWallet(provider, [
      [500_000, ASSET_A],
      [500_000, ASSET_B],
      [500_000, BaseAssetId],
    ]);

    const coins = await user.getCoins();

    // Test excludes the UTXO where the assetIdA gets added to the senders wallet
    await expect(
      user.getResourcesToSpend([[1, ASSET_A, 500_000]], { utxos: [coins[0].id] })
    ).rejects.toThrow(/not enough coins to fit the target/);
  });

  it('can transfer multiple types of coins to multiple destinations', async () => {
    const assetIdA = ASSET_A;
    const assetIdB = ASSET_B;
    const amount = 1;

    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });
    const sender = await generateTestWallet(provider, [
      [500_000, assetIdA],
      [500_000, assetIdB],
      [500_000, BaseAssetId],
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

  it('can withdraw an amount of base asset', async () => {
    const sender = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 10;

    const tx = await sender.withdrawToBaseLayer(recipient, 10, { gasLimit: 10_000 });
    const result = await tx.waitForResult();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];

    // The sender is the TX ID on the spec it says it should be the sender address
    // but is not returning the sender address instead is returning the tx id
    expect(result.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(499911) }]);
  });

  it('can retrieve a valid MessageProof', async () => {
    const sender = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
    const RECIPIENT_ID = '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263';
    const AMOUNT = 10;
    const recipient = Address.fromB256(RECIPIENT_ID);

    const tx = await sender.withdrawToBaseLayer(recipient.toB256(), AMOUNT);
    // #region Message-getMessageProof
    const result = await tx.waitForResult();

    // Wait for the next block to be minter on out case we are using a local provider
    // so we can create a new tx to generate next block
    const resp = await sender.transfer(recipient, AMOUNT, BaseAssetId, {
      gasLimit: 10_000,
    });
    const nextBlock = await resp.waitForResult();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];
    const messageProof = await provider.getMessageProof(
      result.gqlTransaction.id,
      messageOutReceipt.nonce,
      nextBlock.blockId
    );
    // #endregion Message-getMessageProof

    expect(messageProof?.amount.toNumber()).toEqual(AMOUNT);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });

  it('can transfer amount using mutiple utxos', async () => {
    const sender = Wallet.generate({
      provider,
    });
    const receiver = Wallet.generate({
      provider,
    });

    // seed wallet with 3 distinct utxos
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);

    const transfer = await sender.transfer(receiver.address, 110, BaseAssetId, {
      gasLimit: 10_000,
    });
    await transfer.wait();

    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: BaseAssetId, amount: bn(110) }]);
  });

  it('can withdraw an amount of base asset using mutiple uxtos', async () => {
    const sender = Wallet.generate({
      provider,
    });
    // seed wallet with 3 distinct utxos
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    await seedTestWallet(sender, [[500_000, BaseAssetId]]);
    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 110;
    const tx = await sender.withdrawToBaseLayer(recipient, amount, {
      gasLimit: 10_000,
    });
    const result = await tx.wait();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];
    expect(result.gqlTransaction.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1499811) }]);
  });

  it('should ensure gas price and gas limit are validated when transfering amounts', async () => {
    const sender = await generateTestWallet(provider, [[1000, BaseAssetId]]);
    const receiver = Wallet.generate({ provider });

    await expect(async () => {
      const result = await sender.transfer(receiver.address, 1, BaseAssetId, {
        gasLimit: 1,
      });
      await result.wait();
    }).rejects.toThrowError(/Gas limit '1' is lower than the required: ./);
  });

  it('should ensure gas limit and price are validated when withdraw an amount of base asset', async () => {
    const sender = await generateTestWallet(provider, [[10_000, BaseAssetId]]);
    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );

    await expect(async () => {
      const result = await sender.withdrawToBaseLayer(recipient, 10, {
        gasLimit: 1,
      });
      await result.wait();
    }).rejects.toThrowError(/Gas limit '1' is lower than the required: ./);
  });

  it('should throw when trying to transfer a zero or negative amount', async () => {
    const sender = await generateTestWallet(provider, [[10_000, BaseAssetId]]);
    const receiver = Wallet.generate({ provider });

    await expectToThrowFuelError(
      async () => {
        await sender.transfer(receiver.address, 0, BaseAssetId);
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );

    await expectToThrowFuelError(
      async () => {
        await sender.transfer(receiver.address, -1, BaseAssetId);
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );
  });
});
