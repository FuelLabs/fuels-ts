contract;

use std::address::Address;
use std::b512::B512;

abi OutputContract {
    fn request(seed: b256) -> u64;

    fn get_fee(asset: ContractId) -> u64;
}

impl OutputContract for Contract{
    fn request(seed: b256) -> u64 {
        31337u64
    }

    fn get_fee(asset: ContractId) -> u64 {
        100u64
    }
}