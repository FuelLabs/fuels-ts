// #region full
script;

struct MyStruct {
    arg_one: bool,
    arg_two: u64,
}

fn main(my_struct: MyStruct) -> MyStruct {
    log(my_struct);
    log(my_struct.arg_one);
    log(my_struct.arg_two);
    MyStruct {
        arg_one: my_struct.arg_one,
        arg_two: my_struct.arg_two,
    }
}
// #endregion full
