// #region contract-balance-2
contract;

use std::asset::transfer;

abi TransferToAddress {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset_id: AssetId, recipient: b256);
}

impl TransferToAddress for Contract {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset_id: AssetId, recipient: b256) {
        let recipient_address = Address::from(recipient);

        transfer(
            Identity::Address(recipient_address),
            asset_id,
            amount_to_transfer,
        );
    }
}
// #endregion contract-balance-2
