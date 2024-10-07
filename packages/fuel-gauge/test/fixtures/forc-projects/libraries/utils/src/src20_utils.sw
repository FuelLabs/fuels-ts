library;

use std::string::String;
use standards::src20::SRC20;

pub fn get_symbol_and_decimals(contract_id: ContractId, asset_id: AssetId) -> (String, u8) {
    let src_20 = abi(SRC20, contract_id.into());
    let symbol = src_20.symbol(asset_id).unwrap_or(String::from_ascii_str("UNKNOWN"));
    let decimals = src_20.decimals(asset_id).unwrap_or(0);
    (symbol, decimals)
}
