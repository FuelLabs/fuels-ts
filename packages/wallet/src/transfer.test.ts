import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionResultMessageOutReceipt } from '@fuel-ts/providers';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';

import { Wallet } from '.';
import { FUEL_NETWORK_URL } from './configs';
import { generateTestWallet, seedTestWallet } from './test-utils';

/**
 * @group node
 */
describe('Wallet', () => {
  let provider: Provider;
  let gasPrice: BN;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
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

    const request = await sender.createTransfer(receiver.address, 1, BaseAssetId, {
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

    const messageOutReceipt = <TransactionResultMessageOutReceipt>result.receipts[0];

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

    const tx = await sender.withdrawToBaseLayer(recipient, AMOUNT, {
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

    const messageOutReceipt = <TransactionResultMessageOutReceipt>result.receipts[0];
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

    const messageOutReceipt = <TransactionResultMessageOutReceipt>result.receipts[0];
    expect(result.gqlTransaction.id).toEqual(messageOutReceipt.sender);
    expect(recipient.toHexString()).toEqual(messageOutReceipt.recipient);
    expect(amount.toString()).toEqual(messageOutReceipt.amount.toString());

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: BaseAssetId, amount: bn(1499811) }]);
  });
});
