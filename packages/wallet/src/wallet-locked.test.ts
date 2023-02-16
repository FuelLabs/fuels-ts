import type { BytesLike } from '@ethersproject/bytes';
import type { InputValue } from '@fuel-ts/abi-coder';
import { Address, addressify } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/constants';
import type { AbstractAddress, AbstractPredicate } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  Coin,
  CoinQuantity,
  Message,
  Resource,
  ScriptTransactionRequest,
  TransactionRequestLike,
  TransactionResponse,
  BuildPredicateOptions,
  TransactionRequest,
  CallResult,
  TransactionResult,
} from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';
import * as transactionReqMod from '@fuel-ts/providers/src/transaction-request/transaction-request';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';

import { BaseWalletLocked } from './base-locked-wallet';
import { Wallet } from './wallet';
import type { WalletUnlocked } from './wallets';

describe('WalletLocked', () => {
  let wallet: WalletUnlocked;
  const assets = [
    '0x0101010101010101010101010101010101010101010101010101010101010101',
    '0x0202020202020202020202020202020202020202020202020202020202020202',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ];

  beforeAll(() => {
    wallet = Wallet.generate();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be instanciated with a wallet address', async () => {
    const walletLocked = new BaseWalletLocked(wallet.address);

    expect(walletLocked.address).toEqual(wallet.address);
  });

  it('should be instanciated with a wallet address and a provider', async () => {
    const walletLocked = new BaseWalletLocked(wallet.address, 'http://127.0.0.1:4000/graphql');

    expect(walletLocked.address).toEqual(wallet.address);
  });

  it('should get coins just fine', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    const coins = await walletLocked.getCoins();
    const assetA = coins.find((c) => c.assetId === assets[0]);
    expect(assetA?.amount.gt(1)).toBeTruthy();
    const assetB = coins.find((c) => c.assetId === assets[1]);
    expect(assetB?.amount.gt(1)).toBeTruthy();
    const assetC = coins.find((c) => c.assetId === assets[2]);
    expect(assetC?.amount.gt(1)).toBeTruthy();
  });

  it('should throw if coins length is higher than 9999', async () => {
    const dummyCoins: Coin[] = new Array(10000);

    const dummyProvider = { getCoins: async () => dummyCoins } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    let result;
    let error;

    try {
      result = await walletLocked.getCoins();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets with more than 9999 coins are not yet supported'
    );
  });

  it('should execute getResourcesToSpend just fine', async () => {
    // #region typedoc:Message-getResourcesToSpend
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const resourcesToSpend = await walletLocked.getResourcesToSpend([
      {
        amount: bn(2),
        assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
    ]);
    expect(resourcesToSpend[0].amount.gt(2)).toBeTruthy();
    // #endregion
  });

  it('should get messages just fine', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba'
    );
    const messages = await walletLocked.getMessages();
    expect(messages.length).toEqual(1);
  });

  it('should throw if messages length is higher than 9999', async () => {
    const dummyMessages: Message[] = new Array(10000);

    const dummyProvider = { getMessages: async () => dummyMessages } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    let result;
    let error;

    try {
      result = await walletLocked.getMessages();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets with more than 9999 messages are not yet supported'
    );
  });

  it('should get single asset balance just fine', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const balanceA = await walletLocked.getBalance(); // native asset
    const balanceB = await walletLocked.getBalance(assets[1]);
    expect(balanceA.gte(1)).toBeTruthy();
    expect(balanceB.gte(1)).toBeTruthy();
  });

  it('should get multiple balances just fine', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    const balances = await walletLocked.getBalances();

    expect(balances.length).toBeGreaterThanOrEqual(1);
  });

  it('should throw if balances length is higher than 9999', async () => {
    const dummyBalace: CoinQuantity[] = new Array(10000);

    const dummyProvider = { getBalances: async () => dummyBalace } as unknown as Provider;

    jest.spyOn(providersMod, 'Provider').mockImplementation(() => dummyProvider);

    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    let result;
    let error;
    try {
      result = await walletLocked.getBalances();
    } catch (err) {
      error = err;
    }

    expect(result).toBeUndefined();
    expect((<Error>error).message).toEqual(
      'Wallets with more than 9999 balances are not yet supported'
    );
  });

  it('should connect with provider just fine [URL]', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    expect(walletLocked.provider.url).toEqual('http://127.0.0.1:4000/graphql');

    const newProviderUrl = 'https://rpc.fuel.sh';
    walletLocked.connect(newProviderUrl);

    expect(walletLocked.provider.url).toEqual(newProviderUrl);
  });

  it('should connect with provider just fine [INSTANCE]', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const newProviderUrl = 'https://rpc.fuel.sh';

    expect(walletLocked.provider.url).not.toEqual(newProviderUrl);

    const newProvider = new Provider(newProviderUrl);
    walletLocked.connect(newProvider);

    expect(walletLocked.provider.url).toEqual(newProviderUrl);
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
      .spyOn(BaseWalletLocked.prototype, 'getResourcesToSpend')
      .mockImplementationOnce(() => Promise.resolve([]));

    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    await walletLocked.fund(request);

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

    const fee = {
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
      .spyOn(BaseWalletLocked.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(BaseWalletLocked.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve({} as unknown as TransactionResponse));

    jest.spyOn(transactionReqMod, 'ScriptTransactionRequest').mockImplementation(() => request);

    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );

    // asset id already hexlified
    await walletLocked.transfer(destination, amount, assetId, txParam);

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
    await walletLocked.transfer(destination, amount);

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

    const fee = {
      amount,
      assetId,
    };

    const calculateFee = jest.fn(() => fee);
    const addMessageOutputs = jest.fn();
    const addResources = jest.fn();

    const request = {
      calculateFee,
      addMessageOutputs,
      addResources,
    } as unknown as ScriptTransactionRequest;

    const resources: Resource[] = [];

    const transactionResponse = {} as unknown as TransactionResponse;

    const scriptTransactionRequest = jest
      .spyOn(transactionReqMod, 'ScriptTransactionRequest')
      .mockImplementation(() => request);

    const getResourcesToSpend = jest
      .spyOn(BaseWalletLocked.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(BaseWalletLocked.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';
    const walletLocked = Wallet.fromAddress(address);

    let result = await walletLocked.withdrawToBaseLayer(recipient, amount, txParams);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest.mock.calls.length).toBe(1);

    expect(calculateFee.mock.calls.length).toBe(1);

    expect(addMessageOutputs.mock.calls.length).toBe(1);

    expect(addResources.mock.calls.length).toBe(1);
    expect(addResources.mock.calls[0][0]).toEqual(resources);

    expect(getResourcesToSpend.mock.calls.length).toBe(1);
    expect(getResourcesToSpend.mock.calls[0][0]).toEqual([fee]);

    expect(sendTransaction.mock.calls.length).toBe(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(request);

    // without txParams
    result = await walletLocked.withdrawToBaseLayer(recipient, amount);

    expect(result).toEqual(transactionResponse);

    expect(scriptTransactionRequest.mock.calls.length).toBe(2);

    expect(calculateFee.mock.calls.length).toBe(2);

    expect(addMessageOutputs.mock.calls.length).toBe(2);

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
      .spyOn(transactionReqMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const addMissingVariables = jest
      .spyOn(providersMod.Provider.prototype, 'addMissingVariables')
      .mockImplementation(() => Promise.resolve());

    const sendTransaction = jest
      .spyOn(providersMod.Provider.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(transactionResponse));

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';
    const walletLocked = Wallet.fromAddress(address);

    const result = await walletLocked.sendTransaction(transactionRequestLike);

    expect(result).toEqual(transactionResponse);

    expect(transactionRequestify.mock.calls.length).toEqual(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(addMissingVariables.mock.calls.length).toEqual(1);
    expect(addMissingVariables.mock.calls[0][0]).toEqual(transactionRequest);

    expect(sendTransaction.mock.calls.length).toEqual(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute simulateTransaction just fine', async () => {
    const transactionRequestLike = 'transactionRequestLike' as unknown as TransactionRequest;
    const transactionRequest = 'transactionRequest' as unknown as TransactionRequest;
    const callResult = 'callResult' as unknown as CallResult;

    const transactionRequestify = jest
      .spyOn(transactionReqMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const addMissingVariables = jest
      .spyOn(providersMod.Provider.prototype, 'addMissingVariables')
      .mockImplementation(() => Promise.resolve());

    const simulate = jest
      .spyOn(providersMod.Provider.prototype, 'simulate')
      .mockImplementation(() => Promise.resolve(callResult));

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';
    const walletLocked = Wallet.fromAddress(address);

    const result = await walletLocked.simulateTransaction(transactionRequestLike);

    expect(result).toEqual(callResult);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(addMissingVariables.mock.calls.length).toBe(1);
    expect(addMissingVariables.mock.calls[0][0]).toEqual(transactionRequest);

    expect(simulate.mock.calls.length).toBe(1);
    expect(simulate.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute buildPrecidateTransaction just fine', async () => {
    const predicateAddress = 'predicateAddress' as unknown as AbstractAddress;
    const amountToPredicate = 'amountToPredicate' as unknown as BigNumberish;
    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const predicateOptions = { fundTransaction: false };
    const resources: Resource[] = [];

    const amount = bn(1);

    const fee = {
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

    jest
      .spyOn(BaseWalletLocked.prototype, 'getResourcesToSpend')
      .mockImplementation(async () => resources);

    const scriptTransactionRequest = jest
      .spyOn(transactionReqMod, 'ScriptTransactionRequest')
      .mockImplementation(() => request);

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';
    const walletLocked = Wallet.fromAddress(address);

    let response = await walletLocked.buildPredicateTransaction(
      predicateAddress,
      amountToPredicate,
      assetId
    );

    expect(response).toEqual(request);

    expect(scriptTransactionRequest.mock.calls.length).toBe(1);
    expect(scriptTransactionRequest.mock.calls[0][0]).toEqual({
      gasLimit: MAX_GAS_PER_TX,
      fundTransaction: true,
    });

    expect(addCoinOutput.mock.calls.length).toBe(1);
    expect(calculateFee.mock.calls.length).toBe(1);

    expect(addResources.mock.calls.length).toBe(1);
    expect(addResources.mock.calls[0][0]).toEqual(resources);

    // with predicate options fundTransaction = false and no assetId
    response = await walletLocked.buildPredicateTransaction(
      predicateAddress,
      amountToPredicate,
      undefined,
      predicateOptions
    );

    expect(response).toEqual(request);

    expect(scriptTransactionRequest.mock.calls.length).toBe(2);
    expect(scriptTransactionRequest.mock.calls[1][0]).toEqual({
      gasLimit: MAX_GAS_PER_TX,
      fundTransaction: false,
    });

    expect(addCoinOutput.mock.calls.length).toBe(2);
    expect(calculateFee.mock.calls.length).toBe(1);
    expect(addResources.mock.calls.length).toBe(1);
  });

  it('should execute submitPredicate just as fine', async () => {
    const transactionResult = 'result';
    const request = 'request' as unknown as ScriptTransactionRequest;
    const waitForResult = jest.fn(() => Promise.resolve(transactionResult));
    const response = { waitForResult } as unknown as TransactionResponse;

    const buildPredicateTransaction = jest
      .spyOn(BaseWalletLocked.prototype, 'buildPredicateTransaction')
      .mockImplementation(() => Promise.resolve(request));

    const sendTransaction = jest
      .spyOn(BaseWalletLocked.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve(response));

    const predicateAddress = Address.fromAddressOrString(
      '0x0101010101010101010101010101010101010101'
    );

    const amountToPredicate = 'amountToPredicate' as unknown as BigNumberish;
    const assetId = 'assetId' as unknown as BytesLike;
    const options = 'options' as unknown as BuildPredicateOptions;

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';

    const walletLocked = Wallet.fromAddress(address);

    let result = await walletLocked.submitPredicate(
      predicateAddress,
      amountToPredicate,
      assetId,
      options
    );

    expect(result).toEqual(transactionResult);

    expect(buildPredicateTransaction.mock.calls.length).toBe(1);
    expect(buildPredicateTransaction.mock.calls[0]).toEqual([
      predicateAddress,
      amountToPredicate,
      assetId,
      options,
    ]);

    expect(sendTransaction.mock.calls.length).toBe(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(request);

    expect(waitForResult.mock.calls.length).toBe(1);

    result = await walletLocked.submitPredicate(
      predicateAddress,
      amountToPredicate,
      undefined,
      options
    );

    expect(result).toEqual(transactionResult);

    expect(buildPredicateTransaction.mock.calls.length).toBe(2);
    expect(buildPredicateTransaction.mock.calls[1]).toEqual([
      predicateAddress,
      amountToPredicate,
      NativeAssetId,
      options,
    ]);

    expect(sendTransaction.mock.calls.length).toBe(2);
    expect(sendTransaction.mock.calls[1][0]).toEqual(request);

    expect(waitForResult.mock.calls.length).toBe(2);
  });

  it('should execute submitSpendPredicate just as fine', async () => {
    const transactionResult = 'result' as unknown as TransactionResult<'success'>;

    const submitSpendPredicate = jest
      .spyOn(providersMod.Provider.prototype, 'submitSpendPredicate')
      .mockImplementation(() => Promise.resolve(transactionResult));

    const predicate = 'predicate' as unknown as AbstractPredicate;
    const amountToSpend = 'amountToSpend' as unknown as BigNumberish;
    const predicateData = 'predicateData' as unknown as InputValue[];
    const assetId = 'assetId' as unknown as BytesLike;
    const options = 'options' as unknown as BuildPredicateOptions;

    const address = '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db';

    const walletLocked = Wallet.fromAddress(address);

    let result = await walletLocked.submitSpendPredicate(
      predicate,
      amountToSpend,
      predicateData,
      assetId,
      options
    );

    expect(result).toEqual(transactionResult);

    expect(submitSpendPredicate.mock.calls.length).toBe(1);
    expect(submitSpendPredicate.mock.calls[0]).toEqual([
      predicate,
      amountToSpend,
      addressify(walletLocked.address),
      predicateData,
      assetId,
      options,
    ]);

    // not informing assetId
    result = await walletLocked.submitSpendPredicate(
      predicate,
      amountToSpend,
      predicateData,
      undefined,
      options
    );

    expect(result).toEqual(transactionResult);

    expect(submitSpendPredicate.mock.calls.length).toBe(2);
    expect(submitSpendPredicate.mock.calls[1]).toEqual([
      predicate,
      amountToSpend,
      addressify(walletLocked.address),
      predicateData,
      NativeAssetId,
      options,
    ]);
  });
});
