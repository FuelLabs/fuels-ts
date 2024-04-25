contract;

// TODO: Uncomment bytecode-related stuff
// This requires sway-libs to be compatible with latest forc (0.52+)
// use bytecode::*;


abi MyContract {
    // fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256;
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> bool;
}

impl MyContract for Contract {
    // #region vector-bytecode-input-sway
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> bool {
        // let root = compute_bytecode_root(bytecode_input);
        // return root;
        return true;
    }
    // #endregion vector-bytecode-input-sway
}
