contract;

struct A {
  aa: u8,
}

struct B {
  aa: A,
  bb: u16,
}

struct C {
  aa: A,
  bb: Vec<B>,
  cc1: D<u8, u8, F<str[1]>>,
  cc2: Vec<D<u16, u16, F<bool>>>,
  cc3: Vec<D<u32, u32, F<Vec<O>>>>,
}

struct D <T, U, V>{
  dd: Vec<E<T>>,
  u: U,
  v: V
}

struct E<T> {
  aa: A,
  bb: B,
  ff: T,
}

struct F <T>{
  ff: u64,
  o: T
}


struct O {
  oo: u8
}


abi MyContract {
  fn single_params(a: A, b: B, c: C) -> bool;
  fn multi_params(a: D<u32, u32, F<Vec<O>>>) -> bool;
}

impl MyContract for Contract {
  fn single_params(a: A, b: B, c: C) -> bool {
    true
  }
  fn multi_params(a: D<u32, u32, F<Vec<O>>>) -> bool {
    false
  }
}
