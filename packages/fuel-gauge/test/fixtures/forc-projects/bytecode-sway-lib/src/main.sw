contract;

abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>);

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool;

    // fn compute_predicate_address(bytecode: Vec<u8>) -> Address;
}

impl MyContract for Contract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) {
        // simply logs the hexidecimal b256 string of the bytecode input for testing purposes
        let ret: b256 = 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20;
        log(ret);
    }

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool {
        return true;
    }

    // fn compute_predicate_address(bytecode: Vec<u8>) -> Address {
    //     return EvmAddress::from();
    // }
}
