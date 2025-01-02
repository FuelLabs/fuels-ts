import type { BigNumberish } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import type { Option } from '../test/typegen/common';
import type { DeepStructInput } from '../test/typegen/contracts/Options';
import { OptionsFactory } from '../test/typegen/contracts/OptionsFactory';

import { launchTestContract } from './utils';

const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;

function launchOptionsContract() {
  return launchTestContract({
    factory: OptionsFactory,
  });
}

type DoubleTupleOptions = [Option<BigNumberish>, Option<BigNumberish>];
type TripleTupleOptions = [Option<BigNumberish>, Option<BigNumberish>, Option<BigNumberish>];

/**
 * @group node
 * @group browser
 */
describe('Options Tests', () => {
  it('calls', async () => {
    using contract = await launchOptionsContract();

    const { waitForResult } = await contract.functions.print_enum_option_array().call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual({
      inner: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    });
  });

  it('echos u8 option', async () => {
    using contract = await launchOptionsContract();

    const someInput = U8_MAX;
    const call1 = await contract.functions.echo_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toBe(someInput);

    const noneInput = undefined;
    const call2 = await contract.functions.echo_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toBe(noneInput);
  });

  it('echos struct enum option', async () => {
    using contract = await launchOptionsContract();

    const someInput = {
      one: {
        a: U8_MAX,
      },
      two: U32_MAX,
    };
    const call1 = await contract.functions.echo_struct_enum_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toStrictEqual(someInput);

    const noneInput = {
      one: {
        a: undefined,
      },
      two: undefined,
    };
    const call2 = await contract.functions.echo_struct_enum_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toStrictEqual(noneInput);
  });

  it('echos vec option', async () => {
    using contract = await launchOptionsContract();

    const someInput = [U8_MAX, U16_MAX, U32_MAX];
    const call1 = await contract.functions.echo_vec_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined, undefined];
    const call2 = await contract.functions.echo_vec_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined, U32_MAX];
    const call3 = await contract.functions.echo_vec_option(mixedInput).call();
    const { value: mixedValue } = await call3.waitForResult();
    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echos tuple option', async () => {
    using contract = await launchOptionsContract();

    const someInput: DoubleTupleOptions = [U8_MAX, U16_MAX];
    const call1 = await contract.functions.echo_tuple_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toStrictEqual(someInput);

    const noneInput: DoubleTupleOptions = [undefined, undefined];
    const call2 = await contract.functions.echo_tuple_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput: DoubleTupleOptions = [U8_MAX, undefined];
    const call3 = await contract.functions.echo_tuple_option(mixedInput).call();
    const { value: mixedValue } = await call3.waitForResult();
    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echoes enum option', async () => {
    using contract = await launchOptionsContract();

    const someInput = { a: U8_MAX };
    const call1 = await contract.functions.echo_enum_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toStrictEqual(someInput);

    const noneInput = { b: undefined };
    const call2 = await contract.functions.echo_enum_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toStrictEqual(noneInput);
  });

  it('echos array option', async () => {
    using contract = await launchOptionsContract();

    const someInput: TripleTupleOptions = [U8_MAX, U16_MAX, 123];
    const call1 = await contract.functions.echo_array_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();
    expect(someValue).toStrictEqual(someInput);

    const noneInput: TripleTupleOptions = [undefined, undefined, undefined];
    const call2 = await contract.functions.echo_array_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();
    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput: TripleTupleOptions = [U8_MAX, undefined, 123];
    const call3 = await contract.functions.echo_array_option(mixedInput).call();
    const { value: mixedValue } = await call3.waitForResult();
    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echoes deeply nested option', async () => {
    using contract = await launchOptionsContract();

    const input: DeepStructInput = {
      DeepEnum: {
        a: [true, [U8_MAX, undefined, 123]],
      },
    };
    const { waitForResult } = await contract.functions.echo_deeply_nested_option(input).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(input);
  });

  it('prints struct option', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: OptionsFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const input = { Address: { bits: wallet.address.toB256() } };
    const { waitForResult } = await contract.functions.get_some_struct(input).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(undefined);
  });

  it('echoes option enum diff sizes', async () => {
    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_enum_diff_sizes().call();
    const { value: value1 } = await call1.waitForResult();
    expect(value1).toStrictEqual(undefined);

    const call2 = await contract.functions.echo_enum_diff_sizes(undefined).call();
    const { value: value2 } = await call2.waitForResult();
    expect(value2).toStrictEqual(undefined);

    const call3 = await contract.functions.echo_enum_diff_sizes({ a: U8_MAX }).call();
    const { value: value3 } = await call3.waitForResult();
    expect(value3).toStrictEqual({ a: U8_MAX });

    const call4 = await contract.functions
      .echo_enum_diff_sizes({
        b: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
      })
      .call();
    const { value: value4 } = await call4.waitForResult();
    expect(value4).toStrictEqual({
      b: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
    });
  });

  it('should handle Option::None', async () => {
    using contract = await launchOptionsContract();

    const optionNone: Option<number> = undefined;
    const call1 = await contract.functions.type_then_option_then_type(42, optionNone, 43).call();
    const { value: value1 } = await call1.waitForResult();
    expect(value1).toStrictEqual(optionNone);
  });

  it('should handle optional options', async () => {
    using contract = await launchOptionsContract();

    const optionNone: Option<number> = undefined;
    const call1 = await contract.functions.option_then_type_then_option(optionNone, 42).call();
    const { value: value1 } = await call1.waitForResult();
    expect(value1).toStrictEqual(optionNone);

    const call2 = await contract.functions
      .option_then_type_then_option(optionNone, 42, optionNone)
      .call();
    const { value: value2 } = await call2.waitForResult();
    expect(value2).toStrictEqual(optionNone);
  });
});
