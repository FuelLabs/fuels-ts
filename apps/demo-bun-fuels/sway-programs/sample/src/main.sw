contract;

abi Sample {
    fn return_input(input: u64) -> u64;
}

impl Sample for Contract {
    fn return_input(input: u64) -> u64 {
        input
    }
}
