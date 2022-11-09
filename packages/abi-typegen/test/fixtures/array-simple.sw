contract;

struct A {
  a: [u8; 2],
  s: str[2]
}


abi MyContract {
  fn single_param(c: A) -> bool;
}

impl MyContract for Contract {
  fn single_param(a: A) -> bool {
    true
  }
}
