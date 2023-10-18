// #region Testing-in-ts-rust
contract;

abi DemoContract {
    fn return_input(input: u64) -> u64;
}

impl DemoContract for Contract {
    fn return_input(input: u64) -> u64 {
        input
    }
}
// #endregion Testing-in-ts-rust
