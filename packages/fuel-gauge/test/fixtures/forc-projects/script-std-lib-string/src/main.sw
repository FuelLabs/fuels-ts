script;

use std::string::String;

fn validate_string(arg: String) {
    // to be replaced with a simpler assert_eq once
    // https://github.com/FuelLabs/sway/issues/4868 is done
    let bytes = arg.as_bytes();

    let inner = String::from_ascii_str("Hello World");
    let expected_bytes = inner.as_bytes();

    assert_eq(expected_bytes.len(), bytes.len());

    let mut i = 0;
    while i < bytes.len() {
        assert(expected_bytes.get(i).unwrap() == bytes.get(i).unwrap());
        i += 1;
    }
}

fn main(arg: String) {
    validate_string(arg);
}
