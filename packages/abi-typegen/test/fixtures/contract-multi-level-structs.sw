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
  bb: B,
  c: Vec<D<F>>,
}

struct D <T>{
  dd: Vec<E<T>>,
}

struct E<T> {
  aa: A,
  bb: B,
  ff: T,
}

struct F {
  ff: u64
}


abi MyContract {
  fn types_enum(a: A, b: B, c: C) -> bool;
}

impl MyContract for Contract {
  fn types_enum(a: A, b: B, c: C) -> bool {
    true
  }
}

/*

export type A = { aa: BigNumberish }
export type B = { aa: A, bb: BigNumberish }
export type C = { aa: A, bb: B, c: any[] }
  export type C = { aa: A, bb: B, c: D<F>[] }
export type D = { dd: any[] }
  export type D<T> = { dd: E<T>[] }
export type E = { aa: A, bb: B, ff: T }
  export type E<T> = { aa: A, bb: B, ff: T }
export type F = { ff: BigNumberish }

*/
