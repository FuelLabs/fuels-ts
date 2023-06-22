// #region custom-transactions-1
script;

use std::token::force_transfer_to_contract;

fn main(contract_address: b256, asset_a: b256, amount_asset_a: u64, asset_b: b256, amount_asset_b: u64) -> bool {
    let wrapped_contract = ContractId::from(contract_address);

    let wrapped_asset_a = ContractId::from(asset_a);
    let wrapped_asset_b = ContractId::from(asset_b);

    force_transfer_to_contract(amount_asset_a, wrapped_asset_a, wrapped_contract);
    force_transfer_to_contract(amount_asset_b, wrapped_asset_b, wrapped_contract);
    true
}
// #endregion custom-transactions-1