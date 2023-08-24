contract;

struct ColorStruct {
    red: u8,
    green: u16,
    blue: u32,
}

enum MyEnum {
    rgb: ColorStruct,
}

abi MyContract {
    fn main(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
    fn main(x: MyEnum) -> MyEnum {
        x
    }
}
