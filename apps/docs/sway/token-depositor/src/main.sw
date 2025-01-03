// #region inter-contract-calls-2
contract;

use std::auth::msg_sender;

use ::simple_token_abi::SimpleToken;

abi TokenDepositor {
    fn deposit_to_simple_token(contract_id: b256, amount: u64);
}

impl TokenDepositor for Contract {
    fn deposit_to_simple_token(contract_id: b256, amount: u64) {
        let simple_token_contract = abi(SimpleToken, contract_id);

        let sender = msg_sender().unwrap();

        let address: b256 = match sender {
            Identity::Address(sender_param) => sender_param.bits(),
            _ => revert(0),
        };

        simple_token_contract.deposit(address, amount);
    }
}
// #endregion inter-contract-calls-2
