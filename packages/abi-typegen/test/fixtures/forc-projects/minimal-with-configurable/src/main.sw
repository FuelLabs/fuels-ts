contract;

struct GenericStruct<T1, T2> {
    p1: T1,
    p2: T2,
}

configurable {
    SHOULD_RETURN: bool = true,
    AN_OPTION: Option<u8> = Option::None,
    A_GENERIC_STRUCT: GenericStruct<GenericStruct<u8, u16>, u32> = GenericStruct {
        p1: GenericStruct { p1: 4, p2: 257 },
        p2: 57000,
    },
}

abi MyContract {
    fn main(x: str[10], y: str[10]) -> bool;
}

impl MyContract for Contract {
    fn main(x: str[10], y: str[10]) -> bool {
        SHOULD_RETURN
    }
}
