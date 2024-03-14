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
    vec_to_slice: raw_slice,
}

fn main(param_one: B512) -> MixedStruct {
    let mut my_bytes = Bytes::new();

    my_bytes.push(40u8);
    my_bytes.push(41u8);
    my_bytes.push(42u8);

    let mut my_vec_u8 = Vec::new();
    my_vec_u8.push(40u8);
    my_vec_u8.push(41u8);
    my_vec_u8.push(42u8);

    let my_struct = MixedStruct {
        a: 5,
        b: 65535,
        c: 4294967295,
        d: 18446744073709551615,
        e: 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFu256,
        f: 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6,
        g: param_one,
        native: NativeEnum::Pending,
        mixed: MixedEnum::Value(true),
        grades: [1, 4, 6, 22],
        fuel: __to_str_array("fuel"),
        hello: String::from_ascii_str("Hello World"),
        opt: Option::Some(42),
        nada: Option::None,
        bytes: my_bytes,
        tuple: (255, 65535, 4294967295, __to_str_array("fuel")),
        vec_u8: my_vec_u8,
        vec_to_slice: my_vec_u8.as_raw_slice(),
    };

    my_struct
}
