predicate;

use std::inputs::{input_owner};
use std::constants::{ZERO_B256};

configurable {
    MAKER: b256 = ZERO_B256, /// Order owner
}

fn main() -> bool {
    if (input_owner(0).unwrap() == Address::from(MAKER)
        || input_owner(1).unwrap() == Address::from(MAKER)
        || input_owner(2).unwrap() == Address::from(MAKER))
    {
        return true;
    }

    false
}
