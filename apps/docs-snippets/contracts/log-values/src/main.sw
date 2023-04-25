// #region log-1
contract;

use std::logging::log;

abi LogValues {
    fn log_values(val1: u64, val2: b256, val3: str[4], val4: [u8; 3]);
}

impl LogValues for Contract {
    fn log_values(val1: u64, val2: b256, val3: str[4], val4: [u8; 3]) {
        log(val1);
        log(val2);
        log(val3);
        log(val4);
    }
}
// #endregion log-1
