script;

// This script simply returns the input value.
fn main(input: u64) -> u64 {
    return input;
}

#[test]
fn should_return_input() {
    let expected = 1234;

    let actual = main(1234);

    assert(actual == expected);
}
