// #region contract-balance-2
contract;

use std::asset::transfer_to_address;

abi TransferToAddress {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset_id: AssetId, recipient: b256);
}

impl TransferToAddress for Contract {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset_id: AssetId, recipient: b256) {
        let recipient_address = Address::from(recipient);

        transfer_to_address(recipient_address, asset_id, amount_to_transfer);
    }
}
// #endregion contract-balance-2
