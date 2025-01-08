predicate;

configurable {
    INPUT: u8 = 99,
    ADDRESS: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
}

fn main(input: u8, address: b256) -> bool {
    INPUT == input && address == ADDRESS
}
