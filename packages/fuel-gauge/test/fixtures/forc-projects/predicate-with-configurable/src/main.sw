predicate;

struct Struct {
    user: u8,
    points: u8,
}

enum Enum {
    BEGINNER: (),
    INTERMEDIATE: (),
    ADVANCED: (),
}

enum GenericEnum<V> {
    Foo: u64,
}

struct GenericStruct<T> {
    Boo: T
}

configurable {
    configurableVoid: () = (),
    configurableBoolean: bool = true,
    configurableU8: u8 = 0,
    configurableU16: u16 = 0,
    configurableU32: u32 = 0,
    configurableU256: u256 = 0,
    configurableStruct: Struct = Struct {
        user: 0,
        points: 0,
    },
    configurableOption: Option<u8> = Some(0),
    configurableStr: str[4] = __to_str_array("test"),
    configurableArray: [u8; 4] = [1, 2, 3, 4],
    configurableTuple: (u8, u8, u8) = (1, 2, 3),
    configurableEnum: Enum = Enum::BEGINNER,
    configurableEnumWithGeneric: GenericEnum<u8> = GenericEnum::Foo(0),
    configurableStructWithGeneric: GenericStruct<u8> = GenericStruct {
        Boo: 0
    },

    FEE: u8 = 10,
    ADDRESS: b256 = 0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96,
}

fn main(fee: u8, address: b256) -> bool {
    FEE == fee && address == ADDRESS
}
