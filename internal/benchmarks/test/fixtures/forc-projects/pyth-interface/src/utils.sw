library;

pub fn absolute_of_exponent(exponent: u32) -> u32 {
    if exponent == 0u32 {
        exponent
    } else {
        u32::max() - exponent + 1
    }
}

#[storage(read)]
pub fn total_fee(
    total_number_of_updates: u64,
    single_update_fee: StorageKey<u64>,
) -> u64 {
    total_number_of_updates * single_update_fee.read()
}
