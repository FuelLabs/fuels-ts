import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { AssertFailedRevertError, getRandomB256 } from 'fuels';

import { getContractDir } from './utils';

const authTestingDir = getContractDir('auth_testing_contract');

/**
 * @group node
 */
describe('Auth Testing', () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('can get is_caller_external', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [authTestingDir],
    });
    const {
      contracts: [contractInstance],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const { value } = await contractInstance.functions
      .is_caller_external()
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [authTestingDir],
    });
    const {
      contracts: [contractInstance],
      wallets: [wallet],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [authTestingDir],
    });
    const {
      contracts: [contractInstance],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    await expect(
      contractInstance.functions
        .check_msg_sender({ value: getRandomB256() })
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
