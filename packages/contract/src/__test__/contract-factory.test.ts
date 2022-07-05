import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from '../contract-factory';

describe('Contract Factory', () => {
  const createContractFactory = async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await TestUtils.generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
    const bytecode = readFileSync(
      join(__dirname, './storage-test-contract/out/debug/storage-test.bin')
    );
    const abi = JSON.parse(
      readFileSync(
        join(__dirname, './storage-test-contract/out/debug/storage-test-abi.json')
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
    expect(value).toEqual(42n);

    const { value: value2 } = await contact.functions.increment_counter(1).dryRun();
    expect(value2).toEqual(43n);
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
      callParameters: undefined,
      txParameters: undefined,
      forward: undefined,
    });
  });

  // TODO: https://github.com/FuelLabs/fuels-ts/issues/334
  // Fix storage initialization in the SDK looks like Merkle Three is not working
  // as expected
  it.skip('Creates a contract with initial storage', async () => {
    const factory = await createContractFactory();
    const u64 = '0x1000000000000001';
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contact = await factory.deployContract({
      storageSlots: [
        // Initialize counter with 1
        ['0x0000000000000000000000000000000000000000000000000000000000000000', u64],
        // Initialize b256 value
        ['0x0000000000000000000000000000000000000000000000000000000000000001', b256],
      ],
    });

    const { value: vU64 } = await contact.functions.counter().get();
    expect(vU64).toEqual(BigInt(u64));

    const { value: vB256 } = await contact.functions.return_b256().get();
    expect(vB256).toEqual(b256);
  });
});
