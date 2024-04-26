contract;

use std::asset::{burn, mint, transfer};

abi Token {
    fn transfer_to_address(target: Address, asset_id: AssetId, coins: u64);
    fn transfer_to_contract(recipient: ContractId, asset_id: AssetId, coins: u64);
    fn mint_coins(sub_id: b256, mint_amount: u64);
    fn burn_coins(sub_id: b256, burn_amount: u64);
}

impl Token for Contract {
    // #region variable-outputs-1
    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64) {
        transfer(Identity::Address(recipient), asset_id, amount);
    }

    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64) {
        transfer(Identity::ContractId(target), asset_id, amount);
    }
    // #endregion variable-outputs-1
    fn mint_coins(sub_id: b256, mint_amount: u64) {
        mint(sub_id, mint_amount);
    }

    fn burn_coins(sub_id: b256, burn_amount: u64) {
        burn(sub_id, burn_amount);
    }
}
