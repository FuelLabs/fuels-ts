contract;

abi VoidContract {
    fn return_void() -> Option<u8>;
}

impl VoidContract for Contract {
    fn return_void() -> Option<u8> {
        Option::None
    }
}