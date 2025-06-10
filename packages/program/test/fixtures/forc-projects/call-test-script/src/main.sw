script;

fn log<T>(v: T) {
    asm(r1: v) {
        log r1 zero zero zero;
    }
}

fn logd<T>(v: T) {
    asm(r1: v, r2: __size_of::<T>()) {
        logd zero zero r1 r2;
    }
}

struct MyStruct {
    arg_one: bool,
    arg_two: u64,
}

fn main(my_struct: MyStruct) -> MyStruct {
    log(my_struct.arg_one);
    log(my_struct.arg_two);
    MyStruct {
        arg_one: my_struct.arg_one,
        arg_two: my_struct.arg_two,
    }
}
