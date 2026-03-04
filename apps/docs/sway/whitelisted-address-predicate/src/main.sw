// #region full
predicate;

configurable {
    WHITELISTED: b256 = 0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132,
}

fn main(address: b256) -> bool {
    WHITELISTED == address
}
// #endregion full
