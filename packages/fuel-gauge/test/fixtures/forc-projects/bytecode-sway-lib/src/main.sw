contract;

abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>);

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool;

    fn compute_predicate_address(bytecode: Vec<u8>) -> Address;
}

impl MyContract for Contract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) {
        // simply logs the hexidecimal b256 string of the bytecode input for testing purposes
        log(0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20);
    }

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool {
        return true;
    }

    fn compute_predicate_address(bytecode: Vec<u8>) -> Address {
        return Address::from(0x68fec7a57e48f4ec6467d7e09c27272bd8ca72b312ea553a470b98731475ccf3);
    }
}
