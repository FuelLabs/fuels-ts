script;
configurable {
    SECRET_NUMBER: u64 = 9000,
}
enum MyEnum {
    A: u64,
    B: u8,
    C: (),
}
struct MyStruct {
    field_a: MyEnum,
    field_b: b256,
}
fn main(arg1: MyStruct) -> u64 {
    assert_eq(SECRET_NUMBER, 10001);
    match arg1.field_a {
        MyEnum::B(value) => {
            assert_eq(value, 99);
        }
        _ => {
            assert(false)
        }
    }
    assert_eq(
        arg1.field_b,
        0x1111111111111111111111111111111111111111111111111111111111111111,
    );
    return SECRET_NUMBER;
}
