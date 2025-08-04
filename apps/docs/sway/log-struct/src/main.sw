// #region full
contract;

struct MyStruct {
    arg_one: bool,
    arg_two: u64,
}

abi LogValues {
    fn log_struct(val: MyStruct) -> MyStruct;
}

impl LogValues for Contract {
    fn log_struct(my_struct: MyStruct) -> MyStruct {
        log(my_struct);
        log(my_struct.arg_one);
        log(my_struct.arg_two);
        MyStruct {
            arg_one: my_struct.arg_one,
            arg_two: my_struct.arg_two,
        }
    }
}
// #endregion full
