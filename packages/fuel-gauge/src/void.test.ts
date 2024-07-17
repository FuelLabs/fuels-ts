import type { DeployContractConfig } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';

import { VoidAbi__factory } from '../test/typegen';
import type { NativeEnumInput } from '../test/typegen/contracts/VoidAbi';
import VoidAbiHex from '../test/typegen/contracts/VoidAbi.hex';
import type { Option } from '../test/typegen/contracts/common';

/**
 * @group node
 */
describe('Void Tests', () => {
  const contractsConfigs = [
    {
      deployer: VoidAbi__factory,
      bytecode: VoidAbiHex,
    },
  ];

  it('should handle Option::None', async () => {
    using launched = await launchTestNode({ contractsConfigs });

    const {
      contracts: [voidContract],
    } = launched;

    const optionNone: Option<number> = undefined;

    const { waitForResult } = await voidContract.functions.echo_void(optionNone).call();
    const { value } = await waitForResult();

    expect(value).toEqual(optionNone);
  });

  it('should handle NativeEnum', async () => {
    using launched = await launchTestNode({ contractsConfigs });

    const {
      contracts: [voidContract],
    } = launched;

    const enumValue: NativeEnumInput = 'C' as NativeEnumInput;

    const { waitForResult } = await voidContract.functions.echo_native_enum(enumValue).call();
    const { value } = await waitForResult();

    expect(value).toEqual(enumValue);
  });
});
