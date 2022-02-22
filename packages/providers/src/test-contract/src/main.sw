contract;

use std::chain::log_u64;

struct TestStruct {
  a: bool,
  b: u64,
}

abi TestContract {
  fn foo(gas_: u64, amount_: u64, coin_: b256, value: u64) -> u64;
  fn boo(gas_: u64, amount_: u64, coin_: b256, value: TestStruct) -> TestStruct;
  fn barfoo(gas_: u64, amount_: u64, coin_: b256, value: u64) -> u64;
  fn foobar(gas_: u64, amount_: u64, coin_: b256, value: ()) -> u64;
}

impl TestContract for Contract {
  fn foo(gas_: u64, amount_: u64, color_: b256, value: u64) -> u64 {
    log_u64(3735928559);
    value
  }
  fn boo(gas_: u64, amount_: u64, color_: b256, value: TestStruct) -> TestStruct {
    log_u64(3735928559);
    log_u64(value.b);
    TestStruct {
      a: !value.a,
      b: value.b + 1,
    }
  }
  fn barfoo(gas_: u64, amount_: u64, color_: b256, value: u64) -> u64 {
    63
  }
  fn foobar(gas_: u64, amount_: u64, color_: b256, value: ()) -> u64 {
    63
  }
}
