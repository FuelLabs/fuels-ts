// #region script-with-main-args
script;

use std::logging::log;

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

fn main(foo: u8) -> u8 {
    log(__to_str_array("u8 foo"));
    log(foo);
    foo
}
// #endregion script-with-main-args
