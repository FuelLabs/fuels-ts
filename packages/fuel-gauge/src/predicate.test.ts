import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish, WalletUnlocked, InputValue, WalletLocked, BN } from 'fuels';
import {
  ContractFactory,
  Script,
  Address,
  bn,
  toHex,
  toNumber,
  Provider,
  Predicate,
  Wallet,
  Contract,
  NativeAssetId,
} from 'fuels';
import { join } from 'path';

import contractABIJSON from '../test-projects/call-test-contract/out/debug/call-test-abi.json';
import testPredicateAddress from '../test-projects/predicate-address';
import testPredicateFalse from '../test-projects/predicate-false';
import testPredicateMainArgsStruct from '../test-projects/predicate-main-args-struct';
import predicateMainArgsStructAbi from '../test-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import testPredicateStruct from '../test-projects/predicate-struct';
import testPredicateTrue from '../test-projects/predicate-true';
import testPredicateU32 from '../test-projects/predicate-u32';

import { createSetupConfig } from './utils';

const testPredicateStructBin = readFileSync(
  join(__dirname, '../test-projects/predicate-struct/out/debug/predicate-struct.bin')
);

const contractBytecode = readFileSync(
  join(__dirname, '../test-projects/call-test-contract/out/debug/call-test.bin')
);

const setupContract = createSetupConfig({
  contractBytecode,
  abi: contractABIJSON,
  cache: true,
});

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

    await expect(predicate.transfer(receiver.address, amountToReceiver)).rejects.toThrow(
      'Invalid transaction'
    );
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

    await expect(predicate.transfer(receiver.address, 50)).rejects.toThrow('Invalid transaction');
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

    await expect(
      predicate.setData(100).transfer(receiver.address, amountToPredicate)
    ).rejects.toThrow('Invalid transaction');
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

    await expect(
      predicate
        .setData({
          has_account: false,
          total_complete: 0,
        })
        .transfer(receiver.address, amountToPredicate)
    ).rejects.toThrow('Invalid transaction');
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

    await expect(
      predicate
        .setData({
          has_account: false,
          total_complete: 0,
        })
        .transfer(receiver.address, 50)
    ).rejects.toThrow('Invalid transaction');
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
    await expect(
      predicate.setData(validation).transfer(receiver.address, predicateBalance)
    ).rejects.toThrow(/not enough resources to fit the target/i);

    // Should throw if gasLimit is too low
    // TODO: When gas is to low the return error is Invalid transaction, once is fixed on the
    // fuel-client we should change with the proper error message
    await expect(
      predicate.setData(validation).transfer(receiver.address, 50, NativeAssetId, {
        gasLimit: 1,
      })
    ).rejects.toThrow(/Invalid transaction/i);
  });

  it('Should be able to use a Predicate to call a contract', async () => {
    const [wallet] = await setup();
    const contract = await setupContract();
    const amountToPredicate = 100_000;
    const predicate = new Predicate<[Validation]>(testPredicateTrue, predicateMainArgsStructAbi);
    // Create a instance of the contract with the predicate as the caller Account
    const contractPredicate = new Contract(contract.id, contract.interface, predicate);
    const predicateBalance = await setupPredicate(wallet, predicate, amountToPredicate);

    const { value } = await contractPredicate.functions
      .return_context_amount()
      .callParams({
        forward: [500, NativeAssetId],
      })
      .call();
    expect(value.toString()).toEqual('500');

    const finalPredicateBalance = await predicate.getBalance();
    expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
  });

  it('can successfully uses proceeds of predicate in a script call', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    const initialReceiverBalance = toNumber(await receiver.getBalance());

    // instantiating the script
    const scriptAbi = JSON.parse(
      readFileSync(
        join(__dirname, '../test-projects/script-main-args/out/debug/script-main-args-abi.json')
      ).toString()
    );

    const scriptBin = readFileSync(
      join(__dirname, '../test-projects/script-main-args/out/debug/script-main-args.bin')
    );

    const scriptInstance = new Script<BigNumberish[], BigNumberish>(scriptBin, scriptAbi, sender);

    // calling the script with the receiver account (no resources)
    const scriptInput = 1;
    scriptInstance.account = receiver;
    await expect(scriptInstance.functions.main(scriptInput).call()).rejects.toThrow(
      /not enough resources to fit the target/
    );

    // setup predicate
    const amountToPredicate = 100;
    const amountToReceiver = 50;

    const predicate = new Predicate<[Validation]>(testPredicateStruct, predicateMainArgsStructAbi);
    const initialPredicateBalance = toNumber(await predicate.getBalance());

    await setupPredicate(sender, predicate, amountToPredicate);

    expect(toNumber(await predicate.getBalance())).toEqual(
      initialPredicateBalance + amountToPredicate
    );

    // executing predicate to transfer resources to receiver
    const tx = await predicate
      .setData({
        has_account: true,
        total_complete: 100,
      })
      .transfer(receiver.address, amountToReceiver);

    await tx.waitForResult();

    const finalReceiverBalance = toNumber(await receiver.getBalance());

    // calling the script with the receiver account (with resources)
    await expect(scriptInstance.functions.main(scriptInput).call()).resolves.toBeTruthy();

    const remainingPredicateBalance = toNumber(await predicate.getBalance());

    expect(toNumber(initialReceiverBalance)).toBe(0);
    expect(initialReceiverBalance + amountToReceiver).toEqual(finalReceiverBalance);

    expect(remainingPredicateBalance).toEqual(
      amountToPredicate + initialPredicateBalance - amountToReceiver
    );
  });

  it('can successfully uses proceeds of predicate in a contract call', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = await generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    const initialReceiverBalance = toNumber(await receiver.getBalance());

    // instantiating the contract
    const byteCode = readFileSync(
      join(__dirname, '../test-projects/liquidity-pool/out/debug/liquidity-pool.bin')
    );

    const abi = JSON.parse(
      readFileSync(
        join(__dirname, '../test-projects/liquidity-pool/out/debug/liquidity-pool-abi.json')
      ).toString()
    );

    const contract = await new ContractFactory(byteCode, abi, sender).deployContract();

    // calling the contract with the receiver account (no resources)
    contract.account = receiver;
    await expect(
      contract.functions
        .deposit({
          value: receiver.address.toB256(),
        })
        .callParams({
          forward: [100, NativeAssetId],
        })
        .txParams({
          gasPrice: 1,
        })
        .call()
    ).rejects.toThrow(/not enough resources to fit the target/);

    // setup predicate
    const amountToPredicate = 100;
    const amountToReceiver = 50;

    const predicate = new Predicate<[Validation]>(testPredicateStruct, predicateMainArgsStructAbi);
    const initialPredicateBalance = toNumber(await predicate.getBalance());

    await setupPredicate(sender, predicate, amountToPredicate);

    expect(toNumber(await predicate.getBalance())).toEqual(
      initialPredicateBalance + amountToPredicate
    );

    // executing predicate to transfer resources to receiver
    const tx = await predicate
      .setData({
        has_account: true,
        total_complete: 100,
      })
      .transfer(receiver.address, amountToReceiver);

    await tx.waitForResult();

    // calling the contract with the receiver account (with resources)
    const gasPrice = 1;
    const contractAmount = 10;

    await expect(
      contract.functions
        .deposit({
          value: receiver.address.toB256(),
        })
        .callParams({
          forward: [contractAmount, NativeAssetId],
        })
        .txParams({
          gasPrice,
        })
        .call()
    ).resolves.toBeTruthy();

    const finalReceiverBalance = toNumber(await receiver.getBalance());
    const remainingPredicateBalance = toNumber(await predicate.getBalance());

    expect(initialReceiverBalance).toBe(0);

    expect(initialReceiverBalance + amountToReceiver).toEqual(
      finalReceiverBalance + contractAmount + gasPrice
    );

    expect(remainingPredicateBalance).toEqual(
      amountToPredicate + initialPredicateBalance - amountToReceiver
    );
  });
});
