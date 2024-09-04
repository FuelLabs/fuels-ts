contract;

// The abi defines the blueprint for the contract.
abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;
}

/// The storage variables for the contract.
/// In this case, there is only one variable called `counter` which is initialized to 0.
storage {
    counter: u64 = 0,
}

impl Counter for Contract {
    // The `get_count` function returns the current value of the counter.
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    // The `increment_counter` function increments the counter by the given amount.
    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }
}

#[test]
fn test_get_count() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let count = contract_instance.get_count();
    assert(count == 0);
}

#[test]
fn test_increment_counter() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let count_before = contract_instance.get_count();
    let count_after = contract_instance.increment_counter(1);
    assert(count_after == count_before + 1);
}