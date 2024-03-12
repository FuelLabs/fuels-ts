script;

use std::b512::B512;
use std::string::String;

enum MyEnum {
    Checked: (),
    Pending: (),
}

struct MyStruct {
    x: u8,
    y: u8,
    state: MyEnum,
    grades: [u8; 4],
    tag: str[4],
}

// fn print_u8() -> u8 {
//     255
// }

// fn print_u16() -> u16 {
//     65535
// }

// fn print_u32() -> u32 {
//     4294967295
// }

// fn print_u64() -> u64 {
//     18446744073709551615
// }

// fn print_u256() -> u256 {
//     0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFu256
// }

// fn print_bool() -> bool {
//     true
// }

// fn echo_b256() -> b256 {
//     0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6
// }

// fn echo_b512(input: B512) -> B512 {
//     input
// }

// fn echo_str_array() -> str[4] {
//     let my_string: str[4] = __to_str_array("fuel");
//     my_string
// }

// fn main() -> String {
//     let my_string: String = String::from_ascii_str("Hello World");
//     my_string
// }

// fn main(slice: str) -> str {
//     slice
// }

fn main() -> MyStruct {
    let my_struct = MyStruct {
        x: 5,
        y: 128,
        state: MyEnum::Pending,
        grades: [1,4,6,22],
        tag: __to_str_array("fuel"),
    };
    
    my_struct
}