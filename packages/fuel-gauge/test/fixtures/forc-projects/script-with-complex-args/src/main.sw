script;

use std::bytes::Bytes;

pub type PoolId = (AssetId, AssetId, bool);

fn main(
    amount_in: u64,
    asset_in: AssetId,
    amount_out_min: u64,
    pools: Vec<PoolId>,
    recipient: Identity,
    deadline: u32,
) -> bool {
    return true;
}
