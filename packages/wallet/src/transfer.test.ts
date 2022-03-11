import { BigNumber } from '@ethersproject/bignumber';
import { NativeAssetId } from '@fuel-ts/constants';
import {
  InputType,
  OutputType,
  Provider,
  returnZeroScript,
  TransactionType,
} from '@fuel-ts/providers';

import { Wallet } from '.';

describe('Wallet', () => {
  it('can transfer coin', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const receiverA = Wallet.generate();
    const receiverB = Wallet.generate();
    const assetIdA = NativeAssetId;
    const assetIdB = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const amount = BigNumber.from(1);

    const coins = await provider.getCoinsToSpend(sender, [
      { assetId: assetIdA, amount: amount.mul(2) },
      { assetId: assetIdB, amount: amount.mul(2) },
    ]);

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script: returnZeroScript.bytes,
      inputs: coins.map((coin) => ({
        type: InputType.Coin,
        ...coin,
        witnessIndex: 0,
      })),
      outputs: [
        {
          type: OutputType.Coin,
          to: receiverA.address,
          assetId: assetIdA,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverA.address,
          assetId: assetIdB,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverB.address,
          assetId: assetIdA,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverB.address,
          assetId: assetIdB,
          amount,
        },
        { type: OutputType.Change, assetId: assetIdA, to: sender },
        { type: OutputType.Change, assetId: assetIdB, to: sender },
      ],
      witnesses: ['0x'],
    });

    await response.wait();

    const receiverACoins = await provider.getCoins(receiverA.address, undefined, { first: 9999 });
    expect(receiverACoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );

    const receiverBCoins = await provider.getCoins(receiverB.address, undefined, { first: 9999 });
    expect(receiverBCoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );
  });
});
