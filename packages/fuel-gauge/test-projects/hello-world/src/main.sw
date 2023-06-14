contract;

struct TestStruct {
    val: u64,
}

abi MyContract {
    fn test_function() -> bool;

    fn return_struct() -> TestStruct;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }

    fn return_struct() -> TestStruct {
        TestStruct { val: 42 }
    }
}
