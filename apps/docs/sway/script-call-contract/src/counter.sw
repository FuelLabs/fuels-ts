library;

abi CounterAbi {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_count(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_count(amount: u64) -> u64;
}
