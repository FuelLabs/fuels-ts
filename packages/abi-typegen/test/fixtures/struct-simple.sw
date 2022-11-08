contract;

struct A <T, U>{
  t: T,
  u: U
}

struct B <T>{
  t: T
}

struct C {
  b: A<B<u8>, u16>,
}


abi MyContract {
  fn single_params(c: C) -> u8;
}

impl MyContract for Contract {
  fn single_params(c: C) -> u8 {
    1
  }
}
