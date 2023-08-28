contract;

struct StructA {
    propA1: u8,
}

struct StructB {
    propB1: StructA,
    propB2: u16,
}

struct StructC {
    propC1: StructA,
    propC2: Vec<StructB>,
    propC3: StructD<u8, u8, StructF<str[1]>>,
    propC4: Vec<StructD<u16, u16, StructF<bool>>>,
    propC5: Vec<StructD<u32, u32, StructF<Vec<StructG>>>>,
}

struct StructD<T, U, V> {
    propD1: Vec<StructE<T>>,
    propD2: U,
    propD3: V,
}

struct StructE<T> {
    propE1: StructA,
    propE2: StructB,
    propE3: T,
}

struct StructF<T> {
    propF1: u64,
    propF2: T,
}

struct StructG {
    propG1: u8,
}

abi MyContract {
    fn single_params(x: StructA, y: StructB, z: StructC) -> bool;
    fn multi_params(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool;
}

impl MyContract for Contract {
    fn single_params(x: StructA, y: StructB, z: StructC) -> bool {
        true
    }
    fn multi_params(x: StructD<u32, u32, StructF<Vec<StructG>>>) -> bool {
        false
    }
}
