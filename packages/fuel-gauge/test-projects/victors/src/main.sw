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
}

impl VectorContract for Contract {
    fn echo_u8(input: Vec<u8>) -> Vec<u8> {
        input
    }
}
