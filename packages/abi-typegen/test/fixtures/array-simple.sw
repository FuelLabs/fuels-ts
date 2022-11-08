contract;

struct A <T, U>{
  t: T,
  u: U
}

struct B <T>{
  t: T,
  x: [bool; 2]
}

struct C {
  b: [A<B<u64>, str[1]>; 2],
}


abi MyContract {
  fn single_param(c: C) -> u8;
  fn array_params(x: [A<B<u64>, str[1]>; 2]) -> [A<B<u64>, str[1]>; 2];
}

impl MyContract for Contract {
  fn single_param(c: C) -> u8 {
    1
  }

  fn array_params(x: [A<B<u64>, str[1]>; 2]) -> [A<B<u64>, str[1]>; 2] {
    x
  }
}
