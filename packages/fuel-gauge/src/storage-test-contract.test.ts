import { readFileSync } from 'fs';
import { NativeAssetId, toHex, Provider, TestUtils, Contract, ContractFactory } from 'fuels';
import { join } from 'path';

import abi from '../test-projects/storage-test-contract/out/debug/storage-test-abi.json';
import storageSlots from '../test-projects/storage-test-contract/out/debug/storage-test-storage_slots.json';

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(
    join(__dirname, '../test-projects/storage-test-contract/out/debug/storage-test.bin')
  );
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract({
    storageSlots,
  });

  return contract;
};

describe('StorageTestContract', () => {
  it('can increment counter', async () => {
    const contract = await setup();

    // Call contract
    const { value: initializeResult } = await contract.functions.initialize_counter(1300).call();
    expect(initializeResult.toHex()).toEqual(toHex(1300));
    const { value: incrementResult } = await contract.functions.increment_counter(37).call();
    expect(incrementResult.toHex()).toEqual(toHex(1337));

    const { value: count } = await contract.functions.counter().get();
    expect(count.toHex()).toEqual(toHex(1337));
  });

  it('can access counter value with only provider (no wallet)', async () => {
    const contract = await setup();

    // Call contract
    await contract.functions.initialize_counter(1300).call();

    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const providerContract = new Contract(contract.id, contract.interface, provider);
    const { value } = await providerContract.functions.counter().get();
    expect(value.toHex()).toEqual(toHex(1300));
  });
});
