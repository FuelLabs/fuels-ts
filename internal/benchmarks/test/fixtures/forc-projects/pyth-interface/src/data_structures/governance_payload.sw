library;

use std::bytes::Bytes;

use ::data_structures::data_source::DataSource;

pub struct UpgradeContractPayload {
    pub new_implementation: Identity,
}

pub struct AuthorizeGovernanceDataSourceTransferPayload {
    pub claim_vaa: Bytes,
}

pub struct RequestGovernanceDataSourceTransferPayload {
    pub governance_data_source_index: u32,
}

pub struct SetDataSourcesPayload {
    pub data_sources: Vec<DataSource>,
}

pub struct SetFeePayload {
    pub new_fee: u64,
}

pub struct SetValidPeriodPayload {
    pub new_valid_period: u64,
}
