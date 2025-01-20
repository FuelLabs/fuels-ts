script;

use std::bytes::Bytes;

type PoolId = (AssetId, AssetId, bool);

type ScriptResult = (u64, AssetId, u64, Vec<PoolId>, Identity, u32);

fn main(
    amount_in: u64,
    asset_in: AssetId,
    amount_out_min: u64,
    pools: Vec<PoolId>,
    recipient: Identity,
    deadline: u32,
) -> ScriptResult {
    return (amount_in, asset_in, amount_out_min, pools, recipient, deadline);
}
