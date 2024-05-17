contract;

enum OptionEnum {
    a: Option<u8>,
    b: Option<u16>,
}

struct OptionStruct {
    one: OptionEnum,
    two: Option<u32>,
}

abi OptionContract {
    fn echo_option(arg: Option<u8>) -> Option<u8>;
    fn echo_struct_enum_option(arg: OptionStruct) -> OptionStruct;
    fn echo_vec_option(arg: Vec<Option<u32>>) -> Vec<Option<u32>>;
    fn echo_tuple_option(arg: (Option<u8>, Option<u16>)) -> (Option<u8>, Option<u16>);
    fn echo_enum_option(arg: OptionEnum) -> OptionEnum;
    fn echo_array_option(arg: [Option<u16>; 3]) -> [Option<u16>; 3];
}

impl OptionContract for Contract {
    fn echo_option(arg: Option<u8>) -> Option<u8> {
        arg
    }

    fn echo_struct_enum_option(arg: OptionStruct) -> OptionStruct {
        arg
    }

    fn echo_vec_option(arg: Vec<Option<u32>>) -> Vec<Option<u32>> {
        arg
    }

    fn echo_tuple_option(arg: (Option<u8>, Option<u16>)) -> (Option<u8>, Option<u16>) {
        arg
    }

    fn echo_enum_option(arg: OptionEnum) -> OptionEnum {
        arg
    }

    fn echo_array_option(arg: [Option<u16>; 3]) -> [Option<u16>; 3] {
        arg
    }
}
