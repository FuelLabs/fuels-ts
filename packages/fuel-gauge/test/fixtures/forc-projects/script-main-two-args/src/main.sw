script;

use std::logging::log;

struct Baz {
    x: u8,
}

impl AbiEncode for str[6] {
    fn abi_encode(self, ref mut buffer: Buffer) {
        let s = from_str_array(self);

        let len = s.len();
        let ptr = s.as_ptr();

        let mut i = 0;
        while i < len {
            let byte = ptr.add::<u8>(i).read::<u8>();
            buffer.push(byte);
            i += 1;
        }
    }
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
