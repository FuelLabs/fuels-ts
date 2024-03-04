contract;

use std::logging::log;
use std::b512::B512;
use std::vec::Vec;
use std::bytes::Bytes;
use std::string::String;
use std::option::Option;

enum MyNativeEnum {
    Foo: (),
    Bar: (),
}

enum MyEnum {
    Foo: u32,
    Bar: bool,
}

struct MyStruct {
    a: u8,
    b: u16,
}

abi LoggingContract {
    fn log_u8(a: u8) -> u8;
    fn log_u16(a: u16) -> u16;
    fn log_u32(a: u32) -> u32;
    fn log_u8_u16_u32(a: u8, b: u16, c: u32) -> (u8, u16, u32);
    fn log_u64(a: u64) -> u64;
    fn log_u256(a: u256) -> u256;
    fn log_u64_u8(a: u64, b: u8) -> (u64, u8);
    fn log_boolean(a: bool) -> bool;
    fn log_boolean_boolean(a: bool, b: bool) -> (bool, bool);
    fn log_number_boolean(a: u32, b: bool) -> (u32, bool);
    fn log_b256(a: b256) -> b256;
    fn log_b512(a: B512) -> B512;
    fn log_b256_b512(a: b256, b: B512) -> (b256, B512);
    fn log_vec_u8(a: Vec<u8>) -> Vec<u8>;
    fn log_vec_b256(a: Vec<b256>) -> Vec<b256>;
    fn log_u16_vec_u8(a: u16, b: Vec<u8>) -> (u16, Vec<u8>);
    fn log_bytes(a: Bytes) -> Bytes;
    fn log_u16_bytes(a: u16, b: Bytes) -> (u16, Bytes);
    fn log_std_string(a: String) -> String;
    fn log_u16_std_string(a: u16, b: String) -> (u16, String);
    fn log_raw_slice(a: raw_slice) -> raw_slice;
    fn log_u8_array(a: [u8; 3]) -> [u8; 3];
    fn log_u16_array(a: [u16; 3]) -> [u16; 3];
    fn log_u16_u8_array(a: u16, b: [u8; 3]) -> (u16, [u8; 3]);
    fn log_str_4(a: str[4]) -> str[4];
    fn log_u8_str_2(a: u8, b: str[2]) -> (u8, str[2]);
    fn log_u8_u16_tuple(a: (u8, u16)) -> (u8, u16);
    fn log_boolean_u8_vec_tuple(a: (bool, Vec<u8>)) -> (bool, Vec<u8>);
    fn log_enum(a: MyEnum) -> MyEnum;
    fn log_native_enum(a: MyNativeEnum) -> MyNativeEnum;
    fn log_boolean_enum(a: bool, b: MyEnum) -> (bool, MyEnum);
    fn log_struct(a: MyStruct) -> MyStruct;
    fn log_struct_vec(a: Vec<MyStruct>) -> Vec<MyStruct>;
    fn log_struct_boolean(a: MyStruct, b: bool) -> (MyStruct, bool);
    fn log_option_u8(a: Option<u8>) -> Option<u8>;
    fn log_option_vec_u16(a: Option<Vec<u16>>) -> Option<Vec<u16>>;
    fn log_str_slice(a: str) -> str;
}

impl LoggingContract for Contract {
    fn log_u8(a: u8) -> u8 {
        log(a);
        a
    }

    fn log_u16(a: u16) -> u16 {
        log(a);
        a
    }

    fn log_u32(a: u32) -> u32 {
        log(a);
        a
    }

    fn log_u8_u16_u32(a: u8, b: u16, c: u32) -> (u8, u16, u32) {
        log(a);
        log(b);
        log(c);
        (a, b, c)
    }

    fn log_u64(a: u64) -> u64 {
        log(a);
        a
    }

    fn log_u256(a: u256) -> u256 {
        log(a);
        a
    }

    fn log_u64_u8(a: u64, b: u8) -> (u64, u8) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_boolean(a: bool) -> bool {
        log(a);
        a
    }

    fn log_boolean_boolean(a: bool, b: bool) -> (bool, bool) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_number_boolean(a: u32, b: bool) -> (u32, bool) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_b256(a: b256) -> b256 {
        log(a);
        a
    }

    fn log_b512(a: B512) -> B512 {
        log(a);
        a
    }

    fn log_b256_b512(a: b256, b: B512) -> (b256, B512) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_vec_u8(a: Vec<u8>) -> Vec<u8> {
        log(a);
        a
    }

    fn log_vec_b256(a: Vec<b256>) -> Vec<b256> {
        log(a);
        a
    }

    fn log_bytes(a: Bytes) -> Bytes {
        log(a);
        a
    }

    fn log_std_string(a: String) -> String {
        log(a);
        a
    }

    fn log_u16_vec_u8(a: u16, b: Vec<u8>) -> (u16, Vec<u8>) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_u16_bytes(a: u16, b: Bytes) -> (u16, Bytes) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_u16_std_string(a: u16, b: String) -> (u16, String) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_raw_slice(a: raw_slice) -> raw_slice {
        log(a);
        a
    }

    fn log_u8_array(a: [u8; 3]) -> [u8; 3] {
        log(a);
        a
    }

    fn log_u16_array(a: [u16; 3]) -> [u16; 3] {
        log(a);
        a
    }

    fn log_u16_u8_array(a: u16, b: [u8; 3]) -> (u16, [u8; 3]) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_str_4(a: str[4]) -> str[4] {
        log(a);
        a
    }

    fn log_u8_str_2(a: u8, b: str[2]) -> (u8, str[2]) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_u8_u16_tuple(a: (u8, u16)) -> (u8, u16) {
        log(a);
        a
    }

    fn log_boolean_u8_vec_tuple(a: (bool, Vec<u8>)) -> (bool, Vec<u8>) {
        log(a);
        a
    }

    fn log_enum(a: MyEnum) -> MyEnum {
        log(a);
        a
    }

    fn log_native_enum(a: MyNativeEnum) -> MyNativeEnum {
        log(a);
        a
    }

    fn log_boolean_enum(a: bool, b: MyEnum) -> (bool, MyEnum) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_struct(a: MyStruct) -> MyStruct {
        log(a);
        a
    }

    fn log_struct_vec(a: Vec<MyStruct>) -> Vec<MyStruct> {
        log(a);
        a
    }

    fn log_struct_boolean(a: MyStruct, b: bool) -> (MyStruct, bool) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_option_u8(a: Option<u8>) -> Option<u8> {
        log(a);
        a
    }

    fn log_option_vec_u16(a: Option<Vec<u16>>) -> Option<Vec<u16>> {
        log(a);
        a
    }

    fn log_str_slice(a: str) -> str {
        log(a);
        a
    }
}
