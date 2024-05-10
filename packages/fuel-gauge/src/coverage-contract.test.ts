import type { BN, Contract, Message } from 'fuels';
import {
  FUEL_NETWORK_URL,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  arrayify,
  bn,
  hexlify,
  randomBytes,
  toHex,
} from 'fuels';

import { getSetupContract } from './utils';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const U256_MAX = bn(2).pow(256).sub(1);
const B256 =
  '0x000000000000000000000000000000000000000000000000000000000000002a';
const B512 =
  '0x059bc9c43ea1112f3eb2bd30415de72ed24c1c4416a1316f0f48cc6f958073f42a6d8c12e4829826316d8dcf444498717b5a2fbf27defac367271065f6a1d4a5';

const setupContract = getSetupContract('coverage-contract');

let contractInstance: Contract;
let baseAssetId: string;
beforeAll(async () => {
  contractInstance = await setupContract();
  baseAssetId = contractInstance.provider.getBaseAssetId();
});

enum SmallEnum {
  Empty = 'Empty',
}

enum ColorEnumInput {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

enum ColorEnumOutput {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

/**
 * @group node
 */
describe('Coverage Contract', () => {
  it('can return outputs', async () => {
    // Call contract methods
    expect((await contractInstance.functions.get_id().call()).value).toEqual(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    );
    expect(
      (
        await contractInstance.functions
          .get_small_string()

          .call()
      ).value,
    ).toEqual('gggggggg');
    expect(
      (
        await contractInstance.functions
          .get_large_string()

          .call()
      ).value,
    ).toEqual('ggggggggg');
    expect(
      (
        await contractInstance.functions
          .get_u32_struct()

          .call()
      ).value,
    ).toStrictEqual({
      foo: 100,
    });
    expect(
      (
        await contractInstance.functions
          .get_large_struct()

          .call()
      ).value,
    ).toStrictEqual({
      foo: 12,
      bar: 42,
    });
    expect(
      (
        await contractInstance.functions
          .get_large_array()

          .call()
      ).value,
    ).toStrictEqual([1, 2]);
    expect(
      (
        await contractInstance.functions
          .get_empty_enum()

          .call()
      ).value,
    ).toStrictEqual(SmallEnum.Empty);
    expect(
      (
        await contractInstance.functions
          .get_contract_id()

          .call()
      ).value,
    ).toStrictEqual({
      bits: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    });
    expect(
      (
        await contractInstance.functions
          .get_some_option_u8()

          .call()
      ).value,
    ).toEqual(113);
    expect(
      (
        await contractInstance.functions
          .get_none_option_u8()

          .call()
      ).value,
    ).toEqual(undefined);
  });

  it('should test u8 variable type', async () => {
    // #region U8
    const { value } = await contractInstance.functions.echo_u8(3).call();
    expect(value).toBe(3);
    // #endregion U8
  });

  it('should test u8 variable type multiple params', async () => {
    const { value } = await contractInstance.functions
      .echo_u8_addition(3, 4, 3)
      .call();
    expect(value).toBe(10);
  });

  it('should test u16 variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_u16(RUST_U8_MAX + 1)
      .call();
    expect(value).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_u32(RUST_U16_MAX + 1)
      .call();
    expect(value).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    const input = bn(RUST_U32_MAX).add(1).toHex();
    const { value } = await contractInstance.functions.echo_u64(input).call();
    expect(value.toHex()).toBe(input);
  });

  it('should test u256 variable type', async () => {
    const input = U256_MAX;
    const { value } = await contractInstance.functions.echo_u256(input).call();
    expect(JSON.stringify(value)).toEqual(JSON.stringify(input));
  });

  it('should test bool variable type', async () => {
    const { value } = await contractInstance.functions.echo_bool(false).call();
    expect(value).toBe(false);
  });

  it('should test b256 variable type', async () => {
    const { value } = await contractInstance.functions.echo_b256(B256).call();
    expect(value).toBe(B256);
  });

  it('should test b512 variable type', async () => {
    const { value } = await contractInstance.functions.echo_b512(B512).call();
    expect(value).toBe(B512);
  });

  it('should test str[1] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_1('f').call();
    expect(value).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_2('fu').call();
    expect(value).toBe('fu');
  });

  it('should test str[3] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_3('fue').call();
    expect(value).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_str_8('fuel-sdk')
      .call();

    expect(value).toBe('fuel-sdk');
  });

  it('should test str[9] variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_str_9('fuel-sdks')
      .call();
    expect(value).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_tuple_u8([21, 22])
      .call();
    expect(value).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    const input = [bn(RUST_U32_MAX).add(1), bn(RUST_U32_MAX).add(2)];
    const { value } = await contractInstance.functions
      .echo_tuple_u64(input)
      .call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(input));
  });

  it('should test tuple mixed variable type', async () => {
    const input = [true, bn(RUST_U32_MAX).add(1)];
    const { value } = await contractInstance.functions
      .echo_tuple_mixed(input)
      .call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(input));
  });

  it('should test array < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_array_u8([4, 3])
      .call();
    expect(value).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    const input: [number, string, BN, string, string] = [
      11,
      toHex(RUST_U32_MAX + 2),
      bn(RUST_U32_MAX).add(3),
      toHex(bn('9009', 10)),
      '0x1fffffffffffff',
    ];
    const { value } = await contractInstance.functions
      .echo_array_u64(input)
      .call();

    const output = input.map((v) => toHex(v));
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(output));
  });

  it('should test array bool variable type', async () => {
    const { value } = await contractInstance.functions
      .echo_array_bool([true, true])
      .call();
    expect(value).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    const input = { i: 4 };
    const { value } = await contractInstance.functions
      .echo_struct_u8(input)
      .call();
    expect(value).toStrictEqual(input);
  });

  it('should test struct > 8 bytes variable type', async () => {
    const input = { i: B256 };
    const { value } = await contractInstance.functions
      .echo_struct_b256(input)
      .call();
    expect(value).toStrictEqual(input);
  });

  it('should test enum < 8 byte variable type', async () => {
    const input = SmallEnum.Empty;
    const { value } = await contractInstance.functions
      .echo_enum_small(input)
      .call();
    expect(value).toStrictEqual(input);
  });

  it('should test enum > 8 bytes variable type', async () => {
    const input = { AddressB: B256 };

    const { value } = await contractInstance.functions
      .echo_enum_big(input)
      .call();
    expect(value).toStrictEqual(input);
  });

  it('should test Option<u8> type', async () => {
    const input = 187;
    const { value } = await contractInstance.functions
      .echo_option_u8(input)
      .call();
    expect(value).toStrictEqual(input);
  });

  it('should test Option<u32> extraction [Some]', async () => {
    const inputSome = 123;
    const { value: Some } = await contractInstance.functions
      .echo_option_extract_u32(inputSome)
      .call();
    expect(Some).toStrictEqual(inputSome);
  });

  it('should test Option<u32> extraction [None]', async () => {
    const inputNone = undefined;
    const { value: None } = await contractInstance.functions
      .echo_option_extract_u32(inputNone)
      .call();
    expect(None).toStrictEqual(500);

    const { value: NoneVoid } = await contractInstance.functions
      .echo_option_extract_u32()
      .call();
    expect(NoneVoid).toStrictEqual(500);
  });

  it('should test multiple Option<u32> params [Some]', async () => {
    const inputA = 1;
    const inputB = 4;
    const inputC = 5;

    // adds the three values (if Some value given) together
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(inputA, inputB, inputC)
      .call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(10);
  });

  it('should test multiple Option<u32> params [None]', async () => {
    const input = 1;

    // adds the three values together, but only first param value is supplied
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(input)
      .call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(1);
  });

  it('should test u8 empty vector input', async () => {
    const { value } = await contractInstance.functions
      .check_u8_vector([])
      .call();
    expect(value).toBeFalsy();
  });

  it('should test u8 vector input', async () => {
    const { value, logs } = await contractInstance.functions
      .check_u8_vector([1, 2, 3, 4, 5])
      .call();

    expect(value).toBeTruthy();

    const formattedLog = logs.map((l) =>
      typeof l === 'string' ? l : bn(l).toNumber(),
    );
    expect(formattedLog).toEqual([
      'vector.items',
      1,
      2,
      3,
      4,
      5,
      'vector.len()',
      5,
    ]);
  });

  it('should echo u8 vector input', async () => {
    const { value } = await contractInstance.functions
      .echo_u8_vector_first([23, 6, 1, 51, 2])
      .call();

    expect(value).toBe(23);
  });

  it('should echo a vector of optional u8 input', async () => {
    const { value } = await contractInstance.functions
      .echo_u8_option_vector_first([28])
      .call();

    expect(value).toBe(28);
  });

  it('should echo u64 vector input', async () => {
    const input = bn(54).toHex();
    const { value } = await contractInstance.functions
      .echo_u64_vector_last([200, 100, 24, 51, 23, input])
      .call();
    expect(value.toHex()).toBe(input);
  });

  it('should echo u32 vector addition of mixed params', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition_other_type([100, 2], 47)
      .call();
    expect(value).toBe(147);
  });

  it('should echo u32 vector addition', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo u32 vector addition [variable lengths]', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2, 1, 2, 3], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo struct vector input', async () => {
    const first = {
      foo: 1,
      bar: 10,
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_first([
        first,
        {
          foo: 2,
          bar: 20,
        },
        {
          foo: 3,
          bar: 30,
        },
      ])
      .call();
    expect(value).toStrictEqual(first);
  });

  it('should echo complex struct vector input', async () => {
    const last = {
      foo: 3,
      bar: bn(31337).toHex(),
      baz: 'abcdefghi',
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_last([
        {
          foo: 1,
          bar: 11337n,
          baz: '123456789',
        },
        {
          foo: 2,
          bar: 21337n,
          baz: 'alphabet!',
        },
        last,
      ])
      .call();
    const unhexed = {
      foo: value.foo,
      bar: bn(value.bar).toHex(),
      baz: value.baz,
    };
    expect(unhexed).toStrictEqual(last);
  });

  it('should get initial state messages from node', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    // #region Message-getMessages
    const walletA = Wallet.fromPrivateKey(
      '0x1ff16505df75735a5bcf4cb4cf839903120c181dd9be6781b82cda23543bd242',
      provider,
    );
    const walletB = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider,
    );

    const expectedMessagesA: Message[] = [
      {
        messageId:
          '0x5e4b9a05438f912573515dd32093657499310cb650766ce868f21dfb05f09a1a',
        sender: walletB.address,
        recipient: walletA.address,
        nonce:
          '0x0101010101010101010101010101010101010101010101010101010101010101',
        amount: bn('0xffffffffffffffff', 'hex'),
        data: arrayify('0x'),
        daHeight: bn(0),
      },
    ];
    const expectedMessagesB: Message[] = [
      {
        messageId:
          '0x39578ef8c047ae994d0dadce8015559953b32fffa657c25c4c068fe4d6995a4b',
        sender: walletA.address,
        recipient: walletB.address,
        nonce:
          '0x0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b',
        amount: bn('12704439083013451934'),
        data: arrayify('0x'),
        daHeight: bn(0),
      },
    ];

    const aMessages = await walletA.getMessages();
    const bMessages = await walletB.getMessages();

    expect(aMessages).toStrictEqual(expectedMessagesA);
    expect(bMessages).toStrictEqual(expectedMessagesB);
    // #endregion Message-getMessages
  });

  it('should test spending input messages', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    const recipient = Wallet.generate({
      provider,
    });
    const sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider,
    );

    request.addCoinOutput(recipient.address, 10, baseAssetId);

    const txCost = await sender.provider.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await sender.fund(request, txCost);

    const response = await sender.sendTransaction(request);
    const result = await response.waitForResult();

    expect(result.status).toEqual('success');
  });

  it('supports result type', async () => {
    const {
      value: { Ok },
    } = await contractInstance.functions.types_result({ Ok: 1 }).call();
    expect(Ok.toNumber()).toBe(20);

    const {
      value: { Err: DivisError },
    } = await contractInstance.functions.types_result({ Ok: 0 }).call();
    expect(DivisError).toBe('DivisError');

    const {
      value: { Err: InputError },
    } = await contractInstance.functions.types_result({ Err: 1 }).call();
    expect(InputError).toBe('InputError');
  });

  it('can read from produce_logs_variables', async () => {
    const { logs } = await contractInstance.functions
      .produce_logs_variables()
      .call();

    expect(logs[0].toHex()).toEqual(bn(64).toHex());
    expect(logs[1]).toEqual(
      '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
    );
    expect(logs[2]).toEqual('Fuel');
    expect(logs[3]).toEqual([1, 2, 3]);
  });

  it('should test native enum [Red->Green]', async () => {
    const input: ColorEnumInput = ColorEnumInput.Red;
    const output: ColorEnumOutput = ColorEnumOutput.Green;
    const { value } = await contractInstance.functions.color_enum(input).call();

    expect(value).toStrictEqual(output);
  });

  it('should test native enum [Green->Blue]', async () => {
    const input: ColorEnumInput = ColorEnumInput.Green;
    const output: ColorEnumOutput = ColorEnumOutput.Blue;

    const { value } = await contractInstance.functions.color_enum(input).call();
    expect(value).toStrictEqual(output);
  });

  it('should test native enum [Blue->Red]', async () => {
    const input: ColorEnumInput = ColorEnumInput.Blue;
    const output: ColorEnumOutput = ColorEnumOutput.Red;

    const { value } = await contractInstance.functions.color_enum(input).call();
    expect(value).toStrictEqual(output);
  });

  it('should try vec_as_only_param', async () => {
    const { value } = await contractInstance.functions
      .vec_as_only_param([100, 450, 202, 340])
      .call();

    expect(value.map((v: BN) => v.toHex())).toStrictEqual([
      bn(4).toHex(),
      bn(100).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
    ]);
  });

  it('should try u32_and_vec_params', async () => {
    const { value } = await contractInstance.functions
      .u32_and_vec_params(33, [450, 202, 340])
      .call();

    expect(value.map((v: BN) => v.toHex())).toStrictEqual([
      bn(3).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
      bn(340).toHex(),
    ]);
  });

  it('should support vec in vec', async () => {
    const input = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    await contractInstance.functions.vec_in_vec(input).call();

    // asserted in Sway file
    expect(1).toEqual(1);
  });

  it('should support array in vec', async () => {
    const input = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    await contractInstance.functions.vec_in_array(input).call();

    // asserted in Sway file
    expect(1).toEqual(1);
  });

  it('should test b256 multiple params vector input/output', async () => {
    const inputA = [
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
    ];
    const inputB = [
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
    ];
    const inputC = hexlify(randomBytes(32));
    const inputD = hexlify(randomBytes(32));

    const { value } = await contractInstance.functions
      .echo_b256_middle(inputA, inputB, inputC, inputD)
      .call<string[]>();

    expect(value).toStrictEqual(inputB);
  });

  it('should handle multiple calls [with vectors]', async () => {
    const inputA = [
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
    ];
    const inputB = [hexlify(randomBytes(32))];
    const inputC = hexlify(randomBytes(32));
    const inputD = hexlify(randomBytes(32));

    const { value: results } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_b256_middle(
          inputA,
          inputB,
          inputC,
          inputD,
        ),
        contractInstance.functions.echo_u8(13),
        contractInstance.functions.echo_u8(23),
        contractInstance.functions.echo_enum_small(SmallEnum.Empty),
        contractInstance.functions.echo_b256_middle(
          inputB,
          inputA,
          inputC,
          inputD,
        ),
      ])
      .call();
    expect(results).toStrictEqual([inputB, 13, 23, SmallEnum.Empty, inputA]);
  });

  it('should handle multiple calls [with vectors + stack data first]', async () => {
    const inputA = [
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
    ];
    const inputB = [hexlify(randomBytes(32))];
    const inputC = hexlify(randomBytes(32));
    const inputD = hexlify(randomBytes(32));

    const { value: results } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_u8(1),
        contractInstance.functions.echo_u8(2),
        contractInstance.functions.echo_enum_small(SmallEnum.Empty),
        contractInstance.functions.echo_b256_middle(
          inputA,
          inputB,
          inputC,
          inputD,
        ),
        contractInstance.functions.echo_b256_middle(
          inputB,
          inputA,
          inputC,
          inputD,
        ),
      ])
      .call();
    expect(results).toStrictEqual([1, 2, SmallEnum.Empty, inputB, inputA]);
  });
});
