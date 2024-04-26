contract;

abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>);

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool;

    fn compute_predicate_address(bytecode: Vec<u8>) -> Address;
}

impl MyContract for Contract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) {
       // simply logs the hexidecimal b256 string of the bytecode input for testing purposes
        log(&b256::from_hex_str(&bytecode_input).unwrap().to_hex_str());
    }

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool {
        return true;
    }

    fn compute_predicate_address(bytecode: Vec<u8>) -> Address {
        return Address::from_slice(&b256::from_hex_str(&bytecode).unwrap().to_bytes());
    }
}
