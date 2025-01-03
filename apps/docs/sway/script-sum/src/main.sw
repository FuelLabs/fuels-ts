// #region script-with-configurable-contants-1
// #region encode-and-decode-1
script;

configurable {
    AMOUNT: u32 = 10,
}

fn main(inputted_amount: u32) -> u32 {
    inputted_amount + AMOUNT
}
// #endregion encode-and-decode-1
// #endregion script-with-configurable-contants-1
