import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import { Address, NativeAssetId, bn, toHex, toNumber, Provider, Predicate, Interface } from 'fuels';
import type { AbstractAddress, BigNumberish, BN, BaseWalletLocked } from 'fuels';
import { join } from 'path';

import testPredicateAddress from '../test-projects/predicate-address';
import testPredicateFalse from '../test-projects/predicate-false';
import testPredicateMainArgsStruct from '../test-projects/predicate-main-args-struct';
import predicateMainArgsStructAbi from '../test-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import testPredicateStruct from '../test-projects/predicate-struct';
import testPredicateTrue from '../test-projects/predicate-true';
import testPredicateU32 from '../test-projects/predicate-u32';

const testPredicateStructBin = readFileSync(
  join(__dirname, '../test-projects/predicate-struct/out/debug/predicate-struct.bin')
);

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const wallet = await generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
  return wallet;
};

const setupPredicate = async (
  wallet: BaseWalletLocked,
  amountToPredicate: BigNumberish,
  predicate: Predicate
): Promise<BN> => {
  await wallet.submitPredicate(predicate.address, amountToPredicate);

  // collect balance from predicate to prevent flaky tests where predicate address gets "filled up"
  return wallet.provider.getBalance(predicate.address, NativeAssetId);
};

const assertResults = async (
  wallet: BaseWalletLocked,
  receiverAddress: AbstractAddress,
  initialPredicateBalance: BN,
  initialReceiverBalance: BN,
  amountToPredicate: BigNumberish,
  predicate: Predicate,
  isSkippingInitialReceiverBalance = false
): Promise<void> => {
  // Check there are UTXO locked with the predicate hash
  expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(toNumber(amountToPredicate));
  !isSkippingInitialReceiverBalance && expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

  // Check the balance of the receiver
  const finalReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

  expect(bn(initialReceiverBalance).add(initialPredicateBalance).toHex()).toEqual(
    finalReceiverBalance.toHex()
  );

  // Check we spent the entire predicate hash input
  const finalPredicateBalance = await wallet.provider.getBalance(predicate.address, NativeAssetId);
  expect(finalPredicateBalance.toHex()).toEqual(toHex(0));
};

type Validation = {
  has_account: boolean;
  total_complete: BigNumberish;
};

const AddressAbiInputs = [
  {
    name: 'b256Var',
    type: 'b256',
  },
];

const U32AbiInputs = [
  {
    name: 'u32Var',
    type: 'u32',
  },
];

const StructAbiInputs = [
  {
    name: 'structVar',
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
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateTrue);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await wallet.provider.submitSpendPredicate(predicate, initialPredicateBalance, receiverAddress);

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a no-arg Predicate that returns true, via wallet', async () => {
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateTrue);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(wallet.address, NativeAssetId);

    await wallet.submitSpendPredicate(predicate, initialPredicateBalance);

    await assertResults(
      wallet,
      wallet.address,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate,
      true
    );
  });

  it('can call a no-arg Predicate that returns false, via wallet', async () => {
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateFalse);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    await expect(async () => {
      await wallet.submitSpendPredicate(predicate, initialPredicateBalance);
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [address]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await wallet.provider.submitSpendPredicate(
      predicate,
      initialPredicateBalance,
      receiverAddress,
      ['0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a']
    );

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a Coin predicate which returns true with valid predicate data [address], via wallet', async () => {
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(wallet.address, NativeAssetId);

    await wallet.submitSpendPredicate(predicate, initialPredicateBalance, [
      '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
    ]);

    await assertResults(
      wallet,
      wallet.address,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate,
      true
    );
  });

  it('can call a Coin predicate which returns false with invalid predicate data [address]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    // Check there are UTXO locked with the predicate hash
    expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(toNumber(amountToPredicate));
    expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

    await expect(async () => {
      await wallet.provider.submitSpendPredicate(
        predicate,
        initialPredicateBalance,
        receiverAddress,
        ['0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada']
      );
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [u32]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    await wallet.provider.submitSpendPredicate(
      predicate,
      initialPredicateBalance,
      receiverAddress,
      [1078]
    );

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a Coin predicate which returns false with invalid predicate data [u32]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    // Check there are UTXO locked with the predicate hash
    expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
    expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

    await expect(async () => {
      await wallet.provider.submitSpendPredicate(
        predicate,
        initialPredicateBalance,
        receiverAddress,
        [100]
      );
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [struct]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateStruct, StructAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };
    await wallet.provider.submitSpendPredicate(
      predicate,
      initialPredicateBalance,
      receiverAddress,
      [validation]
    );

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a [bin] Coin predicate which returns false with invalid predicate data [struct]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateStructBin, StructAbiInputs);
    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    const validation: Validation = {
      has_account: false,
      total_complete: 0,
    };

    await expect(async () => {
      await wallet.provider.submitSpendPredicate(
        predicate,
        initialPredicateBalance,
        receiverAddress,
        [validation]
      );
    }).rejects.toThrow('Invalid transaction');
  });

  // TODO: Enable this test once predicates start to consume gas
  // FUELS-TS - https://github.com/FuelLabs/fuels-ts/issues/385
  // SPEC - https://github.com/FuelLabs/fuel-specs/issues/119
  it.skip('should fail if inform gasLimit too low', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateStruct, StructAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };

    let failed;
    try {
      await wallet.provider.submitSpendPredicate(
        predicate,
        initialPredicateBalance,
        receiverAddress,
        [validation],
        undefined,
        { gasLimit: 1 }
      );
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('can call a Coin predicate which returns true with valid predicate data [main args struct]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateStruct, predicateMainArgsStructAbi);

    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);
    const initialReceiverBalance = await wallet.provider.getBalance(receiverAddress, NativeAssetId);

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };
    await wallet.provider.submitSpendPredicate(
      predicate,
      initialPredicateBalance,
      receiverAddress,
      [validation]
    );

    await assertResults(
      wallet,
      receiverAddress,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      predicate
    );
  });

  it('can call a [bin] Coin predicate which returns false with invalid predicate data [main args struct]', async () => {
    const receiverAddress = Address.fromRandom();
    const wallet = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate(testPredicateMainArgsStruct, predicateMainArgsStructAbi);
    const initialPredicateBalance = await setupPredicate(wallet, amountToPredicate, predicate);

    const validation: Validation = {
      has_account: false,
      total_complete: 0,
    };

    await expect(async () => {
      await wallet.provider.submitSpendPredicate(
        predicate,
        initialPredicateBalance,
        receiverAddress,
        [validation]
      );
    }).rejects.toThrow('Invalid transaction');
  });
});
