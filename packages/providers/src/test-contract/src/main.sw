contract;

use std::chain::log_u64;

struct TestStruct {
  a: bool,
  b: u64,
}

abi TestContract {
  fn foo(value: u64) -> u64;
  fn boo(value: TestStruct) -> TestStruct;
  fn barfoo(value: u64) -> u64;
  fn foobar() -> u64;
}

impl TestContract for Contract {
  fn foo(value: u64) -> u64 {
    log_u64(3735928559);
    value
  }
  fn boo(value: TestStruct) -> TestStruct {
    log_u64(3735928559);
    log_u64(value.b);
    TestStruct {
      a: !value.a,
      b: value.b + 1,
    }
  }
  fn barfoo(value: u64) -> u64 {
    63
  }
  fn foobar() -> u64 {
    63
  }
}
