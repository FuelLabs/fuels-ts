script;

use std::b512::B512;
use std::string::String;
use std::option::Option;
use std::bytes::Bytes;
use std::vec::Vec;

enum NativeEnum {
    Checked: (),
    Pending: (),
}

enum MixedEnum {
    Value: bool,
    Data: u16,
}

struct MixedStruct {
    a: u8,
    b: u16,
    c: u32,
    d: u64,
    e: u256,
}

fn main(param: MixedStruct) -> MixedStruct {
    param
}
