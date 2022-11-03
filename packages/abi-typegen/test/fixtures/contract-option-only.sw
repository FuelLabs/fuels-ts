contract;

struct MyStruct {
  something: Option<u64>
}

abi MyContract {
  fn types_struct_option(x: MyStruct) -> MyStruct;
}

impl MyContract for Contract {
  fn types_struct_option(x: MyStruct) -> MyStruct { x }
}
