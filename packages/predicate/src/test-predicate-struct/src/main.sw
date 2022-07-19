predicate;

use std::tx::get_predicate_data;

struct Validation {
    has_account: bool,
    total_complete: u64
}

fn main() -> bool {
    let received: Validation = get_predicate_data();
    let expected_has_account: bool = true;
    let expected_total_complete: u64 = 100;

    received.has_account == expected_has_account && received.total_complete == expected_total_complete
}
