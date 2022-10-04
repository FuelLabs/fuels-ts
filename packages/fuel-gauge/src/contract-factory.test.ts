import { readFileSync } from 'fs';
import { bn, toHex, Interface, NativeAssetId, Provider, TestUtils, ContractFactory } from 'fuels';
import { join } from 'path';

import storageSlots from '../test-projects/storage-test-contract/out/debug/storage-test-storage_slots.json';

describe('Contract Factory', () => {
  const createContractFactory = async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await TestUtils.generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
    const bytecode = readFileSync(
      join(__dirname, '../test-projects/storage-test-contract/out/debug/storage-test.bin')
    );
    const abi = JSON.parse(
      readFileSync(
        join(__dirname, '../test-projects/storage-test-contract/out/debug/storage-test-abi.json')
      ).toString()
    );
    const factory = new ContractFactory(bytecode, abi, wallet);

    return factory;
  };

  it('Creates a factory from inputs that can return call results', async () => {
    const factory = await createContractFactory();

    const contact = await factory.deployContract();

    expect(contact.interface).toBeInstanceOf(Interface);

    await contact.functions.initialize_counter(41).call();

    const { value } = await contact.functions.increment_counter(1).call();
    expect(value.toHex()).toEqual(toHex(42));

    const { value: value2 } = await contact.functions.increment_counter(1).dryRun();
    expect(value2.toHex()).toEqual(toHex(43));
  });

  it('Creates a factory from inputs that can return transaction results', async () => {
    const factory = await createContractFactory();

    const contact = await factory.deployContract();

    expect(contact.interface).toBeInstanceOf(Interface);

    await contact.functions.initialize_counter(100).call();

    const { transactionResult } = await contact.functions.increment_counter(1).call();
    expect(transactionResult).toEqual({
      blockId: expect.stringMatching(/^0x/),
      receipts: expect.arrayContaining([expect.any(Object)]),
      status: expect.objectContaining({
        programState: expect.any(Object),
        type: 'success',
      }),
      time: expect.any(String),
      transactionId: expect.any(String),
    });

    const { callResult } = await contact.functions.increment_counter(1).dryRun();
    expect(callResult).toEqual({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });

  it('Creates a factory from inputs that can prepare call data', async () => {
    const factory = await createContractFactory();

    const contact = await factory.deployContract();

    const prepared = contact.functions.increment_counter(1).getCallConfig();
    expect(prepared).toEqual({
      contract: expect.objectContaining({ id: contact.id }),
      func: expect.objectContaining({ name: 'increment_counter' }),
      args: [1],
      bytesOffset: 720,
      callParameters: undefined,
      txParameters: undefined,
      forward: undefined,
    });
  });

  it('Creates a contract with initial storage fixed var names', async () => {
    const factory = await createContractFactory();
    const contract = await factory.deployContract({
      storageSlots,
    });

    const { value: var1 } = await contract.functions.return_var1().call();
    expect(var1.toHex()).toEqual(toHex(10));

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

    const { value: vB256 } = await contact.functions.return_b256().get();
    expect(vB256).toEqual(b256);
  });

  it('Creates a contract with initial storage. Both dynamic key and fixed vars', async () => {
    const factory = await createContractFactory();
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contract = await factory.deployContract({
      storageSlots: [
        ...storageSlots, // initializing from storage_slots.json
        { key: '0000000000000000000000000000000000000000000000000000000000000001', value: b256 }, // Initializing manual value
      ],
    });

    const { value: var1 } = await contract.functions.return_var1().call();
    expect(var1.toHex()).toEqual(toHex(10));

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

    const { value: vB256 } = await contract.functions.return_b256().get();
    expect(vB256).toEqual(b256);
  });
});
