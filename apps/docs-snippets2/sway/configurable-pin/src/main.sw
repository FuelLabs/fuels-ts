// #region full
predicate;

configurable {
    PIN: u64 = 1337,
}

fn main(pin: u64) -> bool {
    return PIN == pin;
}

// #endregion full
