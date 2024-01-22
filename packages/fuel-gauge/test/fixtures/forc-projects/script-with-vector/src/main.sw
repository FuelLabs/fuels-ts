script;

use std::logging::log;

impl AbiEncode for str[14] {
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

impl AbiEncode for str[10] {
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

fn main(vector: Vec<u64>) {
    log(vector.get(0).unwrap());

    let _is_valid = match vector.len() {
        0 => false,
        length => {
            assert(length == 4);
            assert(vector.capacity() == 4);
            assert(vector.is_empty() == false);
            log(__to_str_array("vector.buf.ptr"));
            // log(vector.buf.ptr); // TODO: fix/uncomment log
            log(__to_str_array("vector.buf.cap"));
            log(vector.buf.cap);
            log(__to_str_array("vector.len"));
            log(vector.len);
            log(__to_str_array("addr_of vector"));
            // log(__addr_of(vector)); // TODO: fix/uncomment log
            true
        },
    };

    require(vector.get(0).unwrap() == 7, "value is not as expected");
}
