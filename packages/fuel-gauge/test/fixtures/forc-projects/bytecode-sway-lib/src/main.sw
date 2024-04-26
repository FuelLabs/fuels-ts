contract;

// TODO: Uncomment bytecode-related stuff
// This requires sway-libs to be compatible with latest forc (0.52+)
// use bytecode::*;


abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>);

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool;

    // fn compute_predicate_address(bytecode: Vec<u8>) -> Address;
    fn compute_predicate_address(bytecode: Vec<u8>) -> bool;
}

impl MyContract for Contract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) {
        // let mut bytecode = bytecode_input;
        // let root = compute_bytecode_root(bytecode);
        // log(root);
    }

    fn verify_contract_bytecode(contract_id: ContractId, bytecode: Vec<u8>) -> bool {
        // verify_contract_bytecode(contract_id, bytecode);
        return true;
    }

    fn compute_predicate_address(bytecode: Vec<u8>) -> bool {
        // return compute_predicate_address(bytecode);
        return true;
    }
}
