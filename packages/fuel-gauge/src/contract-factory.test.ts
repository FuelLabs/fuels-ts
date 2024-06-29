import type { Account, TransactionResult } from '@fuel-ts/account';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { BN, bn, toHex, Interface, ContractFactory } from 'fuels';

import { StorageTestContractAbi__factory } from '../test/typegen/contracts';
import StorageTestContractAbiHex from '../test/typegen/contracts/StorageTestContractAbi.hex';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Contract Factory', () => {
  it('Creates a factory from inputs that can return call results', async () => {
    using contract = await launchTestContract({
      deployer: StorageTestContractAbi__factory,
      bytecode: StorageTestContractAbiHex,
    });
    expect(contract.interface).toBeInstanceOf(Interface);

    const { value: valueInitial } = await contract.functions.initialize_counter(41).call();
    expect(valueInitial.toHex()).toEqual(toHex(41));

    const { value } = await contract.functions.increment_counter(1).call();
    expect(value.toHex()).toEqual(toHex(42));

    const { value: value2 } = await contract.functions.increment_counter(1).dryRun();
    expect(value2.toHex()).toEqual(toHex(43));
  });

  it('Creates a factory from inputs that can return transaction results', async () => {
    using contract = await launchTestContract({
      deployer: StorageTestContractAbi__factory,
      bytecode: StorageTestContractAbiHex,
    });

    expect(contract.interface).toBeInstanceOf(Interface);

    await contract.functions.initialize_counter(100).call();

    const { transactionResult } = await contract.functions.increment_counter(1).call();
    expect(transactionResult).toEqual<TransactionResult>({
      blockId: expect.stringMatching(/^0x/),
      receipts: expect.arrayContaining([expect.any(Object)]),
      status: expect.any(String),
      type: expect.any(String),
      gqlTransaction: expect.any(Object),
      operations: expect.any(Array),
      isStatusFailure: expect.any(Boolean),
      isStatusPending: expect.any(Boolean),
      isStatusSuccess: expect.any(Boolean),
      isTypeCreate: expect.any(Boolean),
      isTypeMint: expect.any(Boolean),
      isTypeUpgrade: expect.any(Boolean),
      isTypeUpload: expect.any(Boolean),
      isTypeScript: expect.any(Boolean),
      logs: expect.any(Array),
      date: expect.any(Date),
      mintedAssets: expect.any(Array),
      burnedAssets: expect.any(Array),
      time: expect.any(String),
      tip: expect.any(BN),
      id: expect.any(String),
      gasUsed: expect.objectContaining({
        words: expect.arrayContaining([expect.any(Number)]),
      }),
      fee: expect.any(BN),
      transaction: expect.any(Object),
    });
    expect(transactionResult.gasUsed.toNumber()).toBeGreaterThan(0);

    const { callResult } = await contract.functions.increment_counter(1).dryRun();
    expect(callResult).toMatchObject({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });

  it('Creates a factory from inputs that can prepare call data', async () => {
    using contract = await launchTestContract({
      deployer: StorageTestContractAbi__factory,
      bytecode: StorageTestContractAbiHex,
    });

    const prepared = contract.functions.increment_counter(1).getCallConfig();
    expect(prepared).toEqual({
      program: expect.objectContaining({ id: contract.id }),
      func: expect.objectContaining({ name: 'increment_counter' }),
      args: [1],
      externalAbis: {},
      callParameters: undefined,
      txParameters: undefined,
      forward: undefined,
    });
  });

  it('should not override user input maxFee when calling deployContract', async () => {
    const setFee = bn(120_000);
    const factory = await createContractFactory();
    const spy = vi.spyOn(factory.account as Account, 'sendTransaction');

    await factory.deployContract({
      maxFee: setFee,
    });

    const transactionRequestArg = spy.mock.calls[0][0];

    expect(transactionRequestArg.maxFee?.toString()).toEqual(setFee.toString());

    vi.restoreAllMocks();
  });

  it('Creates a contract with initial storage fixed var names', async () => {
    using contract = await launchTestContract({
      deployer: StorageTestContractAbi__factory,
      bytecode: StorageTestContractAbiHex,
    });

    const { value: var1 } = await contract.functions.return_var1().call();
    expect(var1.toHex()).toEqual(toHex(0));

    const { value: var2 } = await contract.functions.return_var2().call();
    expect(var2).toEqual(20);

    const { value: var3 } = await contract.functions.return_var3().call();
    expect(var3).toEqual(30);

    const { value: var4 } = await contract.functions.return_var4().call();
    expect(var4).toEqual(true);

    const { value: var5 } = await contract.functions.return_var5().call();
    expect(JSON.stringify(var5)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );
  });

  it('Creates a contract with initial storage (dynamic key)', async () => {
    const factory = await createContractFactory();
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contact = await factory.deployContract({
      storageSlots: [
        { key: '0x0000000000000000000000000000000000000000000000000000000000000001', value: b256 },
      ],
    });

    const { value: vB256 } = await contact.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('Creates a contract with initial storage. Both dynamic key and fixed vars', async () => {
    const factory = new ContractFactory(
      StorageTestContractAbiHex,
      StorageTestContractAbi__factory.abi
    );
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contract = await factory.deployContract({
      storageSlots: [
        ...storageSlots, // initializing from storage_slots.json
        { key: '0000000000000000000000000000000000000000000000000000000000000001', value: b256 }, // Initializing manual value
      ],
    });

    const { value: var1 } = await contract.functions.return_var1().call();
    expect(var1.toHex()).toEqual(toHex(0));

    const { value: var2 } = await contract.functions.return_var2().call();
    expect(var2).toEqual(20);

    const { value: var3 } = await contract.functions.return_var3().call();
    expect(var3).toEqual(30);

    const { value: var4 } = await contract.functions.return_var4().call();
    expect(var4).toEqual(true);

    const { value: var5 } = await contract.functions.return_var5().call();
    expect(JSON.stringify(var5)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );

    const { value: vB256 } = await contract.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('should throws if calls createTransactionRequest is called when provider is not set', async () => {
    const factory = new ContractFactory(
      StorageTestContractAbiHex,
      StorageTestContractAbi__factory.abi
    );

    await expectToThrowFuelError(
      () => factory.createTransactionRequest(),
      new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      )
    );
  });
});
