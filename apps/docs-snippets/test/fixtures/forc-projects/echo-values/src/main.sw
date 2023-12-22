// #region understanding-fuel-binary-file
contract;

use std::b512::B512;

abi EchoValues {
    fn echo_u8(value: u8) -> u8;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_str(value: str) -> str;

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64);

    fn echo_b512(input: B512) -> B512;
}

impl EchoValues for Contract {
    fn echo_u8(value: u8) -> u8 {
        value
    }

    // Avoid executing this function; it is currently unsupported.
    // Refer to: https://github.com/FuelLabs/sway/issues/5110 for more details.
    // The function is defined here to include the type 'str' in the ABI,
    // ensuring Typegen can accurately interpret it.
    // For further information, see: https://github.com/FuelLabs/fuels-ts/issues/1469
    fn echo_str(value: str) -> str {
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
