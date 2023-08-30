contract;

struct StructA<T, U> {
    propA1: T,
    propA2: U,
}

struct StructB<T> {
    propB1: T,
    propB2: (bool, u64),
}

struct StructC {
    propC1: (u8, StructA<StructB<u64>, str[3]>),
}

abi MyContract {
    fn single_param(x: StructC) -> u8;
    fn tuple_params(x: (u8, StructA<StructB<u64>, str[3]>)) -> (u8, StructA<StructB<u64>, str[3]>);
}

impl MyContract for Contract {
    fn single_param(x: StructC) -> u8 {
        1
    }
    fn tuple_params(x: (u8, StructA<StructB<u64>, str[3]>)) -> (u8, StructA<StructB<u64>, str[3]>) {
        x
    }
}
