contract;

enum MyEnum {
  Checked: (),
  Pending: ()
}

abi MyContract {
  fn types_enum(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
  fn types_enum(x: MyEnum) -> MyEnum { x }
}
