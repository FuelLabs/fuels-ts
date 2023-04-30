// #region understanding-fuel-binary-file
contract;

abi EchoValues {
    fn echo_u8(value: u8) -> u8;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64);
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
}
// #endregion understanding-fuel-binary-file
