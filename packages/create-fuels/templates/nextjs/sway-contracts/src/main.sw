contract;

abi MyContract {
    fn test_function(a: u8, b: u8) -> u8;
}

impl MyContract for Contract {
    fn test_function(a: u8, b: u8) -> u8 {
        a + b
    }
}
