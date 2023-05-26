// #region inter-contract-calls-1
contract;

use ::simple_token_abi::SimpleToken;

storage {
    balances: StorageMap<b256, u64> = StorageMap {},
}

impl SimpleToken for Contract {
    #[storage(read, write)]
    fn deposit(address: b256, amount: u64) {
        let current_balance = storage.balances.get(address).read();

        storage.balances.insert(address, current_balance + amount);
    }

    #[storage(read)]
    fn get_balance(address: b256) -> u64 {
        let balance = storage.balances.get(address).read();

        balance
    }
}
// #endregion inter-contract-calls-1
