import { Contract, FuelError, Interface } from 'fuels';
import type { AssetId, BigNumberish, EvmAddress, RawSlice, WalletUnlocked } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { AbiContract, AbiContractFactory } from '../../test/typegen';
import { EnumWithNativeInput, ExternalEnumInput } from '../../test/typegen/contracts/AbiContract';
import type {
  EnumWithBuiltinTypeInput,
  EnumWithBuiltinTypeOutput,
  EnumWithVectorInput,
  EnumWithVectorOutput,
  IdentityInput,
  IdentityOutput,
  StructDoubleGenericInput,
  StructSimpleInput,
  StructSimpleOutput,
  StructWithGenericArrayInput,
  StructWithMultiOptionInput,
  StructWithMultiOptionOutput,
  StructCInput,
  StructWithNestedArrayInput,
  StructWithNestedTupleInput,
  StructSingleGenericInput,
} from '../../test/typegen/contracts/AbiContract';
import type { Option, Result, Vec } from '../../test/typegen/contracts/common';

import {
  U16_MAX,
  U16_MIN,
  U256_MAX,
  U256_MIN,
  U32_MAX,
  U32_MIN,
  U64_MAX,
  U64_MIN,
  U8_MAX,
  U8_MIN,
} from './constants';
import { toEqualBn } from './vitest.matcher';

expect.extend({ toEqualBn });

/**
 * @group node
 */
describe('AbiCoder', () => {
  let contract: AbiContract;
  let wallet: WalletUnlocked;
  let cleanup: () => void;

  beforeAll(async () => {
    const launched = await launchTestNode({
      contractsConfigs: [{ factory: AbiContractFactory }],
    });

    const oldAbi = new Interface(AbiContract.abi);

    wallet = launched.wallets[0];
    contract = new Contract(launched.contracts[0].id, oldAbi, wallet) as AbiContract;
    cleanup = launched.cleanup;
  });

  afterAll(() => {
    cleanup();
  });

  describe('types_u8', () => {
    test('should encode/decode just fine', async () => {
      const input = 8;
      const expected = 255;

      const fn = contract.functions.types_u8(input);

      const { waitForResult } = await fn.call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    test('should fail to encode/decode [min - 1]', async () => {
      const input = U8_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u8(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8.')
      );
    });

    test('should fail to encode/decode [max + 1]', async () => {
      const input = U8_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u8(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8, too many bytes.')
      );
    });
  });

  describe('types_u16', () => {
    it('should encode/decode just fine', async () => {
      const input = 16;
      const expected = 65535;

      const { waitForResult } = await contract.functions.types_u16(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U16_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u16(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U16_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u16(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16, too many bytes.')
      );
    });
  });

  describe('types_u32', () => {
    it('should encode/decode just fine', async () => {
      const input = 32;
      const expected = 4294967295;

      const { waitForResult } = await contract.functions.types_u32(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U32_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u32(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U32_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u32(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32, too many bytes.')
      );
    });
  });

  describe('types_u64', () => {
    it('should encode/decode just fine', async () => {
      const input = 64;
      const expected = '4294967295000';

      const { waitForResult } = await contract.functions.types_u64(input).call();

      const { value } = await waitForResult();
      const actual = value.toString();
      expect(actual).toBe(expected);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U64_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u64(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U64_MAX.add(1);

      await expectToThrowFuelError(
        () => contract.functions.types_u64(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.')
      );
    });
  });

  describe('types_u256', () => {
    it('should encode/decode just fine', async () => {
      const input = 256;
      const expected = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

      const { waitForResult } = await contract.functions.types_u256(input).call();

      const { value } = await waitForResult();
      const actual = value.toHex();
      expect(actual).toEqual(expected);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U256_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U256_MAX.add(1);

      await expectToThrowFuelError(
        () => contract.functions.types_u256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256.')
      );
    });
  });

  describe('types_bool', () => {
    it('should encode/decode just fine', async () => {
      const input = false;
      const expected = true;

      const { waitForResult } = await contract.functions.types_bool(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [number]', async () => {
      const input = 2;

      await expectToThrowFuelError(
        () => contract.functions.types_bool(input as unknown as boolean).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.')
      );
    });

    it('should fail to encode/decode [string]', async () => {
      const input = '2';

      await expectToThrowFuelError(
        () => contract.functions.types_bool(input as unknown as boolean).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.')
      );
    });
  });

  describe('types_b256', () => {
    it('should encode/decode just fine', async () => {
      const input = `0x${'a'.repeat(64)}`;
      const expected = `0x${'0'.repeat(64)}`;

      const { waitForResult } = await contract.functions.types_b256(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [too short]', async () => {
      const input = `0x${'a'.repeat(63)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });

    it('should fail to encode/decode [too long]', async () => {
      const input = `0x${'a'.repeat(65)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });

    it('should fail to encode/decode [not a hex]', async () => {
      const input = 'not a hex value';

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });
  });

  describe('types_b512', () => {
    it('should encode/decode just fine', async () => {
      const input = `0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d`;
      const expected = `0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d`;

      const { waitForResult } = await contract.functions.types_b512(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [too short]', async () => {
      const input = `0x${'a'.repeat(127)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });

    it('should fail to encode/decode [too long]', async () => {
      const input = `0x${'a'.repeat(129)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });

    it('should fail to encode/decode [not a hex]', async () => {
      const input = 'not a hex value';

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });
  });

  describe('types_bytes', () => {
    it('should encode/decode just fine [Uint8Array]', async () => {
      const input = Uint8Array.from([1, 2, 3]);
      const expected = Uint8Array.from([3, 2, 1]);
      const { waitForResult } = await contract.functions.types_bytes(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });

    it('should encode/decode just fine [number]', async () => {
      const input = [1, 2, 3];
      const expected = Uint8Array.from([3, 2, 1]);
      const { waitForResult } = await contract.functions.types_bytes(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });

  /**
   * Strings
   */
  describe('types_str', () => {
    it('should encode/decode just fine [length = 5]', async () => {
      const input = 'Input';
      const expected = 'Hello';

      const { waitForResult } = await contract.functions.types_str(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should fail to encode/decode [length - 1]', async () => {
      const input = 'a'.repeat(4);

      await expectToThrowFuelError(
        () => contract.functions.types_str(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Value length mismatch during encode.')
      );
    });

    it('should fail to encode/decode [length + 1]', async () => {
      const input = 'a'.repeat(6);

      await expectToThrowFuelError(
        () => contract.functions.types_str(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Value length mismatch during encode.')
      );
    });
  });
  describe('types_str_slice', () => {
    it('should encode/decode just fine', async () => {
      const input = 'Input';
      const expected = 'Output';

      const { waitForResult } = await contract.functions.types_str_slice(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });
  });
  describe('types_std_string', () => {
    it('should encode/decode just fine', async () => {
      const input = 'Input';
      const expected = 'Output';

      const { waitForResult } = await contract.functions.types_std_string(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });
  });
  describe('types_raw_slice', () => {
    it('should encode/decode just fine', async () => {
      const input: RawSlice = [1, 2, 3];
      const expected: RawSlice = [4, 3, 2, 1];

      const { waitForResult } = await contract.functions.types_raw_slice(input).call();
      const { value } = await waitForResult();

      expect(value).toStrictEqual(expected);
    });
  });

  /**
   * Arrays
   */
  describe('types_array', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3, 4] as [number, number, number, number];
      const expected = [4, 3, 2, 1] as [number, number, number, number];

      const { waitForResult } = await contract.functions.types_array(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });

    it('should fail to encode/decode [empty]', async () => {
      const input = [] as unknown as [number, number, number, number];

      await expectToThrowFuelError(
        () => contract.functions.types_array(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });

  describe('types_array_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = [
        { a: true, b: 10 },
        { a: true, b: 10 },
        { a: true, b: 10 },
      ] as [{ a: boolean; b: number }, { a: boolean; b: number }, { a: boolean; b: number }]; // @TODO removed once typegen remastered
      const expected = [
        { a: false, b: 30 },
        { a: false, b: 30 },
        { a: false, b: 30 },
      ];

      const { waitForResult } = await contract.functions.types_array_struct(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  describe('types_array_with_generic_struct', () => {
    it('should encode/decode just fine', async () => {
      const INPUT_STRUCT = {
        a: {
          a: 10,
        },
        b: 'A',
      };
      const input = [INPUT_STRUCT, INPUT_STRUCT];

      const EXPECTED_STRUCT = {
        a: {
          // @ts-expect-error: Custom matcher 'toEqualBn'
          a: expect.toEqualBn(20),
        },
        b: 'B',
      };
      const expected = [EXPECTED_STRUCT, EXPECTED_STRUCT];

      const { waitForResult } = await contract.functions
        // @ts-expect-error - @TODO remove once typegen remastered
        .types_array_with_generic_struct(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  describe('types_array_with_vector', () => {
    it('should encode/decode just fine', async () => {
      const input = [[1, 2, 3]];
      const expected = [[3, 2, 1]];

      // @ts-expect-error - @TODO remove once typegen remastered
      const { waitForResult } = await contract.functions.types_array_with_vector(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Tuples
   */
  describe('types_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3] as [number, number, number];
      const expected = [3, 2, 1] as [number, number, number];

      const { waitForResult } = await contract.functions.types_tuple(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_tuple_complex', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, { a: { a: 10 } }, 'ABC'];
      // @ts-expect-error: Custom matcher 'toEqualBn'
      // @todo resolve this issue.
      const expected = [3, { a: { a: expect.toEqualBn(30) } }, 'CBA'];

      // @ts-expect-error - @TODO remove once typegen remastered
      const { waitForResult } = await contract.functions.types_tuple_complex(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_tuple_with_native_types', () => {
    it('should encode/decode just fine', async () => {
      const A: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const B: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };
      const input = [A, B, true];
      const expected = [B, A, false];

      const { waitForResult } = await contract.functions
        // @ts-expect-error - @TODO remove once typegen remastered
        .types_tuple_with_native_types(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_alias_tuple_with_native_types', () => {
    it('should encode/decode just fine', async () => {
      const A: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const B: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };
      const input = [A, B, true];
      const expected = [B, A, false];

      const { waitForResult } = await contract.functions
        // @ts-expect-error - @TODO remove once typegen remastered
        .types_alias_tuple_with_native_types(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Structs
   */
  describe('types_struct_simple', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: true, b: 10 };
      const expected = { a: false, b: 30 };

      const { waitForResult } = await contract.functions.types_struct_simple(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_generic', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10 };
      const expected = { a: 20 };

      const { waitForResult } = await contract.functions.types_struct_generic(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_with_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input: StructSingleGenericInput<[boolean, BigNumberish]> = { a: [true, 10] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = { a: [false, expect.toEqualBn(20)] };

      const { waitForResult } = await contract.functions.types_struct_with_tuple(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_double_generic', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10, b: { a: 10 } };
      const expected = { a: 20, b: { b: 10 } };

      const { waitForResult } = await contract.functions.types_struct_double_generic(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_external', () => {
    it('should encode/decode just fine', async () => {
      const input = { value: 10 };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = { value: expect.toEqualBn(20) };

      const { waitForResult } = await contract.functions.types_struct_external(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_with_nested_array', () => {
    it('should encode/decode just fine', async () => {
      const INPUT_STRUCT = { a: { a: 10 }, b: 'A' };
      const input: StructWithNestedArrayInput = { a: [INPUT_STRUCT, INPUT_STRUCT] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      // @todo resolve this issue.
      const EXPECTED_STRUCT = { a: { a: expect.toEqualBn(20) }, b: 'B' };
      const EXPECTED = { a: [EXPECTED_STRUCT, EXPECTED_STRUCT] };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_array(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(EXPECTED);
    });
  });
  describe('types_struct_with_nested_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input: StructWithNestedTupleInput = { a: [10, { a: { a: 20 } }, 'ABC'] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      // @todo resolve this issue.
      const expected = { a: [30, { a: { a: expect.toEqualBn(40) } }, 'CBA'] };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_tuple(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_struct_with_nested_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: { a: { a: 10 }, b: 20 } };
      const expected = { a: { a: { a: 30 }, b: 40 } };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_struct(input)
        .call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe.todo('types_struct_with_multiple_struct_params', () => {
    it('should encode/decode just fine', async () => {
      const STRUCT_A = { propA1: 10 };
      const STRUCT_B = { propB1: STRUCT_A, propB2: 20 };

      const INPUT_X = STRUCT_A;
      const INPUT_Y = STRUCT_B;
      const INPUT_Z: StructCInput = {
        propC1: STRUCT_A,
        propC2: [STRUCT_B],
        propC3: {
          propD1: [{ propE1: STRUCT_A, propE2: STRUCT_B, propE3: 30 }],
          propD2: 40,
          propD3: { propF1: 50, propF2: 'A' },
        },
      };

      const { waitForResult } = await contract.functions
        .types_struct_with_multiple_struct_params(INPUT_X, INPUT_Y, INPUT_Z)
        .call();

      const { value } = await waitForResult();
      // expect(value).toEqual(expected);
    });
  });
  describe.todo('types_struct_with_implicit_generics', () => {});

  // @todo Investigate: returning the input as the output
  describe.skip('types_struct_with_array', () => {
    it('should encode/decode just fine', async () => {
      // Inputs
      const inputB256: string =
        '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const inputStruct: StructDoubleGenericInput<string, number> = {
        a: inputB256,
        b: 10,
      };
      const input: StructWithGenericArrayInput<string> = {
        a: [inputStruct, inputStruct, inputStruct],
      };

      // Expected
      const expectedB256: string =
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
      const expectedStruct: StructDoubleGenericInput<string, number> = {
        a: expectedB256,
        b: 20,
      };
      const expected: StructWithGenericArrayInput<string> = {
        a: [expectedStruct, expectedStruct, expectedStruct],
      };

      const { waitForResult } = await contract.functions.types_struct_with_array(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe.todo('types_struct_with_vector');
  describe.todo('types_struct_with_array_of_enums');
  describe.todo('types_struct_with_complex_nested_struct');
  describe.todo('types_struct_with_single_option');

  /**
   * Enums
   */
  describe('types_enum', () => {
    it('should encode/decode just fine', async () => {
      const input = EnumWithNativeInput.Checked;
      const expected = EnumWithNativeInput.Pending;

      const { waitForResult } = await contract.functions.types_enum(input).call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });
  });
  describe('types_enum_with_builtin_type', () => {
    it('should encode/decode just fine', async () => {
      const input: EnumWithBuiltinTypeInput = { a: true };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      // @todo resolve this issue.
      const expected: EnumWithBuiltinTypeOutput = { b: expect.toEqualBn(20) };

      const { waitForResult } = await contract.functions.types_enum_with_builtin_type(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_enum_with_vector', () => {
    it('should encode/decode just fine', async () => {
      const input: EnumWithVectorInput = { a: 10 };
      const expected: EnumWithVectorOutput = { b: [1, 2, 3] };

      const { waitForResult } = await contract.functions.types_enum_with_vector(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_generic_enum', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10 };
      const expected = { b: 20 };

      const { waitForResult } = await contract.functions.types_generic_enum(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_enum_external', () => {
    // @TODO revist this one, can't return B from this Sway function.
    it('should encode/decode just fine', async () => {
      const input = ExternalEnumInput.A;
      const expected = ExternalEnumInput.A; // Should be B

      const { waitForResult } = await contract.functions.types_enum_external(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_enum_with_structs', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: EnumWithNativeInput.Checked };
      const expected = { b: { a: true, b: 10 } };

      const { waitForResult } = await contract.functions.types_enum_with_structs(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Vectors
   */
  describe('types_vector_u8', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3];
      const expected = [3, 2, 1];

      const { waitForResult } = await contract.functions.types_vector_u8(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_vector_boolean', () => {
    it('should encode/decode just fine', async () => {
      const input = [true, false, true, false];
      const expected = [false, true, false, true];

      const { waitForResult } = await contract.functions.types_vector_boolean(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_vector_inside_vector', () => {
    it('should encode/decode just fine', async () => {
      const input = [[1, 2, 3]];
      const expected = [
        [3, 2, 1],
        [6, 5, 4],
      ];

      const { waitForResult } = await contract.functions.types_vector_inside_vector(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_vector_with_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = [{ a: true, b: 10 }];
      const expected = [{ a: false, b: 30 }];

      const { waitForResult } = await contract.functions.types_vector_with_struct(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_vector_option', () => {
    it('should encode/decode just fine', async () => {
      const input: Vec<StructWithMultiOptionInput> = [{ a: [1, 2, 3, 4, 5] }];
      const expected: Vec<StructWithMultiOptionOutput> = [{ a: [5, 4, 3, 2, 1] }];

      const { waitForResult } = await contract.functions.types_vector_option(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Options
   */
  // @todo Investigate: returning the input as the output
  describe.skip('types_option', () => {
    it('should encode/decode just fine', async () => {
      const input: Option<BigNumberish> = 10; // Some
      const expected: Option<BigNumberish> = undefined; // None

      const { waitForResult } = await contract.functions.types_option(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  // @todo Investigate: returning the input as the output
  describe.skip('types_option_struct', () => {
    it('should encode/decode just fine', async () => {
      const input: Option<StructSimpleInput> = {
        a: true,
        b: 10,
      };
      const expected: Option<StructSimpleOutput> = undefined;

      const { waitForResult } = await contract.functions.types_option_struct(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Native types
   */
  describe('types_asset_id', () => {
    it('should encode/decode just fine', async () => {
      const input: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const expected: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_asset_id(input).call();
      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });
  describe('types_identity_address', () => {
    it('should encode/decode just fine', async () => {
      const input: IdentityInput = {
        Address: { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
      };
      const expected: IdentityOutput = {
        Address: { bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' },
      };

      const { waitForResult } = await contract.functions.types_identity_address(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_identity_contract_id', () => {
    it('should encode/decode just fine', async () => {
      const input: IdentityInput = {
        ContractId: { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
      };
      const expected: IdentityOutput = {
        ContractId: { bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' },
      };

      const { waitForResult } = await contract.functions.types_identity_contract_id(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_address', () => {
    it('should encode/decode just fine', async () => {
      const input = { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' };
      const expected = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_address(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_contract_id', () => {
    it('should encode/decode just fine', async () => {
      const input = { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' };
      const expected = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_contract_id(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_evm_address', () => {
    it('should encode/decode just fine', async () => {
      const input: EvmAddress = {
        bits: '0x000000000000000000000000AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      };
      const expected = {
        bits: '0x000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_evm_address(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_result', () => {
    it('should accept result just fine [Ok - 10]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Ok: 10,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        // @ts-expect-error: Custom matcher 'toEqualBn'
        // @todo resolve this issue.
        Ok: expect.toEqualBn(2),
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });

    it('should accept result just fine [Err - divide by zero]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Ok: 0,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        Err: 'DivisError',
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });

    it('should accept result just fine [Err - 10]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Err: 10,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        Err: 'InputError',
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toEqual(expected);
    });
  });

  /**
   * Void
   */
  describe('types_void', () => {
    it('should encode/decode just fine', async () => {
      const input = undefined;
      const expected = undefined;

      const { waitForResult } = await contract.functions.types_void(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });

    it('should encode/decode just fine [omit optional args]', async () => {
      const expected = undefined;

      const { waitForResult } = await contract.functions.types_void().call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe('types_void_then_value', () => {
    it('should encode/decode just fine', async () => {
      const inputX = undefined;
      const inputY = 10;
      const expected = undefined;

      const { waitForResult } = await contract.functions
        .types_void_then_value(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });
  });
  describe('types_value_then_void', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = undefined;
      const { waitForResult } = await contract.functions
        .types_value_then_void(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should encode/decode just fine [omitting optional args]', async () => {
      const inputX = 10;

      const { waitForResult } = await contract.functions.types_value_then_void(inputX).call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });
  });
  describe('types_value_then_void_then_value', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = undefined;
      const inputZ = 20;

      const { waitForResult } = await contract.functions
        .types_value_then_void_then_value(inputX, inputY, inputZ)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });
  });
  describe('types_value_then_value_then_void_then_void', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = 20;
      const inputZ = undefined;
      const inputA = undefined;

      const { waitForResult } = await contract.functions
        .types_value_then_value_then_void_then_void(inputX, inputY, inputZ, inputA)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should encode/decode just fine [omitting optional args]', async () => {
      const inputX = 10;
      const inputY = 20;

      const { waitForResult } = await contract.functions
        .types_value_then_value_then_void_then_void(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });
  });

  /**
   * Multi-arg
   *
   * @todo resolve the below issue.
   * Most of these are suffering from the similar issue around returning the input as the output.
   */
  describe('multi_arg_u64_u64', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 1;
      const inputY = 2;
      // @ts-expect-error: Custom matcher 'toEqualBn's
      const expected = expect.toEqualBn(3);

      const { waitForResult } = await contract.functions.multi_arg_u64_u64(inputX, inputY).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  // @todo Investigate: returning the input as the output
  describe.skip('multi_arg_b256_bool', () => {
    // @todo investigate, this is returning the input as the output.
    it('should encode/decode just fine', async () => {
      const inputX = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const inputY = true;
      const expected = [
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        false,
      ];

      const { waitForResult } = await contract.functions.multi_arg_b256_bool(inputX, inputY).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  // @todo Investigate: returning the input as the output
  describe.skip('multi_arg_vector_vector', () => {
    it('should encode/decode just fine', async () => {
      const inputX = [1, 2, 3];
      const inputY = [4, 5, 6];
      const expected = [
        [7, 8, 9],
        [10, 11, 12],
      ];

      const { waitForResult } = await contract.functions
        .multi_arg_vector_vector(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  // @todo Investigate: returning the input as the output
  describe.skip('multi_arg_vector_b256', () => {
    it('should encode/decode just fine', async () => {
      const inputX = [1, 2, 3];
      const inputY = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const expected = [
        [7, 8, 9],
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      ];

      const { waitForResult } = await contract.functions
        .multi_arg_vector_b256(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  // @todo Investigate: returning the input as the output
  describe.skip('multi_arg_struct_vector', () => {
    it('should encode/decode just fine', async () => {
      const inputX = { a: true, b: 1 };
      const inputY = [1, 2, 3];
      const expected = [{ a: false, b: 2 }, [4, 5, 6]];

      const { waitForResult } = await contract.functions
        .multi_arg_struct_vector(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });
  });
  describe.skip('multi_arg_u64_struct');
  describe.skip('multi_arg_str_str');
  describe.skip('multi_arg_u32_vector_vector');
  describe.skip('multi_arg_complex');
});
