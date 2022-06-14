predicate;

use std::intrinsics::is_reference_type;
use std::context::registers::instrs_start;

pub fn tx_predicate_data_start_offset() -> u64 {
    let is = instrs_start(); // get the value of $is
    let predicate_length_ptr = is - 16; // subtract 16
    let predicate_code_length = asm(r1, r2: predicate_length_ptr) {
        lw r1 r2 i0;
        r1: u64
    };

    let predicate_data_ptr = is + predicate_code_length;
    predicate_data_ptr
}

pub fn get_predicate_data<T>() -> T {
    let ptr = tx_predicate_data_start_offset();
    if is_reference_type::<T>() {
        asm(r1: ptr) {
            r1: T
        }
    } else {
        asm(r1: ptr) {
            lw r1 r1 i0;
            r1: T
        }
    }
}

struct Validation {
    has_account: bool,
    total_complete: u64
}

fn main() -> bool {
    let validation = get_predicate_data::<Validation>();
    validation.total_complete == 100 && validation.has_account
}
