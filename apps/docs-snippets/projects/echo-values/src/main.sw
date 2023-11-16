// #region understanding-fuel-binary-file
contract;

use std::b512::B512;

struct MyStruct {
    a: u8,
    b: bool,
}

struct MyMixedStruct {
    a: bool,
    b: u64,
}

enum MyEnum {
    a: u8,
    b: bool,
}

abi EchoValues {
    fn echo_u8(value: u8) -> u8;

    fn echo_u8_array() -> [u8; 2];

    fn echo_u8_array_with_value(value: [u8; 2]) -> [u8; 2];

    fn echo_boolean_array() -> [bool; 2];

    fn echo_boolean_array_with_value(value: [bool; 2]) -> [bool; 2];

    fn echo_mixed_array_with_value(value: (u8, bool)) -> (u8, bool);

    fn echo_mixed_struct_with_value(value: MyStruct) -> MyStruct;

    fn echo_mixed_enum_with_value(value: MyEnum) -> MyEnum;

    fn echo_u8_vector() -> Vec<u8>;

    fn echo_u64_vector() -> Vec<u64>;

    fn echo_mixed_struct() -> MyMixedStruct;

    fn echo_received_mixed_struct(value: MyMixedStruct) -> MyMixedStruct;

    fn echo_u8_vector_with_value(value: Vec<u8>) -> Vec<u8>;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64);

    fn echo_b512(input: B512) -> B512;
}

impl EchoValues for Contract {
    fn echo_u8(value: u8) -> u8 {
        value
    }

    fn echo_u8_array() -> [u8; 2] {
        [48, 63]
    }

    fn echo_u8_array_with_value(value: [u8; 2]) -> [u8; 2] {
        value
    }

    fn echo_boolean_array() -> [bool; 2] {
        [true, false]
    }

    fn echo_boolean_array_with_value(value: [bool; 2]) -> [bool; 2] {
        value
    }

    fn echo_mixed_array_with_value(value: (u8, bool)) -> (u8, bool) {
        value
    }

    fn echo_mixed_struct_with_value(value: MyStruct) -> MyStruct {
        value
    }

    fn echo_mixed_enum_with_value(value: MyEnum) -> MyEnum {
        value
    }

    fn echo_u8_vector() -> Vec<u8> {
        let mut myVec: Vec<u8> = Vec::new();
        myVec.push(23);
        myVec.push(32);
        myVec.push(78);

        myVec
    }

    fn echo_u64_vector() -> Vec<u64> {
        let mut myVec: Vec<u64> = Vec::new();
        myVec.push(1337);
        myVec.push(1448);
        myVec.push(1559);

        myVec
    }

    fn echo_mixed_struct() -> MyMixedStruct {
        MyMixedStruct {
            a: true,
            b: 1337,
        }
    }

    fn echo_received_mixed_struct(value: MyMixedStruct) -> MyMixedStruct {
        value
    }

    fn echo_u8_vector_with_value(value: Vec<u8>) -> Vec<u8> {
        value
    }

    fn echo_str_8(value: str[8]) -> str[8] {
        value
    }

    // #region tuples-2
    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64) {
        tuple
    }
    // #endregion tuples-2

    // #region bits512-3
    fn echo_b512(input: B512) -> B512 {
        input
    }
    // #endregion bits512-3
}
// #endregion understanding-fuel-binary-file
