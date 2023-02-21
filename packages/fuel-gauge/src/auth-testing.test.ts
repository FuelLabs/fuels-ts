import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import { Bech32, ContractFactory, NativeAssetId, Provider } from 'fuels';
import path from 'path';

import FactoryAbi from '../test-projects/auth_testing_contract/out/debug/auth_testing_contract-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(
        __dirname,
        '../test-projects/auth_testing_contract/out/debug/auth_testing_contract.bin'
      )
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const { value } = await contractInstance.functions
      .check_msg_sender({ value: Bech32.toB256(wallet.address) })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id, using get]', async () => {
    expect(async () => {
      await contractInstance.functions
        .check_msg_sender({ value: Bech32.toB256(wallet.address) })
        .get();
    }).rejects.toThrow(/Script returned non-zero result/);
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    expect(async () => {
      await contractInstance.functions
        .check_msg_sender({ value: Bech32.toB256(wallet.address).replace('a', 'b') })
        .call();
    }).rejects.toThrow(/Script returned non-zero result/);
  });
});
