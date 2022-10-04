contract;

use std::storage::store;
use std::storage::get;

abi TestContract {
  fn method_with_empty_argument() -> u64;
}

const COUNTER_KEY = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl TestContract for Contract {
  fn method_with_empty_argument() -> u64 {
    63
  }
}
