// #region predicate-with-configurable-pin-1
predicate;

configurable {
    PIN: u64 = 1337,
}

fn main(pin: u64) -> bool {
    return PIN == pin;
}

// #endregion predicate-with-configurable-pin-1
