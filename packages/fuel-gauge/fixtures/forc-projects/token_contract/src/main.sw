// #region token-contract
contract;

use std::{context::balance_of, context::msg_amount, token::*};
use token_abi::Token;
use std::constants::ZERO_B256;

const BASE_TOKEN: b256 = ZERO_B256

impl Token for Contract {
    fn mint_coins(mint_amount: u64, a: u32) {
        mint(BASE_TOKEN, mint_amount);
    }

    fn mint_to_addresses(mint_amount: u64, addresses: [Address; 3]) {
        let mut counter = 0;
        while counter < 3 {
            mint_to_address(addresses[counter], BASE_TOKEN, mint_amount);
            counter = counter + 1;
        }
    }

    fn burn_coins(burn_amount: u64, a: u32) {
        burn(BASE_TOKEN, burn_amount);
    }

    fn force_transfer_coins(coins: u64, asset_id: AssetId, target: ContractId) {
        force_transfer_to_contract(target, asset_id, coins);
    }

    fn transfer_coins_to_output(coins: u64, asset_id: AssetId, recipient: Address) {
        transfer_to_address(recipient, asset_id, coins);
    }

    fn get_balance(target: ContractId, asset_id: AssetId) -> u64 {
        balance_of(target, asset_id)
    }

    fn get_msg_amount() -> u64 {
        msg_amount()
    }
}
// #endregion token-contract
