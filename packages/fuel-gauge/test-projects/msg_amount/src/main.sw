contract;

use std::context::msg_amount;

// ANCHOR: msg_amount_contract
abi FuelTest {
    fn get_msg_amount() -> u64;
}

impl FuelTest for Contract {
    fn get_msg_amount() -> u64 {
        msg_amount()
    }
}
// ANCHOR_END: msg_amount_contract
