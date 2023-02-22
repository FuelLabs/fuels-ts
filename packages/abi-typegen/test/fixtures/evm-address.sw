contract;

use std::vm::evm::evm_address::EvmAddress;

abi EvmAddressTest {
    fn address_from_literal() -> EvmAddress;
    fn address_from_argument(raw_address: b256) -> EvmAddress;
}

impl EvmAddressTest for Contract {
    fn address_from_literal() -> EvmAddress {
        EvmAddress::from(0x0606060606060606060606060606060606060606060606060606060606060606)
    }

    fn address_from_argument(raw_address: b256) -> EvmAddress {
        EvmAddress::from(raw_address)
    }
}
