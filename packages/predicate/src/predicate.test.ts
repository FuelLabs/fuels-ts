import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { NativeAssetId } from '@fuel-ts/constants';
import { randomBytes } from '@fuel-ts/keystore';
import type { BigNumberish } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import type { Wallet } from '@fuel-ts/wallet';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Predicate } from './predicate';
import testPredicateAddress from './test-predicate-address';
import testPredicateFalse from './test-predicate-false';
import testPredicateStruct from './test-predicate-struct';
import testPredicateTrue from './test-predicate-true';
import testPredicateU32 from './test-predicate-u32';

const testPredicateStructBin = readFileSync(
  join(__dirname, './test-predicate-struct/out/debug/test-predicate-struct.bin')
);

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const wallet = await TestUtils.generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
  return wallet;
};

const setupPredicate = async (
  wallet: Wallet,
  amountToPredicate: BigNumberish,
  predicate: Predicate
): Promise<bigint> => {
  await predicate.submitPredicate(wallet, amountToPredicate);

  // collect balance from predicate to prevent flaky tests where predicate address gets "filled up"
  return predicate.getPredicateBalance(wallet);
};

const assertResults = async (
  wallet: Wallet,
  receiverAddress: BytesLike,
  initialPredicateBalance: bigint,
  initialReceiverBalance: bigint,
  amountToPredicate: bigint,
  predicate: Predicate
): Promise<void> => {
  // Check there are UTXO locked with the predicate hash
  expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);
  expect(initialReceiverBalance).toEqual(0n);

  // Check the balance of the receiver
  const finalReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);
  expect(initialReceiverBalance + initialPredicateBalance).toEqual(finalReceiverBalance);

  // Check we spent the entire predicate hash input
  const finalPredicateBalance = await predicate.getPredicateBalance(wallet);
  expect(finalPredicateBalance).toEqual(0n);
};

type Validation = {
  has_account: boolean;
  total_complete: bigint;
};

const AddressAbiInputs = [
  {
    name: 'validation',
    type: 'b256',
  },
];

const U32AbiInputs = [
  {
    name: 'validation',
    type: 'u32',
  },
];

const StructAbiInputs = [
  {
    name: 'validation',
    type: 'struct Validation',
    components: [
      {
        name: 'has_account',
        type: 'bool',
      },
      {
        name: 'total_complete',
        type: 'u64',
      },
    ],
  },
];

describe('Predicate', () => {
  it('can call a no-arg Predicate that returns true', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateTrue);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress);

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a no-arg Predicate that returns false', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateFalse);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    await expect(async () => {
      await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress);
    }).rejects.toThrow('Invalid Predicate');
  });

  it('can call a Coin predicate which returns true with valid simple predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [
      '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
    ]);

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a Coin predicate which returns false with invalid simple predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    // Check there are UTXO locked with the predicate hash
    expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);
    expect(initialReceiverBalance).toEqual(0n);

    await expect(async () => {
      await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [
        '0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada',
      ]);
    }).rejects.toThrow('Invalid Predicate');
  });

  it('can call a Coin predicate which returns true with valid u32 predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [1078]);

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a Coin predicate which returns false with invalid u32 predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    // Check there are UTXO locked with the predicate hash
    expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);
    expect(initialReceiverBalance).toEqual(0n);

    await expect(async () => {
      await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [100]);
    }).rejects.toThrow('Invalid Predicate');
  });

  it('can call a Coin predicate which returns true with valid struct predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateStruct, StructAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    const validation: Validation = {
      has_account: true,
      total_complete: 100n,
    };
    await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [
      validation,
    ]);

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a [bin] Coin predicate which returns false with invalid struct predicate data', async () => {
    const receiverAddress = hexlify(randomBytes(32));
    const wallet = await setup();
    const amountToPredicate = 10n;
    const predicate = new Predicate(testPredicateStructBin, StructAbiInputs);
    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    const validation: Validation = {
      has_account: false,
      total_complete: 0n,
    };

    await expect(async () => {
      await predicate.submitSpendPredicate(wallet, initialPredicateBalance, receiverAddress, [
        validation,
      ]);
    }).rejects.toThrow('Invalid Predicate');
  });
});
