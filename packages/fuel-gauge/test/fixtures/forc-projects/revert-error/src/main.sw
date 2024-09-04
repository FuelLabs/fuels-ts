contract;

use std::{asset::{transfer,}, bytes::Bytes, logging::log, message::{send_message,},};
use custom_errors::{AccessError, InputError};

abi RevertError {
    fn validate_inputs(token_id: u64, price: u64);
    fn failed_message();
    fn failed_transfer();
    fn failed_transfer_revert();
    fn assert_value_eq_10(value: u8);
    fn assert_value_ne_5(value: u8);
    fn revert_with_0();
}

const BASE_TOKEN_A: AssetId = AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001);
const BASE_TOKEN_B: AssetId = AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001);

pub struct ValidInputsEvent {
    token_id: u64,
    price: u64,
}

impl RevertError for Contract {
    fn validate_inputs(token_id: u64, price: u64) {
        log(1u8);
        log("FOO");
        require(price != 0, InputError::PriceCantBeZero);
        log("BAR");
        require(token_id != 0, AccessError::TokenIdCantBeZero);
        log("BAZ");
        log(99u8);
        require(token_id == 100u64, AccessError::InvalidTokenId);
        log(100u8);

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
        transfer(Identity::Address(user), BASE_TOKEN_A, amount);
    }

    fn failed_transfer_revert() {
        let amount = 0;
        let address = 0x0000000000000000000000000000000000000000000000000000000000000001;
        let user = Address::from(address);
        transfer(Identity::Address(user), BASE_TOKEN_B, amount);
    }

    fn assert_value_eq_10(value: u8) {
        log("FOO");
        assert_eq(value, 10);
    }

    fn assert_value_ne_5(value: u8) {
        log("BAZ");
        log(10u8);
        assert_ne(value, 5);
        log(27u8);
    }

    fn revert_with_0() {
        revert(0);
    }
}
