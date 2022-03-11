import { seedWallet } from '@fuel-ts/wallet/dist/test-utils';
import fs from 'fs';
import { ContractFactory, NativeAssetId, Provider, Wallet } from 'fuels';
import path from 'path';

import { ExampleContractAbi__factory } from './example-contract-types';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = Wallet.generate({ provider });
    await seedWallet(wallet, [{ assetId: NativeAssetId, amount: 1 }]);

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, '../out/debug/example-contract.bin'));
    const factory = new ContractFactory(bytecode, ExampleContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const result = await contract.functions.return_input(1337);

    // Assert
    expect(result.toNumber()).toEqual(1337);
  });
});
