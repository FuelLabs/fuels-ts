predicate;

use std::intrinsics::is_reference_type;
use std::context::registers::instrs_start;
use std::tx::get_predicate_data;

fn main() -> bool {
    let received: u32 = get_predicate_data();
    let expected: u32 = 1078;

    received == expected
}
