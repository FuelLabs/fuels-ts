// #region proxy-5
contract;

abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(read)]
    fn get_increments() -> u64;

    #[storage(write, read)]
    fn increment_count(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_count(amount: u64) -> u64;
}

storage {
    counter: u64 = 0,
    increments: u64 = 0,
}

impl Counter for Contract {
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.try_read().unwrap_or(0)
    }

    #[storage(read)]
    fn get_increments() -> u64 {
        storage.increments.try_read().unwrap_or(0)
    }

    #[storage(write, read)]
    fn increment_count(amount: u64) -> u64 {
        let current = storage.counter.try_read().unwrap_or(0);
        storage.counter.write(current + amount);

        let current_iteration: u64 = storage.increments.try_read().unwrap_or(0);
        storage.increments.write(current_iteration + 1);

        storage.counter.read()
    }

    #[storage(write, read)]
    fn decrement_count(amount: u64) -> u64 {
        let current = storage.counter.try_read().unwrap_or(0);
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
// #endregion proxy-5
