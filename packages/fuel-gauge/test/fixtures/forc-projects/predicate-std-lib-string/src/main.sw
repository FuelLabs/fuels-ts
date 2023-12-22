predicate;

use std::string::String;

fn validate_string(arg: String) -> bool {
    // to be replaced with a simpler assert_eq once
    // https://github.com/FuelLabs/sway/issues/4868 is done
    let bytes = arg.as_bytes();

    let inner = String::from_ascii_str("Hello World");
    let expected_bytes = inner.as_bytes();

    if expected_bytes.len() != bytes.len() {
        return false;
    }

    let mut i = 0;
    while i < bytes.len() {
        if expected_bytes.get(i).unwrap() != bytes.get(i).unwrap() {
            return false;
        }
        i += 1;
    }

    true
}

fn main(_arg_0: u64, _arg_1: u64, arg_2: String) -> bool {
    validate_string(arg_2)
}
