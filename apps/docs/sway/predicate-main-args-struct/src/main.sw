// #region predicate-main-args-struct-1
predicate;

struct Validation {
    has_account: bool,
    total_complete: u64,
}

fn main(received: Validation) -> bool {
    let expected_has_account: bool = true;
    let expected_total_complete: u64 = 100;

    received.has_account == expected_has_account && received.total_complete == expected_total_complete
}
// #endregion predicate-main-args-struct-1
