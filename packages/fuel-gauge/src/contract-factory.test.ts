import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { readFileSync } from 'fs';
import { BN, bn, toHex, Interface, ContractFactory } from 'fuels';
import { join } from 'path';

import storageSlots from '../fixtures/forc-projects/storage-test/out/debug/storage-test-storage_slots.json';

// load the byteCode of the contract, generated from Sway source
const byteCode = readFileSync(
  join(__dirname, '../fixtures/forc-projects/storage-test/out/debug/storage-test.bin')
);

// load the JSON abi of the contract, generated from Sway source
const abi = JSON.parse(
  readFileSync(
    join(__dirname, '../fixtures/forc-projects/storage-test/out/debug/storage-test-abi.json')
  ).toString()
);

/**
 * @group node
 */
describe('Contract Factory', () => {
  beforeAll(async (ctx) => {});

  it('Creates a factory from inputs that can return call results', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);

    const contact = await factory.deployContract({ gasPrice });

    expect(contact.interface).toBeInstanceOf(Interface);

    const { value: valueInitial } = await contact.functions
      .initialize_counter(41)
      .txParams({ gasPrice })
      .call();
    expect(valueInitial.toHex()).toEqual(toHex(41));

    const { value } = await contact.functions.increment_counter(1).txParams({ gasPrice }).call();
    expect(value.toHex()).toEqual(toHex(42));

    const { value: value2 } = await contact.functions.increment_counter(1).dryRun();
    expect(value2.toHex()).toEqual(toHex(43));
  });

  it('Creates a factory from inputs that can return transaction results', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);

    const contact = await factory.deployContract({ gasPrice });

    expect(contact.interface).toBeInstanceOf(Interface);

    await contact.functions.initialize_counter(100).txParams({ gasPrice }).call();

    const { transactionResult } = await contact.functions
      .increment_counter(1)
      .txParams({ gasPrice })
      .call();
    expect(transactionResult).toEqual({
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
      isTypeScript: expect.any(Boolean),
      date: expect.any(Date),
      mintedAssets: expect.any(Array),
      burnedAssets: expect.any(Array),
      time: expect.any(String),
      id: expect.any(String),
      gasUsed: expect.objectContaining({
        words: expect.arrayContaining([expect.any(Number)]),
      }),
      fee: expect.any(BN),
      transaction: expect.any(Object),
    });
    expect(transactionResult.gasUsed.toNumber()).toBeGreaterThan(0);

    const { callResult } = await contact.functions.increment_counter(1).dryRun();
    expect(callResult).toEqual({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });

  it('Creates a factory from inputs that can prepare call data', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);

    const contract = await factory.deployContract({ gasPrice });

    const prepared = contract.functions.increment_counter(1).getCallConfig();
    expect(prepared).toEqual({
      program: expect.objectContaining({ id: contract.id }),
      func: expect.objectContaining({ name: 'increment_counter' }),
      args: [1],
      callParameters: undefined,
      txParameters: undefined,
      forward: undefined,
    });
  });

  it('Creates a contract with initial storage fixed var names', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);
    const contract = await factory.deployContract({
      storageSlots,
      gasPrice,
    });

    const { value: var1 } = await contract.functions.return_var1().txParams({ gasPrice }).call();
    expect(var1.toHex()).toEqual(toHex(0));

    const { value: var2 } = await contract.functions.return_var2().txParams({ gasPrice }).call();
    expect(var2).toEqual(20);

    const { value: var3 } = await contract.functions.return_var3().txParams({ gasPrice }).call();
    expect(var3).toEqual(30);

    const { value: var4 } = await contract.functions.return_var4().txParams({ gasPrice }).call();
    expect(var4).toEqual(true);

    const { value: var5 } = await contract.functions.return_var5().txParams({ gasPrice }).call();
    expect(JSON.stringify(var5)).toEqual(
      JSON.stringify({
        v1: true,
        v2: bn(50),
      })
    );
  });

  it('should ensure transaction request is created with gas limit sets to 0', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;

    const factory = new ContractFactory(byteCode, abi, wallet);

    const { transactionRequest } = factory.createTransactionRequest();

    expect(transactionRequest.gasLimit.toNumber()).toBe(0);
  });

  it('Creates a contract with initial storage (dynamic key)', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contact = await factory.deployContract({
      gasPrice,
      storageSlots: [
        { key: '0x0000000000000000000000000000000000000000000000000000000000000001', value: b256 },
      ],
    });

    const { value: vB256 } = await contact.functions.return_b256().simulate();
    expect(vB256).toEqual(b256);
  });

  it('Creates a contract with initial storage. Both dynamic key and fixed vars', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
    } = launched;
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const factory = new ContractFactory(byteCode, abi, wallet);
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contract = await factory.deployContract({
      gasPrice,
      storageSlots: [
        ...storageSlots, // initializing from storage_slots.json
        { key: '0000000000000000000000000000000000000000000000000000000000000001', value: b256 }, // Initializing manual value
      ],
    });

    const { value: var1 } = await contract.functions.return_var1().txParams({ gasPrice }).call();
    expect(var1.toHex()).toEqual(toHex(0));

    const { value: var2 } = await contract.functions.return_var2().txParams({ gasPrice }).call();
    expect(var2).toEqual(20);

    const { value: var3 } = await contract.functions.return_var3().txParams({ gasPrice }).call();
    expect(var3).toEqual(30);

    const { value: var4 } = await contract.functions.return_var4().txParams({ gasPrice }).call();
    expect(var4).toEqual(true);

    const { value: var5 } = await contract.functions.return_var5().txParams({ gasPrice }).call();
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
    const factory = new ContractFactory(byteCode, abi);

    await expectToThrowFuelError(
      () => factory.createTransactionRequest(),
      new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      )
    );
  });
});
