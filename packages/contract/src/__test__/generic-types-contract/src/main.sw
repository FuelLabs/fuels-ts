contract;

enum BigEnum<V> {
    Address: V,
}

struct MyStruct<T, U> {
    bim: T,
    bam: BigEnum<U>
}

abi MyContract {
  fn generic_type_function(
    arg1: MyStruct<b256, bool>, 
  ) -> b256;
}

impl MyContract for Contract {
  fn generic_type_function(
    arg1: MyStruct<b256, bool>, 
  ) -> b256 {
    arg1.bim
  }
}