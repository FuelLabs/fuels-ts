contract;

abi RawSliceTest {
    fn main(value: raw_slice) -> raw_slice;
}

impl RawSliceTest for Contract {
    fn main(value: raw_slice) -> raw_slice {
        value
    }
}
