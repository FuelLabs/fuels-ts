contract;

use std::*;

storage {
    counter: u64 = 0,
}

abi MyContract {
    #[storage(read)]
    fn counter() -> u64;
    #[storage(read, write)]
    fn increment(param: u64) -> u64;
}

impl MyContract for Contract {
    #[storage(read)]
    fn counter() -> u64 {
        storage.counter
    }
    #[storage(read, write)]
    fn increment(param: u64) -> u64 {
        storage.counter += param;
        storage.counter
    }
}
