contract;

abi MyContract {
    fn return_input(gas_: u64, coin_: u64, asset_id_: b256, input: u64) -> u64;
}

impl MyContract for Contract {
    fn return_input(gas_: u64, coin_: u64, asset_id_: b256, input: u64) -> u64 {
        input
    }
}
