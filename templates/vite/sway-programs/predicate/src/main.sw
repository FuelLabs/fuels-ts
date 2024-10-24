predicate;

/// This predicate checks if the given password is 1337.
/// If it is, the predicate is 'unlocked' and the transaction is allowed to proceed.
/// Otherwise, it is reverted.
fn main(password: u64) -> bool {
    return password == 1337;
}

#[test]
fn test_main() {
    let result1 = main(1337);
    assert(result1 == true);

    let result2 = main(1338);
    assert(result2 == false);
}
