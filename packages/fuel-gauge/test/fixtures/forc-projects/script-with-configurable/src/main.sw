script;

configurable {
    FEE: u8 = 5,
}

fn main(inputed_fee: u8) -> bool {
    log(FEE);
    FEE == inputed_fee
}
