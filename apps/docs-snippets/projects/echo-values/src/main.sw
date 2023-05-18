// #region understanding-fuel-binary-file
contract;

use std::b512::B512;

abi EchoValues {
    fn echo_u8(value: u8) -> u8;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64);

    fn echo_b512(input: B512) -> B512;
}

impl EchoValues for Contract {
    fn echo_u8(value: u8) -> u8 {
        value
    }

    fn echo_str_8(value: str[8]) -> str[8] {
        value
    }

    // #region tuples-2
    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64) {
        tuple
    }
    // #endregion tuples-2

    // #region bits512-3
    fn echo_b512(input: B512) -> B512 {
        input
    }
    // #endregion bits512-3
}
// #endregion understanding-fuel-binary-file
