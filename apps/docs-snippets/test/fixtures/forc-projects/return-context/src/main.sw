contract;

use std::context::msg_amount;

abi ReturnContext {
    #[payable]
    fn return_context_amount() -> u64;
}

impl ReturnContext for Contract {
    #[payable]
    fn return_context_amount() -> u64 {
        msg_amount()
    }
}
