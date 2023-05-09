contract;

struct CustomStruct {
    tag: str[3],
    age: u8,
    scores: [u8; 3]
}

configurable {
    U8: u8 = 10,
    BOOL: bool = true,
    ARRAY: [[u32; 2]; 2] = [[253u32, 254u32], [255u32, 256u32]],
    STR_4: str[4] = "fuel",
    TUPLE: (u8, bool, str[2]) = (12, false, "hi"),
    custom: CustomStruct = CustomStruct {
        tag: "000",
        age: 21,
        scores: [1, 3, 4]
    },
}

abi ConfigurableContract {
    fn return_configurables() -> (u8, bool, [[u32; 2]; 2], str[4], (u8, bool, str[2]), CustomStruct);
}

impl ConfigurableContract for Contract {
    fn return_configurables() -> (u8, bool, [[u32; 2]; 2], str[4], (u8, bool, str[2]), CustomStruct) {
        (U8, BOOL, ARRAY, STR_4, TUPLE, custom)
    }
}
