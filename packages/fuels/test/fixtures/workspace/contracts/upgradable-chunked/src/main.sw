contract;

// Any arbitrary value here, we just want to use
// confifgurables so the test covers more areas
storage {
    value: u8 = 10,
}

abi MyContract {
    #[storage(read)]
    fn get_value() -> u8;
    fn huge_blob() -> u64; // Just to trigger chunk deployment
    fn test_function() -> bool;
}

impl MyContract for Contract {
    #[storage(read)]
    fn get_value() -> u8 {
        storage.value.read()
    }

    fn huge_blob() -> u64 {
        asm() {
            blob i450000;
        }
        1001
    }

    fn test_function() -> bool {
        true
    }
}
