// #region custom-transactions-1
script;

use std::asset::transfer;

fn main(
    contract_address: b256,
    asset_a: AssetId,
    amount_asset_a: u64,
    asset_b: AssetId,
    amount_asset_b: u64,
) -> bool {
    let wrapped_contract = ContractId::from(contract_address);
    let contract_id = Identity::ContractId(wrapped_contract);
    transfer(contract_id, asset_a, amount_asset_a);
    transfer(contract_id, asset_b, amount_asset_b);
    true
}
// #endregion custom-transactions-1
