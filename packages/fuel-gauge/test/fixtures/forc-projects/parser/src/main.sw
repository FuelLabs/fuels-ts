contract;

struct SampleStruct<T> {
    a: bool,
    b: u32,
    c: T,
}

struct SampleGenericStruct<E> {
    a: Vec<SampleStruct<E>>,
    b: Vec<SampleStruct<u16>>,
}

struct NonGenericStruct {
    a: bool,
}

pub struct StructWithImplicitGenerics<E, F> {
    pub a: [E; 3],
    pub b: (E, F),
}

abi VoidContract {
    fn sample_struct(
        arg1: SampleStruct<Vec<NonGenericStruct>>,
        arg2: SampleGenericStruct<u8>,
    ) -> bool;
    fn implicit_generics(arg1: StructWithImplicitGenerics<u8, u16>) -> bool;
}

impl VoidContract for Contract {
    fn sample_struct(
        arg1: SampleStruct<Vec<NonGenericStruct>>,
        arg2: SampleGenericStruct<u8>,
    ) -> bool {
        true
    }
    fn implicit_generics(arg1: StructWithImplicitGenerics<u8, u16>) -> bool {
        true
    }
}
