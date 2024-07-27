contract;

abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64;
}

storage {
    counter: u64 = 0,
}

impl Counter for Contract {
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
