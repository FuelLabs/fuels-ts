import type { BigNumberish } from 'fuels';
import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { LogValuesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Contract Logs', () => {
  it('should successfully execute contract call with forwarded amount', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: LogValuesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region log-2
    const value1 = 500;
    const value2 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
    const value3 = 'Fuel';
    const value4: [BigNumberish, BigNumberish, BigNumberish] = [1, 2, 3];

    const { waitForResult } = await contract.functions
      .log_values(value1, value2, value3, value4)
      .call();

    const { logs } = await waitForResult();

    expect(new BN(logs[0]).toNumber()).toBe(value1);
    expect(logs[1]).toBe(value2);
    expect(logs[2]).toBe(value3);
    expect(logs[3]).toEqual(value4);
    // #endregion log-2
  });
});
