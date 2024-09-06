contract;

struct GenericNestedLevelFour<Four> {
    four: Four, // u8
}

struct GenericNestedLevelThree<Three> {
    three: GenericNestedLevelFour<Three>, // u8
}

struct GenericNestedLevelTwo<Two> {
    two: GenericNestedLevelThree<Two>, // u8
}

struct GenericNestedLevelOne<One, OneOne> {
    one: GenericNestedLevelTwo<One>, // u8
    one_one: OneOne, // u16
}

abi ContractTuple {
    fn generic(arg1: GenericNestedLevelOne<u8, u16>);
    // fn simple(arg1: u8, arg2: u16);
    // fn different_generic(arg1: GenericNestedLevelOne<b256, b256>);
    // fn vector(arg1: Vec<u8>);
}

impl ContractTuple for Contract {
    fn generic(arg1: GenericNestedLevelOne<u8, u16>) {}
}
