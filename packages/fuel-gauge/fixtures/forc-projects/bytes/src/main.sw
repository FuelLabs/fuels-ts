contract;

use std::bytes::Bytes;

abi MyContract {
    fn return_bytes(len: u8) -> Bytes;
}

impl MyContract for Contract {
    fn return_bytes(len: u8) -> Bytes {
        let mut bytes = Bytes::new();
        let mut i: u8 = 0;
        while i < len {
            bytes.push(i);
            i += 1u8;
        }
        bytes
    }
}