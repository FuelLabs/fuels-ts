contract;

enum BigEnum<V> {
    Address: b256,
}

struct MyStruct<T, U> {
    bim: T,
    bam: BigEnum<U>
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