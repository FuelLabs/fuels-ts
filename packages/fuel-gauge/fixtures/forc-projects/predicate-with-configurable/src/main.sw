predicate;

configurable {
    FEE: u8 = 10,
    ADDRESS: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
}

fn main(fee: u8, address: b256) -> bool {
    FEE == fee && address == ADDRESS
}
