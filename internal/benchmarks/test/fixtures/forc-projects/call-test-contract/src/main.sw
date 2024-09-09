contract;

use std::asset::mint;
use std::context::msg_amount;
abi TestContract {
    #[payable]
    fn return_context_amount() -> u64;

    fn mint_coins(sub_id: b256, mint_amount: u64);

    fn sum(a: u64, b: u64) -> u64;
}

impl TestContract for Contract {
    #[payable]
    fn return_context_amount() -> u64 {
        msg_amount()
    }

    fn mint_coins(sub_id: b256, mint_amount: u64) {
        mint(sub_id, mint_amount);
    }

    fn sum(a: u64, b: u64) -> u64 {
        a + b
    }
}
