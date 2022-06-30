import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import Contract from '../contract';
import ContractFactory from '../contract-factory';

import abi from './out/debug/storage-test-abi.json';

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(join(__dirname, './out/debug/storage-test.bin'));
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

describe('StorageTestContract', () => {
  it('can increment counter', async () => {
    const contract = await setup();

    // Call contract
    const initializeResult = await contract.submit.initialize_counter(1300);
    expect(initializeResult).toEqual(1300n);
    const incrementResult = await contract.submit.increment_counter(37);
    expect(incrementResult).toEqual(1337n);

    const count = await contract.dryRun.counter();
    expect(count).toEqual(1337n);
  });

  it('can access counter value with only provider (no wallet)', async () => {
    const contract = await setup();

    // Call contract
    await contract.submit.initialize_counter(1300);

    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const providerContract = new Contract(contract.id, contract.interface, provider);
    const countProvider = await providerContract.dryRun.counter();
    expect(countProvider).toEqual(1300n);
  });
});
