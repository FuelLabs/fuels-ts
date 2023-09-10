contract;

struct StructA<T, U> {
    propA1: T,
    propA2: U,
}

struct StructB<T> {
    propB1: T,
}

struct StructC {
    propC1: StructA<StructB<u8>, u16>,
}

abi MyContract {
    fn main(x: StructC) -> u8;
}

impl MyContract for Contract {
    fn main(x: StructC) -> u8 {
        1
    }
}
