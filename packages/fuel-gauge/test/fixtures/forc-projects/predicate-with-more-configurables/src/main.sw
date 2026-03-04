predicate;

configurable {
    FEE: u8 = 10,
    ADDRESS: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
    U16: u16 = 301u16,
    U32: u32 = 799u32,
    U64: u64 = 100000,
    BOOL: bool = true,
}

fn main(fee: u8, address: b256) -> bool {
    FEE == fee && address == ADDRESS && U16 == 305u16 && U32 == 101u32 && U64 == 1000000 && BOOL == false
}
