/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { PolicyType } from '@fuel-ts/transactions';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import type { FakeResources, TransferParams } from './account';
import { Account } from './account';
import type { CoinQuantity, Resource } from './providers';
import { ScriptTransactionRequest, Provider } from './providers';
import * as providersMod from './providers';
import { TestAssetId, setupTestProviderAndWallets } from './test-utils';
import { Wallet } from './wallet';

/**
 * @group node
 */
describe('Account', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function setupTestProvider(providerOptions = {}) {
    const { provider, cleanup } = await setupTestProviderAndWallets({
      providerOptions,
      nodeOptions: {
        snapshotConfig: {
          stateConfig: {
            coins: [
              {
                tx_id: '0x0000000000000000000000000000000000000000000000000000000000000002',
                output_index: 0,
                tx_pointer_block_height: 0,
                tx_pointer_tx_idx: 0,
                owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
                amount: bn('0xFFFFFFFFFFFFFFFF', 'hex'),
                asset_id: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
              },
              {
                tx_id: '0x0000000000000000000000000000000000000000000000000000000000000003',
                output_index: 0,
                tx_pointer_block_height: 0,
                tx_pointer_tx_idx: 0,
                owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
                amount: bn('0xFFFFFFFFFFFFFFFF', 'hex'),
                asset_id: '0x0101010101010101010101010101010101010101010101010101010101010101',
              },
              {
                tx_id: '0x0000000000000000000000000000000000000000000000000000000000000004',
                output_index: 0,
                tx_pointer_block_height: 0,
                tx_pointer_tx_idx: 0,
                owner: '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
                amount: bn('0xFFFFFFFFFFFFFFFF', 'hex'),
                asset_id: '0x0202020202020202020202020202020202020202020202020202020202020202',
              },
            ],
            messages: [
              {
                sender: '0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f',
                recipient: '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
                nonce: '0101010101010101010101010101010101010101010101010101010101010101',
                amount: bn('0xFFFFFFFFFFFFFFFF', 'hex'),
                data: '',
                da_height: 0,
              },
              {
                sender: '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
                recipient: '0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f',
                nonce: '0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b',
                amount: bn('0xB04F3C08F59B309E', 'hex'),
                data: '',
                da_height: 0,
              },
            ],
          },
        },
      },
    });

    return Object.assign(provider, { [Symbol.dispose]: cleanup });
  }

  it('should create account using an address, with a provider', async () => {
    using provider = await setupTestProvider();

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
    using provider = await setupTestProvider();

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const { coins } = await account.getCoins();
    const assetA = coins.find((c) => c.assetId === ASSET_A);
    expect(assetA?.amount.gt(1)).toBeTruthy();
    const assetB = coins.find((c) => c.assetId === ASSET_B);
    expect(assetB?.amount.gt(1)).toBeTruthy();
    const assetC = coins.find((c) => c.assetId === provider.getBaseAssetId());
    expect(assetC?.amount.gt(1)).toBeTruthy();
  });

  it('should execute getResourcesToSpend just fine', async () => {
    using provider = await setupTestProvider();

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
  });

  it('getResourcesToSpend should work with <1 amount', async () => {
    using provider = await setupTestProvider();

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
    using provider = await setupTestProvider();

    const account = new Account(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba',
      provider
    );
    const { messages, pageInfo } = await account.getMessages();

    expect(pageInfo.hasNextPage).toBeFalsy();
    expect(pageInfo.hasPreviousPage).toBeFalsy();

    expect(messages.length).toEqual(1);
  });

  it('should get single asset balance just fine', async () => {
    using provider = await setupTestProvider();

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const balanceA = await account.getBalance(); // native asset
    const balanceB = await account.getBalance(ASSET_B);
    expect(balanceA.gte(1)).toBeTruthy();
    expect(balanceB.gte(1)).toBeTruthy();
  });

  it('should get multiple balances just fine', async () => {
    using provider = await setupTestProvider();

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );
    const { balances } = await account.getBalances();
    expect(balances.length).toBeGreaterThanOrEqual(1);
  });

  it('should connect with provider just fine [INSTANCE]', async () => {
    using provider = await setupTestProvider();

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    using newProvider = await setupTestProviderAndWallets();

    const { provider: newProviderInstance } = newProvider;

    expect(account.provider).not.toBe(newProviderInstance);

    account.connect(newProviderInstance);

    expect(account.provider).toBe(newProviderInstance);
    expect(account.provider).not.toBe(provider);
  });

  it('should be able to set a provider', async () => {
    using provider = await setupTestProvider();

    const account = new Account(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db',
      provider
    );

    const newProviderInstance = await Provider.create(provider.url);

    expect(account.provider).not.toBe(newProviderInstance);

    account.provider = newProviderInstance;

    expect(account.provider).toBe(newProviderInstance);
    expect(account.provider).not.toBe(provider);
  });

  it('should execute fund just as fine', async () => {
    using provider = await setupTestProvider();

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
      gasPrice: bn(1),
    });

    expect(addAmountToCoinQuantitiesSpy).toBeCalledTimes(1);
    expect(addAmountToCoinQuantitiesSpy).toHaveBeenCalledWith({
      amount: bn(fee),
      assetId: provider.getBaseAssetId(),
      coinQuantities: quantities,
    });

    const expectedTotalResources = [
      { amount: bn(quantities[0].amount), assetId: quantities[0].assetId },
      { amount: bn(fee), assetId: provider.getBaseAssetId() },
    ];
    expect(getResourcesToSpendSpy).toHaveBeenCalled();
    expect(getResourcesToSpendSpy).toBeCalledWith(expectedTotalResources, {
      messages: [],
      utxos: [],
    });

    expect(addResourcesSpy).toHaveBeenCalled();
    expect(addResourcesSpy).toHaveBeenCalledWith(resourcesToSpend);
  });

  it('should execute sendTransaction just fine', async () => {
    using provider = await setupTestProvider();

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
    using provider = await setupTestProvider();

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
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: 500_000,
        assets: [TestAssetId.A],
      },
    });
    const {
      provider,
      wallets: [sender],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const response = await sender.transfer(receiver.address, 1, TestAssetId.A.value, {
      gasLimit: 10_000,
    });
    const { isStatusSuccess } = await response.wait();

    const { balances: receiverBalances } = await receiver.getBalances();

    expect(isStatusSuccess).toBeTruthy();
    expect(receiverBalances).toEqual([{ assetId: TestAssetId.A.value, amount: bn(1) }]);
  });

  it('can transfer to multiple destinations', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
    });
    const {
      wallets: [sender],
      provider,
    } = launched;

    const amounts = [100, 200, 300, 400];

    const receivers = [
      Wallet.generate({ provider }),
      Wallet.generate({ provider }),
      Wallet.generate({ provider }),
    ];

    const transferConfig: TransferParams[] = [
      { amount: amounts[0], destination: receivers[0].address, assetId: provider.getBaseAssetId() },
      { amount: amounts[1], destination: receivers[1].address, assetId: ASSET_A },
      { amount: amounts[2], destination: receivers[2].address, assetId: ASSET_B },
      { amount: amounts[3], destination: receivers[2].address, assetId: ASSET_A },
    ];

    const response1 = await sender.batchTransfer(transferConfig);
    const { isStatusSuccess } = await response1.waitForResult();
    expect(isStatusSuccess).toBeTruthy();

    const expectedBalances = [
      { receiver: receivers[0], assetId: provider.getBaseAssetId(), expectedBalance: amounts[0] },
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

  it('can create transfer request just fine', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: 500_000,
      },
    });
    const {
      wallets: [sender],
      provider,
    } = launched;

    const receiver = Wallet.generate({ provider });

    const request = await sender.createTransfer(
      receiver.address.toB256(),
      1,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );

    const response = await sender.sendTransaction(request);
    const { isStatusSuccess } = await response.wait();

    const { balances: receiverBalances } = await receiver.getBalances();

    expect(isStatusSuccess).toBeTruthy();
    expect(receiverBalances).toEqual([{ assetId: provider.getBaseAssetId(), amount: bn(1) }]);
  });

  it('can set "gasLimit" and "maxFee" when transferring amounts', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender],
      provider,
    } = launched;

    const receiver = Address.fromRandom();

    const gasLimit = 30_000;
    const maxFee = 60_000;

    const request = await sender.createTransfer(receiver, 1, provider.getBaseAssetId(), {
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
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender],
      provider,
    } = launched;

    const receiver = Wallet.generate({ provider });

    const tx = await sender.transfer(receiver.address, 1, provider.getBaseAssetId(), {
      gasLimit: 1000,
      tip: 10,
      witnessLimit: 10000,
    });

    const response = await tx.wait();
    const { balances: receiverBalances } = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: provider.getBaseAssetId(), amount: bn(1) }]);
    expect(response.isStatusSuccess).toBeTruthy();
  });

  it('can exclude IDs when getResourcesToSpend is called', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 500_000,
      },
    });
    const {
      wallets: [user],
    } = launched;

    const { coins } = await user.getCoins();

    const assetAUTXO = coins.find((coin) => coin.assetId === ASSET_A);

    if (!assetAUTXO) {
      throw new Error('Asset A UTXO not found');
    }

    // Test excludes the UTXO where the assetIdA gets added to the senders wallet
    await expectToThrowFuelError(
      () => user.getResourcesToSpend([[1, ASSET_A, 500_000]], { utxos: [assetAUTXO.id] }),
      new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `The account(s) sending the transaction don't have enough funds to cover the transaction.`
      )
    );
  });

  it('can transfer multiple types of coins to multiple destinations', async () => {
    const assetIdA = ASSET_A;
    const assetIdB = ASSET_B;
    const amount = 1;

    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        count: 3,
      },
    });
    const {
      wallets: [sender, receiverA, receiverB],
    } = launched;

    const request = new ScriptTransactionRequest();

    request.addCoinOutputs(receiverA.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);
    request.addCoinOutputs(receiverB.address, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);

    await request.autoCost(sender);

    const response = await sender.sendTransaction(request);

    await response.wait();

    const { coins: receiverACoins } = await receiverA.getCoins();
    expect(receiverACoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount: bn(amount) }),
        expect.objectContaining({ assetId: assetIdB, amount: bn(amount) }),
      ])
    );

    const { coins: receiverBCoins } = await receiverB.getCoins();
    expect(receiverBCoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount: bn(amount) }),
        expect.objectContaining({ assetId: assetIdB, amount: bn(amount) }),
      ])
    );
  });

  it('can withdraw an amount of base asset', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        count: 1,
        amountPerCoin: 500_000,
      },
    });
    const {
      wallets: [sender],
      provider,
    } = launched;

    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 10;

    const tx = await sender.withdrawToBaseLayer(recipient, 10);
    const result = await tx.waitForResult();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];

    // The sender is the TX ID on the spec it says it should be the sender address
    // but is not returning the sender address instead is returning the tx id
    expect(result.isStatusSuccess).toBeTruthy();
    expect(result.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());
  });

  it('can retrieve a valid MessageProof', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender],
      provider,
    } = launched;

    const RECIPIENT_ID = '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263';
    const AMOUNT = 10;
    const recipient = Address.fromB256(RECIPIENT_ID);

    const tx = await sender.withdrawToBaseLayer(recipient.toB256(), AMOUNT);
    // #region Message-getMessageProof
    const result = await tx.waitForResult();

    // Wait for the next block to be minter on out case we are using a local provider
    // so we can create a new tx to generate next block
    const resp = await sender.transfer(recipient, AMOUNT, provider.getBaseAssetId(), {
      gasLimit: 10_000,
    });
    const nextBlock = await resp.waitForResult();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];
    const messageProof = await provider.getMessageProof(
      result.id,
      messageOutReceipt.nonce,
      nextBlock.blockId
    );
    // #endregion Message-getMessageProof

    expect(messageProof?.amount.toNumber()).toEqual(AMOUNT);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });

  it('can transfer amount using multiple utxos', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [fundingWallet],
      provider,
    } = launched;

    // create two fresh wallets
    const sender = Wallet.generate({ provider });
    const receiver = Wallet.generate({ provider });

    // Create transaction
    const request = new ScriptTransactionRequest();

    // seed wallet with 3 distinct utxos
    const amount = bn(1_500_000);
    for (let i = 0; i < 3; i++) {
      request.addCoinOutput(sender.address, amount.div(3), provider.getBaseAssetId());
    }

    await request.autoCost(fundingWallet);

    const tx1 = await fundingWallet.sendTransaction(request);
    await tx1.waitForResult();

    const transfer = await sender.transfer(receiver.address, 110, provider.getBaseAssetId(), {
      gasLimit: 10_000,
    });
    await transfer.wait();

    const { balances: receiverBalances } = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: provider.getBaseAssetId(), amount: bn(110) }]);
  });

  it('can generate and use fake coins', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender],
      provider,
    } = launched;

    const amount1 = bn(100_000);
    const amount2 = bn(200_000);
    const amount3 = bn(300_000);
    const amountToTransferBaseAsset = bn(1000);

    const fakeCoinsConfig: FakeResources[] = [
      { amount: amount1, assetId: provider.getBaseAssetId() },
      { amount: amount2, assetId: ASSET_A },
      { amount: amount3, assetId: ASSET_B },
    ];

    const fakeCoins = sender.generateFakeResources(fakeCoinsConfig);
    const request = new ScriptTransactionRequest({
      gasLimit: bn(60_000),
      maxFee: bn(62_000),
    });

    request.addResources(fakeCoins);
    request.addCoinOutput(
      Address.fromRandom(),
      amountToTransferBaseAsset,
      provider.getBaseAssetId()
    );
    request.addCoinOutput(Address.fromRandom(), amount2, ASSET_A);
    request.addCoinOutput(Address.fromRandom(), amount3, ASSET_B);

    const { dryRunStatus } = await provider.dryRun(request, {
      utxoValidation: false,
      estimateTxDependencies: false,
    });

    expect(dryRunStatus?.type).toBe('DryRunSuccessStatus');
  });

  it('can withdraw an amount of base asset using multiple utxos', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [fundingWallet],
      provider,
    } = launched;

    // fresh sender wallet
    const sender = Wallet.generate({ provider });
    // seed wallet with 3 distinct utxos
    const request = new ScriptTransactionRequest();

    const fundingAmount = bn(1_500_000);
    for (let i = 0; i < 3; i++) {
      request.addCoinOutput(sender.address, fundingAmount.div(3), provider.getBaseAssetId());
    }

    await request.autoCost(fundingWallet);

    const tx1 = await fundingWallet.sendTransaction(request);
    await tx1.waitForResult();

    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 110;
    const tx = await sender.withdrawToBaseLayer(recipient, amount);
    const result = await tx.wait();

    const messageOutReceipt = <providersMod.TransactionResultMessageOutReceipt>result.receipts[0];
    expect(result.isStatusSuccess).toBeTruthy();
    expect(result.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());
  });

  it('can set "gasLimit" and "maxFee" when withdrawing to base layer', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender],
    } = launched;

    const recipient = Address.fromRandom();
    const amount = 110;

    const gasLimit = 100_000;
    const maxFee = 80_000;

    const tx = await sender.withdrawToBaseLayer(recipient, amount, { gasLimit, maxFee });
    const { transaction } = await tx.wait();

    const { scriptGasLimit, policies } = transaction;
    const maxFeePolicy = policies?.find((policy) => policy.type === PolicyType.MaxFee);

    expect(scriptGasLimit?.toNumber()).toBe(gasLimit);
    expect(bn(maxFeePolicy?.data).toNumber()).toBe(maxFee);
  });

  it('should ensure gas price and gas limit are validated when transferring amounts', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
    });
    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    await expect(async () => {
      const result = await sender.transfer(receiver.address, 1, provider.getBaseAssetId(), {
        gasLimit: 0,
      });
      await result.wait();
    }).rejects.toThrowError(/Gas limit '0' is lower than the required: ./);
  });

  it('should ensure gas limit and price are validated when withdraw an amount of base asset', async () => {
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
    });
    const {
      wallets: [sender],
    } = launched;

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
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    await expectToThrowFuelError(
      async () => {
        await sender.transfer(receiver.address, 0, provider.getBaseAssetId());
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );

    await expectToThrowFuelError(
      async () => {
        await sender.transfer(receiver.address, -1, provider.getBaseAssetId());
      },
      new FuelError(ErrorCode.INVALID_TRANSFER_AMOUNT, 'Transfer amount must be a positive number.')
    );
  });

  it('can properly use getCoins', async () => {
    using provider = await setupTestProvider();

    const account = Wallet.generate({ provider });
    const spy = vi.spyOn(account.provider, 'getCoins');

    const args: providersMod.CursorPaginationArgs = { first: 123 };

    await account.getCoins();
    expect(spy.mock.calls[0]).toStrictEqual([account.address, undefined, undefined]);

    await account.getCoins(provider.getBaseAssetId());
    expect(spy.mock.calls[1]).toStrictEqual([
      account.address,
      provider.getBaseAssetId(),
      undefined,
    ]);

    await account.getCoins(provider.getBaseAssetId(), args);
    expect(spy.mock.calls[2]).toStrictEqual([account.address, provider.getBaseAssetId(), args]);

    expect(spy).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('can properly use getMessages', async () => {
    using provider = await setupTestProvider();

    const account = Wallet.generate({ provider });
    const spy = vi.spyOn(account.provider, 'getMessages');

    const args: providersMod.CursorPaginationArgs = { first: 234 };

    await account.getMessages();
    expect(spy.mock.calls[0]).toStrictEqual([account.address, undefined]);

    await account.getMessages(args);
    expect(spy.mock.calls[1]).toStrictEqual([account.address, args]);

    expect(spy).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('throws when funding with more than 255 coins for an input', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: 100,
        coinsPerAsset: 400,
      },
    });
    const {
      wallets: [wallet],
      provider,
    } = launched;

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 30_000, provider.getBaseAssetId());

    await expectToThrowFuelError(() => request.autoCost(wallet), {
      code: ErrorCode.MAX_COINS_REACHED,
      message:
        'The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.',
    });
  });

  test('can properly use getBalances', async () => {
    const fundAmount = 10_000;

    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: fundAmount,
      },
    });
    const {
      wallets: [wallet],
      provider,
    } = launched;

    const { balances } = await wallet.getBalances();

    expect(balances.length).toBe(3);
    balances.forEach((balance) => {
      expect(balance.amount.toNumber()).toBe(fundAmount);
      expect([provider.getBaseAssetId(), ASSET_A, ASSET_B].includes(balance.assetId)).toBeTruthy();
    });
  });
});
