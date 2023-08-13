contract;

use std::*;
use core::*;
use std::storage::*;
use std::contract_id::ContractId;
use std::vec::Vec;
use std::option::Option;
use std::assert::assert;
use std::logging::log;
use std::b512::B512;

pub struct U8Struct {
    i: u8,
}

pub struct B256Struct {
    i: b256,
}

pub struct U32Struct {
    foo: u32,
}

pub enum SmallEnum {
    Empty: (),
}

pub enum BigEnum {
    AddressA: b256,
    AddressB: b256,
    AddressC: b256,
}

pub struct BigStruct {
    foo: u8,
    bar: u8,
}

pub struct ComplexStruct {
    foo: u8,
    bar: u64,
    baz: str[9],
}

abi VectorContract {
    fn echo_u8(input: Vec<u8>) -> Vec<u8>;
    fn echo_u16(input: Vec<u16>) -> Vec<u16>;
    fn echo_u32(input: Vec<u32>) -> Vec<u32>;
    fn echo_u64(input: Vec<u64>) -> Vec<u64>;
    fn echo_bool(input: Vec<bool>) -> Vec<bool>;
    fn echo_b256(input: Vec<b256>) -> Vec<b256>;
    fn echo_b512(input: Vec<B512>) -> Vec<B512>;
    fn echo_str_1(input: Vec<str[1]>) -> Vec<str[1]>;
    fn echo_str_9(input: Vec<str[9]>) -> Vec<str[9]>;
    fn echo_tuple_u8(input: Vec<(u8, u8)>) -> Vec<(u8, u8)>;
    fn echo_tuple_u64(input: Vec<(u64, u64)>) -> Vec<(u64, u64)>;
    fn echo_tuple_mixed(input: Vec<(bool, u64)>) -> Vec<(bool, u64)>;
    fn echo_array_u8(input: Vec<[u8; 2]>) -> Vec<[u8; 2]>;
    fn echo_array_u64(input: Vec<[u64; 5]>) -> Vec<[u64; 5]>;
    fn echo_array_bool(input: Vec<[bool; 2]>) -> Vec<[bool; 2]>;
    fn echo_struct_u8(input: Vec<U8Struct>) -> Vec<U8Struct>;
    fn echo_struct_b256(input: Vec<B256Struct>) -> Vec<B256Struct>;
    fn echo_enum_small(input: Vec<SmallEnum>) -> Vec<SmallEnum>;
    fn echo_enum_big(input: Vec<BigEnum>) -> Vec<BigEnum>;
    fn echo_option_u8(input: Vec<Option<u8>>) -> Vec<Option<u8>>;
}

impl VectorContract for Contract {
    fn echo_u8(input: Vec<u8>) -> Vec<u8> {
        input
    }
    fn echo_u16(input:  Vec<u16>) -> Vec<u16> {
        input
    }
    fn echo_u32(input: Vec<u32>) -> Vec<u32> {
        input
    }
    fn echo_u64(input: Vec<u64>) -> Vec<u64> {
        input
    }
    fn echo_bool(input: Vec<bool>) -> Vec<bool> {
        input
    }
    fn echo_b256(input: Vec<b256>) -> Vec<b256> {
        input
    }
    fn echo_b512(input: Vec<B512>) -> Vec<B512> {
        input
    }
    fn echo_str_1(input: Vec<str[1]>) -> Vec<str[1]> {
        input
    }
    fn echo_str_9(input: Vec<str[9]>) -> Vec<str[9]> {
        input
    }
    fn echo_tuple_u8(input: Vec<(u8, u8)>) -> Vec<(u8, u8)> {
        input
    }
    fn echo_tuple_u64(input: Vec<(u64, u64)>) -> Vec<(u64, u64)> {
        input
    }
    fn echo_tuple_mixed(input: Vec<(bool, u64)>) -> Vec<(bool, u64)> {
        input
    }
    fn echo_array_u8(input: Vec<[u8; 2]>) -> Vec<[u8; 2]> {
        input
    }
    fn echo_array_u64(input: Vec<[u64; 5]>) -> Vec<[u64; 5]> {
        input
    }
    fn echo_array_bool(input: Vec<[bool; 2]>) -> Vec<[bool; 2]> {
        input
    }
    fn echo_struct_u8(input: Vec<U8Struct>) -> Vec<U8Struct> {
        input
    }
    fn echo_struct_b256(input: Vec<B256Struct>) -> Vec<B256Struct> {
        input
    }
    fn echo_enum_small(input: Vec<SmallEnum>) -> Vec<SmallEnum> {
        input
    }
    fn echo_enum_big(input: Vec<BigEnum>) -> Vec<BigEnum> {
        input
    }
    fn echo_option_u8(input: Vec<Option<u8>>) -> Vec<Option<u8>> {
        input
    }
}