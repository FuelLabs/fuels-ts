contract;

use std::{context::balance_of, context::msg_amount, token::*};
use token_abi::Token;

impl Token for Contract {
    fn mint_coins(mint_amount: u64, a: u32) {
        mint(mint_amount);
    }

    fn mint_to_addresses(mint_amount: u64, addresses: [Address; 3]) {
        let mut counter = 0;
        while counter < 3 {
            mint_to_address(mint_amount, addresses[counter]);
            counter = counter + 1;
        }
    }

    fn burn_coins(burn_amount: u64, a: u32) {
        burn(burn_amount);
    }

    fn force_transfer_coins(coins: u64, asset_id: ContractId, target: ContractId) {
        force_transfer_to_contract(coins, asset_id, target);
    }

    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address) {
        transfer_to_address(coins, asset_id, recipient);
    }

    fn get_balance(target: ContractId, asset_id: ContractId) -> u64 {
        balance_of(target, asset_id)
    }
    
    fn get_msg_amount() -> u64 {
        msg_amount()
    }
}
