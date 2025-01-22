contract;
use std::bytes::Bytes;
use std::message::send_typed_message;

struct GenericStruct<T> {
    a: bool,
    b: u32,
    c: T,
}

pub struct DoubleGeneric<T, F> {
    pub a: T,
    pub b: F,
}

struct NestedGenericStruct<E> {
    a: Vec<GenericStruct<E>>,
    b: Vec<GenericStruct<u16>>,
    c: DoubleGeneric<E, u16>,
}

struct SimpleStruct {
    a: bool,
}

pub struct StructWithImplicitGenerics<E, F> {
    pub a: [E; 3],
    pub b: (E, F),
}

configurable {
    U8_VALUE: u8 = 10,
}

abi VoidContract {
    fn generic_structs(
        arg1: GenericStruct<Vec<SimpleStruct>>,
        arg2: NestedGenericStruct<u8>,
    ) -> bool;
    fn implicit_generic_struct(
        arg1: StructWithImplicitGenerics<u8, u16>,
        arg2: (bool, StructWithImplicitGenerics<bool, b256>),
    ) -> bool;
    fn bytes(arg: Bytes) -> bool;
}

impl VoidContract for Contract {
    fn generic_structs(
        arg1: GenericStruct<Vec<SimpleStruct>>,
        arg2: NestedGenericStruct<u8>,
    ) -> bool {
        log(arg1.a);
        send_typed_message(
            0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20,
            arg1.a,
            123,
        );
        true
    }
    fn implicit_generic_struct(
        arg1: StructWithImplicitGenerics<u8, u16>,
        arg2: (bool, StructWithImplicitGenerics<bool, b256>),
    ) -> bool {
        true
    }
    fn bytes(arg: Bytes) -> bool {
        true
    }
}
