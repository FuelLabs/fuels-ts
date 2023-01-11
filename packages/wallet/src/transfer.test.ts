import { Address } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/constants';
import { bn } from '@fuel-ts/math';
import type { TransactionResultMessageOutReceipt } from '@fuel-ts/providers';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';

import { generateTestWallet } from '../test/utils/generateTestWallet';

describe('Wallet', () => {
  it('can transfer a single type of coin to a single destination', async () => {
    // #region typedoc:wallet-transfer
    // setup a provider and two test wallets
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    // transfer 1 unit of the base asset
    const response = await sender.transfer(receiver.address, 1, NativeAssetId);
    await response.wait();

    // retrieve balances of both wallets
    const senderBalances = await sender.getBalances();
    const receiverBalances = await receiver.getBalances();
    // validate new balances
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: bn(99) }]);
    expect(receiverBalances).toEqual([{ assetId: NativeAssetId, amount: bn(1) }]);
    // #endregion
  });

  it('can transfer with custom TX Params', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    /* Error out because gas is to low */
    await expect(async () => {
      const result = await sender.transfer(receiver.address, 1, NativeAssetId, {
        gasLimit: 1,
        gasPrice: 1,
      });
      await result.wait();
    }).rejects.toThrowError(`gasLimit(${bn(1)}) is lower than the required (${bn(1335)})`);

    const response = await sender.transfer(receiver.address, 1, NativeAssetId, {
      gasLimit: 10000,
    });
    await response.wait();
    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: bn(99) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: NativeAssetId, amount: bn(1) }]);
  });

  it('can exclude IDs when getResourcesToSpend is called', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

    const user = await generateTestWallet(provider, [
      [1, assetIdA],
      [1, assetIdB],
      [10, NativeAssetId],
    ]);

    const coins = await user.getCoins();

    // Test excludes the UTXO where the assetIdA gets added to the senders wallet
    await expect(
      user.getResourcesToSpend([[1, assetIdA, 100]], { utxos: [coins[0].id] })
    ).rejects.toThrow(/not enough resources to fit the target/);
  });

  it('can transfer multiple types of coins to multiple destinations', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';
    const amount = 1;

    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });
    const sender = await generateTestWallet(provider, [
      [amount * 2, assetIdA],
      [amount * 2, assetIdB],
      [10, NativeAssetId],
    ]);
    const receiverA = await generateTestWallet(provider);
    const receiverB = await generateTestWallet(provider);

    const resources = await sender.getResourcesToSpend([
      [amount * 2, assetIdA],
      [amount * 2, assetIdB],
    ]);

    request.addResources(resources);
    request.addCoinOutputs(receiverA, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);
    request.addCoinOutputs(receiverB, [
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
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const recipient = Address.fromB256(
      '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263'
    );
    const amount = 10;

    const tx = await sender.withdrawToBaseLayer(recipient, 10);
    const result = await tx.wait();

    const messageOutReceipt = <TransactionResultMessageOutReceipt>result.receipts[0];
    expect(result.transactionId).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: bn(90) }]);
  });

  it('can handle a MessageProof that does not exist', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const messageProof = await provider.getMessageProof(
      '0x123abc1111111111111111111111111111111111111111111111111111111111',
      '0x123abc1111111111111111111111111111111111111111111111111111111111'
    );

    expect(messageProof).toBeNull();
  });

  it('can retrieve a valid MessageProof', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const RECIPIENT_ID = '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263';
    const AMOUNT = 10;
    const recipient = Address.fromB256(RECIPIENT_ID);

    const tx = await sender.withdrawToBaseLayer(recipient, AMOUNT);
    const TRANSACTION_ID = tx.id;
    const result = await tx.wait();
    const messageOutReceipt = <TransactionResultMessageOutReceipt>result.receipts[0];
    const messageProof = await provider.getMessageProof(
      TRANSACTION_ID,
      messageOutReceipt.messageID
    );

    expect(messageProof).toEqual(
      expect.objectContaining({
        proofSet: expect.arrayContaining([expect.any(String)]),
        proofIndex: bn(0),
        sender: Address.fromB256(TRANSACTION_ID),
        recipient,
        nonce: expect.any(String),
        amount: bn(AMOUNT),
        data: '0x',
        signature: expect.any(String),
        header: expect.objectContaining({
          id: expect.any(String),
          daHeight: bn(0),
          transactionsCount: bn(2),
          outputMessagesCount: bn(1),
          transactionsRoot: expect.any(String),
          outputMessagesRoot: expect.any(String),
          prevRoot: expect.any(String),
          time: expect.any(String),
          applicationHash: expect.any(String),
        }),
      })
    );
  });
});
