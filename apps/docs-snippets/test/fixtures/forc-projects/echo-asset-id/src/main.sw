// #region asset-id-1
contract;

abi EvmTest {
    fn echo_asset_id() -> AssetId;
    fn echo_asset_id_comparison(asset_id: AssetId) -> bool;
}

const ASSET_ID: AssetId = AssetId {
    value: 0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c,
};

impl EvmTest for Contract {
    fn echo_asset_id() -> AssetId {
        ASSET_ID
    }

    fn echo_asset_id_comparison(asset_id: AssetId) -> bool {
        asset_id == ASSET_ID
    }
}
// #endregion asset-id-1
