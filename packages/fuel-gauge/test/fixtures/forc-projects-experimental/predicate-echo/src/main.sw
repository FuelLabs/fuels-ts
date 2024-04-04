predicate;

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

struct DeeperStruct {
    a: u8,
    b: u16,
    c: u32,
    d: u64,
    e: u256,
    f: b256,
    g: B512,
    native: NativeEnum,
    mixed: MixedEnum,
    grades: [u8; 4],
    fuel: str[4],
    hello: String,
    opt: Option<u16>,
    nada: Option<u32>,
    bytes: Bytes,
    tuple: (u8, u16, u32, str[4]),
    vec_u8: Vec<u8>,
}

struct MixedStruct {
    a: u8,
    b: u16,
    c: u32,
    d: u64,
    e: u256,
    f: b256,
    g: B512,
    native: NativeEnum,
    mixed: MixedEnum,
    grades: [u8; 4],
    fuel: str[4],
    hello: String,
    opt: Option<u16>,
    nada: Option<u32>,
    bytes: Bytes,
    tuple: (u8, u16, u32, str[4]),
    vec_u8: Vec<u8>,
    deep: DeeperStruct,
}

fn main(param: MixedStruct) -> bool {
    if (param.deep.d == 18446744073709551615) {
        return true;
    }
    return false;
}
