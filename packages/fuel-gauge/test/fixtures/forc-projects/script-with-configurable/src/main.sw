script;

configurable {
    FEE: u8 = 5,
}

fn main(inputed_fee: u8) -> bool {
    FEE == inputed_fee
}
