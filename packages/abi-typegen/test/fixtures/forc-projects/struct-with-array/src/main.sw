contract;

struct Struct1 {
    prop1: [u8; 2],
    prop2: str[2],
}

abi MyContract {
    fn main(x: Struct1) -> bool;
}

impl MyContract for Contract {
    fn main(x: Struct1) -> bool {
        true
    }
}
