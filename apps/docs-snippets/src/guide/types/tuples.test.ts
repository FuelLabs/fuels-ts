import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesAbi__factory } from '../../../test/typegen';
import EchoValuesAbiHex from '../../../test/typegen/contracts/EchoValuesAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('Tuples Types', () => {
  it('should successfully echo tuple in a contract call', async () => {
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

    // #region tuples-1
    // Sway let tuple2: (u8, bool, u64) = (100, false, 10000);
    // #region tuples-3
    const tuple: [number, boolean, number] = [100, false, 10000];
    // #endregion tuples-1

    const { value } = await contract.functions.echo_tuple(tuple).simulate();

    expect(tuple).toEqual([value[0], value[1], new BN(value[2]).toNumber()]);
    // #endregion tuples-3
  });
});
