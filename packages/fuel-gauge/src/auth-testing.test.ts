import { setupTestProvider , generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Provider } from 'fuels';
import { AssertFailedRevertError, ContractFactory, BaseAssetId, getRandomB256 } from 'fuels';
import path from 'path';

import FactoryAbi from '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract-abi.json';

describe('Auth Testing', () => {
  const setup = async (provider: Provider) => {
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(
        __dirname,
        '../fixtures/forc-projects/auth_testing_contract/out/debug/auth_testing_contract.bin'
      )
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    const contractInstance = await factory.deployContract();

    return { wallet, contractInstance };
  };
  beforeAll(async () => {});

  it('can get is_caller_external', async () => {
    using provider = await setupTestProvider();
    const { contractInstance } = await setup(provider);

    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    using provider = await setupTestProvider();
    const { wallet, contractInstance } = await setup(provider);

    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    using provider = await setupTestProvider();
    const { contractInstance } = await setup(provider);

    await expect(
      contractInstance.functions.check_msg_sender({ value: getRandomB256() }).call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
