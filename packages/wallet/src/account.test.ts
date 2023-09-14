import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';
import type {
  CallResult,
  Coin,
  CoinQuantity,
  Message,
  Resource,
  ScriptTransactionRequest,
  TransactionRequest,
  TransactionRequestLike,
  TransactionResponse,
} from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';

import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';

jest.mock('@fuel-ts/providers', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/providers'),
}));

let provider: Provider;

afterEach(jest.restoreAllMocks);

beforeAll(async () => {
  provider = await Provider.connect(FUEL_NETWORK_URL);
});

describe('Account', () => {
  const assets = [
    '0x0101010101010101010101010101010101010101010101010101010101010101',
    '0x0202020202020202020202020202020202020202020202020202020202020202',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ];

  it('Create wallet using a address', () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    expect(account.address.toB256()).toEqual(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
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

    const dummyProvider = {
      getCoins: async () => Promise.resolve(dummyCoins),
    } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      dummyProvider
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

    const dummyProvider = {
      getMessages: async () => Promise.resolve(dummyMessages),
    } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      dummyProvider
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
    const dummyBalace: CoinQuantity[] = new Array(10000);

    const dummyProvider = {
      getBalances: async () => Promise.resolve(dummyBalace),
    } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      dummyProvider
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

  /*
   * We are skipping these tests because we only have one valid provider URL to work with.
   * The testnet URLs won't work because they run a different client version.
   * TODO: figure out a way to still test these methods that cover provider URL switching
   */
  it.skip('should connect with provider just fine [INSTANCE]', async () => {
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const newProviderUrl = 'https://rpc.fuel.sh';

    expect(account.provider.url).not.toEqual(newProviderUrl);

    const newProvider = await Provider.connect(newProviderUrl);
    account.connect(newProvider);

    expect(account.provider.url).toEqual(newProviderUrl);
  });

  it('should execute fund just as fine', async () => {
    const fee = {
      amount: bn(1),
      assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
    };

    const resources: Resource[] = [];

    const calculateFee = jest.fn(() => fee);
    const addResources = jest.fn();

    const request = {
      calculateFee,
      addResources,
    } as unknown as TransactionRequest;

    const getResourcesToSpendSpy = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementationOnce(() => Promise.resolve([]));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    await account.fund(request);

    expect(calculateFee.mock.calls.length).toBe(1);

    expect(getResourcesToSpendSpy.mock.calls.length).toBe(1);
    expect(getResourcesToSpendSpy.mock.calls[0][0]).toEqual([fee]);

    expect(addResources.mock.calls.length).toBe(1);
    expect(addResources.mock.calls[0][0]).toEqual(resources);
  });

  it('should execute transfer just as fine', async () => {
    const amount = bn(1);
    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const destination = Address.fromAddressOrString('0x0101010101010101010101010101010101010101');
    const txParam: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'> = {
      gasLimit: bn(1),
      gasPrice: bn(1),
      maturity: 1,
    };

    const fee: CoinQuantity = {
      amount,
      assetId,
    };

    const calculateFee = jest.fn(() => fee);
    const addCoinOutput = jest.fn();
    const addResources = jest.fn();

    const request = {
      calculateFee,
      addCoinOutput,
      addResources,
    } as unknown as ScriptTransactionRequest;

    const resources: Resource[] = [];

    const getResourcesToSpend = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve({} as unknown as TransactionResponse));

    jest.spyOn(providersMod, 'ScriptTransactionRequest').mockImplementation(() => request);

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    // asset id already hexlified
    await account.transfer(destination, amount, assetId, txParam);

    expect(addCoinOutput.mock.calls.length).toBe(1);
    expect(addCoinOutput.mock.calls[0]).toEqual([destination, amount, assetId]);

    expect(calculateFee.mock.calls.length).toBe(1);

    expect(getResourcesToSpend.mock.calls.length).toBe(1);
    expect(getResourcesToSpend.mock.calls[0][0]).toEqual([fee]);

    expect(addResources.mock.calls.length).toBe(1);
    expect(addResources.mock.calls[0][0]).toEqual(resources);

    expect(sendTransaction.mock.calls.length).toBe(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(request);

    // asset id not hexlified
    await account.transfer(destination, amount);

    expect(addCoinOutput.mock.calls.length).toBe(2);
    expect(addCoinOutput.mock.calls[1]).toEqual([
      destination,
      amount,
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ]);

    expect(calculateFee.mock.calls.length).toBe(2);

    expect(getResourcesToSpend.mock.calls.length).toBe(2);
    expect(getResourcesToSpend.mock.calls[1][0]).toEqual([
      [amount, '0x0000000000000000000000000000000000000000000000000000000000000000'],
      fee,
    ]);

    expect(addResources.mock.calls.length).toBe(2);
    expect(addResources.mock.calls[1][0]).toEqual(resources);

    expect(sendTransaction.mock.calls.length).toBe(2);
    expect(sendTransaction.mock.calls[1][0]).toEqual(request);
  });

  it('should execute withdrawToBaseLayer just fine', async () => {
    const recipient = Address.fromRandom();
    const txParams: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'> = {};
    const amount = bn(1);

    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';

    const fee: CoinQuantity = {
      amount,
      assetId,
    };

    const calculateFee = jest.fn(() => fee);
    const addResources = jest.fn();

    const request = {
      calculateFee,
      addResources,
    } as unknown as ScriptTransactionRequest;

    const resources: Resource[] = [];

    const transactionResponse = {} as unknown as TransactionResponse;

    const scriptTransactionRequest = jest
      .spyOn(providersMod, 'ScriptTransactionRequest')
      .mockImplementation(() => request);

    const getResourcesToSpend = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    let result = await account.withdrawToBaseLayer(recipient, amount, txParams);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest.mock.calls.length).toBe(1);

    expect(calculateFee.mock.calls.length).toBe(1);

    expect(addResources.mock.calls.length).toBe(1);
    expect(addResources.mock.calls[0][0]).toEqual(resources);

    expect(getResourcesToSpend.mock.calls.length).toBe(1);
    expect(getResourcesToSpend.mock.calls[0][0]).toEqual([fee]);

    expect(sendTransaction.mock.calls.length).toBe(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(request);

    // without txParams
    result = await account.withdrawToBaseLayer(recipient, amount);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest.mock.calls.length).toBe(2);

    expect(calculateFee.mock.calls.length).toBe(2);

    expect(addResources.mock.calls.length).toBe(2);
    expect(addResources.mock.calls[0][0]).toEqual(resources);

    expect(getResourcesToSpend.mock.calls.length).toBe(2);
    expect(getResourcesToSpend.mock.calls[0][0]).toEqual([fee]);

    expect(sendTransaction.mock.calls.length).toBe(2);
    expect(sendTransaction.mock.calls[0][0]).toEqual(request);
  });

  it('should execute sendTransaction just fine', async () => {
    const transactionRequestLike = 'transactionRequestLike' as unknown as TransactionRequest;
    const transactionRequest = 'transactionRequest' as unknown as TransactionRequest;
    const transactionResponse = 'transactionResponse' as unknown as TransactionResponse;

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const estimateTxDependencies = jest
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() => Promise.resolve());

    const sendTransaction = jest
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

    expect(estimateTxDependencies.mock.calls.length).toEqual(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(sendTransaction.mock.calls.length).toEqual(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute simulateTransaction just fine', async () => {
    const transactionRequestLike = 'transactionRequestLike' as unknown as TransactionRequest;
    const transactionRequest = 'transactionRequest' as unknown as TransactionRequest;
    const callResult = 'callResult' as unknown as CallResult;

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const estimateTxDependencies = jest
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() => Promise.resolve());

    const simulate = jest
      .spyOn(providersMod.Provider.prototype, 'simulate')
      .mockImplementation(() => Promise.resolve(callResult));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const result = await account.simulateTransaction(transactionRequestLike);

    expect(result).toEqual(callResult);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(simulate.mock.calls.length).toBe(1);
    expect(simulate.mock.calls[0][0]).toEqual(transactionRequest);
  });
});
