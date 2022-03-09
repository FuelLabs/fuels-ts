contract;

abi MyContract {
    fn return_input(input: u64) -> u64;
}

impl MyContract for Contract {
    fn return_input(input: u64) -> u64 {
        input
    }
}
