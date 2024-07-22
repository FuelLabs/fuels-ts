contract;

enum NativeEnum {
    A: (),
    B: (),
    C: (),
}

abi VoidContract {
    fn echo_void(value: Option<u8>) -> Option<u8>;
    fn echo_native_enum(value: NativeEnum) -> NativeEnum;
    fn type_then_void(x: u8, y: ()) -> ();
    fn type_then_void_then_type(x: u8, y: (), z: u8) -> ();
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

    fn type_then_void(x: u8, y: ()) -> () {
        assert_eq(x, 42);

        y
    }

    fn type_then_void_then_type(x: u8, y: (), z: u8) -> () {
        assert_eq(x, 42);
        assert_eq(z, 43);

        y
    }
}
