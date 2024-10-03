contract;
use abi_library::ExternalStruct;
use abi_library::ExternalEnum;
use std::vm::evm::evm_address::EvmAddress;
use std::b512::B512;
use std::string::String;
use std::bytes::Bytes;

enum EnumWithNative {
    Checked: (),
    Pending: (),
}

enum EnumWithVector {
    num: u8,
    vec: Vec<u8>,
}

enum EnumWithBuiltinType {
    a: bool,
    b: u64,
}

enum EnumDoubleGeneric<T1, T2> {
    a: T1,
    b: T2,
}

enum EnumWithStructs {
    a: EnumWithNative,
    b: StructSimple,
    c: EnumDoubleGeneric<u64, StructSimple>,
}

struct StructSimple {
    a: bool,
    b: u32,
}

struct StructWithEnumArray {
    a: [EnumWithNative; 3],
}

struct StructWithMultiOption {
    multiple: [Option<u8>; 5],
}

struct StructWithSingleOption {
    single: Option<StructWithMultiOption>,
}

struct StructWithVector {
    num: u8,
    vec: Vec<u8>,
}

struct StructSingleGeneric<T> {
    a: T,
}

struct StructDoubleGeneric<T1, T2> {
    a: T1,
    b: T2,
}

struct StructGenericWithEnum<T1, T2> {
    a: T1,
    b: EnumDoubleGeneric<T1, T2>,
}

struct StructWithImplicitGenerics<E, F> {
    arr: [E; 3],
    tuple: (E, F),
    string: str[5],
    array: [u8; 2],
}

struct StructWithGenericArray<K> {
    a: [StructDoubleGeneric<K, u8>; 3],
}

struct StructWithNestedArray {
    a: [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2],
}

struct StructWithNestedTuple {
    a: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
}

struct StructWithNestedStruct {
    a: StructDoubleGeneric<StructSingleGeneric<u8>, u16>,
}

struct StructA {
    propA1: u8,
}

struct StructB {
    propB1: StructA,
    propB2: u16,
}

struct StructC {
    propC1: StructA,
    propC2: Vec<StructB>,
    propC3: StructD<u8, u8, StructF<str[1]>>,
    propC4: Vec<StructD<u16, u16, StructF<bool>>>,
    propC5: Vec<StructD<u32, u32, StructF<Vec<StructG>>>>,
}

struct StructD<T, U, V> {
    propD1: Vec<StructE<T>>,
    propD2: U,
    propD3: V,
}

struct StructE<T> {
    propE1: StructA,
    propE2: StructB,
    propE3: T,
}

struct StructF<T> {
    propF1: u64,
    propF2: T,
}

struct StructG {
    propG1: u8,
}

enum MyContractError {
    DivisionByZero: (),
}

type TupleWithNativeAssets = (AssetId, AssetId, bool);

fn divide(numerator: u64, denominator: u64) -> Result<u64, MyContractError> {
    if (denominator == 0) {
        return Err(MyContractError::DivisionByZero);
    } else {
        Ok(numerator / denominator)
    }
}

struct Configurables {
    U8_VALUE: u8,
    BOOL_VALUE: bool,
    B256_VALUE: b256,
    OPTION_U8_VALUE: Option<u8>,
    GENERIC_STRUCT_VALUE: StructDoubleGeneric<StructDoubleGeneric<u8, u16>, u32>,
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

abi MyContract {
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

    fn types_enum(x: EnumWithNative) -> EnumWithNative;
    fn types_enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType;
    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector;
    fn types_generic_enum(x: EnumDoubleGeneric<u8, u16>) -> EnumDoubleGeneric<u8, u16>;
    fn types_enum_external(x: ExternalEnum) -> ExternalEnum;
    fn types_enum_with_structs(x: EnumWithStructs) -> EnumWithStructs;
    fn types_struct_with_nested_struct(x: StructWithNestedStruct) -> StructWithNestedStruct;
    fn types_struct_with_single_option(x: StructWithSingleOption) -> StructWithSingleOption;

    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8);
    fn types_tuple_complex(
        x: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
    ) -> (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]);

    fn types_vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn types_vector_boolean(x: Vec<bool>) -> Vec<bool>;
    fn types_vector_geo(x: Vec<StructSimple>) -> Vec<StructSimple>;
    fn types_vector_inside_vector(x: Vec<Vec<u32>>) -> Vec<Vec<u32>>;
    fn types_vector_inside_array(x: [Vec<u32>; 1]) -> [Vec<u32>; 1];
    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption>;
    fn types_option(x: Option<u8>) -> Option<u8>;
    fn types_option_geo(x: Option<StructSimple>) -> Option<StructSimple>;
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

    fn types_asset_id(x: AssetId) -> AssetId;
    fn types_identity(x: Identity) -> Identity;
    fn types_evm_address(x: EvmAddress) -> EvmAddress;
    fn types_tuple_with_native_types(x: (AssetId, AssetId, bool)) -> (AssetId, AssetId, bool);
    fn types_address(x: Address) -> Address;
    fn types_contract_id(x: ContractId) -> ContractId;
    fn types_alias_tuple_with_native_types(x: TupleWithNativeAssets) -> TupleWithNativeAssets;
    fn types_struct_with_multiple_struct_params(x: StructA, y: StructB, z: StructC) -> bool;
    fn types_struct_with_complex_nested_struct(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool;
}

impl MyContract for Contract {
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
        255
    }
    fn types_u16(x: u16) -> u16 {
        65535
    }
    fn types_u32(x: u32) -> u32 {
        4294967295
    }
    fn types_u64(x: u64) -> u64 {
        4294967295000
    }
    fn types_u256(x: u256) -> u256 {
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFu256
    }
    fn types_b256(x: b256) -> b256 {
        0x0000000000000000000000000000000000000000000000000000000000000000
    }
    fn types_b512(x: B512) -> B512 {
        x
    }
    fn types_bool(x: bool) -> bool {
        true
    }
    fn types_bytes(x: Bytes) -> Bytes {
        x
    }
    fn types_str(x: str[5]) -> str[5] {
        __to_str_array("Hello")
    }
    fn types_str_slice(x: str) -> str {
        x
    }
    fn types_raw_slice(x: raw_slice) -> raw_slice {
        x
    }
    fn types_std_string(x: String) -> String {
        x
    }
    fn types_array(x: [u8; 4]) -> [u8; 4] {
        x
    }
    fn types_array_struct(x: [StructSimple; 3]) -> [StructSimple; 3] {
        x
    }
    fn types_array_with_generic_struct(
        x: [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2],
    ) -> [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2] {
        x
    }
    fn types_struct_simple(x: StructSimple) -> StructSimple {
        x
    }
    fn types_struct_generic(x: StructSingleGeneric<u8>) -> StructSingleGeneric<u8> {
        x
    }
    fn types_struct_with_tuple(
        x: StructSingleGeneric<(bool, u64)>,
    ) -> StructSingleGeneric<(bool, u64)> {
        x
    }
    fn types_struct_double_generic(
        x: StructGenericWithEnum<u8, u16>,
    ) -> StructGenericWithEnum<u8, u16> {
        x
    }
    fn types_struct_external(x: ExternalStruct) -> ExternalStruct {
        x
    }
    fn types_struct_with_implicit_generics(
        x: StructWithImplicitGenerics<b256, u8>,
    ) -> StructWithImplicitGenerics<b256, u8> {
        x
    }
    fn types_struct_with_array(x: StructWithGenericArray<b256>) -> StructWithGenericArray<b256> {
        x
    }
    fn types_struct_with_vector(x: StructWithVector) -> StructWithVector {
        x
    }
    fn types_struct_with_array_of_enums(x: StructWithEnumArray) -> StructWithEnumArray {
        x
    }
    fn types_struct_with_nested_array(x: StructWithNestedArray) -> StructWithNestedArray {
        x
    }
    fn types_struct_with_nested_tuple(x: StructWithNestedTuple) -> StructWithNestedTuple {
        x
    }
    fn types_struct_with_single_option(x: StructWithSingleOption) -> StructWithSingleOption {
        x
    }
    fn types_struct_with_nested_struct(x: StructWithNestedStruct) -> StructWithNestedStruct {
        x
    }
    fn types_enum(x: EnumWithNative) -> EnumWithNative {
        x
    }
    fn types_enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType {
        x
    }
    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector {
        x
    }
    fn types_generic_enum(x: EnumDoubleGeneric<u8, u16>) -> EnumDoubleGeneric<u8, u16> {
        x
    }
    fn types_enum_external(x: ExternalEnum) -> ExternalEnum {
        x
    }
    fn types_enum_with_structs(x: EnumWithStructs) -> EnumWithStructs {
        x
    }
    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8) {
        (x.0, x.1, x.2)
    }

    fn types_tuple_complex(
        x: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
    ) -> (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) {
        (x.0, x.1, x.2)
    }

    fn types_vector_u8(x: Vec<u8>) -> Vec<u8> {
        x
    }

    fn types_vector_boolean(x: Vec<bool>) -> Vec<bool> {
        x
    }
    fn types_vector_inside_vector(x: Vec<Vec<u32>>) -> Vec<Vec<u32>> {
        x
    }
    fn types_vector_inside_array(x: [Vec<u32>; 1]) -> [Vec<u32>; 1] {
        x
    }
    fn types_vector_geo(x: Vec<StructSimple>) -> Vec<StructSimple> {
        x
    }

    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption> {
        x
    }
    fn types_option(x: Option<u8>) -> Option<u8> {
        x
    }
    fn types_option_geo(x: Option<StructSimple>) -> Option<StructSimple> {
        x
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

    fn types_void(x: ()) -> () {
        x
    }
    fn types_void_then_value(x: (), y: u8) -> () {
        ()
    }

    fn types_value_then_void(x: u8, y: ()) -> () {
        ()
    }
    fn types_value_then_void_then_value(x: u8, y: (), z: u8) -> () {
        ()
    }
    fn types_value_then_value_then_void_then_void(x: u8, y: u8, z: (), a: ()) -> () {
        ()
    }

    fn multi_arg_u64_u64(x: u64, y: u64) -> u64 {
        0
    }
    fn multi_arg_b256_bool(x: b256, y: bool) -> (b256, bool) {
        (x, y)
    }
    fn multi_arg_vector_vector(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        (x, y)
    }
    fn multi_arg_vector_b256(x: Vec<u8>, y: b256) -> (Vec<u8>, b256) {
        (x, y)
    }
    fn multi_arg_struct_vector(x: StructSimple, y: Vec<u8>) -> (StructSimple, Vec<u8>) {
        (x, y)
    }
    fn multi_arg_u64_struct(x: u64, y: StructSimple) -> (u64, StructSimple) {
        (x, y)
    }
    fn multi_arg_str_str(x: str[5], y: str[5]) -> (str[5], str[5]) {
        (x, y)
    }
    fn multi_arg_u32_vector_vector(x: u32, y: Vec<u64>, z: Vec<u64>) -> (u32, Vec<u64>, Vec<u64>) {
        (x, y, z)
    }
    fn types_identity(x: Identity) -> Identity {
        x
    }
    fn types_asset_id(x: AssetId) -> AssetId {
        x
    }
    fn types_evm_address(x: EvmAddress) -> EvmAddress {
        EvmAddress::from(0x0606060606060606060606060606060606060606060606060606060606060606)
    }
    fn types_alias_tuple_with_native_types(x: TupleWithNativeAssets) -> TupleWithNativeAssets {
        (x.0, x.1, x.2)
    }
    fn types_tuple_with_native_types(x: (AssetId, AssetId, bool)) -> (AssetId, AssetId, bool) {
        (x.0, x.1, x.2)
    }
    fn types_address(x: Address) -> Address {
        x
    }
    fn types_contract_id(x: ContractId) -> ContractId {
        x
    }

    fn types_struct_with_multiple_struct_params(x: StructA, y: StructB, z: StructC) -> bool {
        true
    }
    fn types_struct_with_complex_nested_struct(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool {
        false
    }
}
