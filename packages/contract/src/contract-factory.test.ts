import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { seedWallet } from '@fuel-ts/wallet/dist/test-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from './contract-factory';

describe('Contract Factory', () => {
  it('creates a factory from inputs', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = Wallet.generate({ provider });
    await seedWallet(wallet, [{ assetId: NativeAssetId, amount: 1 }]);
    const bytecode = readFileSync(
      join(__dirname, './storage-test-contract/out/debug/storage-test.bin')
    );
    const abi = [
      {
        type: 'function',
        name: 'initialize_counter',
        inputs: [{ name: 'value', type: 'u64' }],
        outputs: [{ name: 'ret', type: 'u64' }],
      },
      {
        type: 'function',
        name: 'increment_counter',
        inputs: [{ name: 'amount', type: 'u64' }],
        outputs: [{ name: 'ret', type: 'u64' }],
      },
    ];

    const factory = new ContractFactory(bytecode, abi, wallet);

    const contact = await factory.deployContract();

    expect(contact.interface).toBeInstanceOf(Interface);

    await contact.functions.initialize_counter(41);

    const result = await contact.functions.increment_counter(1);

    expect(result).toEqual(BigNumber.from(42));
  });
});
