contract;

use std::{address::Address, context::balance_of, contract_id::ContractId, token::*};
use token_abi::Token;

impl Token for Contract {
    fn mint_coins(mint_amount: u64, a: u32) {
        mint(mint_amount);
    }

    fn burn_coins(burn_amount: u64, a: u32) {
        burn(burn_amount);
    }

    fn force_transfer_coins(coins: u64, asset_id: ContractId, target: ContractId) {
        force_transfer(coins, asset_id, target);
    }

    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address) {
        transfer_to_output(coins, asset_id, recipient);
    }

    fn get_balance(target: ContractId, asset_id: ContractId) -> u64 {
        balance_of(target, asset_id)
    }
}
