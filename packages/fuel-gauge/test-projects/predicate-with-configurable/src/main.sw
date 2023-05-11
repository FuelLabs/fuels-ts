predicate;

configurable {
    FEE: u8 = 10
}

fn main(inputed_fee: u8) -> bool {
    FEE == inputed_fee
}
