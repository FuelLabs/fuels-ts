predicate;

use std::{b512::B512, ecr::ec_recover_address};

fn extract_pulic_key_and_match(signature: B512, expected_public_key: b256) -> u64 {
    let message_hash = 0x6aed34e6bddff5e1d872b5d7d5698a7b73abd6f3b33402732edc73ab9ffb9c70;
    if let Result::Ok(pub_key_sig) = ec_recover_address(signature, message_hash)
    {
        if pub_key_sig.value == expected_public_key {
            return 1;
        }
    }
    0
}

fn main(signatures: [B512; 3]) -> bool {
    let public_keys = [
        0xe10f526b192593793b7a1559a391445faba82a1d669e3eb2dcd17f9c121b24b1,
        0x54944e5b8189827e470e5a8bacfc6c3667397dc4e1eef7ef3519d16d6d6c6610,
        0x577e424ee53a16e6a85291feabc8443862495f74ac39a706d2dd0b9fc16955eb,
    ];

    let mut matched_keys = 0;

    matched_keys = extract_pulic_key_and_match(signatures[0], public_keys[0]);
    matched_keys = matched_keys + extract_pulic_key_and_match(signatures[1], public_keys[1]);
    matched_keys = matched_keys + extract_pulic_key_and_match(signatures[2], public_keys[2]);

    matched_keys > 1
}
