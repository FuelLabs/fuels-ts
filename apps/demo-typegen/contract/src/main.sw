// #region Testing-with-jest-rust
contract;

abi DemoContract {
    fn return_input(input: u64) -> u64;
}

impl DemoContract for Contract {
    fn return_input(input: u64) -> u64 {
        input
    }
}
// #endregion Testing-with-jest-rust
