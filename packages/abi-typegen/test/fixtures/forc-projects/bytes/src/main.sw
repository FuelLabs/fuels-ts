contract;

use std::bytes::Bytes;

abi BytesTest {
    fn main(value: Bytes) -> Bytes;
}

impl BytesTest for Contract {
    fn main(value: Bytes) -> Bytes {
        value
    }
}
