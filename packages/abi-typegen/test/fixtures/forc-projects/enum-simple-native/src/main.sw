contract;

enum MyEnum {
    Checked: (),
    Pending: (),
}

abi MyContract {
    fn main(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
    fn main(x: MyEnum) -> MyEnum {
        x
    }
}
