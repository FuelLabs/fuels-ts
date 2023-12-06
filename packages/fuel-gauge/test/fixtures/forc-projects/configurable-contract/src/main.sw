contract;

struct Struct1 {
    tag: str[3],
    age: u8,
    scores: [u8; 3],
}

enum Colors {
    red: (),
    blue: (),
}

configurable {
    U8: u8 = 10,
    U16: u16 = 301u16,
    U32: u32 = 799u32,
    U64: u64 = 100000,
    BOOL: bool = true,
    B256: b256 = 0x1d6ebd57dd6a8d7e90889c8c7388f22c30d5c3556080a2b6dc4c521092a0b942,
    ENUM: Colors = Colors::red,
    ARRAY: [[u32; 2]; 2] = [[253u32, 254u32], [255u32, 256u32]],
    STR_4: str[4] = __to_str_array("fuel"),
    TUPLE: (u8, bool, str[2]) = (12, false, __to_str_array("hi")),
    STRUCT_1: Struct1 = Struct1 {
        tag: __to_str_array("000"),
        age: 21,
        scores: [1, 3, 4],
    },
}

abi ConfigurableContract {
    fn echo_u8() -> u8;
    fn echo_u16() -> u16;
    fn echo_u32() -> u32;
    fn echo_u64() -> u64;
    fn echo_bool() -> bool;
    fn echo_b256() -> b256;
    fn echo_enum() -> Colors;
    fn echo_array() -> [[u32; 2]; 2];
    fn echo_str4() -> str[4];
    fn echo_tuple() -> (u8, bool, str[2]);
    fn echo_struct() -> Struct1;
    fn echo_configurables() -> (u8, u16, u32, u64, bool, b256, Colors, [[u32; 2]; 2], str[4], (u8, bool, str[2]), Struct1);
}

impl ConfigurableContract for Contract {
    fn echo_u8() -> u8 {
        U8
    }

    fn echo_u16() -> u16 {
        U16
    }

    fn echo_u32() -> u32 {
        U32
    }

    fn echo_u64() -> u64 {
        U64
    }

    fn echo_bool() -> bool {
        BOOL
    }

    fn echo_b256() -> b256 {
        B256
    }

    fn echo_enum() -> Colors {
        ENUM
    }

    fn echo_array() -> [[u32; 2]; 2] {
        ARRAY
    }

    fn echo_str4() -> str[4] {
        STR_4
    }

    fn echo_tuple() -> (u8, bool, str[2]) {
        TUPLE
    }

    fn echo_struct() -> Struct1 {
        STRUCT_1
    }

    fn echo_configurables() -> (u8, u16, u32, u64, bool, b256, Colors, [[u32; 2]; 2], str[4], (u8, bool, str[2]), Struct1) {
        (
            U8,
            U16, U32, U64, BOOL, B256, ENUM, ARRAY, STR_4, TUPLE,
            STRUCT_1,
        )
    }
}
