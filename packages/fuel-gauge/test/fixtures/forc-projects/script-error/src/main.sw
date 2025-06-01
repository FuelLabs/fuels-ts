script;

#[error_type]
enum MyError {
  #[error("error A")]
  A: (),
  #[error("error B")]
  B: (u64, u8),
}

pub fn main(a: u8) {
  match a {
    0 => panic "a str panic",
    1 => panic "another str panic",
    2 => panic MyError::A,
    3 => panic MyError::A,
    4 => panic MyError::B((1024, 42)),
    5 => panic MyError::B((0, 16)),
    _ => {}
  }
}
