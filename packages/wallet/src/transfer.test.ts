import { BigNumber } from '@ethersproject/bignumber';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';

import { generateTestWallet } from './test-utils';

describe('Wallet', () => {
  it('can transfer a single type of coin to a single destination', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[100, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    await sender.transfer(receiver.address, 1, NativeAssetId);

    const senderBalances = await sender.getBalances();
    expect(senderBalances).toEqual([{ assetId: NativeAssetId, amount: BigNumber.from(99) }]);
    const receiverBalances = await receiver.getBalances();
    expect(receiverBalances).toEqual([{ assetId: NativeAssetId, amount: BigNumber.from(1) }]);
  });

  it('can transfer multiple types of coins to multiple destinations', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';
    const amount = BigNumber.from(1);

    const sender = await generateTestWallet(provider, [
      [amount.mul(2), assetIdA],
      [amount.mul(2), assetIdB],
    ]);
    const receiverA = await generateTestWallet(provider);
    const receiverB = await generateTestWallet(provider);

    const coins = await sender.getCoinsToSpend([
      [amount.mul(2), assetIdA],
      [amount.mul(2), assetIdB],
    ]);

    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });
    request.addCoins(coins);
    request.addCoinOutputs(receiverA, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);
    request.addCoinOutputs(receiverB, [
      [amount, assetIdA],
      [amount, assetIdB],
    ]);

    const response = await provider.sendTransaction(request);

    await response.wait();

    const receiverACoins = await receiverA.getCoins();
    expect(receiverACoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );

    const receiverBCoins = await receiverB.getCoins();
    expect(receiverBCoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );
  });
});
