contract;

storage {
    value: u8 = 10,
}

abi MyContract {
    #[storage(read)]
    fn get_value() -> u8;
    fn test_function() -> bool;
}

impl MyContract for Contract {
    #[storage(read)]
    fn get_value() -> u8 {
        storage.value.read()
    }

    fn test_function() -> bool {
        true
    }
}
