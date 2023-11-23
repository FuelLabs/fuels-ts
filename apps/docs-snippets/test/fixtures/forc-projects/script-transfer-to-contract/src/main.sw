// #region custom-transactions-1
script;

use std::token::force_transfer_to_contract;

fn main(
    contract_address: b256,
    asset_a: AssetId,
    amount_asset_a: u64,
    asset_b: AssetId,
    amount_asset_b: u64,
) -> bool {
    let wrapped_contract = ContractId::from(contract_address);

    force_transfer_to_contract(wrapped_contract, asset_a, amount_asset_a);
    force_transfer_to_contract(wrapped_contract, asset_b, amount_asset_b);
    true
}
// #endregion custom-transactions-1
