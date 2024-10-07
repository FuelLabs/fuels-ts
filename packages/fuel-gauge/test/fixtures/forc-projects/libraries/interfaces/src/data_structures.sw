library;

/// Represents the id of a pool. Consists of: asset_0, asset_1, is_stable flag
pub type PoolId = (AssetId, AssetId, bool);

pub struct Asset {
    pub id: AssetId,
    pub amount: u64,
}

impl Asset {
    pub fn new(id: AssetId, amount: u64) -> Self {
        Self { id, amount }
    }
}

pub struct PoolInfo {
    pub id: PoolId,
    pub reserve_0: u64,
    pub reserve_1: u64,
    pub decimals_0: u8,
    pub decimals_1: u8,
}

impl PoolInfo {
    pub fn new(id: PoolId, decimals_0: u8, decimals_1: u8) -> Self {
        Self {
            id,
            reserve_0: 0,
            reserve_1: 0,
            decimals_0,
            decimals_1,
        }
    }

    pub fn copy_with_reserves(self, reserve_0: u64, reserve_1: u64) -> PoolInfo {
        Self {
            id: self.id,
            reserve_0,
            reserve_1,
            decimals_0: self.decimals_0,
            decimals_1: self.decimals_1,
        }
    }
}

pub struct PoolMetadata {
    pub reserve_0: u64,
    pub reserve_1: u64,
    pub liquidity: Asset,
    pub decimals_0: u8,
    pub decimals_1: u8,
}

impl PoolMetadata {
    pub fn from_pool_and_liquidity(pool: PoolInfo, liquidity: Asset) -> Self {
        Self {
            reserve_0: pool.reserve_0,
            reserve_1: pool.reserve_1,
            liquidity,
            decimals_0: pool.decimals_0,
            decimals_1: pool.decimals_1,
        }
    }
}
