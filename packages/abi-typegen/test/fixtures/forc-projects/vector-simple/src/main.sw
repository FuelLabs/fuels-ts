contract;

abi MyContract {
    fn main(x: Vec<u8>) -> Vec<u8>;
}

impl MyContract for Contract {
    fn main(x: Vec<u8>) -> Vec<u8> {
        x
    }
}
