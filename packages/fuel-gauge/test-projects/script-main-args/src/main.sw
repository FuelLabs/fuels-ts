script;

use std::logging::log;

fn main(foo: u8) -> u8 {
    log("u8 foo");
    log(foo);
    foo
}