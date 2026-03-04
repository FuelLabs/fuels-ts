import { launchTestNode } from 'fuels/test-utils';

import { VoidFactory } from '../test/typegen';
import type { NativeEnumInput } from '../test/typegen/contracts/Void';
import type { Option } from '../test/typegen/contracts/common';

/**
 * @group node
 * @group browser
 */
describe('Void Tests', () => {
  const contractsConfigs = [
    {
      factory: VoidFactory,
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

  it('should handle input arguments of type [42, void]', async () => {
    using launched = await launchTestNode({ contractsConfigs });

    const {
      contracts: [voidContract],
    } = launched;

    const voidTypeValue: undefined = undefined;

    const { waitForResult: call1 } = await voidContract.functions.type_then_void(42).call();
    const { value: value1 } = await call1();
    expect(value1).toEqual(undefined);

    const { waitForResult: call2 } = await voidContract.functions
      .type_then_void(42, undefined)
      .call();
    const { value: value2 } = await call2();
    expect(value2).toEqual(voidTypeValue);
  });

  it('should handle input arguments of type [42, void, 43]', async () => {
    using launched = await launchTestNode({ contractsConfigs });

    const {
      contracts: [voidContract],
    } = launched;

    const voidTypeValue: undefined = undefined;

    const { waitForResult } = await voidContract.functions
      .type_then_void_then_type(42, voidTypeValue, 43)
      .call();
    const { value } = await waitForResult();

    expect(value).toEqual(voidTypeValue);
  });
});
