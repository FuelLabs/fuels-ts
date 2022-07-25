predicate;

use std::tx::get_predicate_data;

fn main() -> bool {
    let received: u32 = get_predicate_data();
    let expected: u32 = 1078;

    received == expected
}
