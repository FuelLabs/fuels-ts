predicate;

use std::{b512::B512, ecr::ec_recover_address, constants::ZERO_B256, tx::{tx_id, tx_witness_data}};

configurable {
    SIGNER: b256 = ZERO_B256,
}

fn main(index: u64) -> bool {
    let witness_data: B512 = tx_witness_data(index).unwrap();

    let address: b256 = ec_recover_address(witness_data, tx_id()).unwrap().bits();

    // If the signers match then the predicate has validated the Tx.
    return SIGNER == address
}
