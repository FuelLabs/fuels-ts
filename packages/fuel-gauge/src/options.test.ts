import { launchTestNode } from 'fuels/test-utils';

import { OptionsAbi__factory } from '../test/typegen/contracts';
import OptionsAbiHex from '../test/typegen/contracts/OptionsAbi.hex';

import { launchTestContract } from './utils';

const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;

function launchOptionsContract() {
  return launchTestContract({
    bytecode: OptionsAbiHex,
    deployer: OptionsAbi__factory,
  });
}

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
    const someInput = U8_MAX;
    const noneInput = undefined;

    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();

    expect(someValue).toBe(someInput);

    const call2 = await contract.functions.echo_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();

    expect(noneValue).toBe(noneInput);
  });

  it('echos struct enum option', async () => {
    const someInput = {
      one: {
        a: U8_MAX,
      },
      two: U32_MAX,
    };

    using contract = await launchOptionsContract();

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
    const someInput = [U8_MAX, U16_MAX, U32_MAX];

    using contract = await launchOptionsContract();

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
    const someInput = [U8_MAX, U16_MAX];

    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_tuple_option(someInput).call();

    const { value: someValue } = await call1.waitForResult();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined];

    const call2 = await contract.functions.echo_tuple_option(noneInput).call();

    const { value: noneValue } = await call2.waitForResult();

    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined];

    const call3 = await contract.functions.echo_tuple_option(mixedInput).call();

    const { value: mixedValue } = await call3.waitForResult();

    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echoes enum option', async () => {
    const someInput = { a: U8_MAX };

    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_enum_option(someInput).call();

    const { value: someValue } = await call1.waitForResult();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = { b: undefined };

    const call2 = await contract.functions.echo_enum_option(noneInput).call();

    const { value: noneValue } = await call2.waitForResult();

    expect(noneValue).toStrictEqual(noneInput);
  });

  it('echos array option', async () => {
    const someInput = [U8_MAX, U16_MAX, 123];

    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_array_option(someInput).call();
    const { value: someValue } = await call1.waitForResult();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined, undefined];

    const call2 = await contract.functions.echo_array_option(noneInput).call();
    const { value: noneValue } = await call2.waitForResult();

    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined, 123];

    const call3 = await contract.functions.echo_array_option(mixedInput).call();
    const { value: mixedValue } = await call3.waitForResult();

    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echoes deeply nested option', async () => {
    const input = {
      DeepEnum: {
        a: [true, [U8_MAX, undefined, 123]],
      },
    };

    using contract = await launchOptionsContract();
    const { waitForResult } = await contract.functions.echo_deeply_nested_option(input).call();

    const { value } = await waitForResult();

    expect(value).toStrictEqual(input);
  });

  it('prints struct option', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: OptionsAbi__factory,
          bytecode: OptionsAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const { waitForResult } = await contract.functions
      .get_some_struct({ Address: { bits: wallet.address.toB256() } })
      .call();

    const { value } = await waitForResult();

    expect(value).toStrictEqual(undefined);
  });

  it('echoes option enum diff sizes', async () => {
    using contract = await launchOptionsContract();

    const call1 = await contract.functions.echo_enum_diff_sizes(undefined).call();
    const { value } = await call1.waitForResult();

    expect(value).toStrictEqual(undefined);

    const call2 = await contract.functions.echo_enum_diff_sizes({ a: U8_MAX }).call();
    const { value: value2 } = await call2.waitForResult();

    expect(value2).toStrictEqual({ a: U8_MAX });

    const call3 = await contract.functions
      .echo_enum_diff_sizes({
        b: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
      })
      .call();

    const { value: value3 } = await call3.waitForResult();

    expect(value3).toStrictEqual({
      b: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
    });
  });
});
