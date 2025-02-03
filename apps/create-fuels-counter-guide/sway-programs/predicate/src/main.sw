predicate;

configurable {
    PIN: u64 = 1337,
}

/// This is a predicate that checks if the given pin is correct.
/// If it is, the predicate is 'unlocked' and the transaction is allowed to proceed.
/// Otherwise, it is reverted.
fn main(pin: u64) -> bool {
    return PIN == pin;
}

#[test]
fn should_return_true_when_password_is_1337() {
    let expected = true;

    let actual = main(1337);

    assert(actual == expected);
}

#[test]
fn should_return_false_when_password_is_not_1337() {
    let expected = false;

    let actual = main(1338);

    assert(actual == expected);
}
