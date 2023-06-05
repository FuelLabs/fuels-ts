contract;

use std::vm::evm::evm_address::EvmAddress;

abi EvmAddressTest {
    fn main(raw_address: b256) -> EvmAddress;
}

impl EvmAddressTest for Contract {
    fn main(raw_address: b256) -> EvmAddress {
        EvmAddress::from(raw_address)
    }
}
