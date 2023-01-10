contract;

abi FooContract {
    fn foo() -> u64;
}

impl FooContract for Contract {
    fn foo() -> u64 {
        12345
    }
}
