import { AssertFailedRevertError, getRandomB256, TestNodeLauncher } from 'fuels';

import { getContractPath } from './utils';

const authTestingPath = getContractPath('auth_testing_contract');

describe('Auth Testing', () => {
  it('can get is_caller_external', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: authTestingPath }],
    });

    const {
      contracts: [contractInstance],
    } = nodeLauncherResult;

    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: authTestingPath }],
    });

    const {
      contracts: [contractInstance],
      wallets: [wallet],
    } = nodeLauncherResult;

    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await using nodeLauncherResult = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: authTestingPath }],
    });

    const {
      contracts: [contractInstance],
    } = nodeLauncherResult;

    await expect(
      contractInstance.functions.check_msg_sender({ value: getRandomB256() }).call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
