contract;

use std::storage::store;
use std::storage::get;

abi TestContract {
  fn initialize_counter(value: u64) -> u64;
  fn increment_counter(amount: u64) -> u64;
  fn counter(value: ()) -> u64;
  fn counternoparams() -> u64;
}

const COUNTER_KEY = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl TestContract for Contract {
  fn initialize_counter(value: u64) -> u64 {
    store(COUNTER_KEY, value);
    value
  }
  fn increment_counter(amount: u64) -> u64 {
    let value: u64 = get(COUNTER_KEY);
    let value = value + amount;
    store(COUNTER_KEY, value);
    value
  }
  fn counter(value: ()) -> u64 {
    let value: u64 = get(COUNTER_KEY);
    value
  }
  fn counternoparams() -> u64 {
    let value: u64 = get(COUNTER_KEY);
    value
  }
}
