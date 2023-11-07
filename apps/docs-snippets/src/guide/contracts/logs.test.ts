import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { Contract, Provider } from 'fuels';
import { BN } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject, getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully execute contract call with forwarded amount', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir(SnippetProjectEnum.LOG_VALUES)],
    });
    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region log-2
    const value1 = 500;
    const value2 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
    const value3 = 'Fuel';
    const value4 = [1, 2, 3];

    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    const { logs } = await contract.functions
      .log_values(value1, value2, value3, value4)
      .txParams({ gasPrice: minGasPrice, gasLimit: maxGasPerTx })
      .call();

    expect(new BN(logs[0]).toNumber()).toBe(value1);
    expect(logs[1]).toBe(value2);
    expect(logs[2]).toBe(value3);
    expect(logs[3]).toEqual(value4);
    // #endregion log-2
  });
});
