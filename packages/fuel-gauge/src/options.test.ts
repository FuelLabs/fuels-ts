import type { Contract } from 'fuels';

import { getSetupContract } from './utils';

const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;

const setupContract = getSetupContract('options');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

/**
 * @group node
 */
describe('Options Tests', () => {
  it('echos u8 option', async () => {
    const someInput = U8_MAX;
    const noneInput = undefined;

    const { value: someValue } = await contractInstance.functions.echo_option(someInput).call();

    expect(someValue).toBe(someInput);

    const { value: noneValue } = await contractInstance.functions.echo_option(noneInput).call();

    expect(noneValue).toBe(noneInput);
  });

  it('echos struct enum option', async () => {
    const someInput = {
      one: {
        a: U8_MAX,
      },
      two: U32_MAX,
    };

    const { value: someValue } = await contractInstance.functions
      .echo_struct_enum_option(someInput)
      .call();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = {
      one: {
        a: undefined,
      },
      two: undefined,
    };

    const { value: noneValue } = await contractInstance.functions
      .echo_struct_enum_option(noneInput)
      .call();

    expect(noneValue).toStrictEqual(noneInput);
  });

  it('echos vec option', async () => {
    const someInput = [U8_MAX, U16_MAX, U32_MAX];

    const { value: someValue } = await contractInstance.functions.echo_vec_option(someInput).call();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined, undefined];

    const { value: noneValue } = await contractInstance.functions.echo_vec_option(noneInput).call();

    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined, U32_MAX];

    const { value: mixedValue } = await contractInstance.functions
      .echo_vec_option(mixedInput)
      .call();

    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echos tuple option', async () => {
    const someInput = [U8_MAX, U16_MAX];

    const { value: someValue } = await contractInstance.functions
      .echo_tuple_option(someInput)
      .call();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined];

    const { value: noneValue } = await contractInstance.functions
      .echo_tuple_option(noneInput)
      .call();

    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined];

    const { value: mixedValue } = await contractInstance.functions
      .echo_tuple_option(mixedInput)
      .call();

    expect(mixedValue).toStrictEqual(mixedInput);
  });

  it('echoes enum option', async () => {
    const someInput = { a: U8_MAX };

    const { value: someValue } = await contractInstance.functions
      .echo_enum_option(someInput)
      .call();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = { b: undefined };

    const { value: noneValue } = await contractInstance.functions
      .echo_enum_option(noneInput)
      .call();

    expect(noneValue).toStrictEqual(noneInput);
  });

  it('echos array option', async () => {
    const someInput = [U8_MAX, U16_MAX, 123];

    const { value: someValue } = await contractInstance.functions
      .echo_array_option(someInput)
      .call();

    expect(someValue).toStrictEqual(someInput);

    const noneInput = [undefined, undefined, undefined];

    const { value: noneValue } = await contractInstance.functions
      .echo_array_option(noneInput)
      .call();

    expect(noneValue).toStrictEqual(noneInput);

    const mixedInput = [U8_MAX, undefined, 123];

    const { value: mixedValue } = await contractInstance.functions
      .echo_array_option(mixedInput)
      .call();

    expect(mixedValue).toStrictEqual(mixedInput);
  });
});
