predicate;

// TODO: Use std-lib version when it's out: https://github.com/FuelLabs/sway/issues/1062
fn get_script_data<T>() -> T {
    let script_length = std::tx::tx_script_length();
    // Fix weird issue: https://github.com/FuelLabs/sway/issues/1585
    let script_length = script_length + script_length % 8;
    
    let is = std::context::registers::instrs_start();
    let script_data_ptr = is + script_length;
    let script_data = asm(r1: script_data_ptr) {
        r1: T
    };
    script_data
}

struct Validation {
    has_account: bool,
    total_complete: u64
}

fn main() -> bool {
    let validation = get_script_data::<Validation>();
    if validation.total_complete >= 100 && validation.has_account {
        return true;
    }

    false
}
