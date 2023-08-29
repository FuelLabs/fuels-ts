contract;

abi MyContract {
    fn main(x: Option<u8>) -> Option<u8>;
}

impl MyContract for Contract {
    fn main(x: Option<u8>) -> Option<u8> {
        x
    }
}
