contract;

use std::*;
use core::*;
use std::storage::*;
use std::contract_id::ContractId;
use std::option::Option;

pub struct U8Struct {
    i: u8,
}

pub struct B256Struct {
    i: b256,
}

pub struct U32Struct {
    foo: u32,
}

pub struct BigStruct {
    foo: u8,
    bar: u8,
}

pub enum SmallEnum {
    Empty: (),
}

pub enum BigEnum {
    AddressA: b256,
    AddressB: b256,
    AddressC: b256,
}

abi CoverageContract {
    fn get_id() -> b256;
    fn get_small_string() -> str[8];
    fn get_large_string() -> str[9];
    fn get_u32_struct() -> U32Struct;
    fn get_large_struct() -> BigStruct;
    fn get_large_array() -> [u32;2];
    fn get_empty_enum() -> SmallEnum;
    fn get_contract_id() -> ContractId;
    fn get_some_option_u8() -> Option<u8>;
    fn get_none_option_u8() -> Option<u8>;
    fn echo_u8(input: u8) -> u8;
    fn echo_u16(input: u16) -> u16;
    fn echo_u32(input: u32) -> u32;
    fn echo_u64(input: u64) -> u64;
    fn echo_bool(input: bool) -> bool;
    fn echo_b256(input: b256) -> b256;
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
    fn echo_struct_u8(input: U8Struct) -> U8Struct;
    fn echo_struct_b256(input: B256Struct) -> B256Struct;
    fn echo_enum_small(input: SmallEnum) -> SmallEnum;
    fn echo_enum_big(input: BigEnum) -> BigEnum;
    fn echo_option_u8(input: Option<u8>) -> Option<u8>;
    fn echo_option_extract_u32(input: Option<u32>) -> u32;
    fn echo_option_three_u8(inputA: Option<u8>, inputB: Option<u8>, inputC: Option<u8>) -> u8;
}

impl CoverageContract for Contract {
    fn get_id() -> b256 {
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
    }

    fn get_small_string() -> str[8] {
        let my_string: str[8] = "gggggggg";
        my_string
    }

    fn get_large_string() -> str[9] {
        let my_string: str[9] = "ggggggggg";
        my_string
    }

    fn get_u32_struct() -> U32Struct {
        U32Struct {
            foo: 100,
        }
    }

    fn get_large_struct() -> BigStruct {
        BigStruct {
            foo: 12,
            bar: 42,
        }
    }

    fn get_large_array() -> [u32; 2] {
        let x: [u32; 2] = [1, 2];
        x
    }

    fn get_empty_enum() -> SmallEnum {
        SmallEnum::Empty
    }

    fn get_contract_id() -> ContractId {
        let id = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
        ~ContractId::from(id)
    }

    fn get_some_option_u8() -> Option<u8> {
        let o:Option<u8> = Option::Some(113);
        o
    }

    fn get_none_option_u8() -> Option<u8> {
        let o:Option<u8> = Option::None;
        o
    }

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
    fn echo_struct_u8(input: U8Struct) -> U8Struct {
        input
    }
    fn echo_struct_b256(input: B256Struct) -> B256Struct {
        input
    }
    fn echo_enum_small(input: SmallEnum) -> SmallEnum {
        input
    }
    fn echo_enum_big(input: BigEnum) -> BigEnum {
        input
    }
    fn echo_option_u8(input: Option<u8>) -> Option<u8> {
        input
    }
    fn echo_option_extract_u32(input: Option<u32>) -> u32 {
        match input {
            Option::Some(value) => value,
            Option::None => 500u32, 
        }
    }
    fn echo_option_three_u8(inputA: Option<u8>, inputB: Option<u8>, inputC: Option<u8>) -> u8 {
        let value1 = match inputA {
            Option::Some(value) => value,
            Option::None => 0, 
        };
        let value2 = match inputB {
            Option::Some(value) => value,
            Option::None => 0, 
        };
        let value3 = match inputC {
            Option::Some(value) => value,
            Option::None => 0, 
        };

        value1 + value2 + value3
    }
}
