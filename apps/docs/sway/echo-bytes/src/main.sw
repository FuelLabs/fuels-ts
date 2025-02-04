// #region bytes-1
contract;

use std::bytes::Bytes;

abi BytesTest {
    fn echo_bytes(value: Bytes) -> Bytes;
    fn bytes_comparison(value: Bytes) -> bool;
}

impl BytesTest for Contract {
    fn echo_bytes(value: Bytes) -> Bytes {
        value
    }

    fn bytes_comparison(value: Bytes) -> bool {
        let mut bytes = Bytes::new();

        bytes.push(40u8);
        bytes.push(41u8);
        bytes.push(42u8);

        value == bytes
    }
}
// #endregion bytes-1
