script;

use std::{
    tx::{
        tx_witness_data,
        tx_id
    },
    logging::log,
    ecr::ec_recover_address,
    b512::B512
};

fn main(signer: b256) -> bool {
    let witness_data: B512 = tx_witness_data(1);
    log(witness_data);
    log(tx_id());
    let address: b256 = ec_recover_address(witness_data, tx_id()).unwrap().value;
    log(address);

    return address == signer;
}
