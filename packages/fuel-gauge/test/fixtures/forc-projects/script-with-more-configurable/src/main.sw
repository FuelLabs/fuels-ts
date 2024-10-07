script;

use std::{
    string::String,
};


struct Struct1 {
    tag: str[3],
    age: u8,
    scores: [u8; 3],
}

enum Colors {
    red: (),
    blue: (),
}

impl Eq for [u32; 2] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1]
    }
}

impl Eq for [u8; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}

impl Eq for [[u32; 2]; 2] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1]
    }
}

impl Eq for str[2] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}

impl Eq for str[3] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}

impl Eq for str[4] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}

impl Eq for (u8, bool, str[2]) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}

impl Eq for Struct1 {
    fn eq(self, other: Self) -> bool {
        self.tag == other.tag && self.age == other.age && self.scores == other.scores
    }
}

impl Eq for Colors {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (Colors::red, Colors::red) => true,
            (Colors::blue, Colors::blue) => true,
            _ => false,
        }
    }
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

fn main() -> bool {
    assert(U8 == 16);
    log(U8);
    assert(U16 == 201u16);
    log(U16);
    assert(U32 == 1001u32);
    log(U32);
    assert(U64 == 99999999);
    log(U64);
    assert(BOOL == false);
    log(BOOL);
    assert(B256 == 0x314fa58689bbe1da2430517de2d772b384a1c1d2e9cb87e73c6afcf246045b10);
    log(B256);
    assert(ENUM == Colors::blue);
    log(ENUM);
    assert(ARRAY == [[101u32, 99u32], [123u32, 456u32]]);
    log(ARRAY);
    assert(from_str_array((STR_4)) == "leuf");
    log(STR_4);
    assert(TUPLE == (67, true, __to_str_array("hu")));
    log(TUPLE);
    assert(STRUCT_1 == Struct1 {
        tag: __to_str_array("909"),
        age: 15,
        scores: [9, 2, 1],
    });
    log(STRUCT_1);

    true
}
