contract;

use std::chain::log_u64;

abi TestContract {
  fn foo(gas_: u64, amount_: u64, coin_: b256, value: u64) -> u64;
}

impl TestContract for Contract {
  fn foo(gas_: u64, amount_: u64, color_: b256, value: u64) -> u64 {
    log_u64(3735928559);
    value
  }
}
