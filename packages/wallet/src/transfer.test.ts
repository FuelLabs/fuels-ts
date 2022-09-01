import { NativeAssetId } from '@fuel-ts/constants';
import { bn } from '@fuel-ts/math';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';

import { generateTestWallet } from './test-utils';

describe('Wallet', () => {
  it('can transfer a single type of coin to a single destination', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    await sender.transfer(receiver.address, 1, NativeAssetId);

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: bn(99) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: NativeAssetId, amount: bn(1) }]);
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
        bytePrice: 1,
      });
      await result.wait();
    }).rejects.toThrowError(`gasLimit(${bn(1)}) is lower than the required (${bn(11)})`);

    await sender.transfer(receiver.address, 1, NativeAssetId, {
      gasLimit: 10000,
    });
    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: bn(99) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: NativeAssetId, amount: bn(1) }]);
  });

  it('can exclude IDs when getCoinsToSpend is called', async () => {
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
    await expect(user.getCoinsToSpend([[1, assetIdA]], 100, [coins[0].id])).rejects.toThrow(
      /enough coins could not be found/
    );
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

    const coins = await sender.getCoinsToSpend([
      [amount * 2, assetIdA],
      [amount * 2, assetIdB],
    ]);

    request.addCoins(coins);
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
});
