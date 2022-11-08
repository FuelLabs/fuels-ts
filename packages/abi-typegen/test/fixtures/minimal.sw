contract;

abi MyContract {
  fn hello(name: str[10]) -> str[10];
}

impl MyContract for Contract {
  fn hello(name: str[10]) -> str[10] { name }
}
