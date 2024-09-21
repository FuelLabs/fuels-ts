contract;

// TODO: Document Proxy Contracts
storage {
    value: u8 = 10,
}

abi MyContract {
    fn test_function() -> bool;
    #[storage(read)]
    fn get_value() -> u8;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }

    #[storage(read)]
    fn get_value() -> u8 {
        storage.value.read()
    }
}
