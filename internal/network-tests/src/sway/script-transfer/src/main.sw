script;

use std::asset::transfer;

fn main(address: Identity, asset_id: AssetId, amount: u64) -> bool {
    transfer(address, asset_id, amount);
    true
}
