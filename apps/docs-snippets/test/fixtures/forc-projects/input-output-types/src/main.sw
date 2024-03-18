contract;

use std::bytes::Bytes;

abi InputOutputTypes {
    fn address(address: Address) -> Address;

    fn contract_id(contract_id: ContractId) -> ContractId;

    fn identity(identity: Identity) -> Identity;

    fn asset_id(asset_id: AssetId) -> AssetId;
}

impl InputOutputTypes for Contract {
    fn address(address: Address) -> Address {
        address
    }

    fn contract_id(contract_id: ContractId) -> ContractId {
        contract_id
    }

    fn identity(identity: Identity) -> Identity {
        identity
    }

    fn asset_id(asset_id: AssetId) -> AssetId {
        asset_id
    }
}
