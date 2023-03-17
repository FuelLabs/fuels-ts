// #region typedoc:Testing-with-jest
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import { ContractFactory, Provider, toHex } from 'fuels';
import { NativeAssetId } from 'fuels/configs';
import path from 'path';

import { ExampleContractAbi__factory } from './example-contract-types';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, '../out/debug/example-contract.bin'));
    const factory = new ContractFactory(bytecode, ExampleContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = ExampleContractAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(1337).call();
    expect(v2.toHex()).toBe(toHex(1337));
  });
});
// #endregion
