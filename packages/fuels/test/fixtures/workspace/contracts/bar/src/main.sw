contract;

abi BarContract {
    fn bar() -> b256;
}

impl BarContract for Contract {
    fn bar() -> b256 {
        0x0000000000000000000000000000000000000000000000000000000000000100
    }
}
