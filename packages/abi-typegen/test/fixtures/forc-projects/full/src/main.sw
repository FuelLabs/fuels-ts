contract;
use libs_for_testing::ExternalStruct;
use libs_for_testing::ExternalEnum;
use std::vm::evm::evm_address::EvmAddress;
use std::b512::B512;
use std::string::String;
use std::bytes::Bytes;

enum MyEnum {
    Checked: (),
    Pending: (),
}

enum GenericEnum<T1, T2> {
    a: T1,
    b: T2,
}

enum EnumWithVector {
    num: u8,
    vec: Vec<u8>,
}

struct GenericStructWithEnum<T1, T2> {
    a: T1,
    b: GenericEnum<T1, T2>,
}

struct MyStruct {
    x: u8,
    y: u8,
    state: MyEnum,
}

struct StructWithMultiOption {
    multiple: [Option<u8>; 5],
}

struct StructWithSingleOption {
    single: Option<StructWithMultiOption>,
}

enum MyContractError {
    DivisionByZero: (),
}

fn divide(numerator: u64, denominator: u64) -> Result<u64, MyContractError> {
    if (denominator == 0) {
        return Err(MyContractError::DivisionByZero);
    } else {
        Ok(numerator / denominator)
    }
}

abi MyContract {
    fn types_empty(x: ()) -> ();
    fn types_empty_then_value(x: (), y: u8) -> ();
    fn types_value_then_empty(x: u8, y: ()) -> ();
    fn types_value_then_empty_then_value(x: u8, y: (), z: u8) -> ();
    fn types_value_then_value_then_empty_then_empty(x: u8, y: u8, z: (), a: ()) -> ();
    fn types_u8(x: u8) -> u8;
    fn types_u16(x: u16) -> u16;
    fn types_u32(x: u32) -> u32;
    fn types_u64(x: u64) -> u64;
    fn types_u256(x: u256) -> u256;
    fn types_str(x: str[5]) -> str[5];
    fn types_asset_id(x: AssetId) -> AssetId;
    fn types_bool(x: bool) -> bool;
    fn types_b256(x: b256) -> b256;
    fn types_b512(x: B512) -> B512;
    fn types_struct(x: MyStruct) -> MyStruct;
    fn types_array(x: [u8; 3]) -> [u8; 3];
    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8);
    fn types_enum(x: MyEnum) -> MyEnum;
    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector;
    fn types_vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn types_vector_geo(x: Vec<MyStruct>) -> Vec<MyStruct>;
    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption>;
    fn types_option(x: Option<u8>) -> Option<u8>;
    fn types_option_geo(x: Option<MyStruct>) -> Option<MyStruct>;
    fn types_evm_address(x: EvmAddress) -> EvmAddress;
    fn types_bytes(x: Bytes) -> Bytes;
    fn types_raw_slice(x: raw_slice) -> raw_slice;
    fn types_str_slice(x: str) -> str;
    fn types_std_string(x: String) -> String;
    fn types_result(x: Result<u64, u32>) -> Result<u64, str[10]>;
    fn type_address(x: Address) -> Address;
    fn type_contract_id(x: ContractId) -> ContractId;
    fn type_identity(x: Identity) -> Identity;
    fn type_external_struct(x: ExternalStruct) -> ExternalStruct;
    fn type_external_enum(x: ExternalEnum) -> ExternalEnum;
    fn types_generic_enum(x: GenericEnum<u8, u16>) -> GenericEnum<u8, u16>;
    fn types_generic_struct(x: GenericStructWithEnum<u8, u16>) -> GenericStructWithEnum<u8, u16>;
}

impl MyContract for Contract {
    fn types_empty(x: ()) -> () {
        x
    }

    fn types_empty_then_value(x: (), y: u8) -> () {
        ()
    }

    fn types_value_then_empty(x: u8, y: ()) -> () {
        ()
    }

    fn types_value_then_empty_then_value(x: u8, y: (), z: u8) -> () {
        ()
    }

    fn types_value_then_value_then_empty_then_empty(x: u8, y: u8, z: (), a: ()) -> () {
        ()
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
    fn types_str(x: str[5]) -> str[5] {
        __to_str_array("Hello")
    }
    fn types_bool(x: bool) -> bool {
        true
    }
    fn types_asset_id(x: AssetId) -> AssetId {
        x
    }
    fn types_b256(x: b256) -> b256 {
        0x0000000000000000000000000000000000000000000000000000000000000000
    }
    fn types_b512(x: B512) -> B512 {
        x
    }
    fn types_array(x: [u8; 3]) -> [u8; 3] {
        x
    }
    fn types_tuple(x: (u8, u8, u8)) -> (u8, u8, u8) {
        (x.0, x.1, x.2)
    }
    fn types_struct(x: MyStruct) -> MyStruct {
        x
    }
    fn types_enum(x: MyEnum) -> MyEnum {
        x
    }
    fn types_enum_with_vector(x: EnumWithVector) -> EnumWithVector {
        x
    }

    fn types_vector_u8(x: Vec<u8>) -> Vec<u8> {
        x
    }
    fn types_vector_geo(x: Vec<MyStruct>) -> Vec<MyStruct> {
        x
    }
    fn types_vector_option(x: Vec<StructWithMultiOption>) -> Vec<StructWithMultiOption> {
        x
    }
    fn types_option(x: Option<u8>) -> Option<u8> {
        x
    }
    fn types_option_geo(x: Option<MyStruct>) -> Option<MyStruct> {
        x
    }
    fn types_evm_address(x: EvmAddress) -> EvmAddress {
        EvmAddress::from(0x0606060606060606060606060606060606060606060606060606060606060606)
    }
    fn types_bytes(x: Bytes) -> Bytes {
        x
    }
    fn types_raw_slice(x: raw_slice) -> raw_slice {
        x
    }
    fn types_str_slice(x: str) -> str {
        x
    }
    fn types_std_string(x: String) -> String {
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
    fn type_address(x: Address) -> Address {
        x
    }
    fn type_contract_id(x: ContractId) -> ContractId {
        x
    }
    fn type_identity(x: Identity) -> Identity {
        x
    }
    fn type_external_enum(x: ExternalEnum) -> ExternalEnum {
        x
    }
    fn type_external_struct(x: ExternalStruct) -> ExternalStruct {
        x
    }
    fn types_generic_enum(x: GenericEnum<u8, u16>) -> GenericEnum<u8, u16> {
        x
    }
    fn types_generic_struct(x: GenericStructWithEnum<u8, u16>) -> GenericStructWithEnum<u8, u16> {
        x
    }
}
