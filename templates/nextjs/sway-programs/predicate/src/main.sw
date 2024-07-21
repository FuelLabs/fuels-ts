predicate;

/// This predicate checks if the given password is 1337.
/// If it is, the predicate is 'unlocked' and the transaction is allowed to proceed.
/// Otherwise, it is reverted.
fn main(password: u64) -> bool {
    return password == 1337;
}
