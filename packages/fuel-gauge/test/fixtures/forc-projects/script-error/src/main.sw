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
    1 => assert_eq(1, 10),
    2 => assert_ne(10, 10),
    3 => revert(0),
    // New features
    4 => panic "a str panic",
    5 => panic "another str panic",
    6 => panic MyError::A,
    7 => panic MyError::B((1024, 42)),
    8 => panic MyError::B((0, 16)),
    _ => {}
  }
}
