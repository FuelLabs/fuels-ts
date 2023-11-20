script;

use std::logging::log;

fn main(some_array: [u64; 2]) {
    log(some_array[0]);

    require(some_array[0] == 1, "array value is not as expected");
}
