contract;

abi MyContract {
    fn new() -> u64;
}

impl MyContract for Contract {
    fn new() -> u64 {
        12345u64
    }
}
