import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  CallResult,
  Coin,
  CoinQuantity,
  Message,
  Resource,
  TransactionRequestLike,
} from '@fuel-ts/providers';
import { TransactionResponse, ScriptTransactionRequest, Provider } from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';

import type { TxParamsType } from './account';
import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';
import { generateTestWallet, seedTestWallet } from './test-utils';
import { Wallet } from './wallet';

let provider: Provider;
let gasPrice: BN;

afterEach(() => {
  vi.restoreAllMocks();
});

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
  ({ minGasPrice: gasPrice } = provider.getGasConfig());
});

/**
 * @group node
 */
describe('Account', () => {
  const assets = [
    '0x0101010101010101010101010101010101010101010101010101010101010101',
    '0x0202020202020202020202020202020202020202020202020202020202020202',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ];

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
        assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
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
        assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
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
        assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
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

    await account.fund(request, quantities, fee);

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

  it('should execute transfer just as fine', async () => {
    const amount = bn(1);
    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const destination = Address.fromAddressOrString(
      '0x0202020202020202020202020202020202020202020202020202020202020202'
    );
    const txParam: TxParamsType = {
      gasLimit: bn(1),
      gasPrice: bn(1),
      maturity: 1,
    };

    const transactionCost: providersMod.TransactionCost = {
      gasUsed: bn(234),
      gasPrice: bn(1),
      minGasPrice: bn(1),
      maxFee: bn(2),
      minFee: bn(1),
      receipts: [],
      requiredQuantities: [],
      maxGas: bn(1),
      minGas: bn(1),
      usedFee: bn(1),
    };

    const request = new ScriptTransactionRequest();
    vi.spyOn(providersMod, 'ScriptTransactionRequest').mockImplementation(() => request);

    const transactionResponse = new TransactionResponse('transactionId', provider);

    const addCoinOutputSpy = vi.spyOn(request, 'addCoinOutput');

    const fundSpy = vi.spyOn(Account.prototype, 'fund').mockImplementation(() => Promise.resolve());

    const sendTransactionSpy = vi
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const getTransactionCost = vi
      .spyOn(Provider.prototype, 'getTransactionCost')
      .mockImplementation(() => Promise.resolve(transactionCost));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    await account.transfer(destination, amount, assetId, txParam);

    expect(addCoinOutputSpy).toHaveBeenCalledTimes(1);
    expect(addCoinOutputSpy).toHaveBeenCalledWith(destination, amount, assetId);

    expect(getTransactionCost).toHaveBeenCalledTimes(1);

    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledWith(
      request,
      transactionCost.requiredQuantities,
      transactionCost.maxFee
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    expect(sendTransactionSpy).toHaveBeenCalledWith(request);
  });

  it('should execute withdrawToBaseLayer just fine', async () => {
    const recipient = Address.fromRandom();
    const txParams: TxParamsType = {};
    const amount = bn(1);

    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';

    const request = new ScriptTransactionRequest();

    const quantities: CoinQuantity[] = [
      {
        amount: bn(1),
        assetId,
      },
    ];
    const cost: providersMod.TransactionCost = {
      gasPrice: bn(1),
      gasUsed: bn(1),
      maxFee: bn(1),
      maxGas: bn(1),
      minFee: bn(1),
      minGas: bn(1),
      minGasPrice: bn(1),
      receipts: [],
      requiredQuantities: quantities,
      usedFee: bn(1),
    };

    const transactionResponse = {} as unknown as TransactionResponse;

    const scriptTransactionRequest = vi
      .spyOn(providersMod, 'ScriptTransactionRequest')
      .mockImplementation(() => request);

    const getTransactionCost = vi
      .spyOn(providersMod.Provider.prototype, 'getTransactionCost')
      .mockImplementation(() => Promise.resolve(cost));

    const fund = vi.spyOn(Account.prototype, 'fund').mockImplementation(() => Promise.resolve());

    const sendTransaction = vi
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    let result = await account.withdrawToBaseLayer(recipient, amount, txParams);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest).toHaveBeenCalledTimes(1);

    expect(sendTransaction).toHaveBeenCalledTimes(1);
    expect(sendTransaction).toHaveBeenCalledWith(request);

    expect(getTransactionCost).toHaveBeenCalledTimes(1);
    expect(fund).toHaveBeenCalledTimes(1);

    // without txParams
    result = await account.withdrawToBaseLayer(recipient, amount);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest).toHaveBeenCalledTimes(2);

    expect(sendTransaction).toHaveBeenCalledTimes(2);
    expect(sendTransaction).toHaveBeenCalledWith(request);
  });

  it('should execute sendTransaction just fine', async () => {
    const transactionRequestLike: TransactionRequestLike = {
      type: providersMod.TransactionType.Script,
    };
    const transactionRequest = new ScriptTransactionRequest();
    const transactionResponse = 'transactionResponse' as unknown as TransactionResponse;

    const transactionRequestify = vi.spyOn(providersMod, 'transactionRequestify');

    const estimateTxDependencies = vi
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() => Promise.resolve());

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
    const transactionRequestLike: TransactionRequestLike = {
      type: providersMod.TransactionType.Script,
    };
    const transactionRequest = new ScriptTransactionRequest();
    const callResult = 'callResult' as unknown as CallResult;

    const transactionRequestify = vi
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const estimateTxDependencies = vi
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() => Promise.resolve());

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
      gasPrice,
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
      gasPrice,
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
    const sender = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
    const receiver = await generateTestWallet(provider);

    /* Error out because gas is to low */
    await expect(async () => {
      const result = await sender.transfer(receiver.address, 1, BaseAssetId, {
        gasLimit: 0,
        gasPrice,
      });
      await result.wait();
    }).rejects.toThrowError(/Gas limit '0' is lower than the required: ./);

    const response = await sender.transfer(receiver.address, 1, BaseAssetId, {
      gasLimit: 10_000,
      gasPrice,
    });
    await response.wait();
    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(499_921) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1) }]);
  });

  it('can exclude IDs when getResourcesToSpend is called', async () => {
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

    const user = await generateTestWallet(provider, [
      [500_000, assetIdA],
      [500_000, assetIdB],
      [500_000, BaseAssetId],
    ]);

    const coins = await user.getCoins();

    // Test excludes the UTXO where the assetIdA gets added to the senders wallet
    await expect(
      user.getResourcesToSpend([[1, assetIdA, 500_000]], { utxos: [coins[0].id] })
    ).rejects.toThrow(/not enough coins to fit the target/);
  });

  it('can transfer multiple types of coins to multiple destinations', async () => {
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';
    const amount = 1;

    const request = new ScriptTransactionRequest({ gasLimit: 1000000, gasPrice });
    const sender = await generateTestWallet(provider, [
      [500_000, assetIdA],
      [500_000, assetIdB],
      [500_000, BaseAssetId],
    ]);
    const receiverA = await generateTestWallet(provider);
    const receiverB = await generateTestWallet(provider);

    const resources = await sender.getResourcesToSpend([
      [500_000, BaseAssetId],
      [500_000, assetIdA],
      [500_000, assetIdB],
    ]);

    request.addResources(resources);
    request.addCoinOutputs(receiverA.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);
    request.addCoinOutputs(receiverB.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);

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

    const tx = await sender.withdrawToBaseLayer(recipient, 10, { gasPrice, gasLimit: 10_000 });
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

    const tx = await sender.withdrawToBaseLayer(recipient.toB256(), AMOUNT, {
      gasPrice,
      gasLimit: 10_000,
    });
    // #region Message-getMessageProof
    const result = await tx.waitForResult();

    // Wait for the next block to be minter on out case we are using a local provider
    // so we can create a new tx to generate next block
    const resp = await sender.transfer(recipient, AMOUNT, BaseAssetId, {
      gasPrice,
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
      gasPrice,
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
    const tx = await sender.withdrawToBaseLayer(recipient, amount, { gasPrice, gasLimit: 10_000 });
    const result = await tx.wait();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];
    expect(result.gqlTransaction.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1499811) }]);
  });
});
