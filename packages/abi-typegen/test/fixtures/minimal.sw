contract;

abi MyContract {
  fn hello(first: str[10], last: str[10]) -> bool;
}

impl MyContract for Contract {
  fn hello(first: str[10], last: str[10]) -> bool {
    true
  }
}
