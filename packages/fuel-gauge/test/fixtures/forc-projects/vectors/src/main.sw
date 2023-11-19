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

pub struct ComplexStruct {
    foo: u8,
    bar: u64,
    baz: str[9],
}

pub enum EnumWithVector {
    num: u8,
    vec: Vec<u8>,
}

pub struct StructWithVector {
    num: u8,
    vec: Vec<u8>,
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
    fn echo_struct_complex(input: Vec<ComplexStruct>) -> Vec<ComplexStruct>;
    fn echo_enum_small(input: Vec<SmallEnum>) -> Vec<SmallEnum>;
    fn echo_enum_big(input: Vec<BigEnum>) -> Vec<BigEnum>;
    fn echo_option_u8(input: Vec<Option<u8>>) -> Vec<Option<u8>>;
    fn echo_vector_and_b256_tuple(x: Vec<u8>, y: b256) -> (Vec<u8>, b256);
    fn echo_two_vectors_tuple(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>);
    fn echo_struct_and_vector_tuple(a: ComplexStruct, x: Vec<u8>) -> (ComplexStruct, Vec<u8>);
    fn echo_vector_inside_vector(arg: Vec<Vec<u32>>) -> Vec<Vec<u32>>;
    fn echo_vector_inside_enum(arg: EnumWithVector) -> EnumWithVector;
    fn echo_vector_inside_struct(arg: StructWithVector) -> StructWithVector;
    fn echo_u32_then_three_vectors(
        x: u32,
        y: Vec<bool>,
        z: Vec<u32>,
        q: Vec<u16>,
    ) -> (u32, Vec<bool>, Vec<u32>, Vec<u16>);
}

impl VectorContract for Contract {
    fn echo_u8(input: Vec<u8>) -> Vec<u8> {
        input
    }
    fn echo_u16(input: Vec<u16>) -> Vec<u16> {
        assert_eq(input.get(0).unwrap(), 8);
        assert_eq(input.get(1).unwrap(), 6);
        assert_eq(input.get(2).unwrap(), 7);
        assert_eq(input.get(3).unwrap(), 5);
        assert_eq(input.get(4).unwrap(), 3);
        assert_eq(input.get(5).unwrap(), 0);
        assert_eq(input.get(6).unwrap(), 9);
        input
    }
    fn echo_u32(input: Vec<u32>) -> Vec<u32> {
        assert_eq(input.get(0).unwrap(), 8);
        assert_eq(input.get(1).unwrap(), 6);
        assert_eq(input.get(2).unwrap(), 7);
        assert_eq(input.get(3).unwrap(), 5);
        assert_eq(input.get(4).unwrap(), 3);
        assert_eq(input.get(5).unwrap(), 0);
        assert_eq(input.get(6).unwrap(), 9);
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
    fn echo_struct_complex(input: Vec<ComplexStruct>) -> Vec<ComplexStruct> {
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

    fn echo_vector_inside_struct(input: StructWithVector) -> StructWithVector {
        input
    }

    fn echo_u32_then_three_vectors(
        x: u32,
        y: Vec<bool>,
        z: Vec<u32>,
        q: Vec<u16>,
    ) -> (u32, Vec<bool>, Vec<u32>, Vec<u16>) {
        (x, y, z, q)
    }
    fn echo_vector_and_b256_tuple(x: Vec<u8>, y: b256) -> (Vec<u8>, b256) {
        (x, y)
    }
    fn echo_two_vectors_tuple(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        (x, y)
    }
    fn echo_struct_and_vector_tuple(a: ComplexStruct, x: Vec<u8>) -> (ComplexStruct, Vec<u8>) {
        (a, x)
    }
    fn echo_vector_inside_vector(input: Vec<Vec<u32>>) -> Vec<Vec<u32>> {
        input
    }
    fn echo_vector_inside_enum(input: EnumWithVector) -> EnumWithVector {
        input
    }
}
