script;

use std::logging::log;

fn main(vector: Vec<u64> ) {
    log(vector.get(0).unwrap());

    let _is_valid = match vector.len() {
        0 => false,
        length => {
            assert(length == 4);
            assert(vector.capacity() == 4);
            assert(vector.is_empty() == false);
            log("vector.buf.ptr");
            log(vector.buf.ptr);
            log("vector.buf.cap");
            log(vector.buf.cap);
            log("vector.len");
            log(vector.len);
            true
        },
    };

    require(vector.get(0).unwrap() == 7, "value is not as expected");
}