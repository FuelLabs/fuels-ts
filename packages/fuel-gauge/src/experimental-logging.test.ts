import { randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import type { BN, Contract } from 'fuels';
import { bn, hexlify } from 'fuels';
import { join } from 'path';

import { setup } from './utils';

let contractInstance: Contract;
let gasPrice: BN;

const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;
const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const B512 =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

beforeAll(async () => {
  const contractName = 'logging';
  const path = join(
    __dirname,
    `../test/fixtures/forc-projects-experimental/${contractName}/out/release/${contractName}`
  );
  const contractBytecode = readFileSync(`${path}.bin`);
  const abi = JSON.parse(readFileSync(`${path}-abi.json`, 'utf8'));
  const versionedAbi = { encoding: 1, ...abi };

  contractInstance = await setup({ contractBytecode, abi: versionedAbi });

  ({ minGasPrice: gasPrice } = contractInstance.provider.getGasConfig());
});

/**
 * @group node
 */
describe('Experimental Logging', () => {
  it('logs u8', async () => {
    const expected = U8_MAX;

    const { logs } = await contractInstance.functions
      .log_u8(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs u16', async () => {
    const expected = U16_MAX;

    const { logs } = await contractInstance.functions
      .log_u16(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs u32', async () => {
    const expected = U32_MAX;

    const { logs } = await contractInstance.functions
      .log_u32(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs u8 u16 u32 multiple params', async () => {
    const expected = [U8_MAX, U16_MAX, U32_MAX];

    const { value, logs } = await contractInstance.functions
      .log_u8_u16_u32(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toEqual(expected);
    expect(logs).toEqual(expected);
  });

  it('logs u64', async () => {
    const expected = U32_MAX + 1;

    const { logs } = await contractInstance.functions
      .log_u64(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(bn(logs[0]).toNumber()).toStrictEqual(expected);
  });

  it('logs u64 u8 multiple params', async () => {
    const expected = [U32_MAX + 1, U8_MAX];

    const { logs } = await contractInstance.functions
      .log_u64_u8(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(bn(logs[0]).toNumber()).toStrictEqual(expected[0]);
    expect(logs[1]).toEqual(expected[1]);
  });

  it('logs boolean', async () => {
    const expected = true;

    const { logs } = await contractInstance.functions
      .log_boolean(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs boolean boolean multiple params', async () => {
    const expected = [true, false];

    const { logs } = await contractInstance.functions
      .log_boolean_boolean(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs number boolean mixed params', async () => {
    const expected = [U32_MAX, true];

    const { logs } = await contractInstance.functions
      .log_number_boolean(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs b256', async () => {
    const expected = B256;

    const { logs } = await contractInstance.functions
      .log_b256(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs b512', async () => {
    const expected = B512;

    const { logs } = await contractInstance.functions
      .log_b512(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toStrictEqual([expected]);
  });

  it('logs b256 b512 multiple params', async () => {
    const expected = [B256, B512];

    const { logs } = await contractInstance.functions
      .log_b256_b512(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs u8 vec', async () => {
    const expected = [U8_MAX, 1, U8_MAX, 5];

    const { logs } = await contractInstance.functions
      .log_vec_u8(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs b256 vec', async () => {
    const expected = [hexlify(randomBytes(32)), hexlify(randomBytes(32))];

    const { logs } = await contractInstance.functions
      .log_vec_b256(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs bytes', async () => {
    const expected = [40, 41, 42];

    const { logs } = await contractInstance.functions
      .log_bytes(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([Uint8Array.from(expected)]);
  });

  it('logs StdString', async () => {
    const expected = 'hello world';

    const { logs } = await contractInstance.functions
      .log_std_string(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs u16 bytes multiple params', async () => {
    const expected = [U16_MAX, [40, 41, 42]];

    const { logs } = await contractInstance.functions
      .log_u16_bytes(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([U16_MAX, Uint8Array.from([40, 41, 42])]);
  });

  it('logs u8 array', async () => {
    const expected = [U8_MAX, 5, U8_MAX];

    const { logs } = await contractInstance.functions
      .log_u8_array(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs u16 array', async () => {
    const expected = [U16_MAX, 5, U16_MAX];

    const { logs } = await contractInstance.functions
      .log_u16_array(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('log u16 u8 array multiple params', async () => {
    const expected = [U16_MAX, [U8_MAX, 5, U8_MAX]];

    const { logs } = await contractInstance.functions
      .log_u16_u8_array(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs string', async () => {
    const expected = 'fuel';

    const { logs } = await contractInstance.functions
      .log_str_4(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs u8 string multiple params', async () => {
    const expected = [U8_MAX, 'at'];

    const { logs } = await contractInstance.functions
      .log_u8_str_2(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs u8 u16 tuple', async () => {
    const expected = [U8_MAX, U16_MAX];

    const { logs } = await contractInstance.functions
      .log_u8_u16_tuple(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs enum', async () => {
    const expectedFoo = { Foo: U32_MAX };
    const expectedBar = { Bar: true };

    const { logs: logsFoo } = await contractInstance.functions
      .log_enum(expectedFoo)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const { logs: logsBar } = await contractInstance.functions
      .log_enum(expectedBar)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logsFoo).toEqual([expectedFoo]);
    expect(logsBar).toEqual([expectedBar]);
  });

  it('logs native enum', async () => {
    const expectedFoo = 'Foo';
    const expectedBar = 'Bar';

    const { logs: logsFoo } = await contractInstance.functions
      .log_native_enum(expectedFoo)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const { logs: logsBar } = await contractInstance.functions
      .log_native_enum(expectedBar)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logsFoo).toEqual([expectedFoo]);
    expect(logsBar).toEqual([expectedBar]);
  });

  it('logs boolean enum multiple params', async () => {
    const expected = [true, { Foo: U32_MAX }];

    const { logs } = await contractInstance.functions
      .log_boolean_enum(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs struct', async () => {
    const expected = {
      a: U8_MAX,
      b: U16_MAX,
    };

    const { logs } = await contractInstance.functions
      .log_struct(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs struct vec', async () => {
    const expected = [
      {
        a: U8_MAX,
        b: U16_MAX,
      },
      {
        a: 1,
        b: 2,
      },
    ];

    const { logs } = await contractInstance.functions
      .log_struct_vec(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  it('logs struct boolean multiple params', async () => {
    const expected = [
      {
        a: U8_MAX,
        b: U16_MAX,
      },
      true,
    ];

    const { logs } = await contractInstance.functions
      .log_struct_boolean(...expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual(expected);
  });

  it('logs u8 option', async () => {
    const expectedSome = U8_MAX;
    const expectedNone = undefined;

    const { logs: logsSome } = await contractInstance.functions
      .log_option_u8(expectedSome)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const { logs: logsNone } = await contractInstance.functions
      .log_option_u8(expectedNone)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logsSome).toEqual([expectedSome]);
    expect(logsNone).toEqual([expectedNone]);
  });

  it('logs raw slice', async () => {
    const expected = [40, 41, 42];

    const { logs } = await contractInstance.functions
      .log_raw_slice(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });

  // Requires v1 encoding to be supported for contract calls
  it.skip('logs str slice', async () => {
    const expected = 'fuel';

    const { logs } = await contractInstance.functions
      .log_str_slice(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(logs).toEqual([expected]);
  });
});
