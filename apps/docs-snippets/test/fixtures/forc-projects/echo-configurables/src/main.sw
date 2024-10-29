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
    fn echo_configurables(updated_grades: bool) -> (u8, str[4], [u8; 4], MyStruct);
}

impl EchoConfigurables for Contract {
    fn echo_configurables(updated_grades: bool) -> (u8, str[4], [u8; 4], MyStruct) {
        if (updated_grades) {
            assert_eq(grades[0], 10);
            assert_eq(grades[1], 9);
            assert_eq(grades[2], 8);
            assert_eq(grades[3], 9);
        } else {
            assert_eq(grades[0], 3);
            assert_eq(grades[1], 4);
            assert_eq(grades[2], 3);
            assert_eq(grades[3], 2);
        }
        (age, tag, grades, my_struct)
    }
}
// #endregion configurable-constants-1
