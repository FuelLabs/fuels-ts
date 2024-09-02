import type { BigNumberish, BN, Message } from 'fuels';
import { arrayify, bn, toHex, Wallet, ScriptTransactionRequest, randomBytes, hexlify } from 'fuels';

import { CoverageContractFactory } from '../test/typegen/contracts';
import type { MixedNativeEnumInput } from '../test/typegen/contracts/CoverageContract';
import { SmallEnumInput } from '../test/typegen/contracts/Vectors';
import type { Vec } from '../test/typegen/contracts/common';

import { launchTestContract } from './utils';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const U256_MAX = bn(2).pow(256).sub(1);
const B256 = '0x000000000000000000000000000000000000000000000000000000000000002a';
const B512 =
  '0x059bc9c43ea1112f3eb2bd30415de72ed24c1c4416a1316f0f48cc6f958073f42a6d8c12e4829826316d8dcf444498717b5a2fbf27defac367271065f6a1d4a5';

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

enum MixedNativeEnum {
  Native = 'Native',
  NotNative = 12,
}

function setupContract() {
  return launchTestContract({
    factory: CoverageContractFactory,
  });
}

/**
 * @group node
 * @group browser
 */
describe('Coverage Contract', { timeout: 15_000 }, () => {
  it('can return outputs', async () => {
    using contractInstance = await setupContract();

    // Call contract methods
    let expectedValue: unknown =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    let call = await contractInstance.functions.get_id().call();
    let result = await call.waitForResult();

    expect(result.value).toEqual(expectedValue);

    expectedValue = 'gggggggg';
    call = await contractInstance.functions.get_small_string().call();
    result = await call.waitForResult();

    expect(result.value).toEqual(expectedValue);

    expectedValue = 'ggggggggg';
    call = await contractInstance.functions.get_large_string().call();
    result = await call.waitForResult();

    expect(result.value).toEqual(expectedValue);

    expectedValue = {
      foo: 100,
    };
    call = await contractInstance.functions.get_u32_struct().call();
    result = await call.waitForResult();

    expect(result.value).toStrictEqual(expectedValue);

    expectedValue = {
      foo: 12,
      bar: 42,
    };
    call = await contractInstance.functions.get_large_struct().call();
    result = await call.waitForResult();

    expect(result.value).toStrictEqual(expectedValue);

    expectedValue = [1, 2];
    call = await contractInstance.functions.get_large_array().call();
    result = await call.waitForResult();

    expect(result.value).toStrictEqual(expectedValue);

    expectedValue = SmallEnumInput.Empty;
    call = await contractInstance.functions.get_empty_enum().call();
    result = await call.waitForResult();

    expect(result.value).toStrictEqual(expectedValue);

    expectedValue = {
      bits: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    };
    call = await contractInstance.functions.get_contract_id().call();
    result = await call.waitForResult();

    expect(result.value).toStrictEqual(expectedValue);

    expectedValue = 113;
    call = await contractInstance.functions.get_some_option_u8().call();
    result = await call.waitForResult();

    expect(result.value).toEqual(113);

    expectedValue = undefined;
    call = await contractInstance.functions.get_none_option_u8().call();
    result = await call.waitForResult();

    expect(result.value).toEqual(undefined);
  });

  it('should test u8 variable type', async () => {
    using contractInstance = await setupContract();
    // #region U8
    const { waitForResult } = await contractInstance.functions.echo_u8(3).call();
    const { value } = await waitForResult();
    expect(value).toBe(3);
    // #endregion U8
  });

  it('should test u8 variable type multiple params', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_u8_addition(3, 4, 3).call();
    const { value } = await waitForResult();
    expect(value).toBe(10);
  });

  it('should test u16 variable type', async () => {
    using contractInstance = await setupContract();
    const { waitForResult } = await contractInstance.functions.echo_u16(RUST_U8_MAX + 1).call();
    const { value } = await waitForResult();
    expect(value).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_u32(RUST_U16_MAX + 1).call();
    const { value } = await waitForResult();
    expect(value).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = bn(RUST_U32_MAX).add(1).toHex();
    const { waitForResult } = await contractInstance.functions.echo_u64(INPUT).call();
    const { value } = await waitForResult();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should test u256 variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = U256_MAX;
    const { waitForResult } = await contractInstance.functions.echo_u256(INPUT).call();
    const { value } = await waitForResult();
    expect(JSON.stringify(value)).toEqual(JSON.stringify(INPUT));
  });

  it('should test bool variable type', async () => {
    using contractInstance = await setupContract();
    const { waitForResult } = await contractInstance.functions.echo_bool(false).call();
    const { value } = await waitForResult();
    expect(value).toBe(false);
  });

  it('should test b256 variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_b256(B256).call();
    const { value } = await waitForResult();
    expect(value).toBe(B256);
  });

  it('should test b512 variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_b512(B512).call();
    const { value } = await waitForResult();

    expect(value).toBe(B512);
  });

  it('should test str[1] variable type', async () => {
    using contractInstance = await setupContract();
    const { waitForResult } = await contractInstance.functions.echo_str_1('f').call();
    const { value } = await waitForResult();
    expect(value).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_str_2('fu').call();
    const { value } = await waitForResult();
    expect(value).toBe('fu');
  });

  it('should test str[3] variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_str_3('fue').call();
    const { value } = await waitForResult();
    expect(value).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_str_8('fuel-sdk').call();
    const { value } = await waitForResult();

    expect(value).toBe('fuel-sdk');
  });

  it('should test str[9] variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_str_9('fuel-sdks').call();
    const { value } = await waitForResult();
    expect(value).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_tuple_u8([21, 22]).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT: [BigNumberish, BigNumberish] = [bn(RUST_U32_MAX).add(1), bn(RUST_U32_MAX).add(2)];
    const { waitForResult } = await contractInstance.functions.echo_tuple_u64(INPUT).call();
    const { value } = await waitForResult();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test tuple mixed variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT: [boolean, BigNumberish] = [true, bn(RUST_U32_MAX).add(1)];
    const { waitForResult } = await contractInstance.functions.echo_tuple_mixed(INPUT).call();
    const { value } = await waitForResult();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test array < 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_array_u8([4, 3]).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT: [number, string, BN, string, string] = [
      11,
      toHex(RUST_U32_MAX + 2),
      bn(RUST_U32_MAX).add(3),
      toHex(bn('9009', 10)),
      '0x1fffffffffffff',
    ];
    const { waitForResult } = await contractInstance.functions.echo_array_u64(INPUT).call();
    const { value } = await waitForResult();

    const OUTPUT = INPUT.map((v) => toHex(v));
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(OUTPUT));
  });

  it('should test array bool variable type', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.echo_array_bool([true, true]).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = { i: 4 };
    const { waitForResult } = await contractInstance.functions.echo_struct_u8(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test struct > 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = { i: B256 };
    const { waitForResult } = await contractInstance.functions.echo_struct_b256(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum < 8 byte variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = SmallEnumInput.Empty;
    const { waitForResult } = await contractInstance.functions.echo_enum_small(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    using contractInstance = await setupContract();

    const INPUT = { AddressB: B256 };

    const { waitForResult } = await contractInstance.functions.echo_enum_big(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u8> type', async () => {
    using contractInstance = await setupContract();

    const INPUT = 187;
    const { waitForResult } = await contractInstance.functions.echo_option_u8(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u32> extraction [Some]', async () => {
    using contractInstance = await setupContract();

    const INPUT_SOME = 123;
    const { waitForResult } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_SOME)
      .call();

    const { value: Some } = await waitForResult();
    expect(Some).toStrictEqual(INPUT_SOME);
  });

  it('should test Option<u32> extraction [None]', async () => {
    using contractInstance = await setupContract();

    const INPUT_NONE = undefined;

    const call1 = await contractInstance.functions.echo_option_extract_u32(INPUT_NONE).call();
    const { value: None } = await call1.waitForResult();
    expect(None).toStrictEqual(500);

    const call2 = await contractInstance.functions.echo_option_extract_u32().call();
    const { value: NoneVoid } = await call2.waitForResult();
    expect(NoneVoid).toStrictEqual(500);
  });

  it('should test multiple Option<u32> params [Some]', async () => {
    using contractInstance = await setupContract();

    const INPUT_A = 1;
    const INPUT_B = 4;
    const INPUT_C = 5;

    // adds the three values (if Some value given) together
    const { waitForResult } = await contractInstance.functions
      .echo_option_three_u8(INPUT_A, INPUT_B, INPUT_C)
      .call();

    const { value: Some } = await waitForResult();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(10);
  });

  it('should test multiple Option<u32> params [None]', async () => {
    using contractInstance = await setupContract();

    const INPUT = 1;

    // adds the three values together, but only first param value is supplied
    const { waitForResult } = await contractInstance.functions
      .echo_option_three_u8(INPUT)
      .call();
    const { value: Some } = await waitForResult();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(1);
  });

  it('should test u8 empty vector input', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.check_u8_vector([]).call();
    const { value } = await waitForResult();
    expect(value).toBeFalsy();
  });

  it('should test u8 vector input', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .check_u8_vector([1, 2, 3, 4, 5])
      .call();

    const { value, logs } = await waitForResult();

    expect(value).toBeTruthy();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : bn(l).toNumber()));
    expect(formattedLog).toEqual(['vector.items', 1, 2, 3, 4, 5, 'vector.len()', 5]);
  });

  it('should echo u8 vector input', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .echo_u8_vector_first([23, 6, 1, 51, 2])
      .call();

    const { value } = await waitForResult();

    expect(value).toBe(23);
  });

  it('should echo a vector of optional u8 input', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .echo_u8_option_vector_first([28])
      .call();

    const { value } = await waitForResult();

    expect(value).toBe(28);
  });

  it('should echo u64 vector input', async () => {
    using contractInstance = await setupContract();

    const INPUT = bn(54).toHex();
    const { waitForResult } = await contractInstance.functions
      .echo_u64_vector_last([200, 100, 24, 51, 23, INPUT])
      .call();
    const { value } = await waitForResult();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should echo u32 vector addition of mixed params', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .echo_u32_vector_addition_other_type([100, 2], 47)
      .call();
    const { value } = await waitForResult();
    expect(value).toBe(147);
  });

  it('should echo u32 vector addition', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2], [24, 54])
      .call();
    const { value } = await waitForResult();
    expect(value).toBe(124);
  });

  it('should echo u32 vector addition [variable lengths]', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2, 1, 2, 3], [24, 54])
      .call();
    const { value } = await waitForResult();
    expect(value).toBe(124);
  });

  it('should echo struct vector input', async () => {
    using contractInstance = await setupContract();

    const first = {
      foo: 1,
      bar: 10,
    };
    const { waitForResult } = await contractInstance.functions
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
    const { value } = await waitForResult();
    expect(value).toStrictEqual(first);
  });

  it('should echo complex struct vector input', async () => {
    using contractInstance = await setupContract();

    const last = {
      foo: 3,
      bar: bn(31337).toHex(),
      baz: 'abcdefghi',
    };
    const { waitForResult } = await contractInstance.functions
      .echo_struct_vector_last([
        {
          foo: 1,
          bar: bn(11337).toHex(),
          baz: '123456789',
        },
        {
          foo: 2,
          bar: bn(21337).toHex(),
          baz: 'alphabet!',
        },
        last,
      ])
      .call();
    const { value } = await waitForResult();
    const unhexed = {
      foo: value.foo,
      bar: bn(value.bar).toHex(),
      baz: value.baz,
    };
    expect(unhexed).toStrictEqual(last);
  });

  it('should get initial state messages from node', async () => {
    using launched = await setupContract();
    const { provider } = launched;

    // #region Message-getMessages
    const WALLET_A = Wallet.fromPrivateKey(
      '0x1ff16505df75735a5bcf4cb4cf839903120c181dd9be6781b82cda23543bd242',
      provider
    );
    const WALLET_B = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider
    );

    const EXPECTED_MESSAGES_A: Message[] = [
      {
        messageId: '0x5e4b9a05438f912573515dd32093657499310cb650766ce868f21dfb05f09a1a',
        sender: WALLET_B.address,
        recipient: WALLET_A.address,
        nonce: '0x0101010101010101010101010101010101010101010101010101010101010101',
        amount: bn('0xffffffffffffffff', 'hex'),
        data: arrayify('0x'),
        daHeight: bn(0),
      },
    ];
    const EXPECTED_MESSAGES_B: Message[] = [
      {
        messageId: '0xba5fece66404c865ea533b1a0f8462e9a67c2066a20b70fcf8446ce4f2b82ed4',
        sender: WALLET_A.address,
        recipient: WALLET_B.address,
        nonce: '0x0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b',
        amount: bn('0xffffffffffffffff', 'hex'),
        data: arrayify('0x'),
        daHeight: bn(0),
      },
    ];

    const { messages: aMessages, pageInfo: pageInfoa } = await WALLET_A.getMessages();
    const { messages: bMessages, pageInfo: pageInfob } = await WALLET_B.getMessages();

    expect(aMessages).toStrictEqual(EXPECTED_MESSAGES_A);
    expect(pageInfoa.hasNextPage).toBeFalsy();
    expect(pageInfoa.hasPreviousPage).toBeFalsy();

    expect(bMessages).toStrictEqual(EXPECTED_MESSAGES_B);
    expect(pageInfob.hasNextPage).toBeFalsy();
    expect(pageInfob.hasPreviousPage).toBeFalsy();
    // #endregion Message-getMessages
  });

  it('should test spending input messages', async () => {
    using contractInstance = await setupContract();

    const { provider } = contractInstance;
    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    const recipient = Wallet.generate({
      provider,
    });
    const sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider
    );

    request.addCoinOutput(recipient.address, 10, provider.getBaseAssetId());

    const txCost = await sender.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await sender.fund(request, txCost);

    const response = await sender.sendTransaction(request);
    const result = await response.waitForResult();

    expect(result.status).toEqual('success');
  });

  it('supports result type', async () => {
    using contractInstance = await setupContract();
    const { waitForResult } = await contractInstance.functions.types_result({ Ok: 1 }).call();
    const {
      value: { Ok },
    } = await waitForResult();
    expect(Ok?.toNumber()).toBe(20);

    const call2 = await contractInstance.functions.types_result({ Ok: 0 }).call();

    const {
      value: { Err: DivisError },
    } = await call2.waitForResult();

    expect(DivisError).toBe('DivisError');

    const call3 = await contractInstance.functions.types_result({ Err: 1 }).call();

    const {
      value: { Err: InputError },
    } = await call3.waitForResult();

    expect(InputError).toBe('InputError');
  });

  it('can read from produce_logs_variables', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions.produce_logs_variables().call();
    const { logs } = await waitForResult();

    expect(logs[0].toHex()).toEqual(bn(64).toHex());
    expect(logs[1]).toEqual('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a');
    expect(logs[2]).toEqual('Fuel');
    expect(logs[3]).toEqual([1, 2, 3]);
  });

  it('should test native enum [Red->Green]', async () => {
    using contractInstance = await setupContract();

    const INPUT: ColorEnumInput = ColorEnumInput.Red;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Green;
    const { waitForResult } = await contractInstance.functions.color_enum(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(OUTPUT);
  });

  it('should test native enum [Green->Blue]', async () => {
    using contractInstance = await setupContract();

    const INPUT: ColorEnumInput = ColorEnumInput.Green;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Blue;

    const { waitForResult } = await contractInstance.functions.color_enum(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(OUTPUT);
  });

  it('should test native enum [Blue->Red]', async () => {
    using contractInstance = await setupContract();

    const INPUT: ColorEnumInput = ColorEnumInput.Blue;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Red;

    const { waitForResult } = await contractInstance.functions.color_enum(INPUT).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(OUTPUT);
  });

  it('should test mixed native enum [Native->NotNative]', async () => {
    using contractInstance = await setupContract();

    const input: MixedNativeEnumInput = { Native: undefined };
    const expected = { NotNative: MixedNativeEnum.NotNative };

    const { waitForResult } = await contractInstance.functions.mixed_native_enum(input).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(expected);
  });

  it('should test mixed native enum [NotNative->Native]', async () => {
    using contractInstance = await setupContract();

    const input = { NotNative: MixedNativeEnum.NotNative };
    const expected = 'Native';

    const { waitForResult } = await contractInstance.functions.mixed_native_enum(input).call();
    const { value } = await waitForResult();
    expect(value).toStrictEqual(expected);
  });

  it('should try vec_as_only_param', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .vec_as_only_param([100, 450, 202, 340])
      .call();

    const { value } = await waitForResult();

    expect(value.map((v: BN | undefined) => v?.toHex())).toStrictEqual([
      bn(4).toHex(),
      bn(100).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
    ]);
  });

  it('should try u32_and_vec_params', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance.functions
      .u32_and_vec_params(33, [450, 202, 340])
      .call();

    const { value } = await waitForResult();

    expect(value.map((v: BN | undefined) => v?.toHex())).toStrictEqual([
      bn(3).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
      bn(340).toHex(),
    ]);
  });

  it('should support vec in vec', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [0, 1, 2],
      [0, 1, 2],
    ];

    const { waitForResult } = await contractInstance.functions.vec_in_vec(INPUT).call();

    // asserted in Sway file
    const {
      transactionResult: { isStatusSuccess },
    } = await waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should support array in vec', async () => {
    using contractInstance = await setupContract();

    const INPUT: [Vec<BigNumberish>, Vec<BigNumberish>] = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    const { waitForResult } = await contractInstance.functions.vec_in_array(INPUT).call();

    // asserted in Sway file
    // asserted in Sway file
    const {
      transactionResult: { isStatusSuccess },
    } = await waitForResult();
    expect(isStatusSuccess).toBeTruthy();
  });

  it('should test b256 multiple params vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { waitForResult } = await contractInstance.functions
      .echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D)
      .call<string[]>();

    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT_B);
  });

  it('should handle multiple calls [with vectors]', async () => {
    using contractInstance = await setupContract();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { waitForResult } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D),
        contractInstance.functions.echo_u8(13),
        contractInstance.functions.echo_u8(23),
        contractInstance.functions.echo_enum_small(SmallEnumInput.Empty),
        contractInstance.functions.echo_b256_middle(INPUT_B, INPUT_A, INPUT_C, INPUT_D),
      ])
      .call();

    const { value: results } = await waitForResult();

    expect(results).toStrictEqual([INPUT_B, 13, 23, SmallEnumInput.Empty, INPUT_A]);
  });

  it('should handle multiple calls [with vectors + stack data first]', async () => {
    using contractInstance = await setupContract();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { waitForResult } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_u8(1),
        contractInstance.functions.echo_u8(2),
        contractInstance.functions.echo_enum_small(SmallEnumInput.Empty),
        contractInstance.functions.echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D),
        contractInstance.functions.echo_b256_middle(INPUT_B, INPUT_A, INPUT_C, INPUT_D),
      ])
      .call();

    const { value: results } = await waitForResult();

    expect(results).toStrictEqual([1, 2, SmallEnumInput.Empty, INPUT_B, INPUT_A]);
  });
});
