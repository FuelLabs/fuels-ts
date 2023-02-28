contract;

abi TestContract {
    #[payable]
    fn payable() -> u64;
    fn non_payable() -> u64;
}
impl TestContract for Contract {
    #[payable]
    fn payable() -> u64 {
        42
    }
    fn non_payable() -> u64 {
        42
    }
}
