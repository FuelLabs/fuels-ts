script;

use std::logging::log;

struct Baz {
    x: u8,
}

fn main(foo: u8, bar: Baz) -> u8 {
    log(__to_str_array("u8 foo"));
    log(foo);
    log(__to_str_array("u8 bar"));
    log(bar.x);
    log(__to_str_array("u8 bar"));
    log(bar.x);
    foo + bar.x
}
