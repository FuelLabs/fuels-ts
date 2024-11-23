contract;

use std::context::msg_amount;

abi ReturnContext {
    #[payable]
    fn return_context_amount() -> u64;
}

// #region return-context-contract
impl ReturnContext for Contract {
    #[payable]
    fn return_context_amount() -> u64 {
        msg_amount()
    }
}
// #endregion return-context-contract
