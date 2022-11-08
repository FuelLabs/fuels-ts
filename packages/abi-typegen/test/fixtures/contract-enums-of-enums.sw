contract;

enum LetterEnum {
  a: (),
  b: (),
  c: (),
}

enum MyEnum {
  letter: LetterEnum
}

abi MyContract {
  fn types_enum(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
  fn types_enum(x: MyEnum) -> MyEnum { x }
}
