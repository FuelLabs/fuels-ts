contract;

abi SumOptionU8 {
    fn sum_optional_u8(input1: Option<u8>, input2: Option<u8>) -> u8;
}

impl SumOptionU8 for Contract {
    // #region options-2
    fn sum_optional_u8(input1: Option<u8>, input2: Option<u8>) -> u8 {
        let value1 = match input1 {
            Option::Some(v) => v,
            Option::None => 0,
        };

        let value2 = match input2 {
            Option::Some(v) => v,
            Option::None => 0,
        };

        value1 + value2
    }
    // #endregion options-2
}
