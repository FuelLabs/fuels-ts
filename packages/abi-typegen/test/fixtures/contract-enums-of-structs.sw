contract;

struct ColorStruct {
  red: u8,
  green: u16,
  blue: u32,
}

enum MyEnum {
  color: ColorStruct
}

abi MyContract {
  fn types_enum(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
  fn types_enum(x: MyEnum) -> MyEnum { x }
}
