library;

use std::{address::Address, contract_id::ContractId, token::*};

abi Token {
    fn mint_coins(mint_amount: u64, a: u32);
    fn mint_to_addresses(mint_amount: u64, addresses: [Address; 3]);
    fn burn_coins(burn_amount: u64, a: u32);
    fn force_transfer_coins(coins: u64, asset_id: ContractId, target: ContractId);
    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address);
    fn get_balance(target: ContractId, asset_id: ContractId) -> u64;
    fn get_msg_amount() -> u64;
}
