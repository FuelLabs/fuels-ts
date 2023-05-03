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
    fn echo_u8(input: Vec<u8>) -> raw_slice;
    fn echo_u16(input: Vec<u16>) -> raw_slice;
    fn echo_u32(input: Vec<u32>) -> raw_slice;
    fn echo_u64(input: Vec<u64>) -> raw_slice;
    fn echo_bool(input: Vec<bool>) -> raw_slice;
    fn echo_b256(input: Vec<b256>) -> raw_slice;
    fn echo_b512(input: Vec<B512>) -> raw_slice;
    fn echo_str_1(input: Vec<str[1]>) -> raw_slice;
    fn echo_str_9(input: Vec<str[9]>) -> raw_slice;
    fn echo_tuple_u8(input: Vec<(u8, u8)>) -> raw_slice;
    fn echo_tuple_u64(input: Vec<(u64, u64)>) -> raw_slice;
    fn echo_tuple_mixed(input: Vec<(bool, u64)>) -> raw_slice;
    fn echo_array_u8(input: Vec<[u8; 2]>) -> raw_slice;
    fn echo_array_u64(input: Vec<[u64; 5]>) -> raw_slice;
    fn echo_array_bool(input: Vec<[bool; 2]>) -> raw_slice;
    fn echo_struct_u8(input: Vec<U8Struct>) -> raw_slice;
    fn echo_struct_b256(input: Vec<B256Struct>) -> raw_slice;
    fn echo_enum_small(input: Vec<SmallEnum>) -> raw_slice;
    fn echo_enum_big(input: Vec<BigEnum>) -> raw_slice;
    fn echo_option_u8(input: Vec<Option<u8>>) -> raw_slice;
}

impl VectorContract for Contract {
    fn echo_u8(input: Vec<u8>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_u16(input:  Vec<u16>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_u32(input: Vec<u32>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_u64(input: Vec<u64>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_bool(input: Vec<bool>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_b256(input: Vec<b256>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_b512(input: Vec<B512>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_str_1(input: Vec<str[1]>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_str_9(input: Vec<str[9]>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_tuple_u8(input: Vec<(u8, u8)>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_tuple_u64(input: Vec<(u64, u64)>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_tuple_mixed(input: Vec<(bool, u64)>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_array_u8(input: Vec<[u8; 2]>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_array_u64(input: Vec<[u64; 5]>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_array_bool(input: Vec<[bool; 2]>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_struct_u8(input: Vec<U8Struct>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_struct_b256(input: Vec<B256Struct>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_enum_small(input: Vec<SmallEnum>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_enum_big(input: Vec<BigEnum>) -> raw_slice {
        input.as_raw_slice()
    }
    fn echo_option_u8(input: Vec<Option<u8>>) -> raw_slice {
        input.as_raw_slice()
    }
}
