import { TestUtils } from '@fuel-ts/wallet';
import fs from 'fs';
import { ContractFactory, NativeAssetId, Provider } from 'fuels';
import path from 'path';

import { ExampleContractAbi__factory } from './example-contract-types';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, '../out/debug/example-contract.bin'));
    const factory = new ContractFactory(bytecode, ExampleContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const result = await contract.submit.return_input(1337);

    // Assert
    expect(result).toEqual(1337n);

    // Try co call from the factory
    const contractInstance = ExampleContractAbi__factory.connect(contract.id, wallet);
    const resultInstance = await contractInstance.submit.return_input(1337);

    expect(resultInstance).toBe(1337n);
  });
});
