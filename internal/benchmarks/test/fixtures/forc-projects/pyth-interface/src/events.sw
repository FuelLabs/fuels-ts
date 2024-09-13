library;

use ::data_structures::{data_source::DataSource, price::PriceFeedId,};

pub struct ConstructedEvent {
    pub guardian_set_index: u32,
}

pub struct NewGuardianSetEvent {
    pub governance_action_hash: b256,
    // new_guardian_set: GuardianSet, // TODO: Uncomment when SDK supports logs with nested Vecs https://github.com/FuelLabs/fuels-rs/issues/1046
    pub new_guardian_set_index: u32,
}

pub struct UpdatedPriceFeedsEvent {
    pub updated_price_feeds: Vec<PriceFeedId>,
}

pub struct ContractUpgradedEvent {
    pub old_implementation: Identity,
    pub new_implementation: Identity,
}

pub struct GovernanceDataSourceSetEvent {
    pub old_data_source: DataSource,
    pub new_data_source: DataSource,
    pub initial_sequence: u64,
}

pub struct DataSourcesSetEvent {
    pub old_data_sources: Vec<DataSource>,
    pub new_data_sources: Vec<DataSource>,
}

pub struct FeeSetEvent {
    pub old_fee: u64,
    pub new_fee: u64,
}

pub struct ValidPeriodSetEvent {
    pub old_valid_period: u64,
    pub new_valid_period: u64,
}
