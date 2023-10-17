contract;

use std::string::String;

abi StdStringTest {
    fn main(value: String) -> String;
}

impl StdStringTest for Contract {
    fn main(value: String) -> String {
        value
    }
}
