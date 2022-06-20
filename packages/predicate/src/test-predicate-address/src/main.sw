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

fn main() -> bool {
    let received: b256 = get_predicate_data();
    let expected: b256 = 0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a;

    received == expected
}
