contract;

use bytecode::*;

abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256;
}

impl MyContract for Contract {
    // #region vector-bytecode-input-sway
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256 {
        let root = compute_bytecode_root(bytecode_input);
        return root;
    }
    // #endregion vector-bytecode-input-sway
}
