library simple_token_abi;

abi SimpleToken {
    #[storage(read, write)]
    fn deposit(address: b256, amount: u64);

    #[storage(read)]
    fn get_balance(address: b256) -> u64;
}
