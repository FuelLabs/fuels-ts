// #region multiple-signers-1
script;

use std::{b512::B512, ecr::ec_recover_address, tx::{tx_id, tx_witness_data}};

fn main(signer: b256, witness_index: u64) -> bool {
    let witness_data: B512 = tx_witness_data(witness_index).unwrap();
    let address: b256 = ec_recover_address(witness_data, tx_id()).unwrap().bits();
    return address == signer;
}
// #endregion multiple-signers-1
