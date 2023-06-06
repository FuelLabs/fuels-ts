script;

use std::logging::log;

fn main( some_vec: Vec<u64> ) {
    log(some_vec.get(0).unwrap());

    require(some_vec.get(0).unwrap() == 1, "value is not as expected");
}