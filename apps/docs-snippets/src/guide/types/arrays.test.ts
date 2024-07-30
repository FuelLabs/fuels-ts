import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoU64ArrayAbi__factory } from '../../../test/typegen';
import EchoU64ArrayAbiHex from '../../../test/typegen/contracts/EchoU64ArrayAbi.hex';

/**
 * @group node
 * @group browser
 */
describe(__filename, () => {
  it('should successfully demonstrate typed arrays examples', () => {
    // #region arrays-1
    const numberArray: number[] = [1, 2, 3, 4, 5]; // in Sway: [u8; 5]

    const boolArray: boolean[] = [true, false, true]; // in Sway: [bool; 3]
    // #endregion arrays-1

    expect(numberArray).toHaveLength(5);
    expect(boolArray).toHaveLength(3);
  });

  it('should successfully execute echo u64 array contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoU64ArrayAbi__factory,
          bytecode: EchoU64ArrayAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;
    // #region arrays-2
    const u64Array = [10000000, 20000000];

    // This expects two arguments
    // #TODO: Argument of type 'number[]' is not assignable to parameter of type '[BigNumberish, BigNumberish]'.
    const { value } = await contract.functions.echo_u64_array(u64Array).simulate();

    expect(new BN(value[0]).toNumber()).toEqual(u64Array[0]);

    expect(new BN(value[1]).toNumber()).toEqual(u64Array[1]);
    // #endregion arrays-2
  });

  it('should throw an error for array length mismatch', async () => {
    let error: unknown;
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoU64ArrayAbi__factory,
          bytecode: EchoU64ArrayAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;
    try {
      // #region arrays-3
      // will throw error because the array length is not 2
      // #TODO: Argument of type 'number[]' is not assignable to parameter of type '[BigNumberish, BigNumberish]'.
      await contract.functions.echo_u64_array([10000000]).simulate();
      // #endregion arrays-3
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('should throw an error for array type mismatch', async () => {
    let error: unknown;
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoU64ArrayAbi__factory,
          bytecode: EchoU64ArrayAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;
    try {
      // #region arrays-4
      // will throw error because the second element is not of type u64
      await contract.functions.echo_u64_array([10000000, 'a']).simulate();
      // #endregion arrays-4
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });
});
