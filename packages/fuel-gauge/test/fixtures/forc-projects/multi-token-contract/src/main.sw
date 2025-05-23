contract;

use std::{
    address::Address,
    asset::*,
    context::balance_of,
    context::msg_amount,
    contract_id::ContractId,
};

abi MultiToken {
    fn mint_coins(sub_id: b256, mint_amount: u64);
    fn mint_to_addresses(addresses: [Address; 3], sub_id: b256, mint_amount: u64);
    fn burn_coins(sub_id: b256, burn_amount: u64);
    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64);
    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64);
    fn get_balance(target: ContractId, asset_id: AssetId) -> u64;
}

const TOKEN_1: b256 = 0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00;
const TOKEN_2: b256 = 0x0d000e76a67758bbc6861d48ca571876cd480d9df8cf4dfa635c168e1e97f324;
const TOKEN_3: b256 = 0xdf78cb1e1a1b31fff104eb0baf734a4767a1b1373687c29a26bf1a2b22d1a3c5;

impl MultiToken for Contract {
    fn mint_coins(sub_id: b256, mint_amount: u64) {
        assert(sub_id == TOKEN_1 || sub_id == TOKEN_2 || sub_id == TOKEN_3);

        mint(sub_id, mint_amount);
    }

    fn mint_to_addresses(addresses: [Address; 3], sub_id: b256, mint_amount: u64) {
        assert(sub_id == TOKEN_1 || sub_id == TOKEN_2 || sub_id == TOKEN_3);

        let mut counter = 0;

        while counter < 3 {
            mint_to(Identity::Address(addresses[counter]), sub_id, mint_amount);
            counter = counter + 1;
        }
    }

    fn burn_coins(sub_id: b256, burn_amount: u64) {
        assert(sub_id == TOKEN_1 || sub_id == TOKEN_2 || sub_id == TOKEN_3);

        burn(sub_id, burn_amount);
    }

    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64) {
        transfer(Identity::ContractId(target), asset_id, amount);
    }

    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64) {
        transfer(Identity::Address(recipient), asset_id, amount);
    }

    fn get_balance(target: ContractId, asset_id: AssetId) -> u64 {
        balance_of(target, asset_id)
    }
}
