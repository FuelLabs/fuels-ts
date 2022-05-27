contract;

pub struct SmallStruct {
    i: u8,
}

pub struct BigStruct {
    i: b256,
}

pub enum SmallEnum {
    Empty: (),
}

pub enum BigEnum {
    Address: b256,
}


abi EchoContract {
    fn echo_u8(input: u8) -> u8;
    fn echo_u16(input: u16) -> u16;
    fn echo_u32(input: u32) -> u32;
    fn echo_u64(input: u64) -> u64;
    fn echo_bool(input: bool) -> bool;
    fn echo_b256(input: bool) -> b256;
    fn echo_str_1(input: str[1]) -> str[1];
    fn echo_str_2(input: str[2]) -> str[2];
    fn echo_str_3(input: str[3]) -> str[3];
    fn echo_str_8(input: str[8]) -> str[8];
    fn echo_str_9(input: str[9]) -> str[9];
    fn echo_tuple_u8(input: (u8, u8)) -> (u8, u8);
    fn echo_tuple_u64(input: (u64, u64)) -> (u64, u64);
    fn echo_tuple_mixed(input: (bool, u64)) -> (bool, u64);
    fn echo_array_u8(input: [u8; 2]) -> [u8; 2];
    fn echo_array_u64(input: [u64; 5]) -> [u64; 5];
    fn echo_array_bool(input: [bool; 2]) -> [bool; 2];
    fn echo_struct_small(input: SmallStruct) -> SmallStruct;
    fn echo_struct_big(input: BigStruct) -> BigStruct;
    fn echo_enum_small(input: SmallEnum) -> SmallEnum;
    fn echo_enum_big(input: BigEnum) -> BigEnum;
}

impl EchoContract for Contract {
    fn echo_u8(input: u8) -> u8 {
        input
    }
    fn echo_u16(input: u16) -> u16 {
        input
    }
    fn echo_u32(input: u32) -> u32 {
        input
    }
    fn echo_u64(input: u64) -> u64 {
        input
    }
    fn echo_bool(input: bool) -> bool {
        input
    }
    fn echo_b256(input: b256) -> b256 {
        input
    }
    fn echo_str_1(input: str[1]) -> str[1] {
        input
    }
    fn echo_str_2(input: str[2]) -> str[2] {
        input
    }
    fn echo_str_3(input: str[3]) -> str[3] {
        input
    }
    fn echo_str_8(input: str[8]) -> str[8] {
        input
    }
    fn echo_str_9(input: str[9]) -> str[9] {
        input
    }
    fn echo_tuple_u8(input: (u8, u8)) -> (u8, u8) {
        input
    }
    fn echo_tuple_u64(input: (u64, u64)) -> (u64, u64) {
        input
    }
    fn echo_tuple_mixed(input: (bool, u64)) -> (bool, u64) {
        input
    }
    fn echo_array_u8(input: [u8; 2]) -> [u8; 2] {
        input
    }
    fn echo_array_u64(input: [u64; 5]) -> [u64; 5] {
        input
    }
    fn echo_array_bool(input: [bool; 2]) -> [bool; 2] {
        input
    }
    fn echo_struct_small(input: SmallStruct) -> SmallStruct {
        input
    }
    fn echo_struct_big(input: BigStruct) -> BigStruct {
        input
    }
    fn echo_enum_small(input: SmallEnum) -> SmallEnum {
        input
    }
    fn echo_enum_big(input: BigEnum) -> BigEnum {
        input
    }
}
