library;

use std::{address::Address, asset::*, contract_id::ContractId};

pub struct TransferParams<Recipient> {
    pub recipient: Recipient,
    pub asset_id: AssetId,
    pub amount: u64,
}

abi Token {
    fn mint_coins(mint_amount: u64);
    fn mint_to_addresses(addresses: [Address; 3], mint_amount: u64);
    fn burn_coins(burn_amount: u64);
    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64);
    fn multi_contract_transfer(recipients: [TransferParams<ContractId>; 5]);
    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64);
    fn multi_address_transfer(recipients: [TransferParams<Address>; 5]);
    fn get_balance(target: ContractId, asset_id: AssetId) -> u64;
    fn get_msg_amount() -> u64;
}
