// #region configurable-constants-1
contract;

enum MyEnum {
    Checked: (),
    Pending: (),
}

struct MyStruct {
    x: u8,
    y: u8,
    state: MyEnum,
}

configurable {
    age: u8 = 25,
    tag: str[4] = __to_str_array("fuel"),
    grades: [u8; 4] = [3, 4, 3, 2],
    my_struct: MyStruct = MyStruct {
        x: 1,
        y: 2,
        state: MyEnum::Pending,
    },
}

abi EchoConfigurables {
    fn echo_configurables() -> (u8, str[4], [u8; 4], MyStruct);
}

impl EchoConfigurables for Contract {
    fn echo_configurables() -> (u8, str[4], [u8; 4], MyStruct) {
        (age, tag, grades, my_struct)
    }
}
// #endregion configurable-constants-1
