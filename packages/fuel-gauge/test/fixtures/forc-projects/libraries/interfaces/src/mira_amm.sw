library;

use std::{bytes::Bytes, string::String};
use ::data_structures::{Asset, PoolId, PoolInfo, PoolMetadata,};

abi MiraAMM {
    #[storage(read, write)]
    fn create_pool(
        token_0_contract_id: ContractId,
        token_0_sub_id: SubId,
        token_1_contract_id: ContractId,
        token_1_sub_id: SubId,
        is_stable: bool,
    ) -> PoolId;

    #[storage(read)]
    fn pool_metadata(pool_id: PoolId) -> Option<PoolMetadata>;

    #[storage(read)]
    fn fees() -> (u64, u64, u64, u64);

    #[storage(write)]
    fn set_protocol_fees(volatile_fee: u64, stable_fee: u64);

    #[storage(write)]
    fn set_hook(contract_id: Option<ContractId>);

    #[storage(read)]
    fn get_fee_recipient_2() -> Option<Identity>;

    #[storage(read)]
    fn get_fee_recipient_3() -> Identity;

    #[storage(read)]
    fn test_revert_0() -> u8;

    #[storage(read)]
    fn hook() -> Option<ContractId>;

    #[storage(read, write)]
    fn mint(pool_id: PoolId, to: Identity) -> Asset;

    #[payable]
    #[storage(read, write)]
    fn burn(pool_id: PoolId, to: Identity) -> (u64, u64);

    #[payable]
    #[storage(read, write)]
    fn swap(
        pool_id: PoolId,
        amount_0_out: u64,
        amount_1_out: u64,
        to: Identity,
        data: Option<Bytes>,
    );

    #[storage(read, write)]
    fn transfer_ownership(new_owner: Identity);
}
