import { Address } from '@fuel-ts/address';
import type { ContractIdLike } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import type {
  CallResult,
  Coin,
  CoinQuantity,
  Message,
  Resource,
  TransactionRequestLike,
  TransactionResultReceipt,
} from '@fuel-ts/providers';
import {
  TransactionResponse,
  ScriptTransactionRequest,
  Provider,
  CreateTransactionRequest,
} from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';

import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';
import { Wallet } from './wallet';

jest.mock('@fuel-ts/providers', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/providers'),
}));

let provider: Provider;

afterEach(jest.restoreAllMocks);

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
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

    const getCoins = async () => Promise.resolve(dummyCoins);

    jest.spyOn(providersMod.Provider.prototype, 'getCoins').mockImplementation(getCoins);

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

  it('should get messages just fine', async () => {
    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );
    const messages = await account.getMessages();
    expect(messages.length).toEqual(1);
  });

  it('should throw if messages length is higher than 9999', async () => {
    // mocking
    const messages: Message[] = new Array(10000);
    const mockedGetMessages = async () => Promise.resolve(messages);
    jest
      .spyOn(providersMod.Provider.prototype, 'getMessages')
      .mockImplementationOnce(mockedGetMessages);

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
    const dummyBalace: CoinQuantity[] = new Array(10000);

    const mockedGetBalances = async () => Promise.resolve(dummyBalace);

    jest
      .spyOn(providersMod.Provider.prototype, 'getBalances')
      .mockImplementation(mockedGetBalances);

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

  it('should execute fund just as fine', async () => {
    const fee = {
      amount: bn(1),
      assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
    };

    const resources: Resource[] = [];

    const calculateFee = jest.fn(() => fee);
    const addResources = jest.fn();

    const transactionRequest = new ScriptTransactionRequest();
    transactionRequest.calculateFee = calculateFee;
    transactionRequest.addResources = addResources;

    const getResourcesToSpendSpy = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementationOnce(() => Promise.resolve([]));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    await account.fund(transactionRequest);

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
    const transactionRequest = new ScriptTransactionRequest();
    transactionRequest.calculateFee = calculateFee;
    transactionRequest.addCoinOutput = addCoinOutput;
    transactionRequest.addResources = addResources;

    const resources: Resource[] = [];

    const getResourcesToSpend = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(async () => Promise.resolve({} as unknown as TransactionResponse));

    jest
      .spyOn(providersMod, 'ScriptTransactionRequest')
      .mockImplementation(() => transactionRequest);

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
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);

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
    expect(sendTransaction.mock.calls[1][0]).toEqual(transactionRequest);
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

    const transactionRequest = new ScriptTransactionRequest();
    transactionRequest.calculateFee = calculateFee;
    transactionRequest.addResources = addResources;

    const resources: Resource[] = [];

    const transactionResponse = new TransactionResponse('', provider);

    const scriptTransactionRequest = jest
      .spyOn(providersMod, 'ScriptTransactionRequest')
      .mockImplementation(() => transactionRequest);

    const getResourcesToSpend = jest
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(async () => Promise.resolve(resources));

    const sendTransaction = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(async () => Promise.resolve(transactionResponse));

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
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);

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
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute sendTransaction just fine', async () => {
    const transactionRequest = new ScriptTransactionRequest();
    const transactionResponse = new TransactionResponse('', provider);

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const sendTransaction = jest
      .spyOn(providersMod.Provider.prototype, 'sendTransaction')
      .mockImplementation(async () => Promise.resolve(transactionResponse));

    const estimateTxDependencies = jest
      .spyOn(Account.prototype, 'estimateTxDependencies')
      .mockImplementation(async () => Promise.resolve());

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const result = await account.sendTransaction(transactionRequest);

    expect(result).toEqual(transactionResponse);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(transactionRequestify.mock.calls.length).toEqual(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequest);

    expect(sendTransaction.mock.calls.length).toEqual(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute simulateTransaction just fine', async () => {
    const transactionRequest = new ScriptTransactionRequest();
    const callResult: CallResult = {
      receipts: [],
    };

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const estimateTxDependencies = jest
      .spyOn(Account.prototype, 'estimateTxDependencies')
      .mockImplementation(async () => Promise.resolve());

    const simulate = jest
      .spyOn(providersMod.Provider.prototype, 'simulate')
      .mockImplementation(() => Promise.resolve(callResult));

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const result = await account.simulateTransaction(transactionRequest);

    expect(result).toEqual(callResult);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequest);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(simulate.mock.calls.length).toBe(1);
    expect(simulate.mock.calls[0][0]).toEqual(transactionRequest);
  });

  describe('estimateTxDependencies', () => {
    const mockDeps = (params: {
      hasPredicateInputReturns: boolean;
      receipts?: TransactionResultReceipt[];
      getReceiptsWithMissingDataReturns?: {
        missingOutputContractIds: string[];
        missingOutputVariables: number;
      };
    }) => {
      const {
        hasPredicateInputReturns,
        receipts = [],
        getReceiptsWithMissingDataReturns: { missingOutputContractIds, missingOutputVariables } = {
          missingOutputContractIds: [],
          missingOutputVariables: 0,
        },
      } = params;
      const transactionRequest = new ScriptTransactionRequest();

      const hasPredicateInput = jest.fn(() => hasPredicateInputReturns);
      const addVariableOutputs = jest.fn((number: number) => number);
      const addContractInputAndOutput = jest.fn((_: ContractIdLike) => transactionRequest);

      transactionRequest.hasPredicateInput = hasPredicateInput;
      transactionRequest.addVariableOutputs = addVariableOutputs;
      transactionRequest.addContractInputAndOutput = addContractInputAndOutput;

      const callResult: CallResult = {
        receipts,
      };

      const call = jest
        .spyOn(Provider.prototype, 'call')
        .mockImplementation(async () => Promise.resolve(callResult));

      const getReceiptsWithMissingData = jest
        .spyOn(providersMod, 'getReceiptsWithMissingData')
        .mockImplementationOnce(() => ({
          missingOutputContractIds,
          missingOutputVariables,
        }))
        .mockImplementation(() => ({
          missingOutputContractIds: [],
          missingOutputVariables: 0,
        }));

      const estimatePredicates = jest
        .spyOn(Provider.prototype, 'estimatePredicates')
        .mockImplementation(async () => Promise.resolve(transactionRequest));

      return {
        call,
        hasPredicateInput,
        addVariableOutputs,
        estimatePredicates,
        transactionRequest,
        addContractInputAndOutput,
        getReceiptsWithMissingData,
      };
    };

    it('should ensure estimateTxDependencies will estimate predicate gas used', async () => {
      const {
        call,
        estimatePredicates,
        transactionRequest,
        addVariableOutputs,
        hasPredicateInput,
        addContractInputAndOutput,
        getReceiptsWithMissingData,
      } = mockDeps({
        hasPredicateInputReturns: true,
      });

      const account = Wallet.generate({ provider });

      await account.estimateTxDependencies(transactionRequest);

      expect(hasPredicateInput).toBeCalledTimes(1);

      expect(estimatePredicates).toBeCalledTimes(1);
      expect(estimatePredicates).toBeCalledWith(transactionRequest);

      expect(call).toBeCalledTimes(1);
      expect(call).toBeCalledWith(transactionRequest, {
        utxoValidation: false,
      });

      expect(getReceiptsWithMissingData).toBeCalledTimes(1);
      expect(getReceiptsWithMissingData).toBeCalledWith([]);

      expect(addVariableOutputs).not.toBeCalled();
      expect(addContractInputAndOutput).not.toBeCalled();
    });

    it('should ensure estimateTxDependencies will add missing variable outputs', async () => {
      const missingOutputVariables = 2;
      const {
        call,
        estimatePredicates,
        transactionRequest,
        addVariableOutputs,
        hasPredicateInput,
        addContractInputAndOutput,
        getReceiptsWithMissingData,
      } = mockDeps({
        hasPredicateInputReturns: true,
        getReceiptsWithMissingDataReturns: {
          missingOutputContractIds: [],
          missingOutputVariables,
        },
      });

      const account = Wallet.generate({ provider });

      await account.estimateTxDependencies(transactionRequest);

      expect(hasPredicateInput).toBeCalledTimes(1);

      expect(estimatePredicates).toBeCalledTimes(1);
      expect(estimatePredicates).toBeCalledWith(transactionRequest);

      expect(call).toBeCalledTimes(2);
      expect(call).toBeCalledWith(transactionRequest, {
        utxoValidation: false,
      });

      expect(getReceiptsWithMissingData).toBeCalledTimes(2);
      expect(getReceiptsWithMissingData).toBeCalledWith([]);

      expect(addVariableOutputs).toBeCalledTimes(1);
      expect(addVariableOutputs).toBeCalledWith(missingOutputVariables);

      expect(addContractInputAndOutput).not.toBeCalled();
    });

    it('should ensure estimateTxDependencies will add missing contracts', async () => {
      const missingOutputContractIds: string[] = [
        Address.fromRandom().toString(),
        Address.fromRandom().toString(),
      ];
      const {
        call,
        estimatePredicates,
        transactionRequest,
        addVariableOutputs,
        hasPredicateInput,
        addContractInputAndOutput,
        getReceiptsWithMissingData,
      } = mockDeps({
        hasPredicateInputReturns: true,
        receipts: [],
        getReceiptsWithMissingDataReturns: {
          missingOutputContractIds,
          missingOutputVariables: 0,
        },
      });

      const account = Wallet.generate({ provider });

      await account.estimateTxDependencies(transactionRequest);

      expect(hasPredicateInput).toBeCalledTimes(1);

      expect(estimatePredicates).toBeCalledTimes(1);
      expect(estimatePredicates).toBeCalledWith(transactionRequest);

      expect(call).toBeCalledTimes(2);
      expect(call).toBeCalledWith(transactionRequest, {
        utxoValidation: false,
      });

      expect(getReceiptsWithMissingData).toBeCalledTimes(2);
      expect(getReceiptsWithMissingData).toBeCalledWith([]);

      expect(addVariableOutputs).toBeCalledTimes(1);
      expect(addVariableOutputs).toBeCalledWith(0);

      expect(addContractInputAndOutput).toBeCalledTimes(missingOutputContractIds.length);
      expect(addContractInputAndOutput).toHaveBeenCalledWith(
        Address.fromString(missingOutputContractIds[0])
      );
      expect(addContractInputAndOutput).toHaveBeenCalledWith(
        Address.fromString(missingOutputContractIds[1])
      );
    });

    it('should ensure estimateTxDependencies will return for CreateTransactionRequest', async () => {
      const transactionRequest = new CreateTransactionRequest();
      const callResult: CallResult = {
        receipts: [],
      };

      const hasPredicateInput = jest.spyOn(transactionRequest, 'hasPredicateInput');
      const call = jest
        .spyOn(Provider.prototype, 'call')
        .mockImplementation(async () => Promise.resolve(callResult));

      const account = Wallet.generate({ provider });

      await account.estimateTxDependencies(transactionRequest);

      expect(call).not.toBeCalled();
      expect(hasPredicateInput).not.toBeCalled();
    });
  });
});
