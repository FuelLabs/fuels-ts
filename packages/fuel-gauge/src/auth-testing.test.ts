import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { BN, Contract, WalletUnlocked } from 'fuels';
import {
  AssertFailedRevertError,
  ContractFactory,
  BaseAssetId,
  Provider,
  getRandomB256,
  FUEL_NETWORK_URL,
} from 'fuels';
import path from 'path';

import FactoryAbi from '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;
let gasPrice: BN;

/**
 * @group node
 */
describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
    wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(
        __dirname,
        '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract.bin'
      )
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract({ gasPrice });
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions
      .is_caller_external()
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await expect(
      contractInstance.functions
        .check_msg_sender({ value: getRandomB256() })
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
