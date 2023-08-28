contract;

enum MyEnum {
    Checked: b256,
    Pending: b256,
}

abi MyContract {
    fn main(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
    fn main(x: MyEnum) -> MyEnum {
        x
    }
}
