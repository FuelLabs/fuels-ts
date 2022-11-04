contract;

abi MyContract {
  fn types_struct_option(x: Option<u8>) -> Option<u8>;
}

impl MyContract for Contract {
  fn types_struct_option(x: Option<u8>) -> Option<u8> { x }
}
