contract;

abi MyContract {
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256;
}

impl MyContract for Contract {
    // #region vector-bytecode-input-sway
    fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256 {
        //simply return a fixed b256 value created from a hexadecimal string from testing purposes
        return b256::from_hex_str(&bytecode_input).unwrap();
    }
    // #endregion vector-bytecode-input-sway
}
