import { Provider } from '@fuel-ts/providers';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from './contract-factory';
import abi from './storage-test-contract/out/debug/storage-test-abi.json';

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Deploy contract
  const bytecode = readFileSync(
    join(__dirname, './storage-test-contract/out/debug/storage-test.bin')
  );
  const factory = new ContractFactory(bytecode, abi, provider);
  const contract = await factory.deployContract();

  return contract;
};

describe('StorageTestContract', () => {
  it('can increment counter', async () => {
    const contract = await setup();

    // Call contract
    const initializeResult = await contract.functions.initialize_counter(1300);
    expect(initializeResult.toNumber()).toEqual(1300);
    const incrementResult = await contract.functions.increment_counter(37);
    expect(incrementResult.toNumber()).toEqual(1337);

    const count = await contract.callStatic.counter();
    expect(count.toNumber()).toEqual(1337);
  });
});
