contract;

struct A <T, U>{
  t: T,
  u: U
}

struct B <T>{
  t: T
}

struct C {
  b: (u8, A<B<u64>, str[3]>),
}


abi MyContract {
  fn single_param(c: C) -> u8;
  fn tuple_params(x: (u8, A<B<u64>, str[3]>)) -> (u8, A<B<u64>, str[3]>);
}

impl MyContract for Contract {
  fn single_param(c: C) -> u8 {
    1
  }

  fn tuple_params(x: (u8, A<B<u64>, str[3]>)) -> (u8, A<B<u64>, str[3]>) {
    x
  }
}
