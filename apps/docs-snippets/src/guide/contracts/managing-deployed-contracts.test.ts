import { Contract } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesAbi__factory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Managing deployed contracts', () => {
  it('should successfully interact with a deployed contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoValuesAbi__factory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    // #region managing-deployed-contracts-1
    const deployedContract = new Contract(contract.id, EchoValuesAbi__factory.abi, wallet);

    const { value } = await deployedContract.functions.echo_u8(10).simulate();

    expect(value).toEqual(10);
    // #endregion managing-deployed-contracts-1
  });

  it('should successfully interact with a deployed contract [hexed contract id]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoValuesAbi__factory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const b256 = contract.id.toB256();

    // #region managing-deployed-contracts-2
    // #context const b256 = '0x50007a55ccc29075bc0e9c0ea0524add4a7ed4f91afbe1fdcc661caabfe4a82f';

    const deployedContract = new Contract(b256, EchoValuesAbi__factory.abi, wallet);

    const { value } = await deployedContract.functions.echo_u8(50).simulate();

    expect(value).toEqual(50);
    // #endregion managing-deployed-contracts-2
  });
});
