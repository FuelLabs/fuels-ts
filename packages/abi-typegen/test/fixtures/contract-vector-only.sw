contract;

abi MyContract {
  fn types_struct_option(x: Vec<u8>) -> Vec<u8>;
}

impl MyContract for Contract {
  fn types_struct_option(x: Vec<u8>) -> Vec<u8> { x }
}
