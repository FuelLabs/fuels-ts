contract;

use std::logging::log;
use std::context::{*, call_frames::*, registers::context_gas};
use std::contract_id::ContractId;

enum MyEnum {
  Foo: str[3],
  Bar: bool,
}

struct EnumStruct {
  my_enum: MyEnum,
}

struct TestStruct {
  a: bool,
  b: u64,
}

struct SumStruct {
  a: u64,
  b: u64,
}

struct SingleParamStruct {
  a: u64,
}

abi TestContract {
  fn foo(value: u64) -> u64;
  fn call_external_foo(param: u64, contract_id: b256) -> u64;
  fn boo(value: TestStruct) -> TestStruct;
  fn barfoo(value: u64) -> u64;
  fn foobar(value: ()) -> u64;
  fn foobar_no_params() -> u64;
  fn sum(a: u64, b: u64) -> u64;
  fn sum_test(a: u64, test: SumStruct) -> u64;
  fn sum_single(test: SumStruct) -> u64;
  fn sum_multparams(a: u64, b: u64, c: u64, d: u64, e: u64) -> u64;
  fn echo_b256(a: b256) -> b256;
  fn add_ten(param: SingleParamStruct) -> u64;
  fn return_void();
  fn return_context_amount() -> u64;
  fn return_context_asset() -> b256;
  fn return_context_gas() -> u64;
  fn array_argument(arg: [str[3]; 3]) -> str[3];
  fn enum_argument(arg: EnumStruct) -> str[3];
}

impl TestContract for Contract {
  fn foo(value: u64) -> u64 {
    log(value);
    value + 1
  }
  fn call_external_foo(param: u64, contract_id: b256) -> u64 {
    let external_contract = abi(TestContract, contract_id().into());
    let response = external_contract.foo(param);
    response + 1
  }
  fn boo(value: TestStruct) -> TestStruct {
    log(value.b);
    TestStruct {
      a: !value.a,
      b: value.b + 1,
    }
  }
  fn barfoo(value: u64) -> u64 {
    63
  }
  fn foobar(value: ()) -> u64 {
    63
  }
  fn foobar_no_params() -> u64 {
    50
  }
  fn sum(a: u64, b: u64) -> u64 {
    a + b
  }
  fn sum_test(a: u64, test: SumStruct) -> u64 {
    a + test.a + test.b
  }
  fn sum_single(test: SumStruct) -> u64 {
    test.a + test.b
  }
  fn sum_multparams(a: u64, b: u64, c: u64, d: u64, e: u64) -> u64 {
    a + b + c + d + e
  }
  fn echo_b256(a: b256) -> b256 {
    a
  }
  fn add_ten(param: SingleParamStruct) -> u64 {
    param.a + 10
  }
  fn return_void() {
    log(3735928559);
  }
  fn return_context_amount() -> u64 {
    msg_amount()
  }
  fn return_context_asset() -> b256 {
    (msg_asset_id()).into()
  }
  fn return_context_gas() -> u64 {
    context_gas()
  }
  fn array_argument(arg: [str[3]; 3]) -> str[3] {
    arg[0]
  }
  fn enum_argument(arg: EnumStruct) -> str[3] {
    "Yes"
  }
}
