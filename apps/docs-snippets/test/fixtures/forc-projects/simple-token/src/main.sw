// #region inter-contract-calls-1
contract;

use ::simple_token_abi::SimpleToken;

use std::hash::*;
storage {
    balances: StorageMap<b256, u64> = StorageMap {},
}
impl SimpleToken for Contract {
    #[storage(read, write)]
    fn deposit(address: b256, amount: u64) {
        let current_balance = storage.balances.get(address).try_read().unwrap_or(0);
        storage.balances.insert(address, current_balance + amount);
    }
    #[storage(read)]
    fn get_balance(address: b256) -> u64 {
        let balance = storage.balances.get(address).try_read().unwrap_or(0);
        balance
    }
}
// #endregion inter-contract-calls-1
