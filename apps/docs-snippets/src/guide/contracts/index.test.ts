import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesAbi__factory } from '../../../test/typegen';
import EchoValuesAbiHex from '../../../test/typegen/contracts/EchoValuesAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('Contract echo values', () => {
  it('should successfully call contract and echo values', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoValuesAbi__factory,
          bytecode: EchoValuesAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;
    // #region echo-values
    const u8Value = 10;
    const str8Value = 'fuel-sdk';

    const res1 = await contract.functions.echo_u8(u8Value).simulate();
    const res2 = await contract.functions.echo_str_8(str8Value).simulate();

    expect(res1.value).toBe(u8Value);
    expect(res2.value).toBe(str8Value);
    // #endregion echo-values
  });
});
