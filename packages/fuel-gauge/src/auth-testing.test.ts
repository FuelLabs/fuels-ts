import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import {
  AssertFailedRevertError,
  ContractFactory,
  BaseAssetId,
  Provider,
  getRandomB256,
} from 'fuels';
import path from 'path';

import FactoryAbi from '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(
        __dirname,
        '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract.bin'
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
      .check_msg_sender({ value: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await expect(
      contractInstance.functions.check_msg_sender({ value: getRandomB256() }).call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
