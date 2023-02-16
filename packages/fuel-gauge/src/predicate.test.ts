import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import { Address, NativeAssetId, bn, toHex, toNumber, Provider, Predicate, Wallet } from 'fuels';
import type {
  AbstractAddress,
  BigNumberish,
  BN,
  BytesLike,
  WalletUnlocked,
  InputValue,
  WalletLocked,
} from 'fuels';
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
  const receiver = Wallet.fromAddress(Address.fromRandom());
  return [wallet, receiver] as const;
};

const setupPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const tx = await wallet.transfer(predicate.address, amountToPredicate, NativeAssetId);
  await tx.waitForResult();
  // collect balance from predicate to prevent flaky tests where predicate address gets "filled up"
  return predicate.getBalance();
};

const assertResults = async <T extends InputValue[]>(
  predicate: Predicate<T>,
  receiver: WalletLocked,
  initialPredicateBalance: BN,
  initialReceiverBalance: BN,
  amountToPredicate: BigNumberish,
  amountToReceiver: BigNumberish
  // isSkippingInitialReceiverBalance = false
): Promise<void> => {
  // Check there are UTXO locked with the predicate hash
  expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(toNumber(amountToPredicate));
  // !isSkippingInitialReceiverBalance && expect(initialReceiverBalance.toHex()).toEqual(toHex(0));
  expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

  // Check the balance of the receiver
  const finalReceiverBalance = await receiver.getBalance();
  expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
    finalReceiverBalance.toHex()
  );

  // Check we spent the entire predicate hash input
  const finalPredicateBalance = await predicate.getBalance();
  expect(finalPredicateBalance.lte(initialPredicateBalance)).toBeTruthy();
};

type Validation = {
  has_account: boolean;
  total_complete: BigNumberish;
};

const AddressAbiInputs = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'b256',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'data',
          type: 1,
          typeArguments: null,
        },
      ],
      name: 'main',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
    },
  ],
  loggedTypes: [],
};

const U32AbiInputs = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'u32',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'data',
          type: 1,
          typeArguments: null,
        },
      ],
      name: 'main',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
    },
  ],
  loggedTypes: [],
};

const StructAbiInputs = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'struct Validation',
      components: [
        {
          name: 'has_account',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'total_complete',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'data',
          type: 1,
          typeArguments: null,
        },
      ],
      name: 'main',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
    },
  ],
  loggedTypes: [],
};

describe('Predicate', () => {
  it('can call a no-arg Predicate that returns true', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate(testPredicateTrue);

    const initialReceiverBalance = await receiver.getBalance();
    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);

    const tx = await predicate.transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    await assertResults(
      predicate,
      receiver,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      amountToReceiver
    );
  });

  it('can call a no-arg Predicate that returns false', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate(testPredicateFalse);

    await setupPredicate(wallet, predicate, amountToPredicate);

    await expect(async () => {
      await predicate.transfer(receiver.address, amountToReceiver);
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [address]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate<[string]>(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate
      .setData('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a')
      .transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    await assertResults(
      predicate,
      receiver,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      amountToReceiver
    );
  });

  it('can call a Coin predicate which returns false with invalid predicate data [address]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate<[string]>(testPredicateAddress, AddressAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    // Check there are UTXO locked with the predicate hash
    expect(initialPredicateBalance.gte(amountToPredicate));
    expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

    predicate.setData('0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada');

    await expect(async () => {
      await predicate.transfer(receiver.address, 50);
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [u32]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate<[number]>(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.setData(1078).transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    await assertResults(
      predicate,
      receiver,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      amountToReceiver
    );
  });

  it('can call a Coin predicate which returns false with invalid predicate data [u32]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate<[number]>(testPredicateU32, U32AbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    // Check there are UTXO locked with the predicate hash
    expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
    expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

    await expect(async () => {
      await predicate.setData(100).transfer(receiver.address, amountToPredicate);
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [struct]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate<[Validation]>(testPredicateStruct, StructAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate
      .setData({
        has_account: true,
        total_complete: 100,
      })
      .transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    await assertResults(
      predicate,
      receiver,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      amountToReceiver
    );
  });

  it('can call a [bin] Coin predicate which returns false with invalid predicate data [struct]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 10;
    const predicate = new Predicate<[Validation]>(testPredicateStructBin, StructAbiInputs);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    // Check there are UTXO locked with the predicate hash
    expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
    expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

    await expect(async () => {
      await predicate
        .setData({
          has_account: false,
          total_complete: 0,
        })
        .transfer(receiver.address, amountToPredicate);
    }).rejects.toThrow('Invalid transaction');
  });

  it('can call a Coin predicate which returns true with valid predicate data [main args struct]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    const predicate = new Predicate<[Validation]>(testPredicateStruct, predicateMainArgsStructAbi);

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);
    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate
      .setData({
        has_account: true,
        total_complete: 100,
      })
      .transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    await assertResults(
      predicate,
      receiver,
      initialPredicateBalance,
      initialReceiverBalance,
      amountToPredicate,
      amountToReceiver
    );
  });

  it('can call a [bin] Coin predicate which returns false with invalid predicate data [main args struct]', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const predicate = new Predicate<[Validation]>(
      testPredicateMainArgsStruct,
      predicateMainArgsStructAbi
    );

    const initialPredicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);

    // Check there are UTXO locked with the predicate hash
    expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);

    await expect(async () => {
      await predicate
        .setData({
          has_account: false,
          total_complete: 0,
        })
        .transfer(receiver.address, 50);
    }).rejects.toThrow('Invalid transaction');
  });

  it('should fail if inform gasLimit too low', async () => {
    const [wallet, receiver] = await setup();
    const amountToPredicate = 100;
    const predicate = new Predicate<[Validation]>(testPredicateStruct, predicateMainArgsStructAbi);

    const predicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };

    // Should throw if not have resouces to pay tx + gasFee
    expect(async () => {
      await predicate.setData(validation).transfer(receiver.address, predicateBalance);
    }).rejects.toThrow(/not enough resources to fit the target/i);

    // Should throw if gasLimit is too low
    // TODO: When gas is to low the return error is Invalid transaction, once is fixed on the
    // fuel-client we should change with the proper error message
    expect(async () => {
      await predicate.setData(validation).transfer(receiver.address, 50, NativeAssetId, {
        gasLimit: 1,
      });
    }).rejects.toThrow(/Invalid transaction/i);
  });
});
