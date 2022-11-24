contract;

// Storage is the way to add persistent state to our contracts.
//
// For this contract, create a storage variable called `counter` and initialize it to 0.
storage {
    counter: u64 = 0,
}

// Define the interface our contract shall have
abi MyContract {
    // A `counter` method with no parameters that returns the current value of the counter and
    // *only reads* from storage.
    #[storage(read)]
    fn counter() -> u64;

    // An `increment` method that takes a single integer parameter, increments the counter by that
    // parameter, and returns its new value. This method has read/write access to storage.
    #[storage(read, write)]
    fn increment(param: u64) -> u64;
}

// The implementation of the contract's ABI
impl MyContract for Contract {
    #[storage(read)]
    fn counter() -> u64 {
        // Read and return the current value of the counter from storage
        storage.counter
    }

    #[storage(read, write)]
    fn increment(param: u64) -> u64 {
        // Read the current value of the counter from storage, increment the value read by the argument
        // received, and write the new value back to storage.
        storage.counter += param;

        // Return the new value of the counter from storage
        storage.counter
    }
}
