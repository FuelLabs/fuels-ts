// #region full
contract;

use std::logging::log;

abi LogSimple {
    fn log_simple(val: str[9]);
}

impl LogSimple for Contract {
    fn log_simple(val: str[9]) {
        log(val);
    }
}
// #endregion full
