// #region evm-address-1
contract;

use std::vm::evm::evm_address::EvmAddress;

configurable {
    B256_ADDR: b256 = 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6,
}

abi EvmTest {
    fn echo_address() -> EvmAddress;
    fn echo_address_comparison(evm_addr: EvmAddress) -> bool;
}

impl EvmTest for Contract {
    fn echo_address() -> EvmAddress {
        return EvmAddress::from(B256_ADDR);
    }

    fn echo_address_comparison(evm_addr: EvmAddress) -> bool {
        let evm_addr2 = EvmAddress::from(B256_ADDR);

        evm_addr == evm_addr2
    }
}
// #endregion evm-address-1
