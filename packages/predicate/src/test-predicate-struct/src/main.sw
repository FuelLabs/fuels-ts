predicate;

use std::intrinsics::is_reference_type;
use std::context::registers::instrs_start;


////////////////////////////////////////
// Inputs > Predicate
////////////////////////////////////////

pub fn tx_predicate_data_start_offset() -> u64 {
    let is = instrs_start(); // get the value of $is
    let predicate_length_ptr = is - 16; // subtract 16
    let predicate_code_length = asm(r1, r2: predicate_length_ptr) {
        lw r1 r2 i0;
        r1: u64
    };

    let predicate_data_ptr = is + predicate_code_length;
    predicate_data_ptr + predicate_data_ptr % 8
}

pub fn read<T>(ptr: u64) -> T {
    if is_reference_type::<T>() {
        asm(ptr: ptr) {
            ptr: T
        }
    } else {
        asm(ptr: ptr, val) {
            lw val ptr i0;
            val: T
        }
    }
}

pub fn get_predicate_data<T>() -> T {
    let ptr = tx_predicate_data_start_offset();
    read(ptr)
}

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

