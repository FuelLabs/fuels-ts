contract;

abi ContractWithStorage {
    #[storage(read)]
    fn read_value() -> u64;

    #[storage(write, read)]
    fn set_value(amount: u64) -> u64;
}

storage {
    value: u64 = 0,
}

impl ContractWithStorage for Contract {
    #[storage(read)]
    fn read_value() -> u64 {
        storage.value.try_read().unwrap_or(0)
    }

    #[storage(write, read)]
    fn set_value(amount: u64) -> u64 {
        let current = storage.value.try_read().unwrap_or(0);
        storage.value.write(current + amount);
        storage.value.read()
    }
}
