script;

use std::context::registers::*;

const CONTRACT_ID_LEN = 32;
const WORD_SIZE = 8;

// User of this script will replace this magic b256 in the binary
// with the length of the binary
const SCRIPT_LENGTH_BYTES = 0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b;
fn get_script_length() -> u64 {
    asm(out, r1: SCRIPT_LENGTH_BYTES) {
        lw out r1 i0;
        out: u64
    }
}

fn get_script_data_offset() -> u64 {
    let is = instrs_start();
    let script_length = get_script_length();
    is + script_length
}

fn main() {
    let script_data_offset = get_script_data_offset();
    let call_data_offset = script_data_offset + CONTRACT_ID_LEN + WORD_SIZE;
    let amount_offset = script_data_offset + CONTRACT_ID_LEN;
    let asset_id_offset = script_data_offset;

    asm(r1: call_data_offset, r2: amount_offset, r3: asset_id_offset) {
        lw r2 r2 i0;
        call r1 r2 r3 cgas;
    }
}
