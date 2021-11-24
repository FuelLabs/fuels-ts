contract;

use std::storage::store_u64;
use std::storage::get_u64;

abi TestContract {
  fn initialize_counter(gas_: u64, amount_: u64, coin_: b256, value: u64) -> u64;
  fn increment_counter(gas_: u64, amount_: u64, coin_: b256, amount: u64) -> u64;
}

const COUNTER_KEY = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl TestContract for Contract {
  fn initialize_counter(gas_: u64, amount_: u64, color_: b256, value: u64) -> u64 {
    store_u64(COUNTER_KEY, value);
    value
  }
  fn increment_counter(gas_: u64, amount_: u64, color_: b256, amount: u64) -> u64 {
    let value = get_u64(COUNTER_KEY) + amount;
    store_u64(COUNTER_KEY, value);
    value
  }
}
