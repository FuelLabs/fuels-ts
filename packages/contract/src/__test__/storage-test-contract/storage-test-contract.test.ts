import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import Contract from '../../contracts/contract';
import ContractFactory from '../../contracts/contract-factory';

import abi from './out/debug/storage-test-abi.json';
import storageSlots from './out/debug/storage-test-storage_slots.json';

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(join(__dirname, './out/debug/storage-test.bin'));
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
    expect(initializeResult).toEqual(1300n);
    const { value: incrementResult } = await contract.functions.increment_counter(37).call();
    expect(incrementResult).toEqual(1337n);

    const { value: count } = await contract.functions.counter().get();
    expect(count).toEqual(1337n);
  });

  it('can access counter value with only provider (no wallet)', async () => {
    const contract = await setup();

    // Call contract
    await contract.functions.initialize_counter(1300).call();

    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const providerContract = new Contract(contract.id, contract.interface, provider);
    const { value } = await providerContract.functions.counter().get();
    expect(value).toEqual(1300n);
  });

  it('should storage vars be initialized', async () => {
    const contract = await setup();

    const { value: var1 } = await contract.functions.return_var1().call();
    expect(var1).toEqual(10n);

    const { value: var2 } = await contract.functions.return_var2().call();
    expect(var2).toEqual(20);

    const { value: var3 } = await contract.functions.return_var3().call();
    expect(var3).toEqual(30);

    const { value: var4 } = await contract.functions.return_var4().call();
    expect(var4).toEqual(true);

    const { value: var5 } = await contract.functions.return_var5().call();
    expect(var5).toEqual({
      v1: true,
      v2: 50n,
    });
  });
});
