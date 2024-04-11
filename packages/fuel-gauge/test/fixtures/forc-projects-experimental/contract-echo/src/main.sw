contract;

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

struct EvenDeeperStruct {
    nested_vec: Vec<u8>,
    nested_str: str,
    nested_raw: raw_slice,
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
    even_deeper: EvenDeeperStruct,
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
    str_slice: str,
}

configurable {
    CONF: (u8, u16, u32, str[4]) = (1, 2, 3, __to_str_array("four")),
}

abi MyContract {
    fn echo_struct(param: MixedStruct) -> MixedStruct;
    fn test_revert() -> bool;
    fn echo_configurable(param: (u8, u16, u32, str[4])) -> (u8, u16, u32, str[4]);
}

impl MyContract for Contract {
    fn echo_struct(param: MixedStruct) -> MixedStruct {
        param
    }

    fn test_revert() -> bool {
        require(false, "This is a revert error");
        true
    }

    fn echo_configurable(param: (u8, u16, u32, str[4])) -> (u8, u16, u32, str[4]) {
        assert_eq(param.0, CONF.0);
        assert_eq(param.1, CONF.1);
        assert_eq(param.2, CONF.2);

        let param_str: str = from_str_array(param.3);
        let conf_str: str = from_str_array(CONF.3);
        assert_eq(param_str, conf_str);
        
        CONF
    }
}
