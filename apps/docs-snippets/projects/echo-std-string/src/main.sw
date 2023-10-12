// #region std-string-1
contract;

use std::string::String;

abi RawSliceTest {
    fn echo_string(value: String) -> String;
    fn string_comparison(value: String) -> bool;
}

impl RawSliceTest for Contract {
    fn echo_string(value: String) -> String {
        value
    }

    fn string_comparison(value: String) -> bool {
        let expected = String::from_ascii_str("Hello World");

        value == expected
    }
}
// #endregion std-string-1
