// #region Testing-with-jest-rust
contract;

abi ExampleContract {
    fn return_input(input: u64) -> u64;
}

impl ExampleContract for Contract {
    fn return_input(input: u64) -> u64 {
        input
    }
}
// #endregion Testing-with-jest-rust
