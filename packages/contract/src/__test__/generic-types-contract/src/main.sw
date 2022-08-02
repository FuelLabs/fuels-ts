contract;

enum MyEnum<V> {
    Foo: u64,
    Bar: bool,
    Din: V,
}

struct MyStruct<T, U> {
    bim: T,
    bam: MyEnum<U>
}

abi MyContract {
  fn generic_type_function(
    arg1: [MyStruct<str[3], bool>; 3],
    arg2: [MyStruct<[b256; 3], bool>; 3],
    arg3: MyStruct<u64, str[3]>,
    arg4: MyStruct<bool, u64>,
  ) -> str[3];
}

impl MyContract for Contract {
  fn generic_type_function(
    arg1: [MyStruct<str[3], bool>; 3],
    arg2: [MyStruct<[b256; 3], bool>; 3],
    arg3: MyStruct<u64, str[3]>,
    arg4: MyStruct<bool, u64>,
  ) -> str[3] {
    arg1[0].bim
  }
}
