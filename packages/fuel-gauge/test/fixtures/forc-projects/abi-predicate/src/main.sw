predicate;

struct Validation {
    has_account: bool,
    total_complete: u64,
}

enum MyGenericEnum<T> {
    a: T,
}

struct MyGenericStruct<T> {
    a: T,
}

struct Configurables {
    U8_VALUE: u8,
    B256_VALUE: b256,
}

configurable {
    U8_VALUE: u8 = 10,
    B256_VALUE: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
}

fn main(
    configurables: Configurables,
    vec: Vec<Validation>,
    enm: MyGenericEnum<u16>,
    opt: Option<u8>,
    res: Result<MyGenericStruct<str[4]>, u64>,
) -> bool {
    U8_VALUE == configurables.U8_VALUE && B256_VALUE == configurables.B256_VALUE
}
