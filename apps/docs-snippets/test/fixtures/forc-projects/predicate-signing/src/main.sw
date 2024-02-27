predicate;

use std::{
    tx::{
        tx_witness_data,
        tx_id
    },
    ecr::ec_recover_address
};

fn main(signer: b256) -> bool {
    if (ec_recover_address(tx_witness_data(0), tx_id()).unwrap().value == signer) {
        return true;
    }
    return false;
}
