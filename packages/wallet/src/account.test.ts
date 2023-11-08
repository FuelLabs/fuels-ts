import { Address, getRandomB256 } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
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
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import { randomBytes } from 'crypto';

import { Account } from './account';
import { FUEL_NETWORK_URL } from './configs';
import { launchCustomProviderAndGetWallets } from './test-utils';

vi.mock('@fuel-ts/providers', async () => {
  const mod = await vi.importActual('@fuel-ts/providers');
  return {
    __esModule: true,
    // @ts-expect-error spreading module import
    ...mod,
  };
});

let provider: Provider;

afterEach(() => {
  vi.restoreAllMocks();
});

beforeAll(async () => {
  const { provider: p, cleanup } = await setupTestProvider(undefined, false);
  provider = p;
  return () => cleanup();
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
    await using launched = await launchCustomProviderAndGetWallets();
    const {
      wallets: [wallet],
    } = launched;
    const publicKey = wallet.publicKey;

    // #region Message-getResourcesToSpend
    const account = new Account(publicKey, provider);
    const resourcesToSpend = await account.getResourcesToSpend([
      {
        amount: bn(2),
        assetId: BaseAssetId,
      },
    ]);
    // #endregion Message-getResourcesToSpend

    expect(resourcesToSpend[0].amount.gt(2)).toBeTruthy();
  });

  it('should get messages just fine', async () => {
    const accountAddress = getRandomB256();
    await using launched = await launchCustomProviderAndGetWallets({
      nodeOptions: {
        chainConfig: {
          initial_state: {
            messages: [
              {
                sender: getRandomB256(),
                recipient: accountAddress,
                nonce: '0x0101010101010101010101010101010101010101010101010101010101010101',
                amount: bn('ffff', 'hex').toHex(),
                data: '',
                da_height: '0x00',
              },
            ],
          },
        },
      },
    });

    const account = new Account(accountAddress, provider);
    const messages = await account.getMessages();
    expect(messages.length).toEqual(1);
  });

  it('should throw if messages length is higher than 9999', async () => {
    const dummyMessages: Message[] = new Array(10000);

    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );

    vi.spyOn(provider, 'getMessages').mockImplementation(() => Promise.resolve(dummyMessages));

    const { error } = await safeExec(async () => {
      await account.getMessages();
    });

    expect(error?.message).toEqual(
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
    await using newProvider = await setupTestProvider();
    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    expect(account.provider).not.toBe(newProvider);

    account.connect(newProvider);

    expect(account.provider).toBe(newProvider);
    expect(account.provider).not.toBe(provider);
  });

  it('should execute fund just as fine', async () => {
    const fee = {
      amount: bn(1),
      assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
    };

    const resources: Resource[] = [];

    const calculateFee = vi.fn(() => fee);
    const addResources = vi.fn();

    const request = {
      calculateFee,
      addResources,
    } as unknown as TransactionRequest;

    const getResourcesToSpendSpy = vi
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

    const calculateFee = vi.fn(() => fee);
    const addCoinOutput = vi.fn();
    const addResources = vi.fn();

    const request = {
      calculateFee,
      addCoinOutput,
      addResources,
    } as unknown as ScriptTransactionRequest;

    const resources: Resource[] = [];

    const getResourcesToSpend = vi
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = vi
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation(() => Promise.resolve({} as unknown as TransactionResponse));

    vi.spyOn(providersMod, 'ScriptTransactionRequest').mockImplementation(() => request);

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
    await account.transfer(destination, amount, BaseAssetId, txParam);

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

    const calculateFee = vi.fn(() => fee);
    const addResources = vi.fn();

    const request = {
      calculateFee,
      addResources,
    } as unknown as ScriptTransactionRequest;

    const resources: Resource[] = [];

    const transactionResponse = {} as unknown as TransactionResponse;

    const scriptTransactionRequest = vi
      .spyOn(providersMod, 'ScriptTransactionRequest')
      .mockImplementation(() => request);

    const getResourcesToSpend = vi
      .spyOn(Account.prototype, 'getResourcesToSpend')
      .mockImplementation(() => Promise.resolve(resources));

    const sendTransaction = vi
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

    const transactionRequestify = vi
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

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

    expect(estimateTxDependencies.mock.calls.length).toEqual(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(sendTransaction.mock.calls.length).toEqual(1);
    expect(sendTransaction.mock.calls[0][0]).toEqual(transactionRequest);
  });

  it('should execute simulateTransaction just fine', async () => {
    const transactionRequestLike = 'transactionRequestLike' as unknown as TransactionRequest;
    const transactionRequest = 'transactionRequest' as unknown as TransactionRequest;
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

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionRequest);

    expect(simulate.mock.calls.length).toBe(1);
    expect(simulate.mock.calls[0][0]).toEqual(transactionRequest);
  });
});
