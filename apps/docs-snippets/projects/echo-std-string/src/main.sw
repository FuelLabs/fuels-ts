// #region std-string-1
contract;

use std::string::String;

abi StdStringTest {
    fn echo_string(value: String) -> String;
    fn string_comparison(value: String) -> bool;
}

impl StdStringTest for Contract {
    fn echo_string(value: String) -> String {
        value
    }

    fn string_comparison(value: String) -> bool {
        let expected = String::from_ascii_str("Hello World");

        value.as_bytes() == expected.as_bytes()
    }
}
// #endregion std-string-1
