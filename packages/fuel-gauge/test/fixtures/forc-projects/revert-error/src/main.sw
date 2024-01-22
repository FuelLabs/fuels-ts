contract;

use std::{
    bytes::Bytes,
    constants::BASE_ASSET_ID,
    logging::log,
    message::{
        send_message,
    },
    asset::{
        transfer_to_address,
    },
};
use custom_errors::{AccessError, InputError};

abi RevertError {
    fn validate_inputs(token_id: u64, price: u64);
    fn failed_message();
    fn failed_transfer();
    fn failed_transfer_revert();
}

const BASE_TOKEN_A: AssetId = AssetId {
    value: 0x0000000000000000000000000000000000000000000000000000000000000001,
};

const BASE_TOKEN_B: AssetId = AssetId {
    value: 0x0000000000000000000000000000000000000000000000000000000000000001,
};

pub struct ValidInputsEvent {
    token_id: u64,
    price: u64,
}

impl RevertError for Contract {
    fn validate_inputs(token_id: u64, price: u64) {
        require(price != 0, InputError::PriceCantBeZero);
        require(token_id != 0, AccessError::TokenIdCantBeZero);
        require(token_id == 100u64, AccessError::InvalidTokenId);

        assert(price != token_id);

        log(ValidInputsEvent {
            token_id: token_id,
            price: price,
        });
    }

    fn failed_message() {
        let mut data = Bytes::new();
        data.push(1);
        data.push(2);
        data.push(3);
        send_message(
            0x0000000000000000000000000000000000000000000000000000000000000000,
            data,
            0,
        );
    }

    fn failed_transfer() {
        let amount = 1;
        let address = 0x0000000000000000000000000000000000000000000000000000000000000001;
        let user = Address::from(address);
        transfer_to_address(user, BASE_TOKEN_A, amount);
    }

    fn failed_transfer_revert() {
        let amount = 0;
        let address = 0x0000000000000000000000000000000000000000000000000000000000000001;
        let user = Address::from(address);
        transfer_to_address(user, BASE_TOKEN_B, amount);
    }
}
