import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { CoinQuantityLike } from 'fuels';
import { WalletUnlocked, Predicate, BN, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import predicateAbi from '../test-projects/predicate-with-configurable/out/debug/predicate-with-configurable-abi.json';

const predicateBytecode = readFileSync(
  join(
    __dirname,
    '../test-projects/predicate-with-configurable/out/debug/predicate-with-configurable.bin'
  )
);

const defaultValues = {
  FEE: 10,
};

describe('Predicate With Configurable', () => {
  let wallet: WalletUnlocked;
  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: NativeAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);
  });

  it('predicate should returns true when input value is same as configurable default value', async () => {
    const predicate = new Predicate(predicateBytecode, predicateAbi, wallet.provider);

    const amountToTransfer = 200;

    // transfer amount to predicate
    await wallet.transfer(predicate.address, amountToTransfer);

    // create destination address
    const destination = WalletUnlocked.generate();

    const initialBalance = await destination.getBalance(NativeAssetId);

    expect(new BN(initialBalance).toNumber()).toEqual(0);

    // set predicate input data to be the same as default configurable value
    predicate.setData(defaultValues.FEE);

    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    const laterBalance = await destination.getBalance(NativeAssetId);

    expect(new BN(laterBalance).toNumber()).toEqual(amountToTransfer);
  });

  it('predicate should returns true when setted configurable value is the same as input data', async () => {
    const predicate = new Predicate(predicateBytecode, predicateAbi, wallet.provider);

    const amountToTransfer = 200;

    await wallet.transfer(predicate.address, amountToTransfer);

    const destination = WalletUnlocked.generate();

    const initialBalance = await destination.getBalance(NativeAssetId);

    expect(new BN(initialBalance).toNumber()).toEqual(0);

    // new configurable value to be set
    const FEE = 50;

    // set configurable value
    predicate.setConfigurables({ FEE });

    // set predicate input data to the same as configurable value
    predicate.setData(FEE);

    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    const laterBalance = await destination.getBalance(NativeAssetId);

    expect(new BN(laterBalance).toNumber()).toEqual(amountToTransfer);
  });
});
