import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { Account, CoinQuantityLike } from 'fuels';
import { getRandomB256, WalletUnlocked, Predicate, BN, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import noConfigurableAbi from '../test-projects/predicate-address/out/debug/predicate-address-abi.json';
import abi from '../test-projects/predicate-with-configurable/out/debug/predicate-with-configurable-abi.json';

const bytecode = readFileSync(
  join(
    __dirname,
    '../test-projects/predicate-with-configurable/out/debug/predicate-with-configurable.bin'
  )
);
const noConfigurableBytecode = readFileSync(
  join(__dirname, '../test-projects/predicate-address/out/debug/predicate-address.bin')
);

const defaultValues = {
  FEE: 10,
  ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
};

let wallet: WalletUnlocked;

const fundPredicate = async (predicate: Predicate<[number]>, amount: number) => {
  const tx = await wallet.transfer(predicate.address, amount);

  await tx.waitForResult();
};

const assertAccountBalance = async (account: Account, valueToAssert: number) => {
  const balance = await account.getBalance(NativeAssetId);

  expect(new BN(balance).toNumber()).toEqual(valueToAssert);
};

describe('Predicate With Configurable', () => {
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

  it('should assert when input values are set to default configurable constants values', async () => {
    const predicate = new Predicate(bytecode, abi, wallet.provider);

    const amountToTransfer = 200;

    // transfer funds to predicate
    await fundPredicate(predicate, 500);

    // create destination wallet
    const destination = WalletUnlocked.generate();

    await assertAccountBalance(destination, 0);

    // set predicate input data to be the same as default configurable value
    predicate.setData(defaultValues.FEE, defaultValues.ADDRESS);

    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    await assertAccountBalance(destination, amountToTransfer);
  });

  it('should assert when input and configurable values are set equal (FEE)', async () => {
    const configurableConstants = { FEE: 35 };

    expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);

    const predicate = new Predicate(bytecode, abi, wallet.provider, configurableConstants);

    const amountToTransfer = 300;

    const destination = WalletUnlocked.generate();

    await assertAccountBalance(destination, 0);

    // transfer funds to predicate
    await fundPredicate(predicate, 500);

    predicate.setData(configurableConstants.FEE, defaultValues.ADDRESS);

    // executing predicate transfer
    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    await assertAccountBalance(destination, amountToTransfer);
  });

  it('should assert when input and configurable values are set equal (ADDRESS)', async () => {
    const configurableConstants = { ADDRESS: getRandomB256() };

    expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);

    const predicate = new Predicate(bytecode, abi, wallet.provider, configurableConstants);

    const amountToTransfer = 300;

    const destination = WalletUnlocked.generate();

    await assertAccountBalance(destination, 0);

    // transfer funds to predicate
    await fundPredicate(predicate, 500);

    predicate.setData(defaultValues.FEE, configurableConstants.ADDRESS);

    // executing predicate transfer
    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    await assertAccountBalance(destination, amountToTransfer);
  });

  it('should assert when input and configurable values are set equal (BOTH)', async () => {
    const configurableConstants = {
      FEE: 90,
      ADDRESS: getRandomB256(),
    };

    expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
    expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);

    const predicate = new Predicate(bytecode, abi, wallet.provider, configurableConstants);

    const amountToTransfer = 300;

    const destination = WalletUnlocked.generate();

    await assertAccountBalance(destination, 0);

    await fundPredicate(predicate, 500);

    predicate.setData(configurableConstants.FEE, configurableConstants.ADDRESS);

    const tx = await predicate.transfer(destination.address, amountToTransfer);

    await tx.waitForResult();

    await assertAccountBalance(destination, amountToTransfer);
  });

  it('should throws when no input data is given', async () => {
    const predicate = new Predicate(bytecode, abi, wallet.provider);

    const destination = WalletUnlocked.generate();

    await expect(predicate.transfer(destination.address, 300)).rejects.toThrowError();
  });
});
