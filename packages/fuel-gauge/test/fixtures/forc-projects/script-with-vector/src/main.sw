script;

use std::logging::log;

fn main(vector: Vec<u64>) {
    log(vector.get(0).unwrap());

    let _is_valid = match vector.len() {
        0 => false,
        length => {
            assert(length == 4);
            assert(vector.capacity() == 4);
            assert(vector.is_empty() == false);
            log(__to_str_array("vector.ptr()"));
            log(vector.ptr());
            log(__to_str_array("vector.capacity()"));
            log(vector.capacity());
            log(__to_str_array("vector.len()"));
            log(vector.len());
            log(__to_str_array("addr_of vector"));
            log(__addr_of(vector));
            true
        },
    };

    require(vector.get(0).unwrap() == 7, "value is not as expected");
}
