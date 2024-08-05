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
