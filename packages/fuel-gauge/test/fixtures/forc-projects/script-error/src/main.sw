script;

#[error_type]
enum MyError {
    #[error(m = "error A")]
    A: (),
    #[error(m = "error B")]
    B: (u64, u8),
}

pub fn main(a: u8) {
    match a {
        0 => require(1 == 0, MyError::A),
        1 => assert(false),
        2 => assert_eq(1, 10),
        3 => assert_ne(10, 10),
        4 => revert_with_log(99),
        5 => revert(0),
        6 => panic "a str panic",
        7 => panic MyError::A,
        8 => panic MyError::B((1024, 42)),
        9 => panic MyError::B((0, 16)),
        _ => {}
    }
}
