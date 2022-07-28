contract;

struct MyStruct<T, U> {
    bim: T,
}

abi MyContract {
  fn generic_type_function(
    arg1: MyStruct<b256, u8>, 
  ) -> b256;
}

impl MyContract for Contract {
  fn generic_type_function(
    arg1: MyStruct<b256, u8>, 
  ) -> b256 {
    arg1.bim
  }
}