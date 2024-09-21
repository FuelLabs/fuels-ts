contract;

// TODO: Consider adding storageSlots for increased friction
// TODO: Document Proxy Contracts

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
