// #region raw-slice-1
contract;

abi RawSliceTest {
    fn echo_raw_slice(value: raw_slice) -> raw_slice;
    fn raw_slice_comparison(value: raw_slice) -> bool;
}

impl RawSliceTest for Contract {
    fn echo_raw_slice(value: raw_slice) -> raw_slice {
        value
    }

    fn raw_slice_comparison(value: raw_slice) -> bool {
        let vec: Vec<u8> = Vec::from(value);

        vec.len() == 3 && vec.get(0).unwrap() == 40 && vec.get(1).unwrap() == 41 && vec.get(2).unwrap() == 42
    }
}
// #endregion raw-slice-1
