import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { seedWallet } from '@fuel-ts/wallet/dist/test-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from './contract-factory';

describe('Contract Factory', () => {
  const createContractFactory = async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = Wallet.generate({ provider });
    const bytecode = readFileSync(
      join(__dirname, './storage-test-contract/out/debug/storage-test.bin')
    );
    const abi = JSON.parse(
      readFileSync(
        join(__dirname, './storage-test-contract/out/debug/storage-test-abi.json')
      ).toString()
    );
    const factory = new ContractFactory(bytecode, abi, wallet);

    await seedWallet(wallet, [[1, NativeAssetId]]);

    return factory;
  };

  it('Creates a factory from inputs', async () => {
    const factory = await createContractFactory();

    const contact = await factory.deployContract();

    expect(contact.interface).toBeInstanceOf(Interface);

    await contact.functions.initialize_counter(41);

    const result = await contact.functions.increment_counter(1);

    expect(result).toEqual(42n);
  });

  it('Creates a contract with initial storage', async () => {
    const factory = await createContractFactory();
    const u64 = '0x1000000000000001';
    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const contact = await factory.deployContract([
      // Initialize counter with 1
      ['0x0000000000000000000000000000000000000000000000000000000000000000', u64],
      // Initialize b256 value
      ['0x0000000000000000000000000000000000000000000000000000000000000001', b256],
    ]);

    const result64 = await contact.functions.counter();
    expect(result64).toEqual(BigInt(u64));

    const result256 = await contact.functions.return_b256();
    expect(result256).toEqual(b256);
  });
});
