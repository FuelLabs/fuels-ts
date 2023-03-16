contract;

dep errors;

use std::{
    logging::log,
};
use errors::{AccessError, InputError};

abi RevertError {
    fn validate_inputs(token_id: u64, price: u64);
}

pub struct ValidInputsEvent {
    token_id: u64,
    price: u64,
}

impl RevertError for Contract{
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
}