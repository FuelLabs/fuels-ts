// #region token-contract
contract;

use std::{asset::*, context::balance_of, context::msg_amount};
use token_abi::{Token, TransferParams};
use std::constants::ZERO_B256;

const BASE_TOKEN: b256 = ZERO_B256;

impl Token for Contract {
    fn mint_coins(mint_amount: u64) {
        mint(BASE_TOKEN, mint_amount);
    }

    fn mint_to_addresses(addresses: [Address; 3], mint_amount: u64) {
        let mut counter = 0;
        while counter < 3 {
            mint_to(
                Identity::Address(addresses[counter]),
                BASE_TOKEN,
                mint_amount,
            );
            counter = counter + 1;
        }
    }

    fn burn_coins(burn_amount: u64) {
        burn(BASE_TOKEN, burn_amount);
    }

    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64) {
        transfer(Identity::ContractId(target), asset_id, amount);
    }

    fn multi_contract_transfer(recipients: [TransferParams<ContractId>; 5]) {
        let mut counter = 0;

        while counter < 5 {
            transfer(
                Identity::ContractId(recipients[counter].recipient),
                recipients[counter]
                    .asset_id,
                recipients[counter]
                    .amount,
            );

            counter = counter + 1;
        }
    }

    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64) {
        transfer(Identity::Address(recipient), asset_id, amount);
    }

    fn multi_address_transfer(recipients: [TransferParams<Address>; 5]) {
        let mut counter = 0;

        while counter < 5 {
            transfer(
                Identity::Address(recipients[counter].recipient),
                recipients[counter]
                    .asset_id,
                recipients[counter]
                    .amount,
            );

            counter = counter + 1;
        }
    }

    fn get_balance(target: ContractId, asset_id: AssetId) -> u64 {
        balance_of(target, asset_id)
    }

    fn get_msg_amount() -> u64 {
        msg_amount()
    }
}
// #endregion token-contract
