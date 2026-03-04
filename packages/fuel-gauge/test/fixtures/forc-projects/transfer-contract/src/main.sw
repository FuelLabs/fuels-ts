contract;

use std::asset::transfer;

struct TransferParamsInput {
    pub recipient: Identity,
    pub asset_id: AssetId,
    pub amount: u64,
}

abi TransferContract {
    #[payable]
    fn execute_transfer(transfer_params: Vec<TransferParamsInput>) -> bool;
}

impl TransferContract for Contract {
    #[payable]
    fn execute_transfer(transfer_params: Vec<TransferParamsInput>) -> bool {
        let mut i = 0;
        while i < transfer_params.len() {
            let val = transfer_params.get(i).unwrap();
            transfer(val.recipient, val.asset_id, val.amount);
            i += 1;
        }

        true
    }
}
