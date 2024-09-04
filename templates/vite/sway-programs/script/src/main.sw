script;

// This script simply returns the input value.
fn main(input: u64) -> u64 {
    return input;
}

#[test]
fn test_main() {
    let result = main(1337);
    assert(result == 1337);
}
