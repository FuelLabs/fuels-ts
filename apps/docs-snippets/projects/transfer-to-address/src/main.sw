// #region contract-balance-2
contract;

use std::token::transfer_to_address;

abi TransferToAddress {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset: b256, recipient: b256);
}

impl TransferToAddress for Contract {
    #[payable]
    fn transfer(amount_to_transfer: u64, asset: b256, recipient: b256) {
        let recipient_address = Address::from(recipient);

        let asset_id = ContractId::from(asset);

        transfer_to_address(amount_to_transfer, asset_id, recipient_address);
    }
}
// #endregion contract-balance-2
