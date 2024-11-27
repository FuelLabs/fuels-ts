contract;

mod data_structures;
mod equality;
mod utils;

use data_structures::*;
use equality::*;
use utils::*;

use abi_library::ExternalStruct;
use abi_library::ExternalEnum;
use std::vm::evm::evm_address::EvmAddress;
use std::b512::B512;
use std::string::String;
use std::bytes::Bytes;

fn divide(numerator: u64, denominator: u64) -> Result<u64, MyContractError> {
    if (denominator == 0) {
        return Err(MyContractError::DivisionByZero);
    } else {
        Ok(numerator / denominator)
    }
}

abi AbiContract {
    fn configurables() -> Configurables;

    fn types_u8(x: u8) -> u8;
    fn types_u16(x: u16) -> u16;
    fn types_u32(x: u32) -> u32;
    fn types_u64(x: u64) -> u64;
    fn types_u256(x: u256) -> u256;
    fn types_bool(x: bool) -> bool;
    fn types_b256(x: b256) -> b256;
    fn types_b512(x: B512) -> B512;
    fn types_bytes(x: Bytes) -> Bytes;

    fn types_str(x: str[5]) -> str[5];
    fn types_str_slice(x: str) -> str;
    fn types_raw_slice(x: raw_slice) -> raw_slice;
    fn types_std_string(x: String) -> String;

    fn types_array(x: [u8; 4]) -> [u8; 4];
    fn types_array_struct(x: [StructSimple; 3]) -> [StructSimple; 3];
    fn types_array_with_generic_struct(
        x: [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2],
    ) -> [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2];
    fn types_array_with_vector(x: [Vec<u32>; 1]) -> [Vec<u32>; 1];

    fn types_struct_simple(x: StructSimple) -> StructSimple;
    fn types_struct_generic(x: StructSingleGeneric<u8>) -> StructSingleGeneric<u8>;
    fn types_struct_with_tuple(
        x: StructSingleGeneric<(bool, u64)>,
    ) -> StructSingleGeneric<(bool, u64)>;
    fn types_struct_double_generic(
        x: StructGenericWithEnum<u8, u16>,
    ) -> StructGenericWithEnum<u8, u16>;
    fn types_struct_external(x: ExternalStruct) -> ExternalStruct;
    fn types_struct_with_implicit_generics(
        x: StructWithImplicitGenerics<b256, u8>,
    ) -> StructWithImplicitGenerics<b256, u8>;
    fn types_struct_with_array(x: StructWithGenericArray<b256>) -> StructWithGenericArray<b256>;
    fn types_struct_with_vector(x: StructWithVector) -> StructWithVector;
    fn types_struct_with_array_of_enums(x: StructWithEnumArray) -> StructWithEnumArray;
    fn types_struct_with_nested_array(x: StructWithNestedArray) -> StructWithNestedArray;
    fn types_struct_with_nested_tuple(x: StructWithNestedTuple) -> StructWithNestedTuple;
    fn types_struct_with_nested_struct(x: StructWithNestedStruct) -> StructWithNestedStruct;
    fn types_struct_with_multiple_struct_params(x: StructA, y: StructB, z: StructC) -> bool;
    fn types_struct_with_complex_nested_struct(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool;
    fn types_struct_with_single_option(x: StructWithSingleOption) -> StructWithSingleOption;

    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8);
    fn types_tuple_complex(
        x: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
    ) -> (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]);
    fn types_tuple_with_native_types(x: (AssetId, AssetId, bool)) -> (AssetId, AssetId, bool);
    fn types_alias_tuple_with_native_types(x: TupleWithNativeAssets) -> TupleWithNativeAssets;

    fn types_enum(x: EnumWithNative) -> EnumWithNative;
    fn types_enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType;
    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector;
    fn types_generic_enum(x: EnumDoubleGeneric<u8, u16>) -> EnumDoubleGeneric<u8, u16>;
    fn types_enum_external(x: ExternalEnum) -> ExternalEnum;
    fn types_enum_with_structs(x: EnumWithStructs) -> EnumWithStructs;

    fn types_vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn types_vector_boolean(x: Vec<bool>) -> Vec<bool>;
    fn types_vector_inside_vector(x: Vec<Vec<u32>>) -> Vec<Vec<u32>>;
    fn types_vector_with_struct(x: Vec<StructSimple>) -> Vec<StructSimple>;
    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption>;

    fn types_option(x: Option<u8>) -> Option<u8>;
    fn types_option_struct(x: Option<StructSimple>) -> Option<StructSimple>;

    fn types_identity_address(x: Identity) -> Identity;
    fn types_identity_contract_id(x: Identity) -> Identity;
    fn types_address(x: Address) -> Address;
    fn types_contract_id(x: ContractId) -> ContractId;
    fn types_asset_id(x: AssetId) -> AssetId;
    fn types_evm_address(x: EvmAddress) -> EvmAddress;
    fn types_result(x: Result<u64, u32>) -> Result<u64, str[10]>;

    fn types_void(x: ()) -> ();
    fn types_void_then_value(x: (), y: u8) -> ();
    fn types_value_then_void(x: u8, y: ()) -> ();
    fn types_value_then_void_then_value(x: u8, y: (), z: u8) -> ();
    fn types_value_then_value_then_void_then_void(x: u8, y: u8, z: (), a: ()) -> ();

    fn multi_arg_u64_u64(x: u64, y: u64) -> u64;
    fn multi_arg_b256_bool(x: b256, y: bool) -> (b256, bool);
    fn multi_arg_vector_vector(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>);
    fn multi_arg_vector_b256(x: Vec<u8>, y: b256) -> (Vec<u8>, b256);
    fn multi_arg_struct_vector(x: StructSimple, y: Vec<u8>) -> (StructSimple, Vec<u8>);
    fn multi_arg_u64_struct(x: u64, y: StructSimple) -> (u64, StructSimple);
    fn multi_arg_str_str(x: str[5], y: str[5]) -> (str[5], str[5]);
    fn multi_arg_u32_vector_vector(x: u32, y: Vec<u64>, z: Vec<u64>) -> (u32, Vec<u64>, Vec<u64>);
    fn multi_arg_complex(
        x: StructDoubleGeneric<[b256; 3], u8>,
        y: [StructDoubleGeneric<u64, bool>; 4],
        z: (str[5], bool),
        a: StructSimple,
    ) -> (StructDoubleGeneric<[b256; 3], u8>, [StructDoubleGeneric<u64, bool>; 4], (str[5], bool), StructSimple);
}

configurable {
    U8_VALUE: u8 = 10,
    BOOL_VALUE: bool = true,
    B256_VALUE: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
    OPTION_U8_VALUE: Option<u8> = Option::None,
    GENERIC_STRUCT_VALUE: StructDoubleGeneric<StructDoubleGeneric<u8, u16>, u32> = StructDoubleGeneric {
        a: StructDoubleGeneric { a: 4, b: 257 },
        b: 57000,
    },
}

impl AbiContract for Contract {
    fn configurables() -> Configurables {
        Configurables {
            U8_VALUE: U8_VALUE,
            BOOL_VALUE: BOOL_VALUE,
            B256_VALUE: B256_VALUE,
            OPTION_U8_VALUE: OPTION_U8_VALUE,
            GENERIC_STRUCT_VALUE: GENERIC_STRUCT_VALUE,
        }
    }

    fn types_u8(x: u8) -> u8 {
        assert_eq(x, 8);

        const EXPECTED: u8 = 255;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_u16(x: u16) -> u16 {
        assert_eq(x, 16);

        const EXPECTED: u16 = 65535;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_u32(x: u32) -> u32 {
        assert_eq(x, 32);

        const EXPECTED: u32 = 4294967295;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_u64(x: u64) -> u64 {
        assert_eq(x, 64);

        const EXPECTED: u64 = 4294967295000;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_u256(x: u256) -> u256 {
        assert_eq(x, 256);

        const EXPECTED: u256 = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFu256;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_bool(x: bool) -> bool {
        const INPUT: bool = false;
        assert_eq(x, INPUT);

        const EXPECTED: bool = true;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_b256(x: b256) -> b256 {
        const INPUT: b256 = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        assert_eq(x, INPUT);

        const EXPECTED: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_b512(x: B512) -> B512 {
        // HIGH_BIT and **LOW_BIT**
        const HI_BITS = 0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c;
        const LO_BITS = 0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;
        const INPUT: B512 = B512::from((HI_BITS, LO_BITS));
        assert_eq(x, INPUT);

        // HIGH_BIT and **LOW_BIT2**
        const HI_BITS2 = 0xad0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c;
        const LO_BITS2 = 0x54ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;
        const EXPECTED: B512 = B512::from((HI_BITS2, LO_BITS2));
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_bytes(x: Bytes) -> Bytes {
        let mut INPUT = Bytes::new();
        INPUT.push(1u8);
        INPUT.push(2u8);
        INPUT.push(3u8);
        assert_eq(x, INPUT);

        let mut EXPECTED = Bytes::new();
        EXPECTED.push(3u8);
        EXPECTED.push(2u8);
        EXPECTED.push(1u8);
        log(EXPECTED);
        return EXPECTED;
    }

    /**
     * Strings
     */
    fn types_str(x: str[5]) -> str[5] {
        const INPUT: str[5] = __to_str_array("Input");
        assert_eq(x, INPUT);

        const EXPECTED: str[5] = __to_str_array("Hello");
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_str_slice(x: str) -> str {
        let INPUT = "Input";
        assert(x == INPUT);

        let EXPECTED = "Output";
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_std_string(x: String) -> String {
        let INPUT = "Input";
        assert_eq(x, String::from_ascii_str(INPUT));

        let EXPECTED = String::from_ascii_str("Output");
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_raw_slice(x: raw_slice) -> raw_slice {
        let vec: Vec<u8> = Vec::from(x);
        require(vec.len() == 3, "raw slice len is not 3");
        require(vec.get(2).unwrap() == 3, "expected 3rd slice entry to be 3");
        require(vec.get(1).unwrap() == 2, "expected 2nd slice entry to be 2");
        require(vec.get(0).unwrap() == 1, "expected 1st slice entry to be 1");

        let mut vec_expected: Vec<u8> = Vec::new();
        vec_expected.push(4);
        vec_expected.push(3);
        vec_expected.push(2);
        vec_expected.push(1);
        let EXPECTED = vec_expected.as_raw_slice();
        log(EXPECTED);
        return EXPECTED
    }

    /**
     * Arrays
     */
    fn types_array(x: [u8; 4]) -> [u8; 4] {
        const INPUT: [u8; 4] = [1, 2, 3, 4];
        assert(x == INPUT);

        const EXPECTED: [u8; 4] = [4, 3, 2, 1];
        log(EXPECTED);
        return EXPECTED
    }

    fn types_array_struct(x: [StructSimple; 3]) -> [StructSimple; 3] {
        const INPUT_STRUCT_1: StructSimple = StructSimple { a: true, b: 10 };
        const INPUT = [INPUT_STRUCT_1, INPUT_STRUCT_1, INPUT_STRUCT_1];
        assert(x == INPUT);

        const EXPECTED_STRUCT: StructSimple = StructSimple {
            a: false,
            b: 30,
        };
        const EXPECTED = [EXPECTED_STRUCT, EXPECTED_STRUCT, EXPECTED_STRUCT];
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_array_with_generic_struct(
        x: [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2],
    ) -> [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2] {
        const INPUT_STRUCT: StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> = StructDoubleGeneric {
            a: StructSingleGeneric { a: 10 },
            b: __to_str_array("A"),
        };
        const INPUT = [INPUT_STRUCT, INPUT_STRUCT];
        assert(x == INPUT);

        const EXPECTED_STRUCT: StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> = StructDoubleGeneric {
            a: StructSingleGeneric { a: 20 },
            b: __to_str_array("B"),
        };
        const EXPECTED = [EXPECTED_STRUCT, EXPECTED_STRUCT];
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_array_with_vector(x: [Vec<u32>; 1]) -> [Vec<u32>; 1] {
        let INPUT_VEC = vec_u32_from([1, 2, 3]);
        let INPUT = [INPUT_VEC];
        assert(x == INPUT);

        let EXPECTED_VEC: Vec<u32> = vec_u32_from([3, 2, 1]);
        let EXPECTED: [Vec<u32>; 1] = [EXPECTED_VEC];
        log(EXPECTED);
        return EXPECTED
    }

    /**
     * Tuples
     */
    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8) {
        const INPUT: (u8, u8, u8) = (1, 2, 3);
        assert(x == INPUT);

        const EXPECTED: (u8, u8, u8) = (3, 2, 1);
        log(EXPECTED);
        return EXPECTED
    }

    fn types_tuple_complex(
        x: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
    ) -> (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) {
        let INPUT: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) = (
            1,
            StructSingleGeneric {
                a: StructSingleGeneric { a: 10 },
            },
            __to_str_array("ABC"),
        );
        assert(x == INPUT);

        let EXPECTED: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) = (
            3,
            StructSingleGeneric {
                a: StructSingleGeneric { a: 30 },
            },
            __to_str_array("CBA"),
        );
        log(EXPECTED);
        return EXPECTED
    }

    fn types_tuple_with_native_types(x: (AssetId, AssetId, bool)) -> (AssetId, AssetId, bool) {
        const A = AssetId::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        const B = AssetId::from(0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB);
        const C = true;
        const INPUT: (AssetId, AssetId, bool) = (A, B, C);
        assert(x == INPUT);

        const F = false;
        const EXPECTED: (AssetId, AssetId, bool) = (B, A, F);
        log(EXPECTED);
        return EXPECTED
    }

    fn types_alias_tuple_with_native_types(x: TupleWithNativeAssets) -> TupleWithNativeAssets {
        const A = AssetId::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        const B = AssetId::from(0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB);
        const C = true;
        const INPUT: (AssetId, AssetId, bool) = (A, B, C);
        assert(x == INPUT);

        const F = false;
        const EXPECTED: (AssetId, AssetId, bool) = (B, A, F);
        log(EXPECTED);
        return EXPECTED
    }

    /**
     * Structs
     */
    fn types_struct_simple(x: StructSimple) -> StructSimple {
        const INPUT: StructSimple = StructSimple { a: true, b: 10 };
        assert(x == INPUT);

        const EXPECTED: StructSimple = StructSimple {
            a: false,
            b: 30,
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_generic(x: StructSingleGeneric<u8>) -> StructSingleGeneric<u8> {
        const INPUT: StructSingleGeneric<u8> = StructSingleGeneric { a: 10 };
        assert(x == INPUT);

        const EXPECTED: StructSingleGeneric<u8> = StructSingleGeneric { a: 20 };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_tuple(
        x: StructSingleGeneric<(bool, u64)>,
    ) -> StructSingleGeneric<(bool, u64)> {
        const INPUT: StructSingleGeneric<(bool, u64)> = StructSingleGeneric { a: (true, 10) };
        assert(x == INPUT);

        const EXPECTED: StructSingleGeneric<(bool, u64)> = StructSingleGeneric { a: (false, 20) };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_double_generic(
        x: StructGenericWithEnum<u8, u16>,
    ) -> StructGenericWithEnum<u8, u16> {
        const INPUT: StructGenericWithEnum<u8, u16> = StructGenericWithEnum {
            a: 10,
            b: EnumDoubleGeneric::a(10),
        };
        assert(x == INPUT);

        const EXPECTED: StructGenericWithEnum<u8, u16> = StructGenericWithEnum {
            a: 20,
            b: EnumDoubleGeneric::b(10),
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_external(x: ExternalStruct) -> ExternalStruct {
        const INPUT: ExternalStruct = ExternalStruct { value: 10 };
        assert(x == INPUT);

        const EXPECTED: ExternalStruct = ExternalStruct { value: 20 };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_nested_array(x: StructWithNestedArray) -> StructWithNestedArray {
        const INPUT_STRUCT: StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> = StructDoubleGeneric {
            a: StructSingleGeneric { a: 10 },
            b: __to_str_array("A"),
        };
        const INPUT = StructWithNestedArray {
            a: [INPUT_STRUCT, INPUT_STRUCT],
        };
        assert(x == INPUT);

        const EXPECTED_STRUCT: StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> = StructDoubleGeneric {
            a: StructSingleGeneric { a: 20 },
            b: __to_str_array("B"),
        };
        const EXPECTED = StructWithNestedArray {
            a: [EXPECTED_STRUCT, EXPECTED_STRUCT],
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_nested_tuple(x: StructWithNestedTuple) -> StructWithNestedTuple {
        const INPUT: StructWithNestedTuple = StructWithNestedTuple {
            a: (
                10,
                StructSingleGeneric {
                    a: StructSingleGeneric { a: 20 },
                },
                __to_str_array("ABC"),
            ),
        };
        assert(x == INPUT);

        const EXPECTED: StructWithNestedTuple = StructWithNestedTuple {
            a: (
                30,
                StructSingleGeneric {
                    a: StructSingleGeneric { a: 40 },
                },
                __to_str_array("CBA"),
            ),
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_nested_struct(x: StructWithNestedStruct) -> StructWithNestedStruct {
        const INPUT: StructWithNestedStruct = StructWithNestedStruct {
            a: StructDoubleGeneric {
                a: StructSingleGeneric { a: 10 },
                b: 20,
            },
        };
        assert(x == INPUT);

        const EXPECTED: StructWithNestedStruct = StructWithNestedStruct {
            a: StructDoubleGeneric {
                a: StructSingleGeneric { a: 30 },
                b: 40,
            },
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_multiple_struct_params(x: StructA, y: StructB, z: StructC) -> bool {
        const STRUCT_A: StructA = StructA { propA1: 10 };
        assert(x == STRUCT_A);

        const STRUCT_B: StructB = StructB {
            propB1: STRUCT_A,
            propB2: 20,
        };
        assert(y == STRUCT_B);

        // PropC2
        let mut propC2 = Vec::new();
        propC2.push(STRUCT_B);

        // PropC3
        const STRUCT_E: StructE<u8> = StructE {
            propE1: STRUCT_A,
            propE2: STRUCT_B,
            propE3: 30,
        };
        let mut propD1 = Vec::new();
        propD1.push(STRUCT_E);

        const STRUCT_F: StructF<str[1]> = StructF {
            propF1: 50,
            propF2: __to_str_array("A"),
        };
        let propC3: StructD<u8, u8, StructF<str[1]>> = StructD {
            propD1: propD1,
            propD2: 40,
            propD3: STRUCT_F,
        };

        let STRUCT_C: StructC = StructC {
            propC1: STRUCT_A,
            propC2: propC2,
            propC3: propC3,
            // propC4: [STRUCT_D],
            // propC5: [STRUCT_D],
        };

        assert(z == STRUCT_C);

        return true;

        // const STRUCT_C4: StructD<u16, u16, StructF<bool>> = StructD<u16, u16, StructF<bool> {
        //   propD1: [StructE { propE1: STRUCT_A, propE2: STRUCT_B, propE3: 30 }],
        //   propD2: 40,
        //   propD3: StructF { propF1: 50, propF2: true },
        // };

        // const STRUCT_C5: StructD<u32, u32, StructF<Vec<StructG>>> = StructD<u32, u32, StructF<Vec<StructG>> {
        //   propD1: [StructE { propE1: STRUCT_A, propE2: STRUCT_B, propE3: 30 }],
        //   propD2: 40,
        //   propD3: StructF { propF1: 50, propF2: [StructG { propG1: 60 }] },
        // };

        // const STRUCT_C: StructC = StructC {
        //   propC1: STRUCT_A,
        //   propC2: [STRUCT_B],
        //   propC3: STRUCT_C3,
        //   propC4: [STRUCT_C4],
        //   propC5: [STRUCT_C5],
        // };
        // const STRUCT_B: StructB = StructB { propB1: INPUT_X, propB2: 20 };
        // const STRUCT_C: StructC = StructC { propC1: INPUT_X, propC2: [INPUT_Y], propC3: INPUT_D, propC4: [INPUT_D], propC5: [INPUT_D] };
        // const STRUCT_D: StructD = StructD {
        //     propD1: [StructE { propE1: INPUT_X, propE2: INPUT_Y, propE3: 30 }],
        //     propD2: 40,
        //     propD3: StructF { propF1: 50, propF2: __to_str_array("ABC") },
        // };
        // assert(y == INPUT_Y);
    }

    fn types_struct_with_implicit_generics(
        x: StructWithImplicitGenerics<b256, u8>,
    ) -> StructWithImplicitGenerics<b256, u8> {
        const INPUT_B256: b256 = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        const INPUT: StructWithImplicitGenerics<b256, u8> = StructWithImplicitGenerics {
            a: [INPUT_B256, INPUT_B256, INPUT_B256],
            b: (INPUT_B256, 10),
        };

        assert(x == INPUT);

        const EXPECTED_B256: b256 = 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb;
        const EXPECTED: StructWithImplicitGenerics<b256, u8> = StructWithImplicitGenerics {
            a: [EXPECTED_B256, EXPECTED_B256, EXPECTED_B256],
            b: (EXPECTED_B256, 25),
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_array(x: StructWithGenericArray<b256>) -> StructWithGenericArray<b256> {
        const INPUT_B256: b256 = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        const INPUT_STRUCT: StructDoubleGeneric<b256, u8> = StructDoubleGeneric {
            a: INPUT_B256,
            b: 10,
        };
        const INPUT: StructWithGenericArray<b256> = StructWithGenericArray {
            a: [INPUT_STRUCT, INPUT_STRUCT, INPUT_STRUCT],
        };
        assert(x == INPUT);

        const EXPECTED_B256: b256 = 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb;
        const EXPECTED_STRUCT: StructDoubleGeneric<b256, u8> = StructDoubleGeneric {
            a: EXPECTED_B256,
            b: 20,
        };
        const EXPECTED: StructWithGenericArray<b256> = StructWithGenericArray {
            a: [EXPECTED_STRUCT, EXPECTED_STRUCT, EXPECTED_STRUCT],
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_vector(x: StructWithVector) -> StructWithVector {
        let INPUT_VEC: Vec<u8> = vec_u8_from([1, 2, 3]);
        let INPUT: StructWithVector = StructWithVector {
            a: 1,
            b: INPUT_VEC,
        };
        assert(x == INPUT);

        let EXPECTED_VEC: Vec<u8> = vec_u8_from([3, 2, 1]);
        let EXPECTED: StructWithVector = StructWithVector {
            a: 3,
            b: EXPECTED_VEC,
        };
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_array_of_enums(x: StructWithEnumArray) -> StructWithEnumArray {
        const INPUT_ENUM = EnumWithNative::Checked;
        const INPUT: StructWithEnumArray = StructWithEnumArray {
            a: [INPUT_ENUM, INPUT_ENUM, INPUT_ENUM],
        };
        assert(x == INPUT);

        const EXPECTED_ENUM = EnumWithNative::Pending;
        const EXPECTED: StructWithEnumArray = StructWithEnumArray {
            a: [EXPECTED_ENUM, EXPECTED_ENUM, EXPECTED_ENUM],
        };

        log(EXPECTED);
        return EXPECTED;
    }

    fn types_struct_with_complex_nested_struct(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool {
        false
    }

    fn types_struct_with_single_option(x: StructWithSingleOption) -> StructWithSingleOption {
        const OPTION_ARRAY: [Option<u8>; 5] = [Option::Some(1), Option::None, Option::Some(2), Option::None, Option::Some(3)];
        const OPTION_STRUCT: Option<StructWithMultiOption> = Option::Some(StructWithMultiOption {
            a: OPTION_ARRAY,
        });
        const INPUT: StructWithSingleOption = StructWithSingleOption {
            a: OPTION_STRUCT,
        };
        assert(x == INPUT);

        const EXPECTED: StructWithSingleOption = StructWithSingleOption {
            a: Option::None,
        };
        log(EXPECTED);
        return EXPECTED;
    }

    /**
     * Enums
     */
    fn types_enum(x: EnumWithNative) -> EnumWithNative {
        assert(x == EnumWithNative::Checked);

        const EXPECTED = EnumWithNative::Pending;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType {
        assert(x == EnumWithBuiltinType::a(true));

        const EXPECTED = EnumWithBuiltinType::b(20);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector {
        assert(x == EnumWithVector::a(10));

        let EXPECTED_VEC = vec_u8_from([1, 2, 3]);
        let EXPECTED = EnumWithVector::b(EXPECTED_VEC);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_generic_enum(x: EnumDoubleGeneric<u8, u16>) -> EnumDoubleGeneric<u8, u16> {
        const INPUT: EnumDoubleGeneric<u8, u16> = EnumDoubleGeneric::a(10);
        assert(x == INPUT);

        const EXPECTED: EnumDoubleGeneric<u8, u16> = EnumDoubleGeneric::b(20);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_enum_external(x: ExternalEnum) -> ExternalEnum {
        assert_eq(x, ExternalEnum::A);

        const EXPECTED = ExternalEnum::B;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_enum_with_structs(x: EnumWithStructs) -> EnumWithStructs {
        const INPUT: EnumWithStructs = EnumWithStructs::a(EnumWithNative::Checked);
        assert(x == INPUT);

        const EXPECTED: EnumWithStructs = EnumWithStructs::b(StructSimple { a: true, b: 10 });
        log(EXPECTED);
        return EXPECTED;
    }

    /**
     * Vectors
     */
    fn types_vector_u8(x: Vec<u8>) -> Vec<u8> {
        let INPUT = vec_u8_from([1, 2, 3]);
        assert(x == INPUT);

        let EXPECTED = vec_u8_from([3, 2, 1]);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_vector_boolean(x: Vec<bool>) -> Vec<bool> {
        let INPUT = vec_bool_from([true, false, true, false]);
        assert(x == INPUT);

        let EXPECTED = vec_bool_from([false, true, false, true]);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_vector_inside_vector(x: Vec<Vec<u32>>) -> Vec<Vec<u32>> {
        let mut INPUT = Vec::new();
        INPUT.push(vec_u32_from([1, 2, 3]));
        assert(x == INPUT);

        let mut EXPECTED = Vec::new();
        EXPECTED.push(vec_u32_from([3, 2, 1]));
        EXPECTED.push(vec_u32_from([6, 5, 4]));
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_vector_with_struct(x: Vec<StructSimple>) -> Vec<StructSimple> {
        let mut INPUT = Vec::new();
        INPUT.push(StructSimple { a: true, b: 10 });
        assert(x == INPUT);

        let mut EXPECTED = Vec::new();
        EXPECTED.push(StructSimple {
            a: false,
            b: 30,
        });
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption> {
        let mut INPUT = Vec::new();
        INPUT.push(StructWithMultiOption {
            a: [Some(1), Some(2), Some(3), Some(4), Some(5)],
        });
        assert(x == INPUT);

        let mut EXPECTED = Vec::new();
        EXPECTED.push(StructWithMultiOption {
            a: [Some(5), Some(4), Some(3), Some(2), Some(1)],
        });
        log(EXPECTED);
        return EXPECTED;
    }

    /**
     * Options
     */
    fn types_option(x: Option<u8>) -> Option<u8> {
        const INPUT: Option<u8> = Option::Some(10);
        assert(x == INPUT);

        const EXPECTED: Option<u8> = Option::None;
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_option_struct(x: Option<StructSimple>) -> Option<StructSimple> {
        let input_struct: StructSimple = StructSimple {
            a: true,
            b: 10,
        };
        let input: Option<StructSimple> = Option::Some(input_struct);
        assert(x == input);

        const EXPECTED: Option<StructSimple> = Option::None;
        log(EXPECTED);
        return EXPECTED;
    }

    /**
     * Native types
     */
    fn types_asset_id(x: AssetId) -> AssetId {
        const INPUT = AssetId::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        assert(x == INPUT);

        const EXPECTED = AssetId::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_identity_address(x: Identity) -> Identity {
        const ADDRESS = Address::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        const INPUT = Identity::Address(ADDRESS);
        assert(x == INPUT);

        const EXPECTED_ADDRESS = Address::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        const EXPECTED = Identity::Address(EXPECTED_ADDRESS);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_identity_contract_id(x: Identity) -> Identity {
        const INPUT_CONTRACT_ID = ContractId::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        const INPUT = Identity::ContractId(INPUT_CONTRACT_ID);
        assert(x == INPUT);

        const EXPECTED_ADDRESS = ContractId::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        const EXPECTED = Identity::ContractId(EXPECTED_ADDRESS);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_address(x: Address) -> Address {
        const INPUT = Address::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        assert(x == INPUT);

        const EXPECTED = Address::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_contract_id(x: ContractId) -> ContractId {
        const INPUT = ContractId::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        assert(x == INPUT);

        const EXPECTED = ContractId::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_evm_address(x: EvmAddress) -> EvmAddress {
        let INPUT = EvmAddress::from(0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA);
        assert(x == INPUT);

        let EXPECTED = EvmAddress::from(0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb);
        log(EXPECTED);
        return EXPECTED;
    }

    fn types_result(x: Result<u64, u32>) -> Result<u64, str[10]> {
        if (x.is_err()) {
            return Err(__to_str_array("InputError"));
        }

        let result = divide(20, x.unwrap());
        match result {
            Ok(value) => Ok(value),
            Err(MyContractError::DivisionByZero) => Err(__to_str_array("DivisError")),
        }
    }

    /**
     * Void
     */
    fn types_void(x: ()) -> () {
        log(x);
        return x;
    }

    fn types_void_then_value(x: (), y: u8) -> () {
        const inputY = 10;
        assert(y == inputY);
        ()
    }

    fn types_value_then_void(x: u8, y: ()) -> () {
        const inputX = 10;
        assert(x == inputX);
        ()
    }

    fn types_value_then_void_then_value(x: u8, y: (), z: u8) -> () {
        const inputX = 10;
        assert(x == inputX);

        const inputZ = 20;
        assert(z == inputZ);
        ()
    }

    fn types_value_then_value_then_void_then_void(x: u8, y: u8, z: (), a: ()) -> () {
        const inputX = 10;
        assert(x == inputX);

        const inputY = 20;
        assert(y == inputY);
        ()
    }

    /**
      * Multi-args
      */
    fn multi_arg_u64_u64(x: u64, y: u64) -> u64 {
        const INPUT_X = 1;
        const INPUT_Y = 2;
        assert(x == INPUT_X);
        assert(y == INPUT_Y);

        const EXPECTED = 3;
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_b256_bool(x: b256, y: bool) -> (b256, bool) {
        const INPUT_X: b256 = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        const INPUT_Y: bool = true;
        assert_eq(x, INPUT_X);
        assert_eq(y, INPUT_Y);

        const EXPECTED: (b256, bool) = (0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb, false);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_vector_vector(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        let INPUT_X = vec_u8_from([1, 2, 3]);
        let INPUT_Y = vec_u8_from([4, 5, 6]);
        assert(x == INPUT_X);
        assert(y == INPUT_Y);

        let EXPECTED_X = vec_u8_from([7, 8, 9]);
        let EXPECTED_Y = vec_u8_from([10, 11, 12]);
        let EXPECTED = (EXPECTED_X, EXPECTED_Y);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_vector_b256(x: Vec<u8>, y: b256) -> (Vec<u8>, b256) {
        let INPUT_X = vec_u8_from([1, 2, 3]);
        let INPUT_Y: b256 = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
        assert(x == INPUT_X);
        assert(y == INPUT_Y);

        let EXPECTED_X = vec_u8_from([7, 8, 9]);
        const EXPECTED_Y = 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb;
        let EXPECTED = (EXPECTED_X, EXPECTED_Y);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_struct_vector(x: StructSimple, y: Vec<u8>) -> (StructSimple, Vec<u8>) {
        const INPUT_X = StructSimple { a: true, b: 1 };
        let INPUT_Y = vec_u8_from([1, 2, 3]);
        assert(x == INPUT_X);
        assert(y == INPUT_Y);

        const EXPECTED_X = StructSimple { a: false, b: 2 };
        let EXPECTED_Y = vec_u8_from([4, 5, 6]);
        let EXPECTED = (EXPECTED_X, EXPECTED_Y);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_u64_struct(x: u64, y: StructSimple) -> (u64, StructSimple) {
        const INPUT_X = 99u64;
        let input_y = StructSimple { a: true, b: 51 };
        assert(x == INPUT_X);
        assert(y == input_y);

        const EXPECTED_X = 3u64;
        let expected_y = StructSimple { a: false, b: 4 };
        let EXPECTED = (EXPECTED_X, expected_y);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_str_str(x: str[5], y: str[5]) -> (str[5], str[5]) {
        let input_x: str = "Input";
        let input_y: str = "False";

        assert_eq(from_str_array(x), input_x);
        assert_eq(from_str_array(y), input_y);

        let EXPECTED_X: str[5] = __to_str_array("Fuuel");
        let EXPECTED_Y: str[5] = __to_str_array("Niice");
        let EXPECTED = (EXPECTED_X, EXPECTED_Y);
        log(EXPECTED);
        return EXPECTED;
    }

    fn multi_arg_u32_vector_vector(x: u32, y: Vec<u64>, z: Vec<u64>) -> (u32, Vec<u64>, Vec<u64>) {
        const INPUT_X = 1u32;

        let mut input_y: Vec<u64> = Vec::new();
        input_y.push(10020);
        input_y.push(1231231);
        input_y.push(777657);

        let mut input_z: Vec<u64> = Vec::new();
        input_z.push(99);
        input_z.push(101);

        assert(x == INPUT_X);
        assert(y == input_y);
        assert(z == input_z);

        const EXPECTED_X = 2u32;

        let mut expected_y: Vec<u64> = Vec::new();
        expected_y.push(7);
        expected_y.push(8);
        expected_y.push(9);

        let mut expected_z: Vec<u64> = Vec::new();
        expected_z.push(10);
        expected_z.push(11);
        expected_z.push(12);

        let expected = (EXPECTED_X, expected_y, expected_z);
        log(expected);
        return expected;
    }

    fn multi_arg_complex(
        x: StructDoubleGeneric<[b256; 3], u8>,
        y: [StructDoubleGeneric<u64, bool>; 4],
        z: (str[5], bool),
        a: StructSimple,
    ) -> (StructDoubleGeneric<[b256; 3], u8>, [StructDoubleGeneric<u64, bool>; 4], (str[5], bool), StructSimple) {
        let input_x: StructDoubleGeneric<[b256; 3], u8> = StructDoubleGeneric {
            a: [
                0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,
                0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb,
                0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc,
            ],
            b: 10,
        };

        let input_y: [StructDoubleGeneric<u64, bool>; 4] = [
            StructDoubleGeneric {
                a: 99u64,
                b: false,
            },
            StructDoubleGeneric {
                a: 199u64,
                b: false,
            },
            StructDoubleGeneric {
                a: 2000u64,
                b: false,
            },
            StructDoubleGeneric {
                a: 31u64,
                b: true,
            },
        ];

        let input_z: (str[5], bool) = (__to_str_array("Input"), true);

        let input_a: StructSimple = StructSimple { a: true, b: 10 };

        assert(x == input_x);
        assert(y == input_y);
        assert(z == input_z);
        assert(a == input_a);

        let expected_x: StructDoubleGeneric<[b256; 3], u8> = StructDoubleGeneric {
            a: [
                0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd,
                0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee,
                0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff,
            ],
            b: 99,
        };

        let expected_y: [StructDoubleGeneric<u64, bool>; 4] = [
            StructDoubleGeneric {
                a: 11u64,
                b: true,
            },
            StructDoubleGeneric {
                a: 99u64,
                b: true,
            },
            StructDoubleGeneric {
                a: 567u64,
                b: true,
            },
            StructDoubleGeneric {
                a: 971u64,
                b: false,
            },
        ];

        let expected_z: (str[5], bool) = (__to_str_array("tupni"), false);

        let expected_a: StructSimple = StructSimple {
            a: false,
            b: 57,
        };

        let expected = (expected_x, expected_y, expected_z, expected_a);
        log(expected);
        return expected;
    }
}
