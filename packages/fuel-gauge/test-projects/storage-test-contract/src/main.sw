contract;

use std::storage::{get, store};

struct StructValidation {
    v1: bool,
    v2: u64
}

storage {
  var1: u64 = 10,
  var2: u32 = 20,
  var3: u16 = 30,
  var4: bool = true,
  var5: StructValidation = StructValidation {
    v1: true,
    v2: 50,
  },
}

abi StorageTestContract {
  #[storage(write)]
  fn initialize_counter(value: u64) -> u64;
  #[storage(read, write)]
  fn increment_counter(amount: u64) -> u64;
  #[storage(read)]
  fn counter() -> u64;
  #[storage(read)]
  fn return_b256() -> b256;
  #[storage(read)]
  fn return_var1() -> u64;
  #[storage(read)]
  fn return_var2() -> u32;
  #[storage(read)]
  fn return_var3() -> u16;
  #[storage(read)]
  fn return_var4() -> bool;
  #[storage(read)]
  fn return_var5() -> StructValidation;
}

const COUNTER_KEY = 0x0000000000000000000000000000000000000000000000000000000000000000;
const VALUE_B256 = 0x0000000000000000000000000000000000000000000000000000000000000001;

impl StorageTestContract for Contract {
  #[storage(write)]
  fn initialize_counter(value: u64) -> u64 {
    store(COUNTER_KEY, value);
    value
  }
  #[storage(read, write)]
  fn increment_counter(amount: u64) -> u64 {
    let value: u64 = get(COUNTER_KEY);
    let value = value + amount;
    store(COUNTER_KEY, value);
    value
  }
  #[storage(read)]
  fn counter() -> u64 {
    let value: u64 = get(COUNTER_KEY);
    value
  }
  // Return values from storage
  // This is used to test storage initialization, on contract deployment
  #[storage(read)]
  fn return_b256() -> b256 {
    get::<b256>(VALUE_B256)
  }
  #[storage(read)]
  fn return_var1() -> u64 {
    storage.var1
  }
  #[storage(read)]
  fn return_var2() -> u32 {
    storage.var2
  }
  #[storage(read)]
  fn return_var3() -> u16 {
    storage.var3
  }
  #[storage(read)]
  fn return_var4() -> bool {
    storage.var4
  }
  #[storage(read)]
  fn return_var5() -> StructValidation {
    storage.var5
  }
}
