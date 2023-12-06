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

configurable {
    U8: u8 = 58,
    BOOLEAN: bool = false,
}

enum NativeEnum {
    A: (),
    B: (),
    C: (),
}

abi EchoValues {
    fn echo_u8_literal() -> u8;

    fn echo_u8(value: u8) -> u8;

    fn echo_u16(value: u16) -> u16;

    fn echo_u32(value: u32) -> u32;

    fn echo_two_u8s(value1: u8, value2: u8) -> u8;

    fn two_booleans(value1: bool, value2: bool) -> bool;

    fn u8_u64_bool(value1: u8, value2: u64, value3: bool) -> u8;

    fn echo_boolean_literal() -> bool;

    fn struct_and_u8(value1: MyStruct, value2: u8) -> MyStruct;

    fn echo_boolean(value: bool) -> bool;

    fn echo_u8_array() -> [u8; 2];

    fn echo_u8_array_with_value(value: [u8; 2]) -> [u8; 2];

    fn echo_boolean_array() -> [bool; 2];

    fn echo_boolean_array_with_value(value: [bool; 2]) -> [bool; 2];

    fn echo_mixed_tuple_with_value(value: (u8, bool)) -> (u8, bool);

    fn echo_mixed_tuple() -> (u8, bool);

    fn echo_mixed_struct_with_value(value: MyStruct) -> MyStruct;

    fn echo_mixed_enum_with_value(value: MyEnum) -> MyEnum;
    fn echo_native_enum(value: NativeEnum) -> NativeEnum;

    fn echo_u8_vector() -> Vec<u8>;

    fn echo_u64_vector() -> Vec<u64>;

    fn echo_mixed_struct() -> MyMixedStruct;

    fn echo_received_mixed_struct(value: MyMixedStruct) -> MyMixedStruct;

    fn echo_u8_vector_with_value(value: Vec<u8>) -> Vec<u8>;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_tuple() -> (u8, bool, u64);

    fn echo_b512(input: B512) -> B512;

    fn echo_configurable_u8() -> u8;

    fn echo_configurable_boolean() -> bool;
}

impl EchoValues for Contract {
    fn echo_u8_literal() -> u8 {
        47
    }

    fn echo_boolean_literal() -> bool {
        true
    }

    fn echo_boolean(value: bool) -> bool {
        value
    }

    fn echo_u8(value: u8) -> u8 {
        value
    }

    fn echo_u16(value: u16) -> u16 {
        value * 2
    }

    fn echo_u32(value: u32) -> u32 {
        value * 2
    }

    fn echo_two_u8s(value1: u8, value2: u8) -> u8 {
        assert_eq(value1, 15);
        value2
    }

    fn u8_u64_bool(value1: u8, value2: u64, value3: bool) -> u8 {
        assert_eq(value1, 255);
        assert_eq(value2, 10000);
        assert_eq(value3, true);

        55
    }

    fn struct_and_u8(value1: MyStruct, value2: u8) -> MyStruct {
        assert_eq(value1.a, 254);
        assert_eq(value1.b, true);

        let myStruct = MyStruct {
            a: value2,
            b: true,
        };

        myStruct
    }

    fn two_booleans(value1: bool, value2: bool) -> bool {
        assert_eq(value1, true);
        value2
    }

    fn echo_u8_array() -> [u8; 2] {
        [48, 63]
    }

    fn echo_u8_array_with_value(value: [u8; 2]) -> [u8; 2] {
        assert_eq(value[0], 48);
        assert_eq(value[1], 63);
        value
    }

    fn echo_boolean_array() -> [bool; 2] {
        [true, false]
    }

    fn echo_boolean_array_with_value(value: [bool; 2]) -> [bool; 2] {
        value
    }

    fn echo_mixed_tuple_with_value(value: (u8, bool)) -> (u8, bool) {
        value
    }

    fn echo_mixed_tuple() -> (u8, bool) {
        (48, true)
    }

    fn echo_mixed_struct_with_value(value: MyStruct) -> MyStruct {
        value
    }

    fn echo_mixed_enum_with_value(value: MyEnum) -> MyEnum {
        let val = match value {
            MyEnum::a(v) => assert_eq(v, 73),
            MyEnum::b(b) => assert_eq(b, true),
        };
        value
    }

    fn echo_native_enum(value: NativeEnum) -> NativeEnum {
        match value {
            NativeEnum::A => assert(false),
            NativeEnum::B => assert(true),
            NativeEnum::C => assert(false),
        };

        NativeEnum::C
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

    fn echo_tuple() -> (u8, bool, u64) {
        (48, true, 1337)
    }

    fn echo_b512(input: B512) -> B512 {
        input
    }

    fn echo_configurable_u8() -> u8 {
        U8
    }

    fn echo_configurable_boolean() -> bool {
        BOOLEAN
    }
}
