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

// TODO: Use std-lib version when it's out: https://github.com/FuelLabs/sway/issues/1062
fn get_script_data<T>() -> T {
    let script_length = std::tx::tx_script_length();
    // Fix weird issue: https://github.com/FuelLabs/sway/issues/1585
    let script_length = script_length + script_length % 8;
    
    let is = std::context::registers::instrs_start();
    let script_data_ptr = is + script_length;
    let script_data = asm(r1: script_data_ptr) {
        r1: T
    };
    script_data
}

struct MyStruct {
    arg_one: bool,
    arg_two: u64
}

fn main() -> MyStruct {
    let my_struct = get_script_data::<MyStruct>();
    log(my_struct.arg_one);
    log(my_struct.arg_two);
    MyStruct {
        arg_one: my_struct.arg_one,
        arg_two: my_struct.arg_two
    }
}
