contract;

enum GenericEnum<V> {
    Foo: u64,
    Bar: V,
}

struct GenericStruct<T> {
    Boo: T,
}

configurable {
    SHOULD_RETURN: bool = true,
    AN_OPTION: Option<u8> = Option::Some(3),
    GENERIC_ENUM: GenericEnum<u8> = GenericEnum::Foo(0),
    GENERIC_STRUCT: GenericStruct<GenericEnum<b256>> = GenericStruct {
        Boo: GenericEnum::Foo(3),
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
