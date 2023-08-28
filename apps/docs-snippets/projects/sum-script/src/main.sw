// #region script-with-configurable-contants-1
script;

configurable {
    AMOUNT: u8 = 10,
}

fn main(inpputed_amount: u8) -> u8 {
    inpputed_amount + AMOUNT
}
// #endregion script-with-configurable-contants-1
