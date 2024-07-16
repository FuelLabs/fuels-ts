contract;

enum NativeEnum {
    A: (),
    B: (),
    C: (),
}

abi VoidContract {
    fn echo_void(value: Option<u8>) -> Option<u8>;
    fn echo_native_enum(value: NativeEnum) -> NativeEnum;
}

impl VoidContract for Contract {
    fn echo_void(value: Option<u8>) -> Option<u8> {
        assert_eq(value, Option::None);

        value
    }

    fn echo_native_enum(value: NativeEnum) -> NativeEnum {
        match value {
            NativeEnum::A => assert(false),
            NativeEnum::B => assert(false),
            NativeEnum::C => assert(true),
        };

        value
    }
}
